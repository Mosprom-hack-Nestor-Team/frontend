import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  useTheme,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle,
  Schedule,
  LocalHospital,
  Block
} from '@mui/icons-material';

export interface ColumnDefinition {
  id: string;
  name: string;
  type: 'text' | 'number' | 'timestamp' | 'list';
  listValues?: string[];
}

export interface TableRowData {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  columns: ColumnDefinition[];
  data: TableRowData[];
  onRowUpdate: (rowId: string, data: any) => void;
  onRowDelete: (rowId: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onRowUpdate,
  onRowDelete,
}) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  const handleEdit = (row: TableRowData) => {
    setEditingRow(row.id);
    setEditData({ ...row });
  };

  const handleSave = () => {
    if (editingRow) {
      onRowUpdate(editingRow, editData);
      setEditingRow(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleChange = (columnId: string, value: any) => {
    setEditData((prev: any) => ({
      ...prev,
      [columnId]: value
    }));
  };

  // Функция для генерации аватара по имени
  const getAvatarProps = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = ['#002664', '#0f4dbc', '#87c8dc', '#00afa5', '#eb735a'];
    const color = colors[name.length % colors.length];
    
    return {
      sx: {
        bgcolor: color,
        width: 32,
        height: 32,
        fontSize: '0.875rem',
        fontWeight: 600,
      },
      children: initials,
    };
  };

  // Функция для статусных иконок
  const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Активен':
      return <CheckCircle sx={{ color: '#00afa5', fontSize: 18 }} />;
    case 'Отпуск':
      return <Schedule sx={{ color: '#0f4dbc', fontSize: 18 }} />;
    case 'Больничный':
      return <LocalHospital sx={{ color: '#eb735a', fontSize: 18 }} />;
    case 'Уволен':
      return <Block sx={{ color: '#5a5a5a', fontSize: 18 }} />;
    default:
      return <CheckCircle sx={{ color: 'rgba(90, 90, 90, 0.3)', fontSize: 18 }} />;
  }
};

  const renderCell = (row: TableRowData, column: ColumnDefinition) => {
    const value = row[column.id];
    
    if (editingRow === row.id) {
      switch (column.type) {
        case 'list':
          return (
            <Select
              value={editData[column.id] || ''}
              onChange={(e) => handleChange(column.id, e.target.value)}
              size="small"
              fullWidth
              sx={{ 
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(135, 200, 220, 0.5)',
                }
              }}
            >
              {column.listValues?.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        case 'number':
          return (
            <TextField
              type="number"
              value={editData[column.id] || ''}
              onChange={(e) => handleChange(column.id, parseFloat(e.target.value) || 0)}
              size="small"
              fullWidth
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          );
        case 'timestamp':
          return (
            <TextField
              type="datetime-local"
              value={editData[column.id] || ''}
              onChange={(e) => handleChange(column.id, e.target.value)}
              size="small"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          );
        default:
          return (
            <TextField
              value={editData[column.id] || ''}
              onChange={(e) => handleChange(column.id, e.target.value)}
              size="small"
              fullWidth
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          );
      }
    }

    // Display values
    switch (column.type) {
      case 'list':
        return (
          <Chip 
            icon={getStatusIcon(value)}
            label={value} 
            size="small" 
            variant="outlined"
            sx={{
              borderColor: 'rgba(135, 200, 220, 0.5)',
              color: '#5a9cb5',
              backgroundColor: 'rgba(135, 200, 220, 0.08)',
              fontWeight: 500,
              '& .MuiChip-icon': { color: '#5a9cb5' }
            }}
          />
        );
      case 'timestamp':
        return value ? new Date(value).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) : '-';
      case 'number':
        return value ? value.toLocaleString('ru-RU') : '-';
      default:
        if (column.id === 'fullName' && value) {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar {...getAvatarProps(value)} />
              <Typography variant="body2" fontWeight={500}>
                {value}
              </Typography>
            </Box>
          );
        }
        return value || '-';
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'rgba(0, 38, 100, 0.1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 38, 100, 0.08)',
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="data table" sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell 
                  key={column.id}
                  sx={{
                    background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                    borderBottom: '2px solid',
                    borderColor: '#002664',
                    py: 2,
                    fontWeight: 600,
                    color: '#002664',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {column.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                      {column.type}
                    </Typography>
                  </Box>
                </TableCell>
              ))}
              <TableCell 
                width={120}
                sx={{
                  background: 'linear-gradient(135deg, #87c8dc 0%, #a5d6e5 100%)',
                  borderBottom: '2px solid',
                  borderColor: '#002664',
                  py: 2,
                  fontWeight: 600,
                  color: '#002664',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.id} 
                hover
                sx={{ 
                  '&:nth-of-type(even)': {
                    backgroundColor: 'rgba(135, 200, 220, 0.02)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(135, 200, 220, 0.08)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {columns.map(column => (
                  <TableCell 
                    key={column.id}
                    sx={{ 
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'rgba(0, 38, 100, 0.06)'
                    }}
                  >
                    {renderCell(row, column)}
                  </TableCell>
                ))}
                <TableCell 
                  sx={{ 
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0, 38, 100, 0.06)'
                  }}
                >
                  {editingRow === row.id ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Сохранить">
                        <IconButton 
                          size="small" 
                          onClick={handleSave} 
                          sx={{
                            color: '#00afa5',
                            backgroundColor: 'rgba(0, 175, 165, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 175, 165, 0.2)',
                            }
                          }}
                        >
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Отмена">
                        <IconButton 
                          size="small" 
                          onClick={handleCancel}
                          sx={{
                            color: '#eb735a',
                            backgroundColor: 'rgba(235, 115, 90, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(235, 115, 90, 0.2)',
                            }
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Редактировать">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(row)}
                          sx={{
                            color: '#0f4dbc',
                            backgroundColor: 'rgba(15, 77, 188, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(15, 77, 188, 0.2)',
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton 
                          size="small" 
                          onClick={() => onRowDelete(row.id)}
                          sx={{
                            color: '#eb735a',
                            backgroundColor: 'rgba(235, 115, 90, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(235, 115, 90, 0.2)',
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 8 }}>
                  <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    <Typography variant="h6" gutterBottom>
                      Нет данных для отображения
                    </Typography>
                    <Typography variant="body2">
                      Добавьте записи в таблицу
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;