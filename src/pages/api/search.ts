// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";
import { SearchResponse } from "../../types/searchResponse";

// przyjmuje tekst do szukania i zwraca linki do zasobów
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  const searchPhrase = (req.query.searchPhrase ?? "wojna") as string;

  const url = `https://szukaj.ipn.gov.pl/search?q=${searchPhrase}&site=&btnG=Szukaj&client=default_frontend&output=xml_no_dtd&proxystylesheet=default_frontend&sort=date%3AD%3AL%3Ad1&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&tlen=200&size=250`;

  const response = await fetch(url);
  const body = await response.text();

  const dom = new JSDOM(body);

  // console.log({ url }, dom.serialize());
  const results = dom.window.document.querySelectorAll(".res-item");
  const mappedResults = Array.from(results).map((result) => {
    const title = result.querySelector("a")?.textContent ?? "";
    const url = result.querySelector("a")?.href ?? "";

    return {
      url,
      title,
      description: (result.textContent ?? "")
        .replace(title, "")
        .replace(url, "")
        .replace("[PODGLĄD]", ""),
    };
  });

  res.send({
    resultsCount: results.length,
    results: mappedResults,
  });
}
