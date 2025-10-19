import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { SpreadsheetList } from '../components/SpreadsheetList';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    // Log visit and load stats
    apiService.logVisit('dashboard').catch(() => {});
    apiService.getStatsSummary(7).then(setStats).catch(() => {});
  }, [navigate]);

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
      py: { xs: 3, md: 4 }
    }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Header Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
              border: '1px solid',
              borderColor: 'rgba(0, 38, 100, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  <DashboardIcon sx={{ fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    Dashboard
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 400,
                      mt: 0.5
                    }}
                  >
                    Управляйте своими таблицами и совместной работой
                  </Typography>
                </Box>
              </Box>

              {/* Stats Cards */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)'
                  },
                  gap: 2,
                  mt: 1
                }}
              >
                {[
                  { label: 'Всего таблиц', value: '12', color: '#002664' },
                  { label: 'Активные', value: '8', color: '#0f4dbc' },
                  { label: 'Совместные', value: '5', color: '#00afa5' },
                  { label: 'Шаблоны', value: '3', color: '#87c8dc' }
                ].map((stat, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '2px solid',
                      borderColor: 'rgba(135, 200, 220, 0.3)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: stat.color,
                        background: `linear-gradient(135deg, #ffffff 0%, ${stat.color}08 100%)`,
                        boxShadow: '0 4px 15px rgba(0, 38, 100, 0.12)',
                      },
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800,
                        color: stat.color,
                        mb: 0.5,
                        fontSize: { xs: '1.5rem', md: '1.75rem' }
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          </Paper>

          {/* Real Stats (summary) */}
          {stats && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                border: '1px solid rgba(0, 38, 100, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, minWidth: 180 }}>
                  <Typography variant="caption" color="text.secondary">Мои таблицы</Typography>
                  <Typography variant="h6">{stats.owned}</Typography>
                </Box>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, minWidth: 180 }}>
                  <Typography variant="caption" color="text.secondary">Доступные (всего)</Typography>
                  <Typography variant="h6">{stats.total}</Typography>
                </Box>
                <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2, minWidth: 220 }}>
                  <Typography variant="caption" color="text.secondary">Открытий за {stats.visits.days} дн.</Typography>
                  <Typography variant="h6">{stats.visits.opens_last_days}</Typography>
                </Box>
              </Box>
            </Paper>
          )}

          {/* Spreadsheet List Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(135, 200, 220, 0.08) 0%, rgba(15, 77, 188, 0.05) 100%)',
              border: '2px solid rgba(135, 200, 220, 0.3)',
            }}
          >
            <Box>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  mb: 3,
                  fontSize: '1rem'
                }}
              >
                Создавайте новые таблицы или работайте с существующими
              </Typography>
              
              <SpreadsheetList />
            </Box>
          </Paper>

          {/* Quick Actions */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, rgba(15, 77, 188, 0.08) 100%)',
              border: '2px solid rgba(0, 38, 100, 0.1)',
              textAlign: 'center',
            }}
          >
            <Stack spacing={3} alignItems="center">
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#002664',
                }}
              >
                Быстрый старт
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  maxWidth: 500,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontSize: '1rem'
                }}
              >
                Начните работу с создания новой таблицы или импорта данных для анализа
              </Typography>

              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {[
                  { label: 'Новая таблица', color: '#002664' },
                  { label: 'Импорт данных', color: '#0f4dbc' },
                  { label: 'Использовать шаблон', color: '#00afa5' }
                ].map((action, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '2px solid',
                      borderColor: 'rgba(135, 200, 220, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      minWidth: 140,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: action.color,
                        background: `linear-gradient(135deg, #ffffff 0%, ${action.color}08 100%)`,
                        boxShadow: '0 4px 15px rgba(0, 38, 100, 0.12)',
                      },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600,
                        color: action.color,
                        fontSize: '0.9rem'
                      }}
                    >
                      {action.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default DashboardPage;
