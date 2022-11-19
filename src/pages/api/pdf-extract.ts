import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { Readable } from "stream";
var extract = require("pdf-text-extract");

const responseToReadable = (response: Response) => {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("test");
  }
  const rs = new Readable();
  rs._read = async () => {
    const result = await reader.read();
    if (!result.done) {
      rs.push(Buffer.from(result.value));
    } else {
      rs.push(null);
      return;
    }
  };
  return rs;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const url = (req.query.url ??
    "https://hackyeah.pl/wp-content/uploads/2022/11/Regulamin-Konkursu-2022AP-en.pdf") as string;
  const path = `/tmp/history/document.pdf`;
  const fileStream = fs.createWriteStream(path);
  const response = await fetch(url);
  const responseStream = responseToReadable(response);
  await new Promise((resolve, reject) => {
    responseStream?.pipe(fileStream);
    responseStream?.on("error", reject);
    fileStream.on("finish", resolve);
  });

  const pages = (await new Promise((res, rej) =>
    extract(path, function (err: any, pages: unknown) {
      if (err) {
        rej();
      }
      res(pages);
    })
  )) as any as string[];

  res.send({ data: pages.join("\n\n\n") });
}
