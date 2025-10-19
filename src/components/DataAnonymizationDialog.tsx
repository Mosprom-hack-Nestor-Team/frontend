import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Chip,
  Stack,
  Alert,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface AnonymizationFinding {
  type: string;
  count: number;
  description: string;
  risk: 'high' | 'medium' | 'low';
}

interface DataAnonymizationDialogProps {
  open: boolean;
  fileName: string;
  findings: AnonymizationFinding[];
  onConfirm: (confirmed: boolean) => void;
  onCancel: () => void;
}

export const DataAnonymizationDialog: React.FC<DataAnonymizationDialogProps> = ({
  open,
  fileName,
  findings,
  onConfirm,
  onCancel,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [understandRisk, setUnderstandRisk] = useState(false);

  const totalFindings = findings.reduce((sum, finding) => sum + finding.count, 0);
  const highRiskFindings = findings.filter(f => f.risk === 'high').length;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#d32f2f';
      case 'medium': return '#ff9800';
      case 'low': return '#00afa5';
      default: return '#87c8dc';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <WarningIcon sx={{ fontSize: 16 }} />;
      default: return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    }
  };

  const handleConfirm = () => {
    onConfirm(true);
    setConfirmed(false);
    setUnderstandRisk(false);
  };

  const handleCancel = () => {
    onCancel();
    setConfirmed(false);
    setUnderstandRisk(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
          border: '1px solid rgba(0, 38, 100, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 38, 100, 0.15)',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: 700,
          color: '#002664',
          background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(0, 38, 100, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SecurityIcon sx={{ color: '#002664' }} />
          Проверка конфиденциальности данных
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
          Перед загрузкой файла <strong>"{fileName}"</strong> необходимо подтвердить, 
          что конфиденциальные данные были обезличены.
        </Typography>

        {/* Статистика находок */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Chip 
              label={`${totalFindings} находок`}
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label={`${highRiskFindings} высокого риска`}
              color="error"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Stack>

          {/* Список находок */}
          <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
            {findings.map((finding, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 1,
                  borderRadius: 2,
                  border: `1px solid ${getRiskColor(finding.risk)}20`,
                  background: `${getRiskColor(finding.risk)}08`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {getRiskIcon(finding.risk)}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: getRiskColor(finding.risk) }}>
                    {finding.type}
                  </Typography>
                  <Chip 
                    label={finding.count}
                    size="small"
                    sx={{ 
                      backgroundColor: getRiskColor(finding.risk),
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {finding.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Предупреждение о высоком риске */}
        {highRiskFindings > 0 && (
          <Alert 
            severity="warning"
            sx={{
              mb: 3,
              borderRadius: 2,
              border: '1px solid rgba(255, 152, 0, 0.2)',
              background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(255, 152, 0, 0.02) 100%)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Обнаружены данные высокого риска. Убедитесь, что вся конфиденциальная информация была обезличена.
            </Typography>
          </Alert>
        )}

        {/* Чекбоксы подтверждения */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                sx={{
                  color: '#002664',
                  '&.Mui-checked': {
                    color: '#002664',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Подтверждаю, что все конфиденциальные данные в файле были обезличены
              </Typography>
            }
          />

          {highRiskFindings > 0 && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={understandRisk}
                  onChange={(e) => setUnderstandRisk(e.target.checked)}
                  sx={{
                    color: '#ff9800',
                    '&.Mui-checked': {
                      color: '#ff9800',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Понимаю риски и принимаю ответственность за загрузку данных высокого риска
                </Typography>
              }
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          onClick={handleCancel}
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
          onClick={handleConfirm}
          disabled={!confirmed || (highRiskFindings > 0 && !understandRisk)}
          variant="contained"
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
            '&.Mui-disabled': {
              background: 'rgba(0, 38, 100, 0.1)',
              color: 'rgba(0, 38, 100, 0.3)',
            },
          }}
        >
          Подтвердить и загрузить
        </Button>
      </DialogActions>
    </Dialog>
  );
};