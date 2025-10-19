import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Avatar,
  Divider,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { Grid } from '../components/Grid';

interface Notification {
  id: number;
  type: 'edit' | 'share' | 'system' | 'security' | 'analytics';
  title: string;
  message: string;
  user?: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface ActivityStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'edit',
      title: 'Изменение таблицы',
      message: 'Иван Иванов внес изменения в таблицу "Бюджет 2024"',
      user: { name: 'Иван Иванов' },
      timestamp: '5 минут назад',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'share',
      title: 'Новый доступ',
      message: 'Вам предоставили доступ к таблице "Отчет по продажам"',
      user: { name: 'Мария Петрова' },
      timestamp: '2 часа назад',
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'analytics',
      title: 'Статистика активности',
      message: 'Ваша активность за неделю выросла на 15%',
      timestamp: 'Вчера',
      read: true,
      priority: 'low',
    },
    {
      id: 4,
      type: 'security',
      title: 'Обновление безопасности',
      message: 'Применены новые политики безопасности данных',
      timestamp: '2 дня назад',
      read: true,
      priority: 'high',
    },
    {
      id: 5,
      type: 'system',
      title: 'Системное обновление',
      message: 'Плановое обновление системы завершено успешно',
      timestamp: '3 дня назад',
      read: true,
      priority: 'medium',
    },
    {
      id: 6,
      type: 'edit',
      title: 'Совместное редактирование',
      message: 'Алексей Смирнов и вы одновременно редактируете таблицу "Проект X"',
      user: { name: 'Алексей Смирнов' },
      timestamp: 'Неделю назад',
      read: true,
      priority: 'high',
    },
  ]);

  const activityStats: ActivityStat[] = [
    {
      label: 'Активных сессий',
      value: '3',
      change: 25,
      icon: <GroupIcon />,
      color: '#002664',
    },
    {
      label: 'Изменений за день',
      value: '47',
      change: 12,
      icon: <EditIcon />,
      color: '#0f4dbc',
    },
    {
      label: 'Совместных таблиц',
      value: '8',
      change: 5,
      icon: <ShareIcon />,
      color: '#00afa5',
    },
    {
      label: 'Новых уведомлений',
      value: '3',
      change: -10,
      icon: <NotificationsIcon />,
      color: '#87c8dc',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'edit':
        return <EditIcon sx={{ color: '#002664' }} />;
      case 'share':
        return <ShareIcon sx={{ color: '#0f4dbc' }} />;
      case 'security':
        return <SecurityIcon sx={{ color: '#00afa5' }} />;
      case 'analytics':
        return <TrendingUpIcon sx={{ color: '#87c8dc' }} />;
      default:
        return <NotificationsIcon sx={{ color: '#002664' }} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffa726';
      case 'low':
        return '#66bb6a';
      default:
        return '#87c8dc';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 0) return !notification.read;
    if (activeTab === 1) return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
      py: { xs: 3, md: 4 }
    }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Заголовок */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
              border: '1px solid rgba(0, 38, 100, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      mb: 1,
                    }}
                  >
                    Уведомления
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                    {unreadCount} непрочитанных уведомлений
                  </Typography>
                </Box>
              </Box>

              {unreadCount > 0 && (
                <Button
                  variant="outlined"
                  onClick={markAllAsRead}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    borderColor: '#00afa5',
                    color: '#00afa5',
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 175, 165, 0.08)',
                      borderColor: '#00afa5',
                    },
                  }}
                >
                  Прочитать все
                </Button>
              )}
            </Box>

            {/* Статистика активности */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {activityStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '2px solid rgba(135, 200, 220, 0.3)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: stat.color,
                        boxShadow: '0 8px 25px rgba(0, 38, 100, 0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color, mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                        {stat.label}
                      </Typography>
                      <Chip
                        label={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                        size="small"
                        color={stat.change > 0 ? 'success' : 'error'}
                        sx={{ fontWeight: 600 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Табы */}
            <Paper 
              elevation={0}
              sx={{ 
                background: 'rgba(135, 200, 220, 0.08)',
                borderRadius: 2,
                p: 1,
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    borderRadius: 1,
                    minHeight: 48,
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      color: 'white',
                    },
                  },
                }}
              >
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Непрочитанные
                      {unreadCount > 0 && (
                        <Chip 
                          label={unreadCount} 
                          size="small" 
                          sx={{ 
                            background: '#ff6b6b', 
                            color: 'white',
                            fontWeight: 600,
                            height: 20,
                          }} 
                        />
                      )}
                    </Box>
                  } 
                />
                <Tab label="Прочитанные" />
                <Tab label="Все уведомления" />
              </Tabs>
            </Paper>
          </Paper>

          {/* Список уведомлений */}
          <Stack spacing={2}>
            {filteredNotifications.map((notification) => (
              <Paper
                key={notification.id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                  border: '2px solid',
                  borderColor: notification.read 
                    ? 'rgba(135, 200, 220, 0.3)' 
                    : 'rgba(0, 38, 100, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: notification.read ? '#87c8dc' : '#002664',
                    boxShadow: '0 4px 15px rgba(0, 38, 100, 0.1)',
                  },
                  ...(!notification.read && {
                    background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.03) 0%, rgba(15, 77, 188, 0.02) 100%)',
                  }),
                }}
                onClick={() => markAsRead(notification.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${getPriorityColor(notification.priority)}20 0%, ${getPriorityColor(notification.priority)}10 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: getPriorityColor(notification.priority),
                      flexShrink: 0,
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#002664' }}>
                        {notification.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!notification.read && (
                          <Chip
                            label="Новое"
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #00afa5 0%, #00c9b6 100%)',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              height: 20,
                            }}
                          />
                        )}
                        <Chip
                          icon={<ScheduleIcon sx={{ fontSize: 14 }} />}
                          label={notification.timestamp}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
                      {notification.message}
                    </Typography>

                    {notification.user && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#002664',
                          }}
                        >
                          {notification.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#002664' }}>
                          {notification.user.name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            ))}

            {filteredNotifications.length === 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(135, 200, 220, 0.08) 0%, rgba(15, 77, 188, 0.05) 100%)',
                  border: '2px dashed rgba(135, 200, 220, 0.5)',
                  textAlign: 'center',
                }}
              >
                <NotificationsIcon sx={{ fontSize: 64, color: 'rgba(135, 200, 220, 0.6)', mb: 3 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#002664', mb: 2 }}>
                  Уведомлений нет
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Здесь появятся уведомления о действиях в системе
                </Typography>
              </Paper>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default NotificationsPage;