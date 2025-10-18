import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Link as MuiLink,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.register(formData);
      // Перезагружаем страницу чтобы обновить состояние пользователя
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default', py: { xs: 6, md: 12 } }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2 }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h4" sx={{
                background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
              }} gutterBottom>
                Создать аккаунт
              </Typography>
              <Typography color="text.secondary">Присоединяйтесь к нам и начните работу</Typography>
            </Box>

            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Имя"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  inputProps={{ minLength: 8 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Минимум 8 символов"
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress color="inherit" size={18} /> : undefined}
                >
                  {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </Stack>
            </Box>

            <Box textAlign="center" pt={2}>
              <Typography variant="body2" color="text.secondary">
                Уже есть аккаунт?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <MuiLink component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Войти
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

export default RegisterPage;