import {
  Box,
  Button,
  Center,
  Code,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  List,
  ListItem,
  OrderedList,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Question } from "../../components/Question";
import { useGenerateQuiz } from "../../hooks/useGenerateQuiz";
import { useTextFromResource } from "../../hooks/useTextFromResource";
import set from "lodash/set";
import { addQuiz } from "../../api/addQuiz";

const Quiz = () => {
  const { query, ...router } = useRouter();
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

  const toast = useToast();
  const [title, setTitle] = useState("");

  return (
    <Layout>
      <Heading>Quiz</Heading>
      <FormControl>
        <FormLabel>Tytuł quizu</FormLabel>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </FormControl>
      <Link target="_blank" mt={2} color="gray" href={query.url as string}>
        {query.url}
      </Link>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const questions = {} as any;

          Object.values((e.target as any).elements).forEach((element: any) => {
            if (element.name === "") {
              return;
            }
            set(questions, element.name, element.value);
          });

          addQuiz({
            title,
            questions: questions.questions,
            topicId: query.topicId as string,
          })
            .then(async (quizId) => {
              toast({
                title: "Sukces",
                status: "success",
                description: "Udało się zapisać quiz!",
              });

              router.push({
                pathname: "/quiz/pobierz",
                query: {
                  quizId,
                },
              });
            })
            .catch(() => {
              toast({
                title: "Błąd",
                status: "error",
                description: "Nie udało się zapisać quizu :(",
              });
            });
        }}
      >
        <OrderedList mt={4} spacing={4}>
          {data?.questions?.map((question, index) => (
            <ListItem key={question.question}>
              <Question
                questionNumber={index}
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
        {loading ? (
          <Box w="100%">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
          </Box>
        ) : null}
      </form>
    </Layout>
  );
};

export default Quiz;
