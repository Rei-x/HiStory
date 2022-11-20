import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const deleteQuiz = (quizId: string) => {
  return deleteDoc(doc(db, `quizes`, quizId));
};
