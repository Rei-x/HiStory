import {
  HStack,
  Input,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Text,
  UnorderedList,
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
        name={`question${questionNumber}`}
        fontSize="lg"
        variant="outline"
        defaultValue={question}
      />
      <VStack rowGap={4} spacing={4} alignItems="flex-start">
        <RadioGroup
          defaultValue={correctAnswer}
          name={`question${questionNumber}.correctAnswer`}
        >
          {answers.map((answer, index) => (
            <HStack mt={2} ml={4} key={answer}>
              <Radio value={answer} />
              <Input
                name={`question${questionNumber}.answer.${index + 1}`}
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
