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
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 2,
          }}
          onClick={() => navigate('/')}
        >
          <Typography
            variant="h6"
            sx={{
              background: 'linear-gradient(90deg,#60a5fa 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            MyApp
          </Typography>
        </Box>

        {/* Desktop nav */}
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                variant={isActive(item.path) ? 'contained' : 'text'}
                color={isActive(item.path) ? 'primary' : 'inherit'}
                sx={{
                  textTransform: 'none',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Right side (desktop) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
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
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'primary.main',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {getInitials(user.name || 'User')}
                </Avatar>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
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
                  sx: { mt: 1, minWidth: 200 },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/profile');
                  }}
                >
                  <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  Профиль
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                  <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
                  Выход
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button size="small" onClick={() => navigate('/login')} variant="outlined">
                Вход
              </Button>
              <Button size="small" onClick={() => navigate('/register')} variant="contained">
                Регистрация
              </Button>
            </>
          )}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            aria-label="open menu"
            onClick={() => setDrawerOpen(true)}
            size="large"
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
        >
          <Box sx={{ width: 280, p: 2, height: '100%' }} role="presentation">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Меню
            </Typography>

            {user && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: 'primary.main',
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(user.name || 'User')}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            <List>
              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton onClick={() => handleNavigate(item.path)} selected={isActive(item.path)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 3 }}>
              {user ? (
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    onClick={() => {
                      navigate('/profile');
                      setDrawerOpen(false);
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
                  >
                    Выход
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={1}>
                  <Button fullWidth variant="contained" onClick={() => handleNavigate('/login')}>
                    Войти
                  </Button>
                  <Button fullWidth variant="text" onClick={() => handleNavigate('/register')}>
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