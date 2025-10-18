import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Button,
    Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { apiService, type UserData } from '../services/api';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        // Check if user is authenticated
        if (!apiService.isAuthenticated()) {
            navigate('/login');
            return;
        }

        // Get user data
        const storedUser = apiService.getStoredUser();
        setUser(storedUser);
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await apiService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always redirect to login after logout attempt
            navigate('/login', { replace: true });
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Box minH="calc(100vh - 64px)" bg="gray.50" position="relative">
            {/* Logout Button in Top Right */}
            <Box position="absolute" top={4} right={4} zIndex={10}>
                <Button
                    colorPalette="red"
                    onClick={handleLogout}
                    variant="outline"
                    size="md"
                >
                    <FiLogOut style={{ marginRight: '8px' }} />
                    Выход
                </Button>
            </Box>

            {/* Center Content */}
            <Container maxW="container.md">
                <Flex
                    minH="calc(100vh - 64px)"
                    align="center"
                    justify="center"
                >
                    <Box textAlign="center" bg="white" p={12} rounded="xl" shadow="lg" w="full">
                        <Stack gap={6}>
                            <Box>
                                <Heading
                                    fontSize="4xl"
                                    bgGradient="to-r"
                                    gradientFrom="blue.400"
                                    gradientTo="purple.500"
                                    bgClip="text"
                                    mb={4}
                                >
                                    Добро пожаловать! 🎉
                                </Heading>
                                <Text fontSize="xl" color="gray.700" fontWeight="semibold" mb={2}>
                                    {user.name}
                                </Text>
                                <Text color="gray.500" fontSize="sm">
                                    {user.email}
                                </Text>
                            </Box>

                            <Box bg="blue.50" p={6} rounded="lg">
                                <Text color="gray.700" fontSize="lg">
                                    Вы успешно авторизованы в системе!
                                </Text>
                                <Text color="gray.600" fontSize="sm" mt={2}>
                                    Роль: <strong>{user.role}</strong>
                                </Text>
                            </Box>

                            <Box pt={4}>
                                <Text color="gray.500" fontSize="sm">
                                    Ваш аккаунт был создан:{' '}
                                    <strong>{new Date(user.created_at).toLocaleDateString('ru-RU')}</strong>
                                </Text>
                            </Box>

                            <Box bg="purple.50" p={4} rounded="lg" borderLeft="4px" borderColor="purple.500">
                                <Text color="gray.700" fontSize="sm">
                                    💡 Это защищенная страница. Используйте кнопку "Выход" в правом верхнем углу для завершения сессии.
                                </Text>
                            </Box>
                        </Stack>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};
