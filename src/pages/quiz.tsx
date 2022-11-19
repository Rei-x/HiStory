import {
  Button,
  Code,
  Container,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGenerateQuiz } from "../hooks/useGenerateQuiz";

const Quiz = () => {
  const [baseText, setBaseText] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const { fetchData, data, loading } = useGenerateQuiz({
    baseText,
    numberOfQuestions,
  });
  return (
    <Container maxW="container.lg" pt={8}>
      <Heading>Wygeneruj quiz</Heading>
      <Button
        onClick={() => {
          fetchData();
        }}
        isLoading={loading}
      >
        Generuj
      </Button>
      <FormLabel>
        Tekst na którego podstawie wygenerowany zostanie quiz
        <Input
          type="text"
          value={baseText}
          onChange={(e) => {
            setBaseText(e.target.value);
          }}
        />
      </FormLabel>
      <FormLabel>
        <Input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => {
            setNumberOfQuestions(parseInt(e.target.value));
          }}
        />
      </FormLabel>
      <Code>{JSON.stringify(data)}</Code>
      {data?.questions ? (
        <div>
          <ol>
            {data.questions.map((question) => (
              <li key={question.question}>
                {question.question}
                <ul>
                  {question.answers.map((answer) => (
                    <li key={answer}>{answer}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </Container>
  );
};

export default Quiz;
