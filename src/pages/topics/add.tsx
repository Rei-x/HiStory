import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { addTopic } from "../../api/addTopic";
import { Layout } from "../../components/Layout";

const TopicFormView = () => {
  const [title, setTitle] = useState("");
  const [historicalPeriod, setHistoricalPeriod] = useState("");
  const toast = useToast();
  const router = useRouter();

  const submitTopic = async (topic: {
    title: string;
    historicalPeriod: string;
  }) => {
    await addTopic({
      title: topic.title,
      historicalPeriod: topic.historicalPeriod,
    });
    toast({ title: "Pomyślnie dodano temat", status: "success" });
    router.push("/topics");
  };

  return (
    <Layout>
      <Heading>Dodaj nowy temat</Heading>
      <FormControl>
        <FormLabel>Nazwa tematu</FormLabel>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Okres historyczny tematu</FormLabel>
        <Input
          value={historicalPeriod}
          onChange={({ target }) => setHistoricalPeriod(target.value)}
        />
      </FormControl>
      <Button onClick={() => submitTopic({ title, historicalPeriod })}>
        Dodaj
      </Button>
    </Layout>
  );
};
export default TopicFormView;
