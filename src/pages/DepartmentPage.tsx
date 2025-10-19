import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Tooltip,
  IconButton,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  ViewList as ListIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Типы данных
interface DepartmentMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  specialization: string;
}

interface FileChange {
  id: string;
  fileName: string;
  fileType: string;
  taskName: string;
  lastModified: Date;
  modifiedBy: string;
  status: 'editing' | 'review' | 'completed' | 'blocked';
  changes: string[];
  progress: number;
}

interface DepartmentStats {
  totalMembers: number;
  activeTasks: number;
  completedToday: number;
  blockedTasks: number;
}

// Моковые данные
const mockDepartmentMembers: DepartmentMember[] = [
  {
    id: '1',
    name: 'Иван Петров',
    role: 'Ведущий инженер',
    specialization: 'Аэродинамика',
    avatar: 'IP',
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    role: 'Инженер-конструктор',
    specialization: 'Прочность конструкций',
    avatar: 'МС',
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    role: 'Инженер-технолог',
    specialization: 'Производственные процессы',
    avatar: 'АК',
  },
  {
    id: '4',
    name: 'Елена Новикова',
    role: 'Инженер по качеству',
    specialization: 'Контроль качества',
    avatar: 'ЕН',
  },
  {
    id: '5',
    name: 'Дмитрий Волков',
    role: 'Инженер-проектировщик',
    specialization: 'Системы управления',
    avatar: 'ДВ',
  },
];

const mockFileChanges: FileChange[] = [
  {
    id: '1',
    fileName: 'wing_design_v4.sldprt',
    fileType: '3D модель',
    taskName: 'Проектирование крыла Боинг-777X',
    lastModified: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    modifiedBy: '1',
    status: 'editing',
    changes: ['Оптимизация профиля крыла', 'Добавление элементов механизации'],
    progress: 65,
  },
  {
    id: '2',
    fileName: 'stress_analysis_report.pdf',
    fileType: 'Отчет',
    taskName: 'Анализ прочности фюзеляжа',
    lastModified: new Date(Date.now() - 1000 * 60 * 120), // 2 часа назад
    modifiedBy: '2',
    status: 'review',
    changes: ['Расчет нагрузок на крепления', 'Проверка запаса прочности'],
    progress: 100,
  },
  {
    id: '3',
    fileName: 'manufacturing_process.docx',
    fileType: 'Документация',
    taskName: 'Разработка ТП сборки',
    lastModified: new Date(Date.now() - 1000 * 60 * 240), // 4 часа назад
    modifiedBy: '3',
    status: 'completed',
    changes: ['Оптимизация последовательности операций', 'Внедрение новых станков'],
    progress: 100,
  },
  {
    id: '4',
    fileName: 'quality_checklist.xlsx',
    fileType: 'Таблица',
    taskName: 'Контрольный лист приемки',
    lastModified: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
    modifiedBy: '4',
    status: 'editing',
    changes: ['Добавление новых параметров контроля', 'Обновление допусков'],
    progress: 40,
  },
  {
    id: '5',
    fileName: 'control_systems_diagram.dwg',
    fileType: 'Чертеж',
    taskName: 'Схемы систем управления',
    lastModified: new Date(Date.now() - 1000 * 60 * 60), // 1 час назад
    modifiedBy: '5',
    status: 'blocked',
    changes: ['Ожидание согласования от смежного отдела'],
    progress: 80,
  },
];

// Функция для получения иконки статуса
const getStatusIcon = (status: FileChange['status']) => {
  switch (status) {
    case 'editing': return <EditIcon />;
    case 'review': return <AccessTimeIcon />;
    case 'completed': return <CheckCircleIcon />;
    case 'blocked': return <WarningIcon />;
    default: return <EditIcon />;
  }
};

// Функция для форматирования времени
const formatLastModified = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays === 1) return 'вчера';
  if (diffDays < 7) return `${diffDays} дн. назад`;
  
  return date.toLocaleDateString('ru-RU');
};

export const DepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [fileChanges, setFileChanges] = useState<FileChange[]>(mockFileChanges);
  const [departmentMembers] = useState<DepartmentMember[]>(mockDepartmentMembers);
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('list');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Статистика отдела
  const departmentStats: DepartmentStats = {
    totalMembers: departmentMembers.length,
    activeTasks: fileChanges.filter(task => task.status === 'editing' || task.status === 'review').length,
    completedToday: fileChanges.filter(task => 
      task.status === 'completed' && 
      task.lastModified.getDate() === new Date().getDate()
    ).length,
    blockedTasks: fileChanges.filter(task => task.status === 'blocked').length,
  };

  // Функция для обновления данных
  const refreshData = () => {
    setLastUpdated(new Date());
  };

  // Функция для получения информации о сотруднике по ID
  const getMemberById = (id: string) => {
    return departmentMembers.find(member => member.id === id);
  };

  // Функция для получения цвета статуса
  const getStatusColor = (status: FileChange['status']) => {
    switch (status) {
      case 'editing': return 'primary';
      case 'review': return 'warning';
      case 'completed': return 'success';
      case 'blocked': return 'error';
      default: return 'default';
    }
  };

  // Функция для получения текста статуса
  const getStatusText = (status: FileChange['status']) => {
    switch (status) {
      case 'editing': return 'Редактирование';
      case 'review': return 'На проверке';
      case 'completed': return 'Завершено';
      case 'blocked': return 'Блокировка';
      default: return 'Редактирование';
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
      py: { xs: 3, md: 4 }
    }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Заголовок и статистика */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
              border: '1px solid rgba(0, 38, 100, 0.1)',
            }}
          >
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      Отдел проектирования
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Старший инженер - Мониторинг задач сотрудников
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Обновлено: {formatLastModified(lastUpdated)}
                  </Typography>
                  <Tooltip title="Обновить данные">
                    <IconButton onClick={refreshData} size="small">
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Статистика */}
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, transparent 100%)',
                      border: '2px solid rgba(0, 38, 100, 0.1)',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#002664' }}>
                      {departmentStats.totalMembers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Сотрудников в отделе
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(15, 77, 188, 0.05) 0%, transparent 100%)',
                      border: '2px solid rgba(15, 77, 188, 0.1)',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f4dbc' }}>
                      {departmentStats.activeTasks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Активных задач
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(0, 175, 165, 0.05) 0%, transparent 100%)',
                      border: '2px solid rgba(0, 175, 165, 0.1)',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#00afa5' }}>
                      {departmentStats.completedToday}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Завершено сегодня
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(235, 115, 90, 0.05) 0%, transparent 100%)',
                      border: '2px solid rgba(235, 115, 90, 0.1)',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#eb735a' }}>
                      {departmentStats.blockedTasks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Заблокировано
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </Paper>

          {/* Управление видом и предупреждения */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              aria-label="режим просмотра"
            >
              <ToggleButton value="list" aria-label="список">
                <ListIcon sx={{ mr: 1 }} />
                Список
              </ToggleButton>
              <ToggleButton value="cards" aria-label="карточки">
                <DashboardIcon sx={{ mr: 1 }} />
                Карточки
              </ToggleButton>
            </ToggleButtonGroup>

            {departmentStats.blockedTasks > 0 && (
              <Alert 
                severity="warning" 
                sx={{ 
                  flex: 1,
                  maxWidth: 400,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'warning.light',
                }}
              >
                {departmentStats.blockedTasks} задач требуют вашего внимания
              </Alert>
            )}
          </Box>

          {/* Список задач - ИСПРАВЛЕННАЯ ВЕРСИЯ С РАВНЫМИ КОЛОНКАМИ */}
          {viewMode === 'list' ? (
            <Stack spacing={2}>
              {fileChanges.map((change) => {
                const member = getMemberById(change.modifiedBy);
                return (
                  <Card 
                    key={change.id}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: '2px solid',
                      borderColor: change.status === 'blocked' 
                        ? 'rgba(235, 115, 90, 0.3)' 
                        : 'rgba(135, 200, 220, 0.3)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 38, 100, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                      <Grid container spacing={3} alignItems="stretch">
                        {/* Колонка 1: Сотрудник и задача - 25% ширины */}
                        <Grid item xs={12} md={3}>
                          <Stack spacing={2} sx={{ height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                sx={{
                                  width: 44,
                                  height: 44,
                                  background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                                  fontSize: 14,
                                  fontWeight: 700,
                                  color: '#002664',
                                }}
                              >
                                {member?.avatar || 'U'}
                              </Avatar>
                              <Box sx={{ width: 'calc(100% - 60px)' }}>
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontWeight: 600, 
                                    color: '#002664',
                                  }}
                                >
                                  {member?.name}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{
                                    display: 'block',
                                  }}
                                >
                                  {member?.role}
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 700,
                                  lineHeight: 1.3,
                                }}
                              >
                                {change.taskName}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        {/* Колонка 2: Статус и файл - 25% ширины */}
                        <Grid item xs={12} md={3}>
                          <Stack spacing={2} sx={{ height: '100%' }}>
                            <Box>
                              <Chip
                                icon={getStatusIcon(change.status)}
                                label={getStatusText(change.status)}
                                color={getStatusColor(change.status)}
                                size="small"
                                variant="filled"
                                sx={{ mb: 1 }}
                              />
                            </Box>
                            <Box>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                              >
                                <strong>Файл:</strong> {change.fileName}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                              >
                                {change.fileType}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>

                        {/* Колонка 3: Изменения - 25% ширины */}
                        <Grid item xs={12} md={3}>
                          <Stack spacing={2} sx={{ height: '100%' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                Изменения:
                              </Typography>
                              <Box>
                                {change.changes.map((item, index) => (
                                  <Typography 
                                    key={index} 
                                    variant="caption" 
                                    display="block" 
                                    color="text.secondary"
                                    sx={{
                                      mb: 0.5
                                    }}
                                  >
                                    • {item}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ mt: 'auto !important' }}
                            >
                              Обновлено: {formatLastModified(change.lastModified)}
                            </Typography>
                          </Stack>
                        </Grid>

                        {/* Колонка 4: Прогресс - 25% ширины */}
                        <Grid item xs={12} md={3}>
                          <Stack spacing={2} sx={{ height: '100%', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Прогресс: {change.progress}%
                              </Typography>
                              <LinearProgress 
                                variant="determinate" 
                                value={change.progress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  mt: 1,
                                  backgroundColor: 'rgba(135, 200, 220, 0.3)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                      change.status === 'completed' ? '#00afa5' :
                                      change.status === 'blocked' ? '#eb735a' : '#002664',
                                    borderRadius: 4,
                                  },
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                {change.progress === 100 ? 'Готово' : 'В работе'}
                              </Typography>
                            </Box>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          ) : (
            // Режим карточек - ТОЖЕ С РАВНЫМИ КОЛОНКАМИ
            <Grid container spacing={3}>
              {fileChanges.map((change) => {
                const member = getMemberById(change.modifiedBy);
                return (
                  <Grid item xs={12} md={6} lg={4} key={change.id}>
                    <Card 
                      elevation={0}
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        border: '2px solid',
                        borderColor: change.status === 'blocked' 
                          ? 'rgba(235, 115, 90, 0.3)' 
                          : 'rgba(135, 200, 220, 0.3)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 35px rgba(0, 38, 100, 0.2)',
                        },
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardContent sx={{ 
                        p: 3, 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        '&:last-child': { pb: 3 }
                      }}>
                        <Stack spacing={2} sx={{ height: '100%' }}>
                          {/* Заголовок карточки */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                                  fontSize: 14,
                                  fontWeight: 700,
                                  color: '#002664',
                                  flexShrink: 0
                                }}
                              >
                                {member?.avatar || 'U'}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontWeight: 600, 
                                    color: '#002664',
                                  }}
                                >
                                  {member?.name}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                >
                                  {member?.role}
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              icon={getStatusIcon(change.status)}
                              label={getStatusText(change.status)}
                              color={getStatusColor(change.status)}
                              size="small"
                              sx={{ flexShrink: 0 }}
                            />
                          </Box>

                          {/* Информация о задаче */}
                          <Box>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: 700, 
                                mb: 1,
                                lineHeight: 1.3,
                              }}
                            >
                              {change.taskName}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                            >
                              <strong>Файл:</strong> {change.fileName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {change.fileType}
                            </Typography>
                          </Box>

                          {/* Изменения */}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                              Последние изменения:
                            </Typography>
                            <Box>
                              {change.changes.map((item, index) => (
                                <Typography 
                                  key={index} 
                                  variant="caption" 
                                  display="block" 
                                  color="text.secondary" 
                                  sx={{
                                    mb: 0.5
                                  }}
                                >
                                  • {item}
                                </Typography>
                              ))}
                            </Box>
                          </Box>

                          {/* Прогресс и время */}
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Прогресс: {change.progress}%
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatLastModified(change.lastModified)}
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={change.progress}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(135, 200, 220, 0.3)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: 
                                    change.status === 'completed' ? '#00afa5' :
                                    change.status === 'blocked' ? '#eb735a' : '#002664',
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 0.5 }}>
                              {change.progress === 100 ? 'Задача завершена' : 'В процессе выполнения'}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default DepartmentPage;