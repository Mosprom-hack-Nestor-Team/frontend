import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Avatar,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
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
      navigate('/login', { replace: true });
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default', position: 'relative', py: { xs: 4, md: 8 } }}>
      {/* Logout Button in Top Right */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Выход
        </Button>
      </Box>

      {/* Center Content */}
      <Container maxWidth="md">
        <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 6, md: 10 } }}>
          <Paper sx={{ width: '100%', p: { xs: 4, md: 8 }, borderRadius: 3 }} elevation={6}>
            <Stack spacing={4} alignItems="center">
              <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 28 }}>
                {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?'}
              </Avatar>

              <Box textAlign="center">
                <Typography variant="h4" sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }} gutterBottom>
                  Добро пожаловать! 🎉
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>

              <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
                <Typography variant="body1" color="text.primary">
                  Вы успешно авторизованы в системе!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Роль: <strong>{user.role}</strong>
                </Typography>
              </Box>

              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Ваш аккаунт был создан:{' '}
                  <strong>{user.created_at ? new Date(user.created_at).toLocaleDateString('ru-RU') : '—'}</strong>
                </Typography>
              </Box>

              <Box sx={{ width: '100%', p: 2, borderRadius: 1, bgcolor: 'purple.50', borderLeft: '4px solid', borderColor: 'purple.500' }}>
                <Typography variant="body2" color="text.secondary">
                  💡 Это защищенная страница. Используйте кнопку "Выход" в правом верхнем углу для завершения сессии.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;