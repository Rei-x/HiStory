import { addDoc, collection } from "firebase/firestore";
import { Topic } from "../pages/api/topics";
import { db } from "./firebase";

export const addTopic = async (topic: Omit<Topic, "id">) => {
  return (await addDoc(collection(db, "topics"), topic)).id;
};
