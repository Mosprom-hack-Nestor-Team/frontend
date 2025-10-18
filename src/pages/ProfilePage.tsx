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
  Card,
  CardContent,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';
import { apiService, type UserData } from '../services/api';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Get user data (synchronous fetch from storage in original)
    const storedUser = apiService.getStoredUser();
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      // логируем, но всё равно перенаправляем
      // eslint-disable-next-line no-console
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
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header with Logout */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 2 }}
          >
            Выход
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Profile Card */}
          <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '350px' } }}>
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }} elevation={4}>
              <Stack spacing={3} alignItems="center">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'primary.main',
                    fontSize: 42,
                    fontWeight: 600,
                    boxShadow: 3,
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>

                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {user.name}
                  </Typography>
                  <Chip
                    label={user.role}
                    color="primary"
                    size="small"
                    icon={<VerifiedUserIcon />}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Divider sx={{ width: '100%' }} />

                <Box sx={{ width: '100%', textAlign: 'left' }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <EmailIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CalendarTodayIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(user.created_at)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Welcome Card */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 4, borderRadius: 3 }} elevation={4}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Добро пожаловать, {user.name.split(' ')[0]}! 👋
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Вы успешно авторизованы в системе и имеете полный доступ ко всем функциям платформы.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{ mr: 2, borderRadius: 2, mb: { xs: 1, sm: 0 } }}
                  >
                    Перейти в Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ borderRadius: 2 }}
                  >
                    На главную
                  </Button>
                </Box>
              </Paper>

              {/* Info Cards */}
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Card sx={{ flex: 1, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }} elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      🔐 Безопасность
                    </Typography>
                    <Typography variant="body2">
                      Ваш аккаунт защищен современными технологиями шифрования
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ flex: 1, borderRadius: 2, bgcolor: 'success.light', color: 'success.contrastText' }} elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      ✨ Статус
                    </Typography>
                    <Typography variant="body2">
                      Ваш аккаунт активен и готов к работе
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Tip Card */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'info.lighter',
                  borderLeft: 4,
                  borderColor: 'info.main',
                }}
                elevation={1}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  💡 <strong>Совет:</strong> Используйте кнопку "Выход" в правом верхнем углу для безопасного завершения сессии.
                </Typography>
              </Paper>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;