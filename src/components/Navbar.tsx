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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

type NavItem = {
  label: string;
  path: string;
};

type NavbarProps = {
  user?: {
    name?: string;
    role?: string;
  };
};

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'О нас', path: '/about' },
    { label: 'Вход', path: '/login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
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
            <Typography variant="body2" color="text.secondary">
              {user.name}
            </Typography>
          ) : (
            <Button size="small" onClick={() => navigate('/login')}>
              Вход
            </Button>
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
                <Button fullWidth variant="outlined" onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
                  Профиль
                </Button>
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