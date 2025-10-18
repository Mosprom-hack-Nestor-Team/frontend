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
import Grid from '@mui/material/Grid';

// MUI icons
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type FeatureProps = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const Feature: React.FC<FeatureProps> = ({ title, text, icon }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          bgcolor: 'primary.main',
          alignSelf: 'flex-start',
        }}
        aria-hidden
      >
        {icon}
      </Avatar>

      <Typography variant="h6" component="h3">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Paper>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          bgcolor: 'rgba(59,130,246,0.06)', // blue.50 like
          py: { xs: 10, md: 14 },
          px: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={4}
            alignItems="center"
            textAlign="center"
            sx={{ maxWidth: 960, margin: '0 auto' }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3.5rem' },
                lineHeight: 1.05,
                fontWeight: 700,
                background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Добро пожаловать в наше приложение
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: 720,
                fontWeight: 400,
              }}
            >
              Современное решение для управления данными и аналитики. Простой интерфейс, мощные возможности.
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                endIcon={<ArrowForwardIcon />}
              >
                Перейти к Dashboard
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
              >
                Узнать больше
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Наши возможности
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
              Все что нужно для эффективной работы
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }}>

           

            
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;  