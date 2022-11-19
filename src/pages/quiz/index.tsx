import {
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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IPNResource } from "../../components/IPNResource";
import { useSearch } from "../../hooks/useSearch";
import { useTextFromResource } from "../../hooks/useTextFromResource";

const Quiz = () => {
  const [searchText, setSearchText] = useState("");
  const searchQuery = useSearch(searchText);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [resourceUrl, setResourceUrl] = useState("");
  const baseText = useTextFromResource(resourceUrl);
  const router = useRouter();
  const modal = useDisclosure();

  return (
    <>
      <Modal size="xl" isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{baseText.data?.data}</ModalBody>
          <ModalFooter>
            <Button
              mx="auto"
              colorScheme="blue"
              onClick={() => {
                router.push("/quiz/nowy", {
                  pathname: "/quiz/nowy",
                  query: { url: "https:google", numberOfQuestions: 1 },
                });
              }}
            >
              Wybierz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container maxW="container.lg" pt={8}>
        <Heading>Nowy Quiz</Heading>
        <FormLabel mt={4} width="300px">
          Ilość pytań
          <Input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => {
              const number = parseInt(e.target.value);

              if (number !== NaN) {
                setNumberOfQuestions(number);
              }
            }}
          />
        </FormLabel>
        <FormLabel width="300px">
          Wyszukaj frazę w bazie IPN.
          <Input
            type="text"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </FormLabel>
        <VStack>
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
                      query: { url: resource.url, numberOfQuestions },
                    });
                  }}
                  key={resource.url}
                  {...resource}
                />
              ))
            : null}
        </VStack>
      </Container>
    </>
  );
};

export default Quiz;
