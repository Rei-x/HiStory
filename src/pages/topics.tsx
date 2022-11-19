import { Accordion, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { TopicAccordion } from "../components/Topic";
import { useTopics } from "../hooks/useTopics";

const Header = () => {
  return (
    <Flex mt="64px" alignItems="center" justifyContent="space-between">
      <Text fontSize="30px" fontWeight="800">
        Tematy
      </Text>
      <Input placeholder="szukaj" border="0px" w="400px" />
      <Button w="200px">dodaj nowy temat</Button>
    </Flex>
  );
};

const Body = () => {
  const dataTopics = useTopics();
  const topics = dataTopics.data?.topics;

  return (
    <Accordion allowMultiple>
      {topics?.map((topic) => (
        <TopicAccordion key={topic.id} topic={topic} />
      ))}
    </Accordion>
  );
};

const Topics = () => {
  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  );
};
export default Topics;
