import { useQuery } from "react-query";
import { QuizData } from "../types/quizData";

export const useQuiz = () => {
  return useQuery<QuizData>("quiz", async () => {
    return (await fetch("/api/quiz")).json();
  });
};
