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
}: {
  numberOfQuestions: 1 | 2 | 3 | 4;
  baseText: string;
}) => {
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

  console.log(
    "{" +
      completion.data.choices[0].text
        ?.replaceAll("\n", "")
        .replaceAll("\t", "") +
      "}"
  );

  try {
    const choice = JSON.parse(
      fixJSON(
        "{" +
          completion.data.choices[0].text
            ?.replaceAll("\n", "")
            .replaceAll("\t", "") +
          "}"
      )
    ) as QuizData;

    console.log(choice);

    return choice;
  } catch {
    return undefined;
  }
};
