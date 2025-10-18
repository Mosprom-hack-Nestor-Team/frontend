import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    Stack,
} from '@mui/material';
import {
    Share as ShareIcon,
    ArrowBack as BackIcon,
    Delete as DeleteIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import { apiService, type SpreadsheetDetail, type ShareSpreadsheet } from '../services/api';
import { SpreadsheetEditor } from '../components/SpreadsheetEditor';

export const SpreadsheetPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [spreadsheet, setSpreadsheet] = useState<SpreadsheetDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [shareEmail, setShareEmail] = useState('');
    const [sharePermission, setSharePermission] = useState<'edit' | 'view'>('view');

    useEffect(() => {
        if (!apiService.isAuthenticated()) {
            navigate('/login');
            return;
        }

        loadSpreadsheet();
    }, [id, navigate]);

    const loadSpreadsheet = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const data = await apiService.getSpreadsheet(id);
            setSpreadsheet(data);
        } catch (err: any) {
            console.error('Failed to load spreadsheet:', err);
            setError(err.message || 'Не удалось загрузить таблицу');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!id || !shareEmail.trim()) return;

        try {
            const shareData: ShareSpreadsheet = {
                user_email: shareEmail,
                permission_level: sharePermission,
            };
            await apiService.shareSpreadsheet(id, shareData);
            setShareDialogOpen(false);
            setShareEmail('');
            await loadSpreadsheet(); // Reload to get updated permissions
        } catch (err: any) {
            console.error('Failed to share:', err);
            alert(err.message || 'Не удалось поделиться таблицей');
        }
    };

    const handleRemovePermission = async (userEmail: string) => {
        if (!id || !window.confirm(`Удалить доступ для ${userEmail}?`)) return;

        try {
            await apiService.removePermission(id, userEmail);
            await loadSpreadsheet();
        } catch (err: any) {
            console.error('Failed to remove permission:', err);
            alert(err.message || 'Не удалось удалить доступ');
        }
    };

    const getPermissionChip = (permission: string) => {
        const colors: Record<string, any> = {
            owner: {
                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                color: 'white'
            },
            edit: {
                background: 'linear-gradient(135deg, #00afa5 0%, #00c9b6 100%)',
                color: 'white'
            },
            view: {
                background: 'linear-gradient(135deg, #87c8dc 0%, #a8d8ea 100%)',
                color: '#002664'
            },
        };

        const labels: Record<string, string> = {
            owner: 'Владелец',
            edit: 'Редактор',
            view: 'Просмотр',
        };

        const style = colors[permission] || {
            background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
            color: '#666666'
        };

        return (
            <Chip
                label={labels[permission] || permission}
                size="small"
                sx={{
                    background: style.background,
                    color: style.color,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                    '& .MuiChip-label': {
                        px: 1,
                    }
                }}
            />
        );
    };

    if (loading) {
        return (
            <Box sx={{ 
                position: 'relative', 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
                py: 8 
            }}>
                <Container maxWidth="xl">
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                        <CircularProgress 
                            sx={{ 
                                color: '#002664',
                                width: 40,
                                height: 40 
                            }} 
                        />
                    </Box>
                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ 
                position: 'relative', 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
                py: 8 
            }}>
                <Container maxWidth="xl">
                    <Alert 
                        severity="error"
                        sx={{
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                            border: '1px solid rgba(211, 47, 47, 0.2)',
                        }}
                    >
                        {error}
                    </Alert>
                </Container>
            </Box>
        );
    }

    if (!spreadsheet) {
        return (
            <Box sx={{ 
                position: 'relative', 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
                py: 8 
            }}>
                <Container maxWidth="xl">
                    <Alert 
                        severity="warning"
                        sx={{
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                            border: '1px solid rgba(255, 152, 0, 0.2)',
                        }}
                    >
                        Таблица не найдена
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            position: 'relative', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.02) 0%, rgba(15, 77, 188, 0.04) 100%)',
            py: 4 
        }}>
            <Container maxWidth="xl">
                {/* Header */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 4, 
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                        border: '1px solid rgba(0, 38, 100, 0.1)',
                        boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={3}>
                            <IconButton 
                                onClick={() => navigate('/dashboard')}
                                sx={{
                                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                <BackIcon />
                            </IconButton>
                            <Box>
                                <Typography 
                                    variant="h3" 
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                        mb: 1,
                                    }}
                                >
                                    {spreadsheet.title}
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body1" color="text.secondary">
                                        {spreadsheet.rows} × {spreadsheet.cols} ячеек
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        • Версия {spreadsheet.version} •
                                    </Typography>
                                    {getPermissionChip(spreadsheet.my_permission)}
                                </Stack>
                            </Box>
                        </Box>

                        {spreadsheet.my_permission === 'owner' && (
                            <Button
                                variant="contained"
                                startIcon={<ShareIcon />}
                                onClick={() => setShareDialogOpen(true)}
                                sx={{
                                    background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 15px rgba(0, 38, 100, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0f4dbc 0%, #002664 100%)',
                                        boxShadow: '0 6px 20px rgba(0, 38, 100, 0.4)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease-in-out',
                                }}
                            >
                                Поделиться
                            </Button>
                        )}
                    </Box>
                </Paper>

                {/* Editor */}
                <SpreadsheetEditor spreadsheet={spreadsheet} onUpdate={loadSpreadsheet} />

                {/* Permissions section (only for owner) */}
                {spreadsheet.my_permission === 'owner' && spreadsheet.permissions.length > 0 && (
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 4, 
                            mt: 4,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, rgba(135, 200, 220, 0.08) 0%, rgba(15, 77, 188, 0.05) 100%)',
                            border: '2px solid rgba(135, 200, 220, 0.3)',
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2} mb={3}>
                            <PeopleIcon sx={{ color: '#002664', fontSize: 28 }} />
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: '#002664'
                                }}
                            >
                                Пользователи с доступом
                            </Typography>
                        </Box>
                        <List>
                            {spreadsheet.permissions.map((perm, idx) => (
                                <ListItem
                                    key={idx}
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.7)',
                                        borderRadius: 2,
                                        mb: 1,
                                        border: '1px solid rgba(135, 200, 220, 0.3)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" fontWeight={600}>
                                                {perm.user_email}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 0.5 }}>
                                                {getPermissionChip(perm.permission_level)}
                                            </Box>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleRemovePermission(perm.user_email)}
                                            sx={{
                                                color: '#d32f2f',
                                                '&:hover': {
                                                    background: 'rgba(211, 47, 47, 0.1)',
                                                },
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                {/* Share Dialog */}
                <Dialog 
                    open={shareDialogOpen} 
                    onClose={() => setShareDialogOpen(false)}
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
                        Поделиться таблицей
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3, pb: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email пользователя"
                            type="email"
                            fullWidth
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                sx: {
                                    borderRadius: 2,
                                }
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Уровень доступа</InputLabel>
                            <Select
                                value={sharePermission}
                                label="Уровень доступа"
                                onChange={(e) => setSharePermission(e.target.value as 'edit' | 'view')}
                                sx={{
                                    borderRadius: 2,
                                }}
                            >
                                <MenuItem value="view">Просмотр</MenuItem>
                                <MenuItem value="edit">Редактирование</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, pt: 0 }}>
                        <Button 
                            onClick={() => setShareDialogOpen(false)}
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
                            onClick={handleShare} 
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
                            }}
                        >
                            Поделиться
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default SpreadsheetPage;