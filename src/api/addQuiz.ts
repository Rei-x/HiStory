import { addDoc, collection } from "firebase/firestore";
import { QuizData } from "../types/quizData";
import { db } from "./firebase";

export const addQuiz = async (
  quiz: Omit<QuizData & { resourceUrl: string }, "id">
) => {
  return (await addDoc(collection(db, "quizes"), quiz)).id;
};
