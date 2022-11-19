// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res
    .status(200)
    .json({
      data: {
        id: "cmpl-6EJGVHQPqshGYwK1VnxMWhwsKDvE4",
        object: "text_completion",
        created: 1668868667,
        model: "text-davinci-002",
        choices: [
          {
            text: "\n 1. Co było ideą przewodnią przyświecającą autorom wystawy Akcja AB – Katyń?\n a) ukazanie podobnych działań podjętych w tym samym czasie przez obydwu agresorów i zbrodniczych okupantów Rzeczypospolitej Polskiej: nazistowskie Niemcy i Rosję radziecką\n b) pokazanie, że zbrodnie Niemców były gorsze niż zbrodnie Sowietów\n c) pokazanie, że zbrodnie Sowietów były gorsze niż zbrodnie Niemców\n d) pokazanie, że zbrodnie Niemców i Sowietów były takie same",
            index: 0,
            logprobs: null,
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 946,
          completion_tokens: 247,
          total_tokens: 1193,
        },
      },
    });
}
