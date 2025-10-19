import React from 'react';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface NotificationProps {
  open: boolean;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  progress?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  open,
  type,
  title,
  message,
  duration = 6000,
  onClose,
  progress,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ fontSize: 24 }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 24 }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 24 }} />;
      case 'loading':
        return <CircularProgress size={24} sx={{ color: '#002664' }} />;
      default:
        return <InfoIcon sx={{ fontSize: 24 }} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#00afa5';
      case 'error':
        return '#d32f2f';
      case 'warning':
        return '#ff9800';
      case 'loading':
        return '#002664';
      default:
        return '#0f4dbc';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={type === 'loading' ? null : duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbar-root': {
          top: '80px',
        }
      }}
    >
      <Alert
        icon={getIcon()}
        onClose={type === 'loading' ? undefined : onClose}
        severity={type === 'loading' ? 'info' : type}
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          border: `2px solid ${getColor()}20`,
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
          boxShadow: '0 8px 32px rgba(0, 38, 100, 0.15)',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: getColor(), mb: message ? 0.5 : 0 }}>
            {title}
          </Typography>
          {message && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4 }}>
              {message}
            </Typography>
          )}
          {type === 'loading' && progress !== undefined && (
            <Box sx={{ mt: 1.5 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 38, 100, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                    borderRadius: 3,
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {progress}% завершено
              </Typography>
            </Box>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
};