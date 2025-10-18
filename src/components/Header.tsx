import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import { AccountCircle, TableChart, Dashboard } from '@mui/icons-material';

interface HeaderProps {
  onTableCreate: () => void;
  user?: {
    name: string;
    role: string;
  };
  onBack?: () => void;
  currentView?: 'dashboard' | 'table';
}

const Header: React.FC<HeaderProps> = ({ 
  onTableCreate, 
  user, 
  onBack,
  currentView = 'dashboard'
}) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.gentianBlue.main} 100%)`,
        borderBottom: `3px solid ${theme.palette.lightBlue.main}`,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <TableChart sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff 30%, #87c8dc 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            AeroDocs
          </Typography>
        </Box>
        
        <Typography variant="h6" component="div" sx={{ 
          flexGrow: 1,
          fontWeight: 600,
          color: 'white'
        }}>
          {currentView === 'dashboard' ? 'Database Management System' : 'Редактор таблицы'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {currentView === 'table' && onBack && (
            <Button 
              color="inherit"
              onClick={onBack}
              sx={{ 
                color: 'white',
                '&:hover': { 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
              }}
            >
              ← Назад к таблицам
            </Button>
          )}
          
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={onTableCreate}
            startIcon={<TableChart />}
            sx={{ 
              borderColor: 'white',
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderColor: theme.palette.lightBlue.main,
              },
              fontWeight: 500,
            }}
          >
            Новая таблица
          </Button>
          
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <AccountCircle />
              </IconButton>
              <Box sx={{ color: 'white' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;