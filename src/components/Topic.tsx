import {
  Heading,
  AccordionButton,
  AccordionIcon,
  Tag,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  List,
  ListItem,
  Button,
  Link,
} from "@chakra-ui/react";
import { useQuiz } from "../hooks/useQuiz";
import { Topic } from "../pages/api/topics";
import NextLink from "next/link";

export const TopicAccordion = ({ topic }: { topic: Topic }) => {
  const { data } = useQuiz({ variables: { topicId: topic.id } });
  return (
    <AccordionItem>
      <Heading
        as="h2"
        fontSize="md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Text as="span" display="inline-block">
          {topic.title}
        </Text>
        <Flex display="inline-flex" mx={4} flexGrow={2}>
          <Tag display="inline-block">{topic.historicalPeriod}</Tag>
        </Flex>
        <Text as="span" display="inline-block" mr={2}>
          liczba quizów: {data?.quizes.length ?? 0}
        </Text>
        <AccordionButton width="auto" justifyItems="flex-end">
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel p={0} mb={4}>
        <List spacing={3}>
          {data?.quizes.map((quiz) => (
            <ListItem key={quiz.id}>
              <Link as={NextLink} href={`/quiz/pobierz?quizId=${quiz.id}`}>
                {quiz.title} (liczba pytań: {quiz.questions.length})
              </Link>
            </ListItem>
          ))}
        </List>
        <Button
          mx="auto"
          my={4}
          width="100%"
          maxW="300px"
          as={NextLink}
          href={`/quiz/?topicId=${topic.id}`}
        >
          Utwórz quiz
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};
