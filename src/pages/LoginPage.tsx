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
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { apiService } from '../services/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.login(formData);
      navigate('/profile');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка входа. Проверьте email и пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50" py={20}>
      <Container maxW="md">
        <Box bg="white" p={8} rounded="xl" shadow="lg">
          <Stack gap={6}>
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
                Вход в аккаунт
              </Heading>
              <Text color="gray.600">
                Добро пожаловать! Войдите, чтобы продолжить
              </Text>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Email
                  </Text>
                  <Flex align="center" gap={2} bg="gray.50" p={3} rounded="md" border="1px" borderColor="gray.200">
                    <Box color="gray.500">
                      <FiMail />
                    </Box>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      border="none"
                      bg="transparent"
                      p={0}
                      _focus={{ outline: 'none' }}
                    />
                  </Flex>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Пароль
                  </Text>
                  <Flex align="center" gap={2} bg="gray.50" p={3} rounded="md" border="1px" borderColor="gray.200">
                    <Box color="gray.500">
                      <FiLock />
                    </Box>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      border="none"
                      bg="transparent"
                      p={0}
                      _focus={{ outline: 'none' }}
                    />
                  </Flex>
                </Box>

                <Flex justify="space-between" align="center">
                  <Box />
                  <Link to="/forgot-password">
                    <ChakraLink
                      fontSize="sm"
                      color="blue.500"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      Забыли пароль?
                    </ChakraLink>
                  </Link>
                </Flex>

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                  mt={2}
                  loading={isLoading}
                >
                  Войти
                </Button>
              </Stack>
            </form>

            {/* Sign Up Link */}
            <Box textAlign="center" pt={4} borderTop="1px" borderColor="gray.200">
              <Text color="gray.600">
                Нет аккаунта?{' '}
                <Link to="/register">
                  <ChakraLink
                    color="blue.500"
                    fontWeight="semibold"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Зарегистрироваться
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
