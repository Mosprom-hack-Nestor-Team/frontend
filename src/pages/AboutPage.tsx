import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import AeroLinesBackground from '../components/AeroLinesBackground';

// Иконки
import DashboardIcon from '@mui/icons-material/Dashboard';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';

export const AboutPage: React.FC = () => {
  const theme = useTheme();

  const advantages = [
    {
      text: 'Интуитивно понятный интерфейс',
      icon: <DashboardIcon sx={{ fontSize: 32 }} />,
      color: '#002664'
    },
    {
      text: 'Искусственный интеллект для анализа данных',
      icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
      color: '#0f4dbc'
    },
    {
      text: 'Быстрая обработка больших объемов данных',
      icon: <SpeedIcon sx={{ fontSize: 32 }} />,
      color: '#00afa5'
    },
    {
      text: 'Надежная защита и шифрование информации',
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      color: '#87c8dc'
    },
    {
      text: 'Круглосуточная техническая поддержка',
      icon: <SupportAgentIcon sx={{ fontSize: 32 }} />,
      color: '#002664'
    },
    {
      text: 'Гибкая система тарификации',
      icon: <AttachMoneyIcon sx={{ fontSize: 32 }} />,
      color: '#0f4dbc'
    },
  ];

  const technologies = ['React', 'TypeScript', 'MUI', 'FastAPI', 'PostgreSQL', 'Docker', 'AI/ML', 'Python'];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AeroLinesBackground />
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
        <Stack spacing={8}>
          {/* Header */}
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2,
              }}
            >
              О нашем проекте
            </Typography>

            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 900, 
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Мы создаем инновационные решения для бизнеса, используя современные технологии
              и лучшие практики разработки.
            </Typography>
          </Box>

          {/* Mission - отдельная подложка */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
              border: '1px solid',
              borderColor: 'rgba(0, 38, 100, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
            }}
          >
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#002664',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                <RocketLaunchIcon sx={{ fontSize: 40, color: '#002664' }} />
                Наша миссия
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  maxWidth: 1000,
                  mx: 'auto',
                }}
              >
                Предоставить доступные и эффективные инструменты для управления данными,
                которые помогут компаниям любого размера принимать обоснованные решения
                на основе аналитики. Мы верим в силу данных и стремимся сделать их
                использование простым и интуитивным.
              </Typography>
            </Box>
          </Paper>

          {/* Advantages - чистые карточки на фоне */}
          <Box>
            <Typography 
              variant="h3" 
              mb={6}
              sx={{ 
                fontWeight: 700,
                color: '#002664',
                textAlign: 'center'
              }}
            >
              Наши преимущества
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                gap: 4,
              }}
            >
              {advantages.map((advantage, idx) => (
                <Paper
                  key={idx}
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
                      transform: 'translateY(-4px)',
                      borderColor: advantage.color,
                      background: `linear-gradient(135deg, #ffffff 0%, ${advantage.color}08 100%)`,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${advantage.color} 0%, ${advantage.color}99 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    {advantage.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#002664',
                      lineHeight: 1.4
                    }}
                  >
                    {advantage.text}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>

          {/* AI Feature */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, rgba(15, 77, 188, 0.08) 100%)',
              border: '2px solid rgba(0, 38, 100, 0.2)',
            }}
          >
            <Stack spacing={4} alignItems="center">
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 2,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 48 }} />
              </Box>
              
              <Typography 
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textAlign: 'center',
                }}
              >
                Искусственный Интеллект
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  textAlign: 'center',
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                Наша платформа использует передовые алгоритмы машинного обучения для 
                автоматического анализа данных, прогнозирования трендов и генерации 
                умных рекомендаций
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                {['Авто-аналитика', 'Прогнозирование', 'Умные рекомендации', 'NLP обработка', 'Компьютерное зрение'].map((feature, i) => (
                  <Chip 
                    key={i} 
                    label={feature} 
                    sx={{
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Paper>

          {/* Technologies */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 5, 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, rgba(135, 200, 220, 0.15) 0%, rgba(15, 77, 188, 0.08) 100%)',
              border: '2px solid rgba(135, 200, 220, 0.4)',
            }}
          >
            <Stack spacing={4}>
              <Typography 
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#002664',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'center'
                }}
              >
                <RocketLaunchIcon sx={{ fontSize: 36, color: '#002664' }} />
                Технологический стек
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.7
                }}
              >
                Мы используем современный стек технологий для создания надежных и 
                производительных решений. Наш код соответствует лучшим практикам
                и постоянно совершенствуется.
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {technologies.map((tech, i) => (
                  <Chip 
                    key={i} 
                    label={tech} 
                    sx={{
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      color: 'white',
                      fontWeight: 600,
                      px: 3,
                      py: 1.5,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutPage;