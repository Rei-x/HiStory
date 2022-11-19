import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
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
  const data = dataTopics.data?.topics;
  console.log(dataTopics);

  return (
    <Stack>
      {data?.map((data) => (
        <Flex justifyContent="space-between" key={data.id} mt="50px">
          <Text>{data.title}</Text>
          <Text>{data.historicalPeriod}</Text>
          {/* <Text>{data.title}</Text> */}
          <Text>ilość quizów</Text>
        </Flex>
      ))}
    </Stack>
  );
};

const Topics = () => {
  return (
    <Stack mx="128px">
      <Header />
      <Body />
    </Stack>
  );
};

export default Topics;
