// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizData } from "../../types/quizData";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizData>
) {
  res.status(200).json({
    question: "What is the name of Franek Madej?",
    answers: {
      a: "maciek",
      b: "michał",
      c: "damian",
      d: "franek",
    },
    correctAnswer: "d",
  });
}
