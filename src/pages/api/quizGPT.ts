// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";

type Data =
  | {
      data: CreateCompletionResponse;
    }
  | {
      error: string;
    };

const convertNumberToText = (number: 1 | 2 | 3 | 4) => {
  const numbers = {
    1: "jedno pytanie",
    2: "dwa pytania",
    3: "trzy pytania",
    4: "cztery pytania",
  };

  return numbers[number];
};

const createPrompt = ({
  baseText,
  numberOfQuestions,
}: {
  baseText: string;
  numberOfQuestions: 1 | 2 | 3 | 4;
}) => {
  return `
  Wygeneruj quiz na podstawie tekstu, który ma dokładnie ${convertNumberToText(
    numberOfQuestions
  )} i każde ma po 4 odpowiedzi. Na końcu każdego pytania wypisz poprawną odpowiedź.
  ---
  Quiz jest w 100% w  formacie JSON. 
{ "questions": [{
"question": "Pytanie",
"answers": ["odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d"],
"correctAnswer": "odpowiedź a",
}]
  ---
  ${baseText}
  ---
  {
  `;
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

  if (numberOfQuestions > 4) {
    return res
      .status(400)
      .json({ error: "Nieprawidłowa ilość pytań, musi być mniejsza niż 4." });
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

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: createPrompt({
      numberOfQuestions: (numberOfQuestions as 1) ?? 1,
      baseText,
    }),
    stop: "---",
    temperature: 0.1,
    max_tokens: 2048,
  });

  const choice = JSON.parse(
    "{" +
      completion.data.choices[0].text?.replaceAll("\n", "").replaceAll("\t", "")
  );

  return res.status(200).json({ ...choice });
}
