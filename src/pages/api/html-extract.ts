// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

// przyjmuje tekst do szukania i zwraca linki do zasobów
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const url = (req.query.url ?? "https://alergeek.ventures/o-nas") as string;

  const response = await fetch(url);
  const body = await response.text();

  const dom = new JSDOM(body);

  const paragaraphNodes = dom.window.document.querySelectorAll("p");
  const paragraphs = Array.from(paragaraphNodes).map(
    (result) => result.textContent ?? ""
  );

  res.send({
    data: paragraphs.join("\n\n\n")
  });
}
