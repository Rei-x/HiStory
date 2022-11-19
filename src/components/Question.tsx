import { List, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

export const Question = ({
  question,
  answers,
}: {
  question: string;
  answers: string[];
}) => {
  return (
    <Stack>
      <Text>{question}</Text>
      <UnorderedList>
        {answers.map((answer) => (
          <ListItem key={answer}>{answer}</ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
};
