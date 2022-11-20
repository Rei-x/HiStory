import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter();

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

    const parsedData = await data.json();
    if (data.status !== 200) {
      toast({
        title: "Błąd",
        description: parsedData.error,
        status: "error",
      });
      router.back();
      return;
    }

    setData(parsedData);
  };

  return { data, fetchData, loading };
};
