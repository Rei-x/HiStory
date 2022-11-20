import { Button, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { saveAs } from "file-saver";
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

import {
  Document as DocxDocument,
  Header,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
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

const generateDocxQuiz = (quiz: QuizData) => {
  return new DocxDocument({
    sections: [
      {
        headers: {
          default: new Header({
            children: [new Paragraph(quiz.title)],
          }),
        },
        properties: {},
        children: [
          ...quiz.questions.flatMap(({ question, answers }, index) => [
            new Paragraph({
              children: [
                new TextRun({ text: index > 0 ? "\n" + question : question }),
              ],
            }),
            new Paragraph({
              children: [
                ...answers.map(
                  (answer, index) =>
                    new TextRun({
                      text: `${index + 1}. ${answer}`,
                      break: 1,
                    })
                ),
              ],
            }),
          ]),
        ],
      },
    ],
  });
};

const Pobierz = () => {
  const router = useRouter();
  const { data } = useQuiz();
  const quizId = router.query.quizId as string;

  const quiz = data?.quizes.find((q) => q.id === quizId);

  const [downloadLink, setDownloadLink] = useState(false);
  const [docxDoc, setDocxDoc] = useState<any>(null);

  useEffect(() => {
    Font.register({
      family: "OpenSans",
      src: "/OpenSans-Regular.ttf",
    });
    Font.register({
      family: "OpenSans-Bold",
      src: "/OpenSans-Bold.ttf",
    });

    if (quiz) {
      setDocxDoc(generateDocxQuiz(quiz));
    }

    setDownloadLink(true);
  }, [quiz]);

  return (
    <Layout>
      <Stack spacing={8}>
        <Heading>{quiz?.title}</Heading>
        {quiz?.resourceUrl ? (
          <Link
            target="_blank"
            mt={2}
            color="gray"
            href={quiz.resourceUrl as string}
          >
            {quiz.resourceUrl}
          </Link>
        ) : (
          <Text mt={2} color="gray">
            Quiz wygenerowano bez materiału
          </Text>
        )}
        {downloadLink && quiz ? (
          <Stack direction="row">
            <Button as={PDFDownloadLink} document={<QuizPDF quiz={quiz} />}>
              Pobierz PDF z quizem
            </Button>

            <Button
              onClick={() => {
                if (docxDoc) {
                  Packer.toBlob(docxDoc).then((blob) => {
                    saveAs(blob, `${quiz.title}.docx`);
                  });
                }
              }}
            >
              Pobierz plik .docx
            </Button>
          </Stack>
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
