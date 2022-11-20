import { Accordion, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { TopicAccordion } from "../../components/Topic";
import { useTopics } from "../../hooks/useTopics";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../../components/Layout";

const Header = ({
  filter,
  onChange,
}: {
  filter: string;
  onChange: (x: string) => void;
}) => {
  return (
    <Flex mt="64px" mb={4} alignItems="center" justifyContent="space-between">
      <Text fontSize="30px" fontWeight="800">
        Tematy
      </Text>
      <Input
        placeholder="szukaj"
        w="400px"
        value={filter}
        onChange={({ target }) => onChange(target.value)}
      />
      <Button as={NextLink} href="/topics/add" w="200px">
        dodaj nowy temat
      </Button>
    </Flex>
  );
};

const Body = ({ filter }: { filter: string }) => {
  const dataTopics = useTopics();
  const topics = dataTopics.data?.topics.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <Accordion allowMultiple>
      {topics?.map((topic) => (
        <TopicAccordion key={topic.id} topic={topic} />
      ))}
    </Accordion>
  );
};

const Topics = () => {
  const [filter, setFilter] = useState("");
  return (
    <Layout>
      <Header filter={filter} onChange={(text) => setFilter(text)} />
      <Body filter={filter} />
    </Layout>
  );
};
export default Topics;
