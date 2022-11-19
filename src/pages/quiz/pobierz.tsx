import { Code, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useQuiz } from "../../hooks/useQuiz";

const Pobierz = () => {
  const router = useRouter();
  const { data, isLoading } = useQuiz({
    variables: {
      topicId: router.query.topicId as string,
    },
  });

  const quiz = data?.quizes[0];

  return (
    <Layout>
      <Code>{JSON.stringify(data?.quizes)}</Code>
    </Layout>
  );
};

export default Pobierz;
