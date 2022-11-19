import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
var pdfExtract = require("pdf-extract");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const url = (req.query.url ??
    "https://docs.google.com/gview?url=https://kop.ipn.gov.pl/kop/historia/7924,A-wiec-wojna.pdf&embedded=true") as string;
  const path = `/tmp/history/document.pdf`;
  const fileStream = fs.createWriteStream(path);
  const response = await fetch(url);
  const responseStream = response.body?.getReader();
  await new Promise((resolve, reject) => {
    responseStream?.pipe(fileStream);
    responseStream?.on("error", reject);
    fileStream.on("finish", resolve);
  });

  const processor = pdfExtract(path);
  processor.on("success", (content) => {
    console.log(content);
    res.send("success");
  });
}
