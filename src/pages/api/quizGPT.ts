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
    1: "jedno",
    2: "dwa",
    3: "trzy",
    4: "cztery",
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
  )} pytania i każde ma po 4 odpowiedzi. Na końcu każdego pytania wypisz poprawną odpowiedź.
  ---
  Quiz jest w formacie JSON. 
{ questions: [{
question: "Pytanie",
answers: ["odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d"],
correctAnswer: "odpowiedź a",
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
    max_tokens: 1000,
  });

  // const completion = {
  //   data: {
  //     id: "cmpl-6EJGVHQPqshGYwK1VnxMWhwsKDvE4",
  //     object: "text_completion",
  //     created: 1668868667,
  //     model: "text-davinci-002",
  //     choices: [
  //       {
  //         text: "\n 1. Co było ideą przewodnią przyświecającą autorom wystawy Akcja AB – Katyń?\n a) ukazanie podobnych działań podjętych w tym samym czasie przez obydwu agresorów i zbrodniczych okupantów Rzeczypospolitej Polskiej: nazistowskie Niemcy i Rosję radziecką\n b) pokazanie, że zbrodnie Niemców były gorsze niż zbrodnie Sowietów\n c) pokazanie, że zbrodnie Sowietów były gorsze niż zbrodnie Niemców\n d) pokazanie, że zbrodnie Niemców i Sowietów były takie same",
  //         index: 0,
  //         logprobs: null,
  //         finish_reason: "stop",
  //       },
  //     ],
  //     usage: {
  //       prompt_tokens: 946,
  //       completion_tokens: 247,
  //       total_tokens: 1193,
  //     },
  //   },
  // };

  // const quizText  = completion.data.choices[0];

  // const question =

  return res.status(200).json({ data: completion.data });
}
