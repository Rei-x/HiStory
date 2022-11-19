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

const TopicFormView = () => {
  const [title, setTitle] = useState("");
  const [historicalPeriod, setHistoricalPeriod] = useState("");
  const toast = useToast();
  const router = useRouter();

  const submitTopic = async (topic: {
    title: string;
    historicalPeriod: string;
  }) => {
    await fetch("/api/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(topic),
    });
    toast({ title: "Pomyślnie dodano temat" });
    router.push("/topics");
  };

  return (
    <Stack spacing={4} maxW="400px" m={4}>
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
    </Stack>
  );
};
export default TopicFormView;
