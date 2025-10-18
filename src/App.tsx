import { useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Box,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataTable, { type ColumnDefinition, type TableRowData } from './components/DataTable';
import AeroLinesBackground from './components/AeroLinesBackground';
import { theme } from './theme';

// Mock данные для демонстрации
const mockTables = [
  {
    id: '1',
    name: 'Сотрудники компании',
    description: 'База данных всех сотрудников с контактной информацией',
    columnsCount: 8,
    rowsCount: 47,
    lastModified: '2024-01-20T10:30:00',
    created: '2024-01-15T09:00:00',
    type: 'table'
  },
  {
    id: '2', 
    name: 'Проекты и задачи',
    description: 'Текущие проекты, их статусы и ответственные',
    columnsCount: 6,
    rowsCount: 23,
    lastModified: '2024-01-19T14:20:00',
    created: '2024-01-10T11:00:00',
    type: 'table'
  },
  {
    id: '3',
    name: 'Финансовые отчеты',
    description: 'Ежемесячные финансовые показатели и аналитика',
    columnsCount: 12,
    rowsCount: 156,
    lastModified: '2024-01-20T16:45:00',
    created: '2024-01-05T08:30:00',
    type: 'table'
  },
  {
    id: '4',
    name: 'Складские запасы',
    description: 'Учет товаров на складе и движение материалов',
    columnsCount: 7,
    rowsCount: 89,
    lastModified: '2024-01-18T09:15:00', 
    created: '2024-01-08T14:00:00',
    type: 'table'
  },
  {
    id: '5',
    name: 'Клиентская база',
    description: 'Информация о клиентах и история взаимодействий',
    columnsCount: 9,
    rowsCount: 234,
    lastModified: '2024-01-21T11:20:00',
    created: '2024-01-12T10:30:00',
    type: 'table'
  },
  {
    id: '6',
    name: 'Маркетинг кампании',
    description: 'Данные по рекламным кампаниям и их эффективности',
    columnsCount: 5,
    rowsCount: 34,
    lastModified: '2024-01-17T13:45:00',
    created: '2024-01-09T16:20:00',
    type: 'table'
  }
];

// Mock данные для таблицы "Сотрудники"
const mockTableData: Record<string, { columns: ColumnDefinition[], data: TableRowData[] }> = {
  '1': {
    columns: [
      { id: 'fullName', name: 'ФИО', type: 'text' },
      { id: 'department', name: 'Отдел', type: 'text' },
      { id: 'position', name: 'Должность', type: 'text' },
      { id: 'salary', name: 'Зарплата', type: 'number' },
      { id: 'hireDate', name: 'Дата найма', type: 'timestamp' },
      { id: 'status', name: 'Статус', type: 'list', listValues: ['Активен', 'Отпуск', 'Больничный', 'Уволен'] },
      { id: 'email', name: 'Email', type: 'text' },
      { id: 'phone', name: 'Телефон', type: 'text' }
    ],
    data: [
      {
        id: '1',
        fullName: 'Иванов Иван Иванович',
        department: 'IT',
        position: 'Senior Developer',
        salary: 150000,
        hireDate: '2022-03-15T00:00:00',
        status: 'Активен',
        email: 'ivanov@company.com',
        phone: '+7 (999) 123-45-67'
      },
      {
        id: '2',
        fullName: 'Петрова Анна Сергеевна',
        department: 'HR',
        position: 'HR Manager',
        salary: 90000,
        hireDate: '2023-01-10T00:00:00', 
        status: 'Активен',
        email: 'petrova@company.com',
        phone: '+7 (999) 234-56-78'
      },
      {
        id: '3',
        fullName: 'Сидоров Алексей Петрович',
        department: 'Finance',
        position: 'Financial Analyst',
        salary: 120000,
        hireDate: '2021-11-20T00:00:00',
        status: 'Отпуск',
        email: 'sidorov@company.com',
        phone: '+7 (999) 345-67-89'
      }
    ]
  }
};

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AeroLinesBackground />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header 
          onTableCreate={handleTableCreate} 
          user={user}
          onBack={currentView === 'table' ? handleBackToDashboard : undefined}
          currentView={currentView}
        />
        
        <Box sx={{ flex: 1 }}>
          {currentView === 'dashboard' ? (
            <Dashboard
              tables={tables}
              onTableCreate={handleTableCreate}
              onTableEdit={handleTableEdit}
              onTableDelete={handleTableDelete}
              onTableOpen={handleTableOpen}
            />
          ) : currentTableData && currentTableInfo ? (
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {currentTableInfo.name}
                </Typography>
                {currentTableInfo.description && (
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {currentTableInfo.description}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {currentTableInfo.columnsCount} колонок • {currentTableData.data.length} записей
                </Typography>
              </Box>
              
              <DataTable
                columns={currentTableData.columns}
                data={currentTableData.data}
                onRowUpdate={handleRowUpdate}
                onRowDelete={handleRowDelete}
              />
            </Container>
          ) : (
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Typography variant="h4" color="text.secondary" textAlign="center" sx={{ mt: 8 }}>
                Таблица не найдена
              </Typography>
            </Container>
          )}
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