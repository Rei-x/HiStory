import Head from "next/head";
import { Button, Input, Flex, Stack, Text, Image } from "@chakra-ui/react";

function Login() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
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

        <Stack spacing="10px">
          <Input
            placeholder="login"
            focusBorderColor="#b00909"
            w="300px"
            color="#b00909"
            fontWeight="800"
            border="2px"
          ></Input>
          <Input
            placeholder="hasło"
            focusBorderColor="#b00909"
            w="300px"
            fontWeight="800"
            border="2px"
          ></Input>

          <Button
            w="300px"
            background="#b00909"
            color="white"
            _hover={{
              color: "#b00909",
              background: "white",
              border: "2px",
              borderColor: "#b00909",
            }}
            _active={{ background: "white", fontSize: "17px" }}
          >
            zaloguj
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export { Login };
