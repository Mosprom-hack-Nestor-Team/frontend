import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  Badge,
  For,
} from '@chakra-ui/react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const StatCard = ({ title, value, change, isPositive }: StatCardProps) => {
  return (
    <Box
      bg="white"
      shadow="md"
      p={6}
      rounded="lg"
      _hover={{ shadow: 'xl', transform: 'translateY(-2px)', transition: 'all 0.3s' }}
    >
      <Stack gap={2}>
        <Text color="gray.600" fontSize="sm">
          {title}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {value}
        </Text>
        <Text fontSize="sm" color={isPositive ? 'green.500' : 'red.500'}>
          {isPositive ? '↑' : '↓'} {change}
        </Text>
      </Stack>
    </Box>
  );
};

interface TaskCardProps {
  title: string;
  progress: number;
  status: string;
}

const TaskCard = ({ title, progress, status }: TaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'completed':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Box bg="white" shadow="md" p={6} rounded="lg">
      <Stack gap={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontWeight="semibold">{title}</Text>
          <Badge colorPalette={getStatusColor(status)}>{status}</Badge>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Прогресс: {progress}%
          </Text>
          <Box bg="gray.200" rounded="full" h="8px" overflow="hidden">
            <Box
              bg={`${getStatusColor(status)}.500`}
              h="full"
              w={`${progress}%`}
              transition="width 0.3s"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export const DashboardPage = () => {
  const stats = [
    { title: 'Всего пользователей', value: '1,234', change: '12%', isPositive: true },
    { title: 'Активные проекты', value: '45', change: '8%', isPositive: true },
    { title: 'Выполнено задач', value: '892', change: '23%', isPositive: true },
    { title: 'Доход', value: '$12,345', change: '5%', isPositive: false },
  ];

  const tasks = [
    { title: 'Разработка нового функционала', progress: 75, status: 'active' },
    { title: 'Тестирование API', progress: 50, status: 'active' },
    { title: 'Обновление документации', progress: 30, status: 'pending' },
    { title: 'Код-ревью', progress: 100, status: 'completed' },
  ];

  return (
    <Container maxW="container.xl" py={10}>
      <Stack gap={8}>
        <Box>
          <Heading mb={2}>Dashboard</Heading>
          <Text color="gray.600">
            Обзор ключевых метрик и статистики
          </Text>
        </Box>

        {/* Statistics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <For each={stats}>
            {(stat, index) => (
              <StatCard key={index} {...stat} />
            )}
          </For>
        </SimpleGrid>

        {/* Tasks */}
        <Box>
          <Heading size="md" mb={4}>
            Текущие задачи
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <For each={tasks}>
              {(task, index) => (
                <TaskCard key={index} {...task} />
              )}
            </For>
          </SimpleGrid>
        </Box>

        {/* Additional Info */}
        <Box bg="blue.50" shadow="md" p={6} rounded="lg">
          <Stack gap={3}>
            <Heading size="sm">💡 Подсказка</Heading>
            <Text color="gray.700">
              Используйте панель навигации для перехода между разделами приложения.
              Все данные обновляются в режиме реального времени.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
