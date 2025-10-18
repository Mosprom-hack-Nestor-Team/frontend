import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Button,
  CircularProgress,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
// import { apiService } from '../services/api'; // оставлено как было в твоём проекте

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await apiService.login(formData);
      // временно эмулируем успешный логин
      await new Promise((r) => setTimeout(r, 700));
      navigate('/profile');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error instanceof Error ? error.message : 'Ошибка входа. Проверьте email и пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minHeight="calc(100vh - 64px)" sx={{ bgcolor: 'background.default', py: { xs: 6, md: 12 } }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2 }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography
                variant="h4"
                sx={{
                  background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                }}
                gutterBottom
              >
                Вход в аккаунт
              </Typography>
              <Typography color="text.secondary">Добро пожаловать! Войдите, чтобы продолжить</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <TextField
                  label="Пароль"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Box display="flex" justifyContent="flex-end">
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                    <MuiLink component="span" variant="body2" sx={{ color: 'primary.main' }}>
                      Забыли пароль?
                    </MuiLink>
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress color="inherit" size={18} /> : undefined}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </Stack>
            </Box>

            <Box textAlign="center" pt={2}>
              <Typography variant="body2" color="text.secondary">
                Нет аккаунта?{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <MuiLink component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Зарегистрироваться
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;