import { readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { QuizData } from "../../../types/quizData";

const path = "/tmp/quizDb.json";

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let dbContent = "";
  try {
    dbContent = readFileSync(path).toString() ?? "[]";
  } catch (error) {
    dbContent =
      '[{"id":"V1StGXR8_Z5jdHi6B-myw","topicId":"V1StGXR8_Z5jdHi6B-myT","questions":[{"question":"Co było ideą przewodnią przyświecającą autorom wystawy Akcja AB – Katyń?","answers":["ukazanie podobnych działań podjętych w tym samym czasie przez obydwu agresorów i zbrodniczych okupantów Rzeczypospolitej Polskiej: nazistowskie Niemcy i Rosję radziecką","pokazanie, że zbrodnie Niemców były gorsze niż zbrodnie Sowietów","pokazanie, że zbrodnie Sowietów były gorsze niż zbrodnie Niemców","pokazanie, że zbrodnie Niemców i Sowietów były takie same"]}]}]';
  }
  const db = JSON.parse(dbContent) as QuizData[];

  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const indexToDelete = db.findIndex((quiz) => quiz.id === id);
    db.splice(indexToDelete, 1);
  } else if (req.method === "POST") {
    const quizDto = req.body as {
      topicId: string;
      questions: {
        question: string;
        answers: string[];
        correctAnswer: string;
      }[];
    };
    db.push({ ...quizDto, id: nanoid() });
  } else if (req.method === "GET") {
    const topicId = req.query.topicId ?? "";
    if (topicId.length > 0) {
      res.send({ quizes: db.filter((quiz) => quiz.topicId === topicId) });
    } else {
      res.send({ quizes: db });
    }
  } else {
    res.send(400);
    throw new Error("Bad request");
  }

  const newDbContent = JSON.stringify(db);

  writeFileSync(path, newDbContent);
  res.send("success");
};
export default handler;
