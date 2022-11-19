import { Container, HStack, Link, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HStack mx="auto" mt={8} maxW="container.xl">
        <Text ml="32px" mr="auto" fontSize="36px" color="#b00909">
          HiStory
        </Text>
        <Link>Tematy</Link>
      </HStack>
      <Container pb={8} maxW="container.lg">
        {children}
      </Container>
    </div>
  );
};
