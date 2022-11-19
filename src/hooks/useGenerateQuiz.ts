import { CreateCompletionResponse } from "openai";
import { useState } from "react";
import useLazyQuery from "./useLazyQuery";

export const useGenerateQuiz = ({
  baseText,
  numberOfQuestions,
}: {
  baseText: string;
  numberOfQuestions: number;
}) => {
  const [data, setData] = useState<CreateCompletionResponse | undefined>(
    undefined
  );
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
