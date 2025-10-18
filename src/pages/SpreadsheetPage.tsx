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
} from '@mui/material';
import {
    Share as ShareIcon,
    ArrowBack as BackIcon,
    Delete as DeleteIcon,
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

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!spreadsheet) {
        return (
            <Container maxWidth="xl" sx={{ py: 8 }}>
                <Alert severity="warning">Таблица не найдена</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={() => navigate('/dashboard')}>
                        <BackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h4" component="h1">
                            {spreadsheet.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {spreadsheet.rows} × {spreadsheet.cols} ячеек •
                            Версия {spreadsheet.version} •
                            Доступ: {spreadsheet.my_permission === 'owner' ? 'Владелец' :
                                spreadsheet.my_permission === 'edit' ? 'Редактор' : 'Просмотр'}
                        </Typography>
                    </Box>
                </Box>

                {spreadsheet.my_permission === 'owner' && (
                    <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        onClick={() => setShareDialogOpen(true)}
                    >
                        Поделиться
                    </Button>
                )}
            </Box>

            {/* Editor */}
            <SpreadsheetEditor spreadsheet={spreadsheet} onUpdate={loadSpreadsheet} />

            {/* Permissions section (only for owner) */}
            {spreadsheet.my_permission === 'owner' && spreadsheet.permissions.length > 0 && (
                <Paper sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Пользователи с доступом
                    </Typography>
                    <List>
                        {spreadsheet.permissions.map((perm, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={perm.user_email}
                                    secondary={
                                        perm.permission_level === 'edit' ? 'Редактор' : 'Просмотр'
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemovePermission(perm.user_email)}
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
            <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
                <DialogTitle>Поделиться таблицей</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email пользователя"
                        type="email"
                        fullWidth
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Уровень доступа</InputLabel>
                        <Select
                            value={sharePermission}
                            label="Уровень доступа"
                            onChange={(e) => setSharePermission(e.target.value as 'edit' | 'view')}
                        >
                            <MenuItem value="view">Просмотр</MenuItem>
                            <MenuItem value="edit">Редактирование</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShareDialogOpen(false)}>Отмена</Button>
                    <Button onClick={handleShare} variant="contained" color="primary">
                        Поделиться
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SpreadsheetPage;
