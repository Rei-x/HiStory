import {
  Button,
  Divider,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const IPNResource = ({
  title,
  url,
  description,
  onPreview,
  onSelect,
}: {
  title: string;
  url: string;
  description: string;
  onPreview?: (url: string) => void;
  onSelect?: (url: string) => void;
}) => {
  return (
    <Stack width="100%" mb={4}>
      <HStack width="100%">
        <VStack width="100%" textAlign="left" alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Link color="gray" fontSize="sm" href={url}>
            {url}
          </Link>
          <Text size="sm">{description}</Text>
        </VStack>
        <VStack>
          <Button variant="outline" onClick={() => onPreview?.(url)}>
            Podgląd
          </Button>
          <Button onClick={() => onSelect?.(url)}>Wybierz</Button>
        </VStack>
      </HStack>
      <Divider />
    </Stack>
  );
};
