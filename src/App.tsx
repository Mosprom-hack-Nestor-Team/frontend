import React from "react";
import { Box, Button, Container, Heading, Text, Stack } from "@chakra-ui/react";

export default function App() {
  return (
    <Container maxW="container.md" py={12}>
      <Stack spacing={8} align="center">
        <Heading as="h1" size="xl">Chakra UI — готово</Heading>
        <Text>Быстрое переключение интерфейсной библиотеки для MVP.</Text>

        <Box>
          <Button colorScheme="teal" mr={3}>Primary</Button>
          <Button variant="outline">Secondary</Button>
        </Box>
      </Stack>
    </Container>
  );
}
