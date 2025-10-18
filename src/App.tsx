import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'table'>('dashboard');
  const [currentTableId, setCurrentTableId] = useState<string | null>(null);
  const [tables, setTables] = useState(mockTables);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning' 
  });

  const user = {
    name: 'Алексей Гульчак',
    role: 'Администратор'
  };

  // Функции для Dashboard
  const handleTableCreate = () => {
    const newTable = {
      id: Date.now().toString(),
      name: `Новая таблица ${tables.length + 1}`,
      description: 'Описание новой таблицы',
      columnsCount: 0,
      rowsCount: 0,
      lastModified: new Date().toISOString(),
      created: new Date().toISOString(),
      type: 'table'
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

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({ open: true, message, severity });
  };

  // Получаем данные для текущей таблицы
  const currentTableData = currentTableId ? mockTableData[currentTableId] : null;
  const currentTableInfo = tables.find(table => table.id === currentTableId);

  return (
    <Router>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Box>

        {/* Уведомления */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            severity={snackbar.severity}
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            sx={{
              fontFamily: 'Arial',
              borderRadius: 2,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;