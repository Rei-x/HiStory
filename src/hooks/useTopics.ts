import { useQuery } from "react-query";
import { getTopics } from "../api/getTopics";
import { Topic } from "../pages/api/topics";

export const useTopics = () => {
  return useQuery<{ topics: Topic[] }>("topics", async () => {
    return { topics: (await getTopics()) as Topic[] };
  });
};
