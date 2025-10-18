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
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import AeroLinesBackground from '../components/AeroLinesBackground';

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
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка регистрации');
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
                Создать аккаунт
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 400 }}>
                Присоединяйтесь к нам и начните работу
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
                  label="Имя"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#002664' }} />
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
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  inputProps={{ minLength: 8 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#002664' }} />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Минимум 8 символов"
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
                  {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              </Stack>
            </Box>

            {/* Ссылка на вход */}
            <Box textAlign="center" pt={2}>
              <Typography variant="body1" color="text.secondary">
                Уже есть аккаунт?{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
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