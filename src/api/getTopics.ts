import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getTopics = async () => {
  return (await getDocs(collection(db, "topics"))).docs.map((data) => ({
    ...data.data(),
    id: data.id,
  }));
};
