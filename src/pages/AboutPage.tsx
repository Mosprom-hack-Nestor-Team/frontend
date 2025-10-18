import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TeamMemberProps {
  name: string;
  role: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role }) => {
  const getInitials = (nameStr: string) =>
    nameStr
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
        transition: 'transform 0.18s ease',
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontWeight: 700 }}>
          {getInitials(name)}
        </Avatar>

        <Box textAlign="center">
          <Typography variant="subtitle1" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export const AboutPage: React.FC = () => {
  const theme = useTheme();

  const advantages = [
    'Интуитивно понятный интерфейс',
    'Быстрая обработка больших объемов данных',
    'Надежная защита и шифрование информации',
    'Круглосуточная техническая поддержка',
    'Гибкая система тарификации',
  ];

  const team = [
    { name: 'Алексей Иванов', role: 'CEO & Founder' },
    { name: 'Мария Петрова', role: 'CTO' },
    { name: 'Дмитрий Сидоров', role: 'Lead Developer' },
    { name: 'Елена Козлова', role: 'UI/UX Designer' },
  ];

  const technologies = ['React', 'TypeScript', 'MUI', 'FastAPI', 'PostgreSQL', 'Docker'];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={6}>
        {/* Header */}
        <Box textAlign="center">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            О нашем проекте
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 900, mx: 'auto' }}>
            Мы создаем инновационные решения для бизнеса, используя современные технологии
            и лучшие практики разработки.
          </Typography>
        </Box>

        {/* Mission + Advantages */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2 }}>
          <Stack spacing={3}>
            <Typography variant="h5">Наша миссия</Typography>
            <Typography color="text.secondary">
              Предоставить доступные и эффективные инструменты для управления данными,
              которые помогут компаниям любого размера принимать обоснованные решения
              на основе аналитики. Мы верим в силу данных и стремимся сделать их
              использование простым и интуитивным.
            </Typography>

            <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
              <Typography variant="h6" mb={2}>
                Наши преимущества
              </Typography>

              <Stack spacing={1}>
                {advantages.map((adv, idx) => (
                  <Stack key={idx} direction="row" alignItems="center" spacing={1}>
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                    <Typography>{adv}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Team */}
        <Box>
          <Typography variant="h5" textAlign="center" mb={1}>
            Наша команда
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Профессионалы, которые создают будущее
          </Typography>

          <Grid container spacing={3}>
            {team.map((member, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <TeamMember {...member} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technologies */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, bgcolor: 'purple.50' }}>
          <Stack spacing={2}>
            <Typography variant="h6">🚀 Технологии</Typography>
            <Typography color="text.secondary">
              Мы используем современный стек технологий: React, TypeScript, MUI,
              FastAPI, PostgreSQL и многое другое. Наш код соответствует лучшим практикам
              и постоянно совершенствуется.
            </Typography>

            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {technologies.map((tech, i) => (
                <Chip key={i} label={tech} color="primary" variant="filled" />
              ))}
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default AboutPage;