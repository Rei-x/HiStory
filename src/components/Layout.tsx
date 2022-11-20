import { Container, Flex, Link, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import NextLink from "next/link";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Flex justifyContent="space-between" mx="auto" mt={8} maxW="container.lg">
        <Text fontSize="36px" color="#b00909">
          HiStory
        </Text>
        <Link as={NextLink} href="/topics">
          Tematy
        </Link>
      </Flex>
      <Container maxW="container.lg" p={0} py={8}>
        {children}
      </Container>
    </div>
  );
};
