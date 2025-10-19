import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { SpreadsheetList } from '../components/SpreadsheetList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Notification } from '../components/Notification';
import type { NotificationType } from '../components/Notification';
import { DataAnonymizationDialog } from '../components/DataAnonymizationDialog';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [stats, setStats] = useState<any | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    type: NotificationType;
    title: string;
    message?: string;
    progress?: number;
  }>({
    open: false,
    type: 'info',
    title: '',
  });

  const [anonymizationDialog, setAnonymizationDialog] = useState<{
    open: boolean;
    fileName: string;
    findings: any[];
  }>({
    open: false,
    fileName: '',
    findings: [],
  });

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    apiService.logVisit('dashboard').catch(() => {});
    apiService.getStatsSummary(7).then(setStats).catch(() => {});
  }, [navigate]);

  // Функция для показа уведомлений
  const showNotification = (type: NotificationType, title: string, message?: string, progress?: number) => {
    setNotification({
      open: true,
      type,
      title,
      message,
      progress,
    });
  };

  // Имитация AI-анализа файла
  const analyzeFileForSensitiveData = async (file: File): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockFindings = [
          {
            type: 'Email адреса',
            count: Math.floor(Math.random() * 10) + 1,
            description: 'Обнаружены email адреса сотрудников',
            risk: 'high' as const,
          },
          {
            type: 'Телефоны',
            count: Math.floor(Math.random() * 5) + 1,
            description: 'Найдены номера телефонов',
            risk: 'medium' as const,
          },
          {
            type: 'Имена',
            count: Math.floor(Math.random() * 15) + 1,
            description: 'Обнаружены полные имена',
            risk: 'medium' as const,
          },
        ];
        resolve(mockFindings);
      }, 1500);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    showNotification('loading', 'Анализ файла', 'Проверяем на наличие конфиденциальных данных...');

    try {
      // AI-анализ файла
      const findings = await analyzeFileForSensitiveData(file);
      
      setNotification({ open: false, type: 'info', title: '' });

      if (findings.length > 0) {
        // Показываем диалог подтверждения обезличивания
        setAnonymizationDialog({
          open: true,
          fileName: file.name,
          findings,
        });
      } else {
        // Если находок нет, сразу загружаем
        setSelectedFile(file);
        setImportDialogOpen(true);
        showNotification('success', 'Файл проверен', 'Конфиденциальные данные не обнаружены');
      }
    } catch (error) {
      showNotification('error', 'Ошибка анализа', 'Не удалось проанализировать файл');
    }
  };

  const handleAnonymizationConfirm = async (confirmed: boolean) => {
    setAnonymizationDialog(prev => ({ ...prev, open: false }));

    if (confirmed && selectedFile) {
      setImportDialogOpen(true);
      showNotification('success', 'Подтверждение получено', 'Приступаем к импорту файла');
    } else {
      showNotification('warning', 'Загрузка отменена', 'Подтверждение обезличивания не получено');
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImportLoading(true);
    showNotification('loading', 'Импорт файла', 'Создаем таблицу и обрабатываем данные...', 0);

    try {
      // Имитация прогресса
      const progressInterval = setInterval(() => {
        setNotification(prev => ({
          ...prev,
          progress: Math.min((prev.progress || 0) + 10, 90)
        }));
      }, 300);

      const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
      const spreadsheetData = {
        title: fileName,
        rows: 100,
        cols: 26,
      };

      const newSpreadsheet = await apiService.createSpreadsheet(spreadsheetData);
      
      clearInterval(progressInterval);
      showNotification('loading', 'Завершение импорта', 'Финальная обработка...', 95);

      // Небольшая задержка для плавности
      await new Promise(resolve => setTimeout(resolve, 500));

      setImportDialogOpen(false);
      setSelectedFile(null);
      
      showNotification('success', 'Файл импортирован', `Таблица "${fileName}" успешно создана`);
      
      setTimeout(() => {
        navigate(`/spreadsheet/${newSpreadsheet.id}`);
      }, 1000);

    } catch (error) {
      showNotification('error', 'Ошибка импорта', 'Не удалось создать таблицу из файла');
    } finally {
      setImportLoading(false);
    }
  };

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
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="file-upload-input"
                />
                
                {[
                  { 
                    label: 'Новая таблица', 
                    color: '#002664',
                    onClick: () => {/* логика создания новой таблицы */}
                  },
                  { 
                    label: 'Импорт данных', 
                    color: '#0f4dbc',
                    onClick: () => document.getElementById('file-upload-input')?.click()
                  },
                  { 
                    label: 'Использовать шаблон', 
                    color: '#00afa5',
                    onClick: () => {/* логика использования шаблона */}
                  }
                ].map((action, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    onClick={action.onClick}
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

      {/* Уведомления */}
      <Notification
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        progress={notification.progress}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      />

      {/* Диалог импорта */}
      <Dialog 
        open={importDialogOpen} 
        onClose={() => !importLoading && setImportDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
            border: '1px solid rgba(0, 38, 100, 0.1)',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            fontWeight: 700,
            color: '#002664',
            background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, transparent 100%)',
          }}
        >
          Импорт файла
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedFile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '2px dashed rgba(135, 200, 220, 0.5)', borderRadius: 2 }}>
              <InsertDriveFileIcon sx={{ color: '#002664' }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#002664' }}>
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            </Box>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Будет создана новая таблица с названием файла. Данные будут доступны для редактирования.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setImportDialogOpen(false)}
            disabled={importLoading}
            sx={{
              color: '#002664',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleImport}
            disabled={!selectedFile || importLoading}
            variant="contained"
            startIcon={importLoading ? <CloudUploadIcon /> : null}
            sx={{
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0, 38, 100, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                boxShadow: '0 6px 20px rgba(0, 38, 100, 0.4)',
              },
            }}
          >
            {importLoading ? 'Импорт...' : 'Импортировать'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения обезличивания */}
      <DataAnonymizationDialog
        open={anonymizationDialog.open}
        fileName={anonymizationDialog.fileName}
        findings={anonymizationDialog.findings}
        onConfirm={handleAnonymizationConfirm}
        onCancel={() => setAnonymizationDialog(prev => ({ ...prev, open: false }))}
      />
    </Box>
  );
};

export default DashboardPage;