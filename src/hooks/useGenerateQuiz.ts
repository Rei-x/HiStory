import { useState } from "react";
import { QuizData } from "../types/quizData";

export const useGenerateQuiz = ({
  baseText,
  numberOfQuestions,
}: {
  baseText: string;
  numberOfQuestions: number;
}) => {
  const [data, setData] = useState<QuizData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("/api/quizGPT", {
      method: "POST",
      body: JSON.stringify({
        baseText,
        numberOfQuestions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    setData(await data.json());
  };

  return { data, fetchData, loading };
};
