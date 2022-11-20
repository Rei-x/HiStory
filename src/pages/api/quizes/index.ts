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
      '[{"id":"V1StGXR8_Z5jdHi6B-myw","title":"Katyń","topicId":"V1StGXR8_Z5jdHi6B-myT","questions":[{"question":"Jak nazywał się konflikt polsko-bolszewicki?","answers":["Wojna polsko-bolszewicka","Wojna polsko-niemiecka","Wojna polsko-rosyjska","Wojna polsko-austriacka"],"correctAnswer":"Wojna polsko-bolszewicka"},{"question":"Dlaczego wojska bolszewickie zajęły Wilno?","answers":["Było to miasto polskie","Było to miasto bolszewickie","Było to miasto niemieckie","Było to miasto radzieckie"],"correctAnswer":"Było to miasto polskie"},{"question":"Kiedy rozpoczęła się wojna polsko-rosyjska?","answers":["7 lutego 1919 r.","14 lutego 1919 r.","21 lutego 1919 r.","1 marca 1919 r."],"correctAnswer":"7 lutego 1919 r."},{"question":"W którym mieście doszło do pierwszych walk?","answers":["Tyraspol","Mosty","Kobryn","Skidl"],"correctAnswer":"Tyraspol"},{"question":"Ile żołnierzy utraciły oddziały Wojska Polskiego w wyniku działań wojennych w latach 1918–1920?","answers":["251 tys.","37,5 tys.","50,7 tys.","Ranni"],"correctAnswer":"251 tys."}]}]';
  }
  const db = JSON.parse(dbContent) as QuizData[];

  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const indexToDelete = db.findIndex((quiz) => quiz.id === id);
    db.splice(indexToDelete, 1);
    res.send("success");
  } else if (req.method === "POST") {
    const quizDto = req.body as {
      title: string;
      topicId: string;
      questions: {
        question: string;
        answers: string[];
        correctAnswer: string;
      }[];
    };
    const id = nanoid();
    db.push({ ...quizDto, id });
    res.send(id);
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
};
export default handler;
