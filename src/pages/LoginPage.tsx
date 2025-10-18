import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Link as MuiLink,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import AeroLinesBackground from '../components/AeroLinesBackground';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await apiService.login(formData);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка входа. Проверьте email и пароль');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AeroLinesBackground />
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
            border: '1px solid',
            borderColor: 'rgba(0, 38, 100, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 38, 100, 0.12)',
          }}
        >
          <Stack spacing={4}>
            {/* Заголовок */}
            <Box textAlign="center">
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  borderRadius: 3,
                  p: 2,
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <TableChartIcon sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1,
                }}
              >
                Вход в аккаунт
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400 }}>
                Добро пожаловать! Войдите, чтобы продолжить
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Форма */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon sx={{ color: '#002664' }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#002664',
                      },
                    }
                  }}
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
                        <LockIcon sx={{ color: '#002664' }} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#002664',
                      },
                    }
                  }}
                />

                <Box display="flex" justifyContent="flex-end">
                  <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                    <MuiLink component="span" variant="body2" sx={{ color: '#002664', fontWeight: 500 }}>
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
                  startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : undefined}
                  sx={{
                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </Stack>
            </Box>

            {/* Ссылка на регистрацию */}
            <Box textAlign="center" pt={2}>
              <Typography variant="body1" color="text.secondary">
                Нет аккаунта?{' '}
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <MuiLink 
                    component="span" 
                    sx={{ 
                      color: '#002664', 
                      fontWeight: 600,
                      '&:hover': {
                        color: '#0f4dbc',
                      }
                    }}
                  >
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