import {
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const Question = ({
  questionNumber,
  question,
  answers,
  correctAnswer,
}: {
  questionNumber: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}) => {
  return (
    <Stack>
      <Input
        name={`questions[${questionNumber}].question`}
        fontSize="lg"
        variant="outline"
        defaultValue={question}
      />
      <VStack rowGap={4} spacing={4} alignItems="flex-start">
        <RadioGroup
          w="100%"
          defaultValue={correctAnswer}
          name={`questions[${questionNumber}].correctAnswer`}
        >
          {answers.map((answer, index) => (
            <HStack mt={2} ml={4} key={answer}>
              <Radio value={answer} />
              <Input
                minW="400px"
                w="100%"
                name={`questions[${questionNumber}].answers[${index}]`}
                variant="outline"
                defaultValue={answer}
              />
            </HStack>
          ))}
        </RadioGroup>
      </VStack>
    </Stack>
  );
};
