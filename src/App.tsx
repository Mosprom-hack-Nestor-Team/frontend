import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
} from '@mui/material';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { SpreadsheetPage } from './pages/SpreadsheetPage';
// import { DepartmentPage } from './pages/DepartmentPage';
import { apiService, type UserData } from './services/api';

/**
 * Типы (адаптируй под свою модель)
 */
type Table = {
  id: string;
  name: string;
  description?: string;
  columnsCount?: number;
  rowsCount?: number;
  lastModified?: string;
  created?: string;
  type?: string;
};

/**
 * Заглушки — замените на реальные данные / загрузку из API
 */
const mockTables: Table[] = [
  {
    id: '1',
    name: 'Пример таблицы',
    description: 'Тестовая таблица',
    columnsCount: 3,
    rowsCount: 12,
    lastModified: new Date().toISOString(),
    created: new Date().toISOString(),
    type: 'table',
  },
];

const mockTableData: Record<string, any[]> = {
  '1': [
    { id: 'r1', name: 'Row 1', value: 123 },
    { id: 'r2', name: 'Row 2', value: 456 },
  ],
};

const theme = createTheme({
  palette: {
    mode: 'light',
    // добавь кастомизацию темы сюда при необходимости
  },
});

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'table'>('dashboard');
  const [currentTableId, setCurrentTableId] = useState<string | null>(null);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: '',
  });

  // Получаем данные пользователя из localStorage
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = apiService.getStoredUser();
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  // Функции для Dashboard
  const handleTableCreate = () => {
    const newTable: Table = {
      id: Date.now().toString(),
      name: `Новая таблица ${tables.length + 1}`,
      description: 'Описание новой таблицы',
      columnsCount: 0,
      rowsCount: 0,
      lastModified: new Date().toISOString(),
      created: new Date().toISOString(),
      type: 'table',
    };
    setTables(prev => [...prev, newTable]);
    showSnackbar('Таблица создана', 'success');
  };

  const handleTableEdit = (tableId: string) => {
    showSnackbar('Редактирование таблицы', 'info');
  };

  const handleTableDelete = (tableId: string) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    showSnackbar('Таблица удалена', 'success');
  };

  const handleTableOpen = (tableId: string) => {
    setCurrentTableId(tableId);
    setCurrentView('table');
    showSnackbar('Таблица открыта', 'info');
  };

  // Функции для DataTable
  const handleRowUpdate = (rowId: string, newData: any) => {
    showSnackbar('Запись обновлена', 'success');
  };

  const handleRowDelete = (rowId: string) => {
    showSnackbar('Запись удалена', 'success');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentTableId(null);
  };

  const showSnackbar = (message: string, severity: any) => {
    setSnackbar({ open: true, message });
  };

  // Получаем данные для текущей таблицы
  const currentTableData = currentTableId ? mockTableData[currentTableId] ?? null : null;
  const currentTableInfo = tables.find(table => table.id === currentTableId) ?? null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar user={user || undefined} onLogout={handleLogout} />
          <Box component="main" flex="1">
            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/dashboard"
                  element={<DashboardPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/spreadsheet/:id" element={<SpreadsheetPage />} />
                {/* <Route path="/department" element={<DepartmentPage />} /> */}
                {/* Пример маршрута таблицы (если требуется) */}
                <Route
                  path="/table/:id"
                  element={
                    /* DashboardPage / TablePage можно заменить на реальную страницу таблицы */
                    <DashboardPage />
                  }
                />
              </Routes>
            </Container>
          </Box>

          <Footer />

          {/* Уведомления */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
              sx={{
                fontFamily: 'Arial, sans-serif',
                borderRadius: 1,
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;