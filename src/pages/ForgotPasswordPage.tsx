import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Input,
  Button,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки письма для восстановления пароля
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50" py={20}>
      <Container maxW="md">
        <Box bg="white" p={8} rounded="xl" shadow="lg">
          <Stack gap={6}>
            {/* Back Link */}
            <Link to="/login">
              <Flex align="center" gap={2} color="blue.500" _hover={{ color: 'blue.600' }}>
                <FiArrowLeft />
                <Text fontSize="sm">Вернуться ко входу</Text>
              </Flex>
            </Link>

            {/* Header */}
            <Box textAlign="center">
              <Heading
                fontSize="3xl"
                bgGradient="to-r"
                gradientFrom="blue.400"
                gradientTo="purple.500"
                bgClip="text"
                mb={2}
              >
                Восстановление пароля
              </Heading>
              <Text color="gray.600">
                {isSubmitted
                  ? 'Проверьте свою почту'
                  : 'Введите email для восстановления доступа'}
              </Text>
            </Box>

            {isSubmitted ? (
              /* Success Message */
              <Box bg="green.50" p={4} rounded="md" borderWidth="1px" borderColor="green.200">
                <Text color="green.800" textAlign="center">
                  Письмо с инструкциями по восстановлению пароля отправлено на{' '}
                  <strong>{email}</strong>
                </Text>
              </Box>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Email
                    </Text>
                    <Flex
                      align="center"
                      gap={2}
                      bg="gray.50"
                      p={3}
                      rounded="md"
                      border="1px"
                      borderColor="gray.200"
                    >
                      <Box color="gray.500">
                        <FiMail />
                      </Box>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        border="none"
                        bg="transparent"
                        p={0}
                        _focus={{ outline: 'none' }}
                      />
                    </Flex>
                  </Box>

                  <Button type="submit" colorPalette="blue" size="lg" w="full" mt={2}>
                    Отправить инструкции
                  </Button>
                </Stack>
              </form>
            )}

            {/* Additional Info */}
            <Box textAlign="center" pt={4} borderTop="1px" borderColor="gray.200">
              <Text fontSize="sm" color="gray.600">
                Вспомнили пароль?{' '}
                <Link to="/login">
                  <ChakraLink
                    color="blue.500"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Войти
                  </ChakraLink>
                </Link>
              </Text>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
