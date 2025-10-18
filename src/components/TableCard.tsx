import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  TableChart as TableIcon,
  CalendarToday,
  Storage
} from '@mui/icons-material';

export interface TableInfo {
  id: string;
  name: string;
  description?: string;
  columnsCount: number;
  rowsCount: number;
  lastModified: string;
  created: string;
}

interface TableCardProps {
  table: TableInfo;
  onEdit: (tableId: string) => void;
  onDelete: (tableId: string) => void;
  onOpen: (tableId: string) => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onEdit, onDelete, onOpen }) => {
  return (
    <Card 
      sx={{ 
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'rgba(0, 38, 100, 0.08)',
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0, 38, 100, 0.08)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 32px rgba(0, 38, 100, 0.15)',
          borderColor: 'rgba(135, 200, 220, 0.4)',
        }
      }}
      onClick={() => onOpen(table.id)}
    >
      <CardContent sx={{ 
        flex: 1, 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        '&:last-child': { pb: 3 }
      }}>
        {/* Заголовок */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              borderRadius: 2,
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TableIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 600,
                color: '#002664',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {table.name}
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(table.id);
            }}
            sx={{
              color: 'rgba(0, 38, 100, 0.6)',
              '&:hover': {
                color: '#002664',
                backgroundColor: 'rgba(0, 38, 100, 0.04)'
              }
            }}
          >
            <MoreIcon />
          </IconButton>
        </Box>

        {/* Описание */}
        {table.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 3, 
              flex: 1,
              lineHeight: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {table.description}
          </Typography>
        )}

        {/* Статистика */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<Storage sx={{ fontSize: 16 }} />}
            label={`${table.columnsCount} кол.`} 
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
          <Chip 
            icon={<TableIcon sx={{ fontSize: 16 }} />}
            label={`${table.rowsCount} зап.`} 
            size="small" 
            variant="outlined"
            sx={{
              borderColor: 'rgba(0, 175, 165, 0.4)',
              color: '#007a73',
              backgroundColor: 'rgba(0, 175, 165, 0.08)',
              fontWeight: 500,
              '& .MuiChip-icon': { color: '#007a73' }
            }}
          />
        </Box>

        {/* Дата изменения */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarToday sx={{ fontSize: 14, color: 'rgba(90, 90, 90, 0.6)' }} />
          <Typography variant="caption" color="text.secondary">
            {new Date(table.lastModified).toLocaleDateString('ru-RU')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableCard;