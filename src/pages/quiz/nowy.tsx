import {
  Button,
  Center,
  Code,
  Container,
  Heading,
  List,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../../components/Layout";
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
    <Layout>
      <Heading>Quiz</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const questions = []
          console.log(e.currentTarget);
          Object.entries((e.target as any).elements).forEach(
            ([name, element]) => {
              
              console.log(name, element.name);
            }
          );
        }}
      >
        <OrderedList mt={4} spacing={4}>
          {data?.questions?.map((question, index) => (
            <ListItem key={question.question}>
              <Question
                questionNumber={index + 1}
                answers={question.answers}
                question={question.question}
                correctAnswer={question.correctAnswer}
              />
            </ListItem>
          ))}
        </OrderedList>
        <Center>
          <Button mx="auto" mt={4} type="submit">
            Zapisz quiz
          </Button>
        </Center>
      </form>
    </Layout>
  );
};

export default Quiz;
