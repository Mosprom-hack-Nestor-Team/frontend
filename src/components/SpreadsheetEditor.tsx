import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    Paper,
    Chip,
} from '@mui/material';
import { apiService, type CellUpdate, type SpreadsheetDetail } from '../services/api';

interface SpreadsheetEditorProps {
    spreadsheet: SpreadsheetDetail;
    onUpdate: () => void;
}

interface CellPosition {
    row: number;
    col: number;
}

interface CellStyle {
    bold?: boolean;
    italic?: boolean;
    color?: string;
    backgroundColor?: string;
}

interface ActiveUser {
    email: string;
    color: string;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

export const SpreadsheetEditor: React.FC<SpreadsheetEditorProps> = ({
    spreadsheet,
    onUpdate,
}) => {
    const [cells, setCells] = useState<Record<string, any>>(spreadsheet.cells || {});
    const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
    const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
    const [editValue, setEditValue] = useState('');
    const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const canEdit = spreadsheet.my_permission === 'owner' || spreadsheet.my_permission === 'edit';

    // WebSocket connection
    useEffect(() => {
        if (!canEdit) return;

        const wsUrl = apiService.getWebSocketUrl(spreadsheet.id);
        const websocket = new WebSocket(wsUrl);

        websocket.onopen = () => {
            console.log('WebSocket connected');
        };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleWebSocketMessage(message);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        setWs(websocket);

        // Ping every 30 seconds to keep connection alive
        const pingInterval = setInterval(() => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);

        return () => {
            clearInterval(pingInterval);
            websocket.close();
        };
    }, [spreadsheet.id, canEdit]);

    const handleWebSocketMessage = (message: any) => {
        switch (message.type) {
            case 'cell_update':
                // Update cell from another user
                const cellRef = `${message.cell.row}_${message.cell.col}`;
                setCells((prev) => ({
                    ...prev,
                    [cellRef]: {
                        value: message.cell.value,
                        value_type: message.cell.value_type,
                        formula: message.cell.formula,
                        style: message.cell.style || {},
                    },
                }));
                break;

            case 'user_joined':
                // Add user to active users
                const userColor = COLORS[activeUsers.length % COLORS.length];
                setActiveUsers((prev) => [
                    ...prev.filter((u) => u.email !== message.user_email),
                    { email: message.user_email, color: userColor },
                ]);
                break;

            case 'user_left':
                // Remove user from active users
                setActiveUsers((prev) => prev.filter((u) => u.email !== message.user_email));
                break;

            case 'version_conflict':
                // Handle version conflict - reload spreadsheet
                console.warn('Version conflict detected, reloading...');
                onUpdate();
                break;
        }
    };

    const getCellRef = (row: number, col: number): string => {
        return `${row}_${col}`;
    };

    const getCellValue = (row: number, col: number): any => {
        const cellRef = getCellRef(row, col);
        return cells[cellRef]?.value ?? '';
    };

    const getCellStyle = (row: number, col: number): CellStyle => {
        const cellRef = getCellRef(row, col);
        return cells[cellRef]?.style || {};
    };

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    const handleCellDoubleClick = (row: number, col: number) => {
        if (!canEdit) return;

        setEditingCell({ row, col });
        setEditValue(getCellValue(row, col)?.toString() || '');
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Только обновляем editValue для мгновенного отображения в TextField
        // НЕ трогаем cells state, чтобы избежать ререндера всей таблицы
        setEditValue(newValue);
    };

    const handleCellBlur = async () => {
        if (!editingCell) return;

        // Обновляем cells state и сохраняем на сервер
        const cellRef = getCellRef(editingCell.row, editingCell.col);
        const currentStyle = getCellStyle(editingCell.row, editingCell.col);

        setCells((prev) => ({
            ...prev,
            [cellRef]: {
                value: editValue,
                value_type: 'text',
                style: currentStyle,
            },
        }));

        await saveCellToServer(editingCell.row, editingCell.col, editValue);
        setEditingCell(null);
    };

    const handleCellKeyDown = async (e: React.KeyboardEvent) => {
        if (!editingCell) return;

        if (e.key === 'Enter') {
            e.preventDefault();

            // Обновляем cells state перед сохранением
            const cellRef = getCellRef(editingCell.row, editingCell.col);
            const currentStyle = getCellStyle(editingCell.row, editingCell.col);

            setCells((prev) => ({
                ...prev,
                [cellRef]: {
                    value: editValue,
                    value_type: 'text',
                    style: currentStyle,
                },
            }));

            await saveCellToServer(editingCell.row, editingCell.col, editValue);

            // Move to next row
            const nextRow = editingCell.row + 1;
            if (nextRow < spreadsheet.rows) {
                setEditingCell({ row: nextRow, col: editingCell.col });
                setSelectedCell({ row: nextRow, col: editingCell.col });
                setEditValue(getCellValue(nextRow, editingCell.col)?.toString() || '');
                setTimeout(() => inputRef.current?.focus(), 0);
            } else {
                setEditingCell(null);
            }
        } else if (e.key === 'Escape') {
            // Отменяем редактирование без сохранения
            setEditingCell(null);
        } else if (e.key === 'Tab') {
            e.preventDefault();

            // Обновляем cells state перед сохранением
            const cellRef = getCellRef(editingCell.row, editingCell.col);
            const currentStyle = getCellStyle(editingCell.row, editingCell.col);

            setCells((prev) => ({
                ...prev,
                [cellRef]: {
                    value: editValue,
                    value_type: 'text',
                    style: currentStyle,
                },
            }));

            await saveCellToServer(editingCell.row, editingCell.col, editValue);

            // Move to next column
            const nextCol = editingCell.col + 1;
            if (nextCol < spreadsheet.cols) {
                setEditingCell({ row: editingCell.row, col: nextCol });
                setSelectedCell({ row: editingCell.row, col: nextCol });
                setEditValue(getCellValue(editingCell.row, nextCol)?.toString() || '');
                setTimeout(() => inputRef.current?.focus(), 0);
            } else {
                setEditingCell(null);
            }
        }
    };

    const saveCellToServer = async (row: number, col: number, value: any) => {
        const currentStyle = getCellStyle(row, col);

        try {
            const cellUpdate: CellUpdate = {
                row,
                col,
                value,
                value_type: 'text',
                style: currentStyle,
            };

            // Сохраняем на сервере
            await apiService.updateCell(spreadsheet.id, cellUpdate);

            // Broadcast via WebSocket
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: 'cell_update',
                        spreadsheet_id: spreadsheet.id,
                        cell: cellUpdate,
                        version: spreadsheet.version,
                    })
                );
            }
        } catch (error) {
            console.error('Failed to save cell:', error);
            // В случае ошибки можно показать уведомление
        }
    };

    const getColumnLabel = (col: number): string => {
        let label = '';
        let num = col;
        while (num >= 0) {
            label = String.fromCharCode(65 + (num % 26)) + label;
            num = Math.floor(num / 26) - 1;
        }
        return label;
    };

    const renderCell = (row: number, col: number) => {
        const isSelected = selectedCell?.row === row && selectedCell?.col === col;
        const isEditing = editingCell?.row === row && editingCell?.col === col;
        const value = getCellValue(row, col);
        const style = getCellStyle(row, col);

        if (isEditing) {
            return (
                <TextField
                    ref={inputRef}
                    value={editValue}
                    onChange={handleCellChange}
                    onBlur={handleCellBlur}
                    onKeyDown={handleCellKeyDown}
                    size="small"
                    fullWidth
                    autoFocus
                    variant="standard"
                    sx={{
                        '& .MuiInputBase-root': {
                            height: '100%',
                            fontSize: '14px',
                            padding: '4px 8px',
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: '2px solid #1976d2',
                        },
                    }}
                    InputProps={{
                        disableUnderline: false,
                    }}
                />
            );
        }

        return (
            <Box
                onClick={() => handleCellClick(row, col)}
                onDoubleClick={() => handleCellDoubleClick(row, col)}
                sx={{
                    width: '100%',
                    height: '100%',
                    padding: '8px',
                    cursor: canEdit ? 'cell' : 'default',
                    backgroundColor: isSelected ? '#E3F2FD' : style.backgroundColor || 'transparent',
                    border: isSelected ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    fontWeight: style.bold ? 'bold' : 'normal',
                    fontStyle: style.italic ? 'italic' : 'normal',
                    color: style.color || 'inherit',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '14px',
                    '&:hover': canEdit ? {
                        backgroundColor: isSelected ? '#E3F2FD' : '#f5f5f5',
                    } : {},
                }}
            >
                {value}
            </Box>
        );
    };

    return (
        <Box>
            {/* Toolbar */}
            <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box display="flex" gap={1} flexWrap="wrap">
                    {activeUsers.map((user) => (
                        <Chip
                            key={user.email}
                            label={user.email.split('@')[0]}
                            size="small"
                            sx={{
                                backgroundColor: user.color,
                                color: 'white',
                            }}
                        />
                    ))}
                </Box>
            </Paper>

            {/* Grid */}
            <Paper sx={{ overflow: 'auto', maxHeight: '70vh' }}>
                <Box sx={{ display: 'inline-block', minWidth: '100%' }}>
                    {/* Header row */}
                    <Box sx={{ display: 'flex', position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#f5f5f5' }}>
                        <Box
                            sx={{
                                width: '60px',
                                height: '40px',
                                border: '1px solid #e0e0e0',
                                backgroundColor: '#f5f5f5',
                            }}
                        />
                        {Array.from({ length: spreadsheet.cols }).map((_, col) => (
                            <Box
                                key={col}
                                sx={{
                                    width: '120px',
                                    height: '40px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                }}
                            >
                                {getColumnLabel(col)}
                            </Box>
                        ))}
                    </Box>

                    {/* Data rows */}
                    {Array.from({ length: spreadsheet.rows }).map((_, row) => (
                        <Box key={row} sx={{ display: 'flex' }}>
                            {/* Row header */}
                            <Box
                                sx={{
                                    width: '60px',
                                    height: '40px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                }}
                            >
                                {row + 1}
                            </Box>

                            {/* Cells */}
                            {Array.from({ length: spreadsheet.cols }).map((_, col) => (
                                <Box
                                    key={col}
                                    sx={{
                                        width: '120px',
                                        height: '40px',
                                        position: 'relative',
                                    }}
                                >
                                    {renderCell(row, col)}
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};
