import {
  Button,
  Code,
  Container,
  Heading,
  List,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Question } from "../../components/Question";
import { useGenerateQuiz } from "../../hooks/useGenerateQuiz";
import { useTextFromResource } from "../../hooks/useTextFromResource";

const Quiz = () => {
  const { query } = useRouter();
  const baseText = useTextFromResource(query.url as string);
  const { fetchData, data, loading } = useGenerateQuiz({
    baseText: baseText.data?.data ?? "",
    numberOfQuestions:
      (parseInt(query.numberOfQuestions as string) as any as 1) ?? 1,
  });

  useEffect(() => {
    if (
      typeof baseText.data?.data === "string" &&
      typeof query.numberOfQuestions === "string"
    ) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseText.data?.data, query.numberOfQuestions]);

  return (
    <Container mt={8} maxW="container.lg">
      <Heading>Quiz</Heading>
      <OrderedList>
        {data?.questions?.map((question) => (
          <ListItem key={question.question}>
            <Question answers={question.answers} question={question.question} />
          </ListItem>
        ))}
      </OrderedList>
    </Container>
  );
};

export default Quiz;
