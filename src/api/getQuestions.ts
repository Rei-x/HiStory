import { Configuration, OpenAIApi } from "openai";
import { QuizData } from "../types/quizData";
import fixJSON from "jsonrepair";

const convertNumberToText = (number: 1 | 2 | 3 | 4) => {
  const numbers = {
    1: "jedno pytanie",
    2: "dwa pytania",
    3: "trzy pytania",
    4: "cztery pytania",
  };

  return numbers[number];
};

const createPrompt = ({
  baseText,
  numberOfQuestions,
}: {
  baseText: string;
  numberOfQuestions: 1 | 2 | 3 | 4;
}) => {
  return `
  Wygeneruj quiz w formacie JSON na podstawie tekstu, który ma dokładnie ${convertNumberToText(
    numberOfQuestions
  )} i każde ma po 4 odpowiedzi. Na końcu każdego pytania wypisz poprawną odpowiedź.
  ---
  { "questions": [{
  "question": "Pytanie",
  "answers": ["odpowiedź a", "odpowiedź b", "odpowiedź c", "odpowiedź d"],
  "correctAnswer": "odpowiedź a",
  }]}
  ---
  ${baseText}
  ---
  {
  `;
};

export const getQuestions = async ({
  numberOfQuestions,
  baseText,
  mock,
}: {
  numberOfQuestions: 1 | 2 | 3 | 4;
  baseText: string;
  mock?: boolean;
}) => {
  if (mock) {
    return JSON.parse(
      '{"questions":[{"question":"Jak nazywał się konflikt polsko-bolszewicki?","answers":["Wojna polsko-bolszewicka","Wojna polsko-niemiecka","Wojna polsko-rosyjska","Wojna polsko-austriacka"],"correctAnswer":"Wojna polsko-bolszewicka"},{"question":"Dlaczego wojska bolszewickie zajęły Wilno?","answers":["Było to miasto polskie","Było to miasto bolszewickie","Było to miasto niemieckie","Było to miasto radzieckie"],"correctAnswer":"Było to miasto polskie"},{"question":"Kiedy rozpoczęła się wojna polsko-rosyjska?","answers":["7 lutego 1919 r.","14 lutego 1919 r.","21 lutego 1919 r.","1 marca 1919 r."],"correctAnswer":"7 lutego 1919 r."},{"question":"W którym mieście doszło do pierwszych walk?","answers":["Tyraspol","Mosty","Kobryn","Skidl"],"correctAnswer":"Tyraspol"},{"question":"Ile żołnierzy utraciły oddziały Wojska Polskiego w wyniku działań wojennych w latach 1918–1920?","answers":["251 tys.","37,5 tys.","50,7 tys.","Ranni"],"correctAnswer":"251 tys."}]}'
    );
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: createPrompt({
      numberOfQuestions: (numberOfQuestions as 1) ?? 1,
      baseText,
    }),
    suffix: "}",
    stop: "---",
    temperature: 0.1,
    top_p: 0.1,
    max_tokens: baseText.length * 2 < 2048 ? baseText.length * 2 : 2560,
  });

  try {
    const choice = JSON.parse(
      fixJSON(
        "{" +
          completion.data.choices[0].text
            ?.replaceAll("\n", "")
            .replaceAll("\t", "")
            .replaceAll('\\"', '"') +
          "}"
      )
    ) as QuizData;

    return choice;
  } catch {
    try {
      const choice = JSON.parse(
        fixJSON(
          "{" +
            completion.data.choices[0].text
              ?.replaceAll("\n", "")
              .replaceAll("\t", "")
              .replaceAll('\\"', '"')
        )
      ) as QuizData;

      return choice;
    } catch {
      console.log("ERROR");
      console.log(completion.data);
      return undefined;
    }
  }
};
