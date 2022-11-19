// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({
    data: {
      id: "cmpl-6EJGVHQPqshGYwK1VnxMWhwsKDvE4",
      object: "text_completion",
      created: 1668868667,
      model: "text-davinci-002",
      choices: [
        {
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
