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
  Select,
  SkeletonText,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
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
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData, data, loading } = useGenerateQuiz({
    baseText: baseText.data?.data ?? "",
    numberOfQuestions:
      (parseInt(query.numberOfQuestions as string) as any as 1) ?? 1,
  });

  useEffect(() => {
    if (
      typeof baseText.data?.data === "string" &&
      typeof query.numberOfQuestions === "string" &&
      isLoading === false
    ) {
      setIsLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseText.data?.data, query.numberOfQuestions]);

  const toast = useToast();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("medium");

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
      <FormControl my={4}>
        <FormLabel>Trudność quizu</FormLabel>
        <Select
          borderColor="#b00909"
          borderRadius={0}
          borderWidth={2}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {[
            { value: "easy", label: "Łatwy" },
            { value: "medium", label: "Średni" },
            { value: "hard", label: "Trudny" },
          ].map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormControl>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const questions = {} as any;

          Object.values((e.target as any).elements).forEach((element: any) => {
            if (element.name === "") {
              return;
            }
            if (element.name.includes("correctAnswer")) {
              if (element.checked) {
                set(questions, element.name, element.value);
              } else {
                return;
              }
            }

            set(questions, element.name, element.value);
          });

          console.log(questions);

          addQuiz({
            title,
            level,
            resourceUrl: query.url as string,
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
          {data?.questions.length === 0 ? (
            <VStack textAlign={"center"}>
              <Text textAlign="center">
                Niestety na podstawie tego zasobu nie udało się wygenerować
                pytań, spróbuj ponownie z innym!
              </Text>
              <Link
                textAlign="center"
                color="gray"
                as={NextLink}
                href={`/quiz?topicId=${query.topicId}`}
              >
                wróc do wybierania tekstu
              </Link>
            </VStack>
          ) : null}
          {data?.questions &&
          ((data?.questions.length <
            parseInt(query.numberOfQuestions as string)) as any as 1) ? (
            <VStack textAlign={"center"}>
              <Text textAlign="center">
                Nie udało się wygenerować wszystkich pytań, możesz spróbować z
                innym zasobem.
              </Text>
              <Link
                textAlign="center"
                color="gray"
                as={NextLink}
                href={`/quiz?topicId=${query.topicId}`}
              >
                wróc do wybierania tekstu
              </Link>
            </VStack>
          ) : null}
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
        {loading ? (
          <Box w="100%">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
            <SkeletonText mt="12" noOfLines={4} spacing="4" />
          </Box>
        ) : data?.questions && data?.questions.length !== 0 ? (
          <Center>
            <Button
              variant="outline"
              mt={4}
              mr={3}
              onClick={() => {
                router.reload();
              }}
            >
              Wygeneruj ponownie
            </Button>
            <Button mt={4} type="submit">
              Zapisz quiz
            </Button>
          </Center>
        ) : null}
      </form>
    </Layout>
  );
};

export default Quiz;
