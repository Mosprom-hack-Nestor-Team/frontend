import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  TableChart as TableIcon
} from '@mui/icons-material';
import TableCard, { type TableInfo } from './TableCard';

interface DashboardProps {
  tables: TableInfo[];
  onTableCreate: () => void;
  onTableEdit: (tableId: string) => void;
  onTableDelete: (tableId: string) => void;
  onTableOpen: (tableId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  tables,
  onTableCreate,
  onTableEdit,
  onTableDelete,
  onTableOpen
}) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
      {/* Заголовок и поиск */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 6,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3
      }}>
        <Box>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Мои таблицы
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            {tables.length} таблиц • Управляйте вашими базами данных
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            placeholder="Поиск таблиц..."
            variant="outlined"
            size="small"
            sx={{ 
              width: { xs: '100%', sm: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'white'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onTableCreate}
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0, 38, 100, 0.2)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0, 38, 100, 0.3)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
              whiteSpace: 'nowrap',
              minWidth: 'auto'
            }}
          >
            Создать
          </Button>
        </Box>
      </Box>

      {/* СЕТКА С КАРТОЧКАМИ - ИСПРАВЛЕННАЯ */}
      {tables.length > 0 ? (
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)'
            },
            gap: 3,
            alignItems: 'stretch'
          }}
        >
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onEdit={onTableEdit}
              onDelete={onTableDelete}
              onOpen={onTableOpen}
            />
          ))}
        </Box>
      ) : (
        /* Пустое состояние */
        <Box 
          textAlign="center" 
          py={12}
          sx={{
            border: '2px dashed',
            borderColor: 'rgba(135, 200, 220, 0.4)',
            borderRadius: 4,
            background: 'linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <TableIcon sx={{ fontSize: 80, color: 'rgba(135, 200, 220, 0.6)', mb: 3 }} />
          <Typography variant="h4" gutterBottom color="text.secondary" sx={{ fontWeight: 600, mb: 2 }}>
            Нет таблиц
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
            Создайте свою первую таблицу для управления данными и начните работать эффективнее
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onTableCreate}
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #002664 0%, #0f4dbc 100%)',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Создать первую таблицу
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;