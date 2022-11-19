import { useQuery } from "react-query";
import { Topic } from "../pages/api/topics";
import { QuizData } from "../types/quizData";

export const useTopics = () => {
  return useQuery<{ topics: Topic[] }>("topics", async () => {
    return (await fetch("/api/topics")).json();
  });
};
