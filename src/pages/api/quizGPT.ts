// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import { getQuestions } from "../../api/getQuestions";
import { QuizData } from "../../types/quizData";

type Data =
  | QuizData
  | {
      error: string;
    };

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    baseText?: string;
    numberOfQuestions?: number;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const baseText = req.body.baseText;
  const numberOfQuestions = req.body.numberOfQuestions;

  if (typeof baseText !== "string") {
    return res.status(400).json({ error: "Brak tekstu" });
  }

  if (typeof numberOfQuestions !== "number") {
    return res.status(400).json({ error: "Nie przesłano ilości pytań." });
  }

  if (typeof process.env?.OPENAI_API_KEY === "undefined") {
    const completion = {
      data: {
        id: "cmpl-6EJdqZyQit3XhkXWPR7M9Y3vBfekK",
        object: "text_completion",
        created: 1668870114,
        model: "text-davinci-002",
        choices: [
          {
            text: '\t"questions": [\n \t\t{\n \t\t\t"question": "Ideą przewodnią przyświecającą autorom wystawy Akcja AB – Katyń było ukazanie podobnych działań podjętych w tym samym czasie przez obydwu agresorów i zbrodniczych okupantów Rzeczypospolitej Polskiej:",\n \t\t\t"answers": [\n \t\t\t\t"nazistowskie Niemcy i Rosję radziecką.",\n \t\t\t\t"nazistowskie Niemcy i Rosję radziecką oraz współpracy okupantów.",\n \t\t\t\t"nazistowskie Niemcy i Rosję radziecką oraz polityce okupacyjnej.",\n \t\t\t\t"nazistowskie Niemcy i Rosję radziecką oraz polityce okupacyjnej i współpracy okupantów."\n \t\t\t],\n \t\t\t"correctAnswer": "nazistowskie Niemcy i Rosję radziecką."\n \t\t}\n \t]\n }',
            index: 0,
            logprobs: null,
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 988,
          completion_tokens: 337,
          total_tokens: 1325,
        },
      },
    };

    const choice = JSON.parse(
      "{" +
        completion.data.choices[0].text
          ?.replaceAll("\n", "")
          .replaceAll("\t", "")
    );

    return res.status(200).json({ ...choice });
  }

  const paragraphs = baseText.split("\n\n");

  const onlyLongParagraphs = paragraphs.filter((text) => text.length > 50);
  const normalParagraphs = onlyLongParagraphs.filter(
    (text) => text.length < 1500
  );

  const allQuestions = normalParagraphs.map((paragraph) => {
    let questionsForParagraph = 1;
    if (paragraph.length > 500) {
      questionsForParagraph = 2;
    }
    if (paragraph.length > 1000) {
      questionsForParagraph = 3;
    }

    return {
      text: paragraph,
      numberOfQuestions: questionsForParagraph,
    };
  });

  const numberOfAllPosibleQuestions = allQuestions.reduce((acc, cur) => {
    return acc + cur.numberOfQuestions;
  }, 0);

  if (numberOfAllPosibleQuestions < numberOfQuestions) {
    return res.status(400).json({
      error: `Za duża ilość pytań na taką ilość tekstu! Możliwa ilość pytań ${numberOfAllPosibleQuestions}`,
    });
  }

  const loweredNumberOfQuestions = allQuestions.reduce(
    (accQuestions, curQuestions) => {
      const currentNumberOfQuestions = accQuestions.reduce((acc, cur) => {
        return acc + cur.numberOfQuestions;
      }, 0);

      if (currentNumberOfQuestions >= numberOfQuestions) {
        return accQuestions;
      }

      if (
        currentNumberOfQuestions + curQuestions.numberOfQuestions >
        numberOfQuestions
      ) {
        return [
          ...accQuestions,
          {
            ...curQuestions,
            numberOfQuestions: numberOfQuestions - currentNumberOfQuestions,
          },
        ];
      }

      return [...accQuestions, curQuestions];
    },
    [] as typeof allQuestions
  );

  const questions = loweredNumberOfQuestions.map((question) => {
    console.log(question.text);

    return getQuestions({
      baseText: question.text,
      numberOfQuestions: question.numberOfQuestions as 1,
    });
  });

  const awaitedQuestions = await Promise.all(questions);

  const allQuestionsMerged = awaitedQuestions.reduce((acc, cur) => {
    if (typeof cur === "undefined") {
      return acc;
    }

    if (acc.length < numberOfQuestions) {
      return [...acc, ...cur.questions];
    }
    return acc;
  }, [] as QuizData["questions"]);

  return res.status(200).json({ questions: allQuestionsMerged });
}
