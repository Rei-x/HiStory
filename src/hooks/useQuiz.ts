import { useQuery } from "react-query";
import { getQuizes } from "../api/getQuizes";
import { QuizData } from "../types/quizData";

export const useQuiz = ({ variables }: { variables: { topicId?: string } }) => {
  return useQuery<{ quizes: QuizData[] }>(
    ["quizes", JSON.stringify(variables)],
    async () => {
      const quizes = (await getQuizes()) as QuizData[];
      if (variables.topicId) {
        return {
          quizes: quizes.filter((quiz) => quiz.topicId === variables.topicId),
        };
      }
      return { quizes };
    }
  );
};
