import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Flex,
  For,
} from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';

interface TeamMemberProps {
  name: string;
  role: string;
}

const TeamMember = ({ name, role }: TeamMemberProps) => {
  // Получаем инициалы для аватара
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box
      bg="white"
      shadow="md"
      p={6}
      rounded="lg"
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)', transition: 'all 0.3s' }}
    >
      <Stack align="center" gap={4}>
        <Flex
          w={20}
          h={20}
          bg="blue.500"
          color="white"
          rounded="full"
          align="center"
          justify="center"
          fontSize="2xl"
          fontWeight="bold"
        >
          {getInitials(name)}
        </Flex>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {role}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export const AboutPage = () => {
  const advantages = [
    'Интуитивно понятный интерфейс',
    'Быстрая обработка больших объемов данных',
    'Надежная защита и шифрование информации',
    'Круглосуточная техническая поддержка',
    'Гибкая система тарификации',
  ];

  const team = [
    { name: 'Алексей Иванов', role: 'CEO & Founder' },
    { name: 'Мария Петрова', role: 'CTO' },
    { name: 'Дмитрий Сидоров', role: 'Lead Developer' },
    { name: 'Елена Козлова', role: 'UI/UX Designer' },
  ];

  const technologies = ['React', 'TypeScript', 'Chakra UI', 'FastAPI', 'PostgreSQL', 'Docker'];

  return (
    <Container maxW="container.xl" py={10}>
      <Stack gap={12}>
        {/* Header */}
        <Box textAlign="center">
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            bgGradient="to-r"
            gradientFrom="blue.400"
            gradientTo="purple.500"
            bgClip="text"
            mb={4}
          >
            О нашем проекте
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            maxW="3xl"
            mx="auto"
          >
            Мы создаем инновационные решения для бизнеса, используя современные технологии
            и лучшие практики разработки
          </Text>
        </Box>

        {/* Mission */}
        <Box bg="white" shadow="lg" p={8} rounded="lg">
          <Stack gap={6}>
            <Heading size="lg">Наша миссия</Heading>
            <Text color="gray.700" fontSize="md">
              Предоставить доступные и эффективные инструменты для управления данными,
              которые помогут компаниям любого размера принимать обоснованные решения
              на основе аналитики. Мы верим в силу данных и стремимся сделать их
              использование простым и интуитивным.
            </Text>
            
            <Box borderTop="1px" borderColor="gray.200" pt={6}>
              <Heading size="md" mb={4}>Наши преимущества</Heading>
              <Stack gap={3}>
                <For each={advantages}>
                  {(advantage, index) => (
                    <Flex key={index} align="center" gap={3}>
                      <Box color="green.500" fontSize="xl">
                        <FiCheckCircle />
                      </Box>
                      <Text>{advantage}</Text>
                    </Flex>
                  )}
                </For>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Team */}
        <Box>
          <Heading size="lg" mb={2} textAlign="center">
            Наша команда
          </Heading>
          <Text
            textAlign="center"
            color="gray.600"
            mb={8}
          >
            Профессионалы, которые создают будущее
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            <For each={team}>
              {(member, index) => (
                <TeamMember key={index} {...member} />
              )}
            </For>
          </SimpleGrid>
        </Box>

        {/* Technologies */}
        <Box bg="purple.50" shadow="md" p={6} rounded="lg">
          <Stack gap={4}>
            <Heading size="md">🚀 Технологии</Heading>
            <Text color="gray.700">
              Мы используем современный стек технологий: React, TypeScript, Chakra UI,
              FastAPI, PostgreSQL и многое другое. Наш код соответствует лучшим практикам
              и постоянно совершенствуется.
            </Text>
            <Flex gap={2} wrap="wrap">
              <For each={technologies}>
                {(tech, index) => (
                  <Box
                    key={index}
                    px={4}
                    py={2}
                    bg="blue.500"
                    color="white"
                    rounded="full"
                    fontSize="sm"
                    fontWeight="semibold"
                  >
                    {tech}
                  </Box>
                )}
              </For>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
