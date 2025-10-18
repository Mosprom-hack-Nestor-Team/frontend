import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import DevicesIcon from '@mui/icons-material/Devices';
import EditIcon from '@mui/icons-material/Edit';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';
import { apiService, type UserData } from '../services/api';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const storedUser = apiService.getStoredUser();
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      window.location.href = '/login';
    }
  };

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
      py: { xs: 4, md: 6 } 
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
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
              <RocketLaunchIcon sx={{ fontSize: 28 }} />
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
                AeroDocs
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Ваш профиль
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: 'rgba(0, 38, 100, 0.3)',
              color: '#002664',
              borderRadius: 3,
              px: 3,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#002664',
                backgroundColor: 'rgba(0, 38, 100, 0.04)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Выход
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Profile Card */}
          <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '380px' } }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                border: '1px solid rgba(0, 38, 100, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
                height: 'fit-content'
              }}
            >
              <Stack spacing={3}>
                {/* Avatar and Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      fontSize: 28,
                      fontWeight: 600,
                      boxShadow: '0 8px 25px rgba(0, 38, 100, 0.3)',
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#002664', mb: 0.5 }}>
                      {user.name}
                    </Typography>
                    <Chip
                      label={user.role}
                      icon={<VerifiedUserIcon sx={{ fontSize: 16, color: 'white' }} />}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #00afa5 0%, #00c9b6 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-icon': {
                          color: 'white !important',
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(135, 200, 220, 0.3)' }} />

                {/* User Info */}
                <Stack spacing={2.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(0, 38, 100, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#002664',
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#002664' }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(0, 175, 165, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00afa5',
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                        Дата регистрации
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#002664' }}>
                        {formatDate(user.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>

                <Divider sx={{ borderColor: 'rgba(135, 200, 220, 0.3)' }} />

                {/* Quick Actions */}
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate('/dashboard')}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(0, 38, 100, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                        boxShadow: '0 6px 20px rgba(0, 38, 100, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    Перейти в Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    fullWidth
                    sx={{
                      borderColor: 'rgba(0, 38, 100, 0.3)',
                      color: '#002664',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#002664',
                        backgroundColor: 'rgba(0, 38, 100, 0.04)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    На главную
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Box>

          {/* Welcome Section */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={4}>
              {/* Welcome Message */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <RocketLaunchIcon sx={{ fontSize: 32, color: '#002664' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#002664',
                    }}
                  >
                    Добро пожаловать в AeroDocs!
                  </Typography>
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6, mb: 4 }}>
                  Мы рады приветствовать вас в нашей платформе для совместной работы с таблицами. 
                  Теперь у вас есть доступ ко всем мощным инструментам для анализа данных и командной работы.
                </Typography>

                {/* Features Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  {[
                    {
                      title: 'Редактирование в реальном времени',
                      description: 'Работайте вместе с коллегами без задержек',
                      icon: <EditIcon sx={{ fontSize: 24 }} />,
                      color: '#002664'
                    },
                    {
                      title: 'Умная аналитика',
                      description: 'Встроенные инструменты для анализа данных',
                      icon: <AutoAwesomeIcon sx={{ fontSize: 24 }} />,
                      color: '#0f4dbc'
                    },
                    {
                      title: 'Безопасное хранение',
                      description: 'Ваши данные защищены шифрованием',
                      icon: <SecurityIcon sx={{ fontSize: 24 }} />,
                      color: '#00afa5'
                    },
                    {
                      title: 'Доступ с любого устройства',
                      description: 'Работайте где угодно и когда угодно',
                      icon: <DevicesIcon sx={{ fontSize: 24 }} />,
                      color: '#87c8dc'
                    }
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: '2px solid rgba(135, 200, 220, 0.3)',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          borderColor: feature.color,
                          background: `linear-gradient(135deg, #ffffff 0%, ${feature.color}08 100%)`,
                          boxShadow: '0 8px 25px rgba(0, 38, 100, 0.12)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}99 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0,
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              color: '#002664',
                              fontSize: '1rem',
                              lineHeight: 1.3,
                              mb: 1
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Status Info */}
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(0, 175, 165, 0.05) 0%, rgba(0, 201, 182, 0.08) 100%)',
                    border: '2px solid rgba(0, 175, 165, 0.2)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon sx={{ fontSize: 40, color: '#00afa5', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#00afa5', mb: 1 }}>
                    Аккаунт активен
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Все функции доступны
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, rgba(15, 77, 188, 0.08) 100%)',
                    border: '2px solid rgba(0, 38, 100, 0.2)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 40, color: '#002664', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#002664', mb: 1 }}>
                    Защищено
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Данные под защитой
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;