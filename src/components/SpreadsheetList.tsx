import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    Menu,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService, type SpreadsheetInfo, type SpreadsheetCreate } from '../services/api';

export const SpreadsheetList: React.FC = () => {
    const navigate = useNavigate();
    const [spreadsheets, setSpreadsheets] = useState<SpreadsheetInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<SpreadsheetInfo | null>(null);

    useEffect(() => {
        loadSpreadsheets();
    }, []);

    const loadSpreadsheets = async () => {
        try {
            setLoading(true);
            const data = await apiService.getSpreadsheets();
            setSpreadsheets(data);
        } catch (error) {
            console.error('Failed to load spreadsheets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newTitle.trim()) return;

        try {
            const data: SpreadsheetCreate = {
                title: newTitle,
                rows: 100,
                cols: 26,
            };
            const newSpreadsheet = await apiService.createSpreadsheet(data);
            setSpreadsheets([newSpreadsheet, ...spreadsheets]);
            setCreateDialogOpen(false);
            setNewTitle('');

            navigate(`/spreadsheet/${newSpreadsheet.id}`);
        } catch (error) {
            console.error('Failed to create spreadsheet:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту таблицу?')) return;

        try {
            await apiService.deleteSpreadsheet(id);
            setSpreadsheets(spreadsheets.filter((s) => s.id !== id));
        } catch (error) {
            console.error('Failed to delete spreadsheet:', error);
            alert('Не удалось удалить таблицу');
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, spreadsheet: SpreadsheetInfo) => {
        setAnchorEl(event.currentTarget);
        setSelectedSpreadsheet(spreadsheet);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSpreadsheet(null);
    };

    const getPermissionChip = (permission: string) => {
        const colors: Record<string, 'default' | 'primary' | 'secondary' | 'success'> = {
            owner: 'primary',
            edit: 'success',
            view: 'default',
        };

        const labels: Record<string, string> = {
            owner: 'Владелец',
            edit: 'Редактор',
            view: 'Просмотр',
        };

        return (
            <Chip
                label={labels[permission] || permission}
                color={colors[permission] || 'default'}
                size="small"
            />
        );
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Мои таблицы
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}
                >
                    Создать таблицу
                </Button>
            </Box>

            {spreadsheets.length === 0 ? (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        У вас пока нет таблиц
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={3}>
                        Создайте свою первую таблицу для начала работы
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setCreateDialogOpen(true)}
                    >
                        Создать таблицу
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {spreadsheets.map((spreadsheet) => (
                        <Card
                            key={spreadsheet.id}
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4,
                                },
                            }}
                            onClick={() => navigate(`/spreadsheet/${spreadsheet.id}`)}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start">
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {spreadsheet.title}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuOpen(e, spreadsheet);
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>

                                <Box mb={2}>
                                    {getPermissionChip(spreadsheet.my_permission)}
                                </Box>

                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {spreadsheet.rows} × {spreadsheet.cols} ячеек
                                </Typography>

                                <Typography variant="caption" color="textSecondary">
                                    Обновлено: {formatDate(spreadsheet.updated_at)}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
                <DialogTitle>Создать новую таблицу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Название таблицы"
                        type="text"
                        fullWidth
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleCreate();
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDialogOpen(false)}>Отмена</Button>
                    <Button onClick={handleCreate} variant="contained" color="primary">
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => {
                        if (selectedSpreadsheet) {
                            navigate(`/spreadsheet/${selectedSpreadsheet.id}`);
                        }
                        handleMenuClose();
                    }}
                >
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Открыть
                </MenuItem>
                {selectedSpreadsheet?.my_permission === 'owner' && (
                    <MenuItem
                        onClick={() => {
                            if (selectedSpreadsheet) {
                                handleDelete(selectedSpreadsheet.id);
                            }
                            handleMenuClose();
                        }}
                    >
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                        Удалить
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};
