import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// MUI icons
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

type FeatureProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
  color?: string;
};

const Feature: React.FC<FeatureProps> = ({ title, text, icon, color = '#002664' }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid',
        borderColor: 'rgba(135, 200, 220, 0.3)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: color,
          background: `linear-gradient(135deg, #ffffff 0%, ${color}08 100%)`,
          boxShadow: '0 8px 32px rgba(0, 38, 100, 0.12)',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 3,
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {icon}
      </Box>

      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600,
          color: '#002664',
          lineHeight: 1.4
        }}
      >
        {title}
      </Typography>

      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ lineHeight: 1.6 }}
      >
        {text}
      </Typography>
    </Paper>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Умная аналитика',
      text: 'Автоматический анализ данных с помощью искусственного интеллекта и машинного обучения',
      icon: <AnalyticsIcon sx={{ fontSize: 32 }} />,
      color: '#002664'
    },
    {
      title: 'Безопасность данных',
      text: 'Надежное шифрование и защита вашей информации на всех этапах обработки',
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      color: '#0f4dbc'
    },
    {
      title: 'Высокая скорость',
      text: 'Быстрая обработка больших объемов данных в реальном времени',
      icon: <SpeedIcon sx={{ fontSize: 32 }} />,
      color: '#00afa5'
    },
    {
      title: 'Хранение данных',
      text: 'Надежное и масштабируемое хранилище для любых объемов информации',
      icon: <StorageIcon sx={{ fontSize: 32 }} />,
      color: '#87c8dc'
    },
    {
      title: 'Визуализация',
      text: 'Понятные графики и дашборды для эффективного анализа показателей',
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      color: '#002664'
    },
    {
      title: 'Командная работа',
      text: 'Совместная работа над проектами с системой управления доступом',
      icon: <GroupIcon sx={{ fontSize: 32 }} />,
      color: '#0f4dbc'
    },
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.03) 0%, rgba(15, 77, 188, 0.06) 100%)',
          py: { xs: 10, md: 16 },
          px: 2,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(15, 77, 188, 0.08) 0%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <Stack
            spacing={5}
            alignItems="center"
            textAlign="center"
            sx={{ maxWidth: 1000, margin: '0 auto' }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                lineHeight: 1.1,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Добро пожаловать в AeroDocs
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                fontWeight: 400,
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
              }}
            >
              Современное решение для управления данными и аналитики. 
              Простой интерфейс, мощные возможности искусственного интеллекта.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{ pt: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(0, 38, 100, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                    boxShadow: '0 6px 25px rgba(0, 38, 100, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Перейти к AeroDocs
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  borderColor: '#002664',
                  color: '#002664',
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: '#0f4dbc',
                    backgroundColor: 'rgba(15, 77, 188, 0.04)',
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Узнать больше
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 }, position: 'relative' }}>
        <Stack spacing={8} alignItems="center">
          <Box textAlign="center">
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#002664',
                mb: 2,
              }}
            >
              Наши возможности
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Все что нужно для эффективной работы с данными и аналитикой
            </Typography>
          </Box>

          {/* Исправленная сетка с 3 колонками и 2 рядами */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              },
              gap: 4,
              width: '100%',
              maxWidth: 1200,
            }}
          >
            {features.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                text={feature.text}
                icon={feature.icon}
                color={feature.color}
              />
            ))}
          </Box>

          {/* CTA Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, rgba(15, 77, 188, 0.08) 100%)',
              border: '2px solid rgba(0, 38, 100, 0.1)',
              textAlign: 'center',
              width: '100%',
              maxWidth: 1000,
            }}
          >
            <Stack spacing={4} alignItems="center">
              <Typography 
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#002664',
                }}
              >
                Готовы начать?
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  maxWidth: 600,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Присоединяйтесь к тысячам довольных пользователей, которые уже используют 
                наши решения для роста своего бизнеса
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  borderRadius: 3,
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(0, 38, 100, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                    boxShadow: '0 6px 25px rgba(0, 38, 100, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Начать работу
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;