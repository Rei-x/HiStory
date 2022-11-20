import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { useQuiz } from "../../hooks/useQuiz";

import {
  Page,
  Text as PDFText,
  View,
  Document,
  Font,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { QuizData } from "../../types/quizData";

const QuizPDF = ({ quiz }: { quiz: QuizData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff",
    },
    section: {
      fontFamily: "OpenSans",
      margin: 10,
      padding: 10,
      flexGrow: 1,
      justifyContent: "flex-start",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <PDFText
            style={{
              fontWeight: "bold",
              fontFamily: "OpenSans-Bold",
              fontSize: 48,
              marginBottom: 16,
            }}
          >
            {quiz.title}
          </PDFText>
          {quiz.questions.map(({ question, answers }) => (
            <View key={question} style={{ marginBottom: 8 }}>
              <PDFText
                style={{
                  fontWeight: "bold",
                  fontFamily: "OpenSans-Bold",
                  maxLines: 3,
                }}
              >
                {question}
              </PDFText>
              {answers.map((a, index) => (
                <PDFText key={a}>
                  {index + 1}. {a}
                </PDFText>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const Pobierz = () => {
  const router = useRouter();
  const { data } = useQuiz({ variables: {} });
  const quizId = router.query.quizId as string;

  const quiz = data?.quizes.find((q) => q.id === quizId);

  const [downloadLink, setDownloadLink] = useState(false);

  useEffect(() => {
    Font.register({
      family: "OpenSans",
      src: "/OpenSans-Regular.ttf",
    });
    Font.register({
      family: "OpenSans-Bold",
      src: "/OpenSans-Bold.ttf",
    });
    setDownloadLink(true);
  }, []);

  return (
    <Layout>
      <Stack spacing={8}>
        <Heading>{quiz?.title}</Heading>
        {downloadLink && quiz ? (
          <Button as={PDFDownloadLink} document={<QuizPDF quiz={quiz} />}>
            Pobierz PDF z quizem
          </Button>
        ) : null}

        <Heading as="h2" fontSize="xl">
          Poprawne odpowiedzi:
        </Heading>
        {quiz?.questions.map(({ question, correctAnswer }) => (
          <Stack key={question} style={{ marginBottom: 8 }}>
            <Heading as="h3" fontSize="md">
              {question}
            </Heading>
            <Text>{correctAnswer}</Text>
          </Stack>
        ))}
      </Stack>
    </Layout>
  );
};

export default Pobierz;
