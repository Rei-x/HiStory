import { useQuery } from "react-query";
import { QuizData } from "../types/quizData";

export const useQuiz = ({ variables }: { variables: { topicId?: string } }) => {
  return useQuery<{ quizes: QuizData[] }>(
    ["quizes", JSON.stringify(variables)],
    async () => {
      return (
        await fetch(`/api/quizes?${new URLSearchParams(variables)}`)
      ).json();
    }
  );
};
