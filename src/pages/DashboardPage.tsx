import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  useTheme,
  Button,
} from '@mui/material';

type Table = {
  id: string;
  name: string;
  description?: string;
  columnsCount?: number;
  rowsCount?: number;
  lastModified?: string;
  created?: string;
  type?: string;
};

type DashboardPageProps = {
  tables?: Table[];
  onCreateTable?: () => void;
  onEditTable?: (id: string) => void;
  onDeleteTable?: (id: string) => void;
  onOpenTable?: (id: string) => void;
};

interface Stat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface Task {
  title: string;
  progress: number; // 0-100
  status: 'active' | 'pending' | 'completed' | string;
}

/** Небольшая вспомогательная функция для статусов */
const statusColor = (status: string, theme: ReturnType<typeof useTheme>) => {
  switch (status) {
    case 'active':
      return theme.palette.success.main;
    case 'pending':
      return theme.palette.warning.main;
    case 'completed':
      return theme.palette.info.main;
    default:
      return theme.palette.grey[500];
  }
};

const StatCard: React.FC<Stat> = ({ title, value, change, isPositive }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        transition: 'transform .18s ease, box-shadow .18s ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
      }}
    >
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 600 }}
        >
          {isPositive ? '↑' : '↓'} {change}
        </Typography>
      </Stack>
    </Paper>
  );
};

const TaskCard: React.FC<Task> = ({ title, progress, status }) => {
  const theme = useTheme();
  const bg = statusColor(status, theme);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={700}>
            {title}
          </Typography>
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: bg,
              color: theme.palette.getContrastText(bg),
              fontWeight: 700,
            }}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Прогресс: {progress}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 8,
              '& .MuiLinearProgress-bar': {
                bgcolor: bg,
              },
              bgcolor: theme.palette.grey[200],
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export const DashboardPage: React.FC<DashboardPageProps> = ({
  tables,
  onCreateTable,
  onEditTable,
  onDeleteTable,
  onOpenTable,
}) => {
  // Данные по умолчанию, если не переданы пропсы
  const stats: Stat[] = [
    { title: 'Всего пользователей', value: '1,234', change: '12%', isPositive: true },
    { title: 'Активные проекты', value: '45', change: '8%', isPositive: true },
    { title: 'Выполнено задач', value: '892', change: '23%', isPositive: true },
    { title: 'Доход', value: '$12,345', change: '5%', isPositive: false },
  ];

  const tasks: Task[] = [
    { title: 'Разработка нового функционала', progress: 75, status: 'active' },
    { title: 'Тестирование API', progress: 50, status: 'active' },
    { title: 'Обновление документации', progress: 30, status: 'pending' },
    { title: 'Код-ревью', progress: 100, status: 'completed' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Dashboard
          </Typography>
          <Typography color="text.secondary">Обзор ключевых метрик и статистики</Typography>
        </Box>

        {/* Statistics */}
        <Grid container spacing={3}>
          {stats.map((s, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={3}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>

        {/* Tasks */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Текущие задачи
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Статус задач в проекте
              </Typography>
            </Box>

            {/* Пример кнопки создания таблицы — если передали onCreateTable, она активна */}
            {onCreateTable ? (
              <Button variant="contained" onClick={onCreateTable}>
                Создать таблицу
              </Button>
            ) : null}
          </Box>

          <Grid container spacing={3}>
            {tasks.map((task, idx) => (
              <Grid item key={idx} xs={12} md={6}>
                <TaskCard {...task} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional Info */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'rgba(59,130,246,0.06)', // blue.50 аналог
          }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2">💡 Подсказка</Typography>
            <Typography color="text.secondary">
              Используйте панель навигации для перехода между разделами приложения. Все данные
              обновляются в режиме реального времени.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default DashboardPage;