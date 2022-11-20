import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Spinner,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IPNResource } from "../../components/IPNResource";
import { Layout } from "../../components/Layout";
import { useSearch } from "../../hooks/useSearch";
import { useTextFromResource } from "../../hooks/useTextFromResource";
import { useTopics } from "../../hooks/useTopics";
import { useDebounce } from "use-debounce";

const Preview = ({ url, text }: { url: string; text?: string }) => {
  if (url.endsWith(".pdf")) {
    return (
      <embed
        src={`https://drive.google.com/viewerng/
viewer?embedded=true&url=${url}`}
        height="650"
        width="500"
        type="application/pdf"
      />
    );
  }

  if (typeof text === "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (text === "") {
    return (
      <Text textAlign={"center"} color="red">
        Brak tekstu na stronie
      </Text>
    );
  }

  return (
    <Center p={2}>
      <Text whiteSpace="pre-line">{`${text.trim() ?? ""}`}</Text>
    </Center>
  );
};

const Quiz = () => {
  const router = useRouter();
  const topicId = router.query.topicId as string | undefined;
  const { data } = useTopics();
  const topic = data?.topics.find((i) => i.id === topicId);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);

  useEffect(() => {
    if (topicId && topic) {
      setSearchText(topic.title);
    }
  }, [topicId, topic]);

  const searchQuery = useSearch(debouncedSearchText);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [resourceUrl, setResourceUrl] = useState("");
  const baseText = useTextFromResource(resourceUrl);
  const modal = useDisclosure();
  const toast = useToast();

  return (
    <Layout>
      <Modal size="xl" isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{searchText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box shadow="md" h="700px" overflowY="scroll">
              <Preview text={baseText.data?.data} url={resourceUrl} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              mx="auto"
              colorScheme="blue"
              onClick={() => {
                if (
                  baseText.data?.data === "" ||
                  typeof baseText.data?.data === "undefined"
                ) {
                  toast({
                    title: "Niepoprawny zasób",
                    status: "error",
                    description: "Materiał źródłowy nie może być pusty.",
                  });

                  return;
                }

                router.push({
                  pathname: "/quiz/nowy",
                  query: {
                    url: resourceUrl,
                    numberOfQuestions,
                    topicId,
                  },
                });
              }}
            >
              Wybierz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.lg" pt={8}>
        <Heading>Wybierz źródło</Heading>
        <Tooltip label="Ilość pytań może być mniejsza niż wpisana">
          <FormLabel mt={4} width="300px">
            Ilość pytań*
            <Input
              type="number"
              value={numberOfQuestions}
              onChange={(e) => {
                const number = parseInt(e.target.value);

                setNumberOfQuestions(number);
              }}
            />
          </FormLabel>
        </Tooltip>
        <HStack mt={1} w="200px" justifyContent="space-between">
          <Text>Pytaj o wydarzenia</Text>
          <Switch colorScheme="red" defaultChecked={true} />
        </HStack>
        <HStack mt={1} w="200px" justifyContent="space-between">
          <Text>Pytaj o osoby</Text>
          <Switch colorScheme="red" defaultChecked={true} />
        </HStack>
        <HStack mt={1} w="200px" justifyContent="space-between">
          <Text>Pytaj o daty</Text>
          <Switch colorScheme="red" defaultChecked={true} />
        </HStack>
        <FormLabel mt={4} width="300px">
          Wyszukaj frazę w bazie IPN.
          <Input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </FormLabel>
        <VStack mt="4">
          {searchQuery?.data?.results
            ? searchQuery.data.results.map((resource) => (
                <IPNResource
                  onPreview={() => {
                    setResourceUrl(resource.url);
                    modal.onOpen();
                  }}
                  onSelect={(url) => {
                    if (
                      baseText.data?.data === "" ||
                      typeof baseText.data?.data === "undefined"
                    ) {
                      toast({
                        title: "Niepoprawny zasób",
                        status: "error",
                        description: "Materiał źródłowy nie może być pusty.",
                      });

                      return;
                    }

                    setResourceUrl(resource.url);
                    modal.onClose();

                    router.push({
                      pathname: "/quiz/nowy",
                      query: {
                        url: resource.url,
                        numberOfQuestions,
                        topicId,
                      },
                    });
                  }}
                  key={resource.url}
                  {...resource}
                />
              ))
            : null}
          {searchQuery.data?.resultsCount === 0 &&
          debouncedSearchText !== "" ? (
            <Text>Brak wyników :(</Text>
          ) : null}
          {searchQuery.data?.resultsCount === 0 &&
          debouncedSearchText === "" ? (
            <Text>Wpisz coś w wyszukiwarkę, żeby zobaczyć źródła!</Text>
          ) : null}
          {searchQuery.isLoading ? (
            <Box w="100%">
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
              <SkeletonText mt="12" noOfLines={4} spacing="4" />
              <SkeletonText mt="12" noOfLines={4} spacing="4" />
              <SkeletonText mt="12" noOfLines={4} spacing="4" />
            </Box>
          ) : null}
        </VStack>
      </Container>
    </Layout>
  );
};

export default Quiz;
