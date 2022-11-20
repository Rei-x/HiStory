import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  Text,
  useDisclosure,
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
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [resourceUrl, setResourceUrl] = useState("");
  const baseText = useTextFromResource(resourceUrl);
  const modal = useDisclosure();

  return (
    <Layout>
      <Modal size="xl" isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{searchText}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{baseText.data?.data}</ModalBody>
          <ModalFooter>
            <Button
              mx="auto"
              colorScheme="blue"
              onClick={() => {
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
        <FormLabel mt={4} width="300px">
          Ilość pytań
          <Input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => {
              const number = parseInt(e.target.value);

              setNumberOfQuestions(number);
            }}
          />
        </FormLabel>
        <FormLabel width="300px">
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
          {searchQuery.data?.resultsCount === 0 ? (
            <Text>Brak wyników :(</Text>
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
