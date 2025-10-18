// src/components/Grid.tsx
import { Box } from '@mui/material';

interface GridProps {
  container?: boolean;
  item?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  spacing?: number;
  children: React.ReactNode;
  sx?: any;
}

export const Grid: React.FC<GridProps> = ({ 
  container = false, 
  item = false, 
  xs, 
  sm, 
  md, 
  lg, 
  spacing = 0,
  children,
  sx 
}) => {
  if (container) {
    return (
      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing * 8,
          ...sx 
        }}
      >
        {children}
      </Box>
    );
  }

  if (item) {
    // Вычисляем ширины отдельно без рекурсивных ссылок
    const xsWidth = xs ? `${(xs / 12) * 100}%` : '100%';
    const smWidth = sm ? `${(sm / 12) * 100}%` : xsWidth;
    const mdWidth = md ? `${(md / 12) * 100}%` : smWidth;
    const lgWidth = lg ? `${(lg / 12) * 100}%` : mdWidth;

    return (
      <Box 
        sx={{ 
          flexGrow: 0,
          flexBasis: xsWidth,
          maxWidth: xsWidth,
          ...(sm && {
            '@media (min-width: 600px)': {
              flexBasis: smWidth,
              maxWidth: smWidth,
            }
          }),
          ...(md && {
            '@media (min-width: 900px)': {
              flexBasis: mdWidth,
              maxWidth: mdWidth,
            }
          }),
          ...(lg && {
            '@media (min-width: 1200px)': {
              flexBasis: lgWidth,
              maxWidth: lgWidth,
            }
          }),
          ...sx 
        }}
      >
        {children}
      </Box>
    );
  }

  return <Box sx={sx}>{children}</Box>;
};

export default Grid;