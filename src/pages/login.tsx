import Head from "next/head";
import {
  Button,
  Input,
  Flex,
  Stack,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";

function Login() {
  return (
    <div>
      <Head>
        <title>HiStory</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack w="100%" px="128px" py="128px">
        <Flex flexDir="column" w="400px" mb="25px">
          <Text fontSize="54px" color="#b00909">
            HiStory
          </Text>
          <Text fontSize="16px" opacity="40%">
            Historia pisze się sama
          </Text>
        </Flex>
        <Flex w="300px">
          <Image src="soldier.png" alt="soldier" />
        </Flex>

        <Flex justifyContent="space-between">
          <Stack spacing="10px">
            <Input placeholder="login" />
            <Input placeholder="hasło" />

            <Button>zaloguj</Button>
          </Stack>
          <Flex
            w="300px"
            alignSelf="flex-end"
            justifySelf="flex-end"
            flexDir="column"
          >
            <Text opacity="40%" mb="5px" alignSelf="center">
              Projekt możliwy dzięki
            </Text>
            <Link href="https://ipn.gov.pl" isExternal>
              <Image src="ipn.jpg" alt="soldier" />
            </Link>
          </Flex>
        </Flex>
      </Stack>
    </div>
  );
}

export default Login;
