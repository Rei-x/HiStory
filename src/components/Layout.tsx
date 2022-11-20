import NextLink from "next/link";
import { Container, Flex, HStack, Link, Text, Image } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Logo } from "./Logo";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Flex justifyContent="space-between" mx="auto" mt={8} maxW="container.lg">
        <Flex mr="auto" w="150px">
          <Logo />
        </Flex>
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
