// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Answers = {
  [key in "a" | "b" | "c" | "d"]: string;
};

type Data = {
  question: string,
  answers: Answers,
  correctAnswer: "a" | "b" | "c" | "d"
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
