import { readFileSync, writeFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

const path = "/tmp/db.json";

export interface Topic {
  id: string;
  title: string;
  historicalPeriod: string;
}

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let dbContent = "";
  try {
    dbContent = readFileSync(path).toString() ?? "[]";
  } catch (error) {
    dbContent =
      '[{"id":"V1StGXR8_Z5jdHi6B-myT","title": "Normandia","historicalPeriod": "II wojna światowa"}]';
  }
  const db = JSON.parse(dbContent) as Topic[];

  if (req.method === "DELETE") {
    const id = req.query.id as string;
    const indexToDelete = db.findIndex((topic) => topic.id === id);
    db.splice(indexToDelete, 1);
  } else if (req.method === "POST") {
    const topicDto = req.body as { title: string; historicalPeriod: string };
    db.push({ ...topicDto, id: nanoid() });
  } else if (req.method === "GET") {
    res.send({ topics: db });
  } else {
    res.send(400);
    throw new Error("Bad request");
  }

  const newDbContent = JSON.stringify(db);

  writeFileSync(path, newDbContent);

  res.send("success");
};

export default handler;
