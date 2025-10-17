import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDatabase, FiTrendingUp, FiUsers } from 'react-icons/fi';

const Feature = ({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) => {
  return (
    <Stack
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
      _hover={{ shadow: 'xl', transform: 'translateY(-4px)', transition: 'all 0.3s' }}
      gap={4}
    >
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="blue.500"
      >
        {icon}
      </Flex>
      <Heading size="md">
        {title}
      </Heading>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
};

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="blue.50"
        py={20}
        px={4}
      >
        <Container maxW="container.xl">
          <Stack gap={8} align="center" textAlign="center">
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              bgGradient="to-r"
              gradientFrom="blue.400"
              gradientTo="purple.500"
              bgClip="text"
            >
              Добро пожаловать в наше приложение
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              maxW="2xl"
            >
              Современное решение для управления данными и аналитики. 
              Простой интерфейс, мощные возможности.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
              <Button
                size="lg"
                colorScheme="blue"
                onClick={() => navigate('/dashboard')}
              >
                Перейти к Dashboard →
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="blue"
                onClick={() => navigate('/about')}
              >
                Узнать больше
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <Stack gap={12}>
          <Box textAlign="center">
            <Heading mb={4}>Наши возможности</Heading>
            <Text color="gray.600" fontSize="lg">
              Все что нужно для эффективной работы
            </Text>
          </Box>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap={8}
          >
            <Feature
              icon={<FiDatabase size={40} />}
              title="Управление данными"
              text="Эффективная работа с большими объемами данных и их структурирование"
            />
            <Feature
              icon={<FiTrendingUp size={40} />}
              title="Аналитика"
              text="Продвинутые инструменты для анализа и визуализации данных"
            />
            <Feature
              icon={<FiUsers size={40} />}
              title="Командная работа"
              text="Совместная работа в режиме реального времени"
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
