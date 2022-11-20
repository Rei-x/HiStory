import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getQuizes = async () => {
  return (await getDocs(collection(db, "quizes"))).docs.map((data) => ({
    ...data.data(),
    id: data.id,
  }));
};
