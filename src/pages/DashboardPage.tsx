import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { SpreadsheetList } from '../components/SpreadsheetList';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Dashboard
          </Typography>
          <Typography color="text.secondary">
            Управляйте своими таблицами и совместной работой
          </Typography>
        </Box>

        <SpreadsheetList />
      </Stack>
    </Container>
  );
};

export default DashboardPage;