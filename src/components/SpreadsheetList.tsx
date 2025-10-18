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
    Paper,
    Stack,
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
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress 
                    sx={{ 
                        color: '#002664',
                        width: 40,
                        height: 40 
                    }} 
                />
            </Box>
        );
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography 
                    variant="h4" 
                    sx={{
                        fontWeight: 700,
                        color: '#002664',
                    }}
                >
                    Мои таблицы
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateDialogOpen(true)}
                    sx={{
                        background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                        borderRadius: 2,
                        px: 3,
                        py: 1,
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
                    Создать таблицу
                </Button>
            </Box>

            {spreadsheets.length === 0 ? (
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 6, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(135, 200, 220, 0.1) 0%, rgba(15, 77, 188, 0.05) 100%)',
                        border: '2px dashed rgba(135, 200, 220, 0.5)',
                        textAlign: 'center',
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        <Typography 
                            variant="h5" 
                            sx={{
                                fontWeight: 600,
                                color: '#002664',
                            }}
                        >
                            У вас пока нет таблиц
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="text.secondary"
                            sx={{ 
                                maxWidth: 400,
                                lineHeight: 1.6,
                            }}
                        >
                            Создайте свою первую таблицу для начала работы
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setCreateDialogOpen(true)}
                            sx={{
                                background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
                                borderRadius: 2,
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
                            Создать таблицу
                        </Button>
                    </Stack>
                </Paper>
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
                        <Paper
                            key={spreadsheet.id}
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                                border: '2px solid',
                                borderColor: 'rgba(135, 200, 220, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: '#002664',
                                    background: 'linear-gradient(135deg, #ffffff 0%, rgba(0, 38, 100, 0.05) 100%)',
                                    boxShadow: '0 8px 25px rgba(0, 38, 100, 0.15)',
                                },
                            }}
                            onClick={() => navigate(`/spreadsheet/${spreadsheet.id}`)}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 600,
                                            color: '#002664',
                                            lineHeight: 1.3,
                                            flex: 1,
                                            mr: 1
                                        }}
                                    >
                                        {spreadsheet.title}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuOpen(e, spreadsheet);
                                        }}
                                        sx={{
                                            color: '#002664',
                                            '&:hover': {
                                                background: 'rgba(0, 38, 100, 0.1)',
                                            }
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>

                                <Box mb={2}>
                                    {getPermissionChip(spreadsheet.my_permission)}
                                </Box>

                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    gutterBottom
                                    sx={{ fontWeight: 500 }}
                                >
                                    {spreadsheet.rows} × {spreadsheet.cols} ячеек
                                </Typography>

                                <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ fontSize: '0.8rem' }}
                                >
                                    Обновлено: {formatDate(spreadsheet.updated_at)}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}

            <Dialog 
                open={createDialogOpen} 
                onClose={() => setCreateDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                        border: '1px solid rgba(0, 38, 100, 0.1)',
                    }
                }}
            >
                <DialogTitle 
                    sx={{ 
                        fontWeight: 600,
                        color: '#002664',
                        background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.05) 0%, transparent 100%)',
                    }}
                >
                    Создать новую таблицу
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
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
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button 
                        onClick={() => setCreateDialogOpen(false)}
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
                        onClick={handleCreate} 
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
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        border: '1px solid rgba(0, 38, 100, 0.1)',
                        boxShadow: '0 4px 20px rgba(0, 38, 100, 0.1)',
                    }
                }}
            >
                <MenuItem
                    onClick={() => {
                        if (selectedSpreadsheet) {
                            navigate(`/spreadsheet/${selectedSpreadsheet.id}`);
                        }
                        handleMenuClose();
                    }}
                    sx={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: '#002664',
                    }}
                >
                    <EditIcon fontSize="small" sx={{ mr: 1, color: '#002664' }} />
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
                        sx={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: '#d32f2f',
                        }}
                    >
                        <DeleteIcon fontSize="small" sx={{ mr: 1, color: '#d32f2f' }} />
                        Удалить
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};