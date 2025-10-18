import { Box, Container, Text, Stack, Link, Flex } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="gray.50" mt="auto">
      <Container maxW="container.xl" py={8}>
        <Stack gap={4}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text fontSize="sm" color="gray.600">
              © 2025 MyApp. Все права защищены.
            </Text>
            <Stack direction="row" gap={6}>
              <Link href="#" fontSize="sm" color="gray.600" _hover={{ color: 'blue.500' }}>
                Конфиденциальность
              </Link>
              <Link href="#" fontSize="sm" color="gray.600" _hover={{ color: 'blue.500' }}>
                Условия использования
              </Link>
              <Link href="#" fontSize="sm" color="gray.600" _hover={{ color: 'blue.500' }}>
                Контакты
              </Link>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};
