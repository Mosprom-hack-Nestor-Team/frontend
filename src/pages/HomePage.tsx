import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// MUI icons
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableChartIcon from '@mui/icons-material/TableChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AeroLinesBackground from '../components/AeroLinesBackground';

type FeatureProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const Feature: React.FC<FeatureProps> = ({ title, text, icon }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'rgba(0, 38, 100, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0, 38, 100, 0.15)',
          borderColor: 'rgba(135, 200, 220, 0.4)',
        },
        height: '100%',
      }}
    >
      <Avatar
        sx={{
          width: 70,
          height: 70,
          background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
          alignSelf: 'flex-start',
          boxShadow: '0 4px 12px rgba(0, 38, 100, 0.3)',
        }}
        aria-hidden
      >
        {icon}
      </Avatar>

      <Box>
        <Typography 
          variant="h5" 
          component="h3" 
          sx={{ 
            fontWeight: 600,
            color: '#002664',
            mb: 1
          }}
        >
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {text}
        </Typography>
      </Box>
    </Paper>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Умные таблицы',
      text: 'Создавайте структурированные таблицы с поддержкой различных типов данных и сложных связей.',
      icon: <TableChartIcon sx={{ fontSize: 32 }} />
    },
    {
      title: 'Высокая производительность',
      text: 'Работайте с большими объемами данных без потери скорости благодаря оптимизированному движку.',
      icon: <SpeedIcon sx={{ fontSize: 32 }} />
    },
    {
      title: 'Безопасность данных',
      text: 'Ваши данные защищены современными методами шифрования и системой разграничения доступа.',
      icon: <SecurityIcon sx={{ fontSize: 32 }} />
    },
    {
      title: 'Импорт из Excel',
      text: 'Легко переносите данные из Excel-файлов с сохранением структуры и форматов.',
      icon: <StorageIcon sx={{ fontSize: 32 }} />
    },
    {
      title: 'Аналитика и отчеты',
      text: 'Стройте сложные отчеты и аналитические панели на основе ваших данных.',
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />
    },
    {
      title: 'Командная работа',
      text: 'Работайте вместе с коллегами в реальном времени с системой контроля изменений.',
      icon: <GroupIcon sx={{ fontSize: 32 }} />
    },
  ];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AeroLinesBackground />
      
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          px: 2,
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={4}
            alignItems="center"
            textAlign="center"
            sx={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3.5rem' },
                lineHeight: 1.1,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
              }}
            >
              Превратите Excel в базу данных
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Современная платформа для управления табличными данными. 
              Работайте эффективнее без потерь данных и конфликтов версий.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ pt: 2 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(0, 38, 100, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 38, 100, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Начать работу
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  borderColor: '#002664',
                  color: '#002664',
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: '#0f4dbc',
                    backgroundColor: 'rgba(15, 77, 188, 0.04)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
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
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Наши возможности
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 720, 
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Все что нужно для эффективной работы с данными
            </Typography>
          </Box>

          {/* Простая CSS Grid без сложных компонентов */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;