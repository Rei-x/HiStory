import { Button, Code, FormLabel, Heading, Input } from "@chakra-ui/react";
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
    <div>
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

      <div>{baseText}</div>
      <div>{numberOfQuestions}</div>
    </div>
  );
};

export default Quiz;
