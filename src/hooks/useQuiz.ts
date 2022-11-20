import { useQuery } from "react-query";
import { getQuizes } from "../api/getQuizes";
import { QuizData } from "../types/quizData";

export const useQuiz = (data?: { variables?: { topicId?: string } }) => {
  return useQuery<{ quizes: QuizData[] }>(
    ["quizes", JSON.stringify(data?.variables ?? "emptyTopic")],
    async () => {
      const quizes = (await getQuizes()) as QuizData[];
      if (data?.variables?.topicId) {
        return {
          quizes: quizes.filter(
            (quiz) => quiz.topicId === data?.variables?.topicId
          ),
        };
      }
      return { quizes };
    }
  );
};
