import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../services/api';

type NavItem = {
  label: string;
  path: string;
};

type NavbarProps = {
  user?: {
    name?: string;
    role?: string;
  };
  onLogout?: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navItems: NavItem[] = user
    ? [
        { label: 'Главная', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Отдел', path: '/department' },
        { label: 'О нас', path: '/about' },
      ]
    : [
        { label: 'Главная', path: '/' },
        { label: 'О нас', path: '/about' },
      ];

  const isActive = (path: string) => location.pathname === path;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    if (onLogout) onLogout();
    navigate('/login', { replace: true });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{
        background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
        borderBottom: `2px solid rgba(135, 200, 220, 0.3)`,
      }}
    >
      <Toolbar sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', px: { xs: 2, md: 3 } }}>
        {/* Логотип Nestor Team */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 3,
          }}
          onClick={() => navigate('/')}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
              borderRadius: 2,
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TableChartIcon sx={{ color: '#002664', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              background: 'linear-gradient(45deg, #ffffff 30%, #87c8dc 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              letterSpacing: '0.5px',
            }}
          >
            AeroDocs
          </Typography>
        </Box>

        {/* Desktop nav */}
        <Box 
          sx={{ 
            flex: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center',
          }}
        >
          <Stack direction="row" spacing={1}>
            {navItems.map((item, index) => (
              <Button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                variant={isActive(item.path) ? 'contained' : 'text'}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  ...(isActive(item.path) 
                    ? {
                        background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                        color: '#002664',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #a5d6e5 0%, #87c8dc 100%)',
                        }
                      }
                    : {
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        }
                      }
                  ),
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Right side (desktop) */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            gap: 2,
          }}
        >
          {user ? (
            <>
              <Box
                onClick={handleMenuOpen}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  cursor: 'pointer',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#002664',
                  }}
                >
                  {getInitials(user.name || 'User')}
                </Avatar>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2, color: 'white' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" sx={{ lineHeight: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
                    {user.role}
                  </Typography>
                </Box>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { 
                    mt: 1, 
                    minWidth: 200,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid rgba(135, 200, 220, 0.3)',
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/profile');
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(135, 200, 220, 0.1)',
                    }
                  }}
                >
                  <PersonIcon sx={{ mr: 1.5, fontSize: 20, color: '#002664' }} />
                  <Typography sx={{ color: '#002664', fontWeight: 500 }}>
                    Профиль
                  </Typography>
                </MenuItem>
                <Divider sx={{ my: 1, backgroundColor: 'rgba(135, 200, 220, 0.3)' }} />
                <MenuItem 
                  onClick={handleLogout} 
                  sx={{ 
                    color: '#eb735a',
                    '&:hover': {
                      backgroundColor: 'rgba(235, 115, 90, 0.1)',
                    }
                  }}
                >
                  <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  <Typography sx={{ fontWeight: 500 }}>
                    Выход
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button 
                size="medium" 
                onClick={() => navigate('/login')} 
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderColor: '#87c8dc',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Вход
              </Button>
              <Button 
                size="medium" 
                onClick={() => navigate('/register')} 
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                  color: '#002664',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #a5d6e5 0%, #87c8dc 100%)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Регистрация
              </Button>
            </Stack>
          )}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            size="large"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer for mobile */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              color: 'white',
            }
          }}
        >
          <Box sx={{ width: 280, p: 3, height: '100%' }} role="presentation">
            {/* Заголовок в Drawer */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <TableChartIcon sx={{ mr: 2, color: '#87c8dc', fontSize: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                Nestor Team
              </Typography>
            </Box>

            {user && (
              <Box sx={{ mb: 4, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#002664',
                    }}
                  >
                    {getInitials(user.name || 'User')}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'white' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            <List>
              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton 
                    onClick={() => handleNavigate(item.path)} 
                    selected={isActive(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: isActive(item.path) ? 'rgba(135, 200, 220, 0.3)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(135, 200, 220, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(135, 200, 220, 0.4)',
                        }
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{
                        sx: { 
                          fontWeight: 600,
                          color: isActive(item.path) ? '#87c8dc' : 'white'
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 4 }}>
              {user ? (
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    onClick={() => {
                      navigate('/profile');
                      setDrawerOpen(false);
                    }}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#87c8dc',
                      }
                    }}
                  >
                    Профиль
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      borderColor: '#eb735a',
                      color: '#eb735a',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(235, 115, 90, 0.1)',
                        borderColor: '#eb735a',
                      }
                    }}
                  >
                    Выход
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => handleNavigate('/login')}
                    sx={{
                      background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                      color: '#002664',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #a5d6e5 0%, #87c8dc 100%)',
                      }
                    }}
                  >
                    Войти
                  </Button>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    onClick={() => handleNavigate('/register')}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Регистрация
                  </Button>
                </Stack>
              )}
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;