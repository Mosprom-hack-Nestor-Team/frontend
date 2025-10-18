import {
  Box,
  Flex,
  Button,
  Stack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from '@chakra-ui/react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'О нас', path: '/about' },
    { label: 'Вход', path: '/login' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box bg="white" px={4} shadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="container.xl" mx="auto">
        <Heading
          size="md"
          bgGradient="to-r"
          gradientFrom="blue.400"
          gradientTo="purple.500"
          bgClip="text"
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          MyApp
        </Heading>

        {/* Desktop Navigation */}
        <Stack direction="row" gap={4} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              variant={isActive(item.path) ? 'solid' : 'ghost'}
              colorPalette={isActive(item.path) ? 'blue' : 'gray'}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        {/* Mobile Navigation */}
        <DrawerRoot placement="end">
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              variant="ghost"
              aria-label="Open menu"
            >
              <HiMenuAlt3 size={24} />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>Меню</DrawerHeader>
            <DrawerCloseTrigger />
            <DrawerBody>
              <Stack gap={4}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    variant={isActive(item.path) ? 'solid' : 'ghost'}
                    colorPalette={isActive(item.path) ? 'blue' : 'gray'}
                    w="full"
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
      </Flex>
    </Box>
  );
};
