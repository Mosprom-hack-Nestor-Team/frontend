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
    const widthMap = {
      xs: xs ? `${(xs / 12) * 100}%` : '100%',
      sm: sm ? `${(sm / 12) * 100}%` : undefined,
      md: md ? `${(md / 12) * 100}%` : undefined,
      lg: lg ? `${(lg / 12) * 100}%` : undefined,
    };

    return (
      <Box 
        sx={{ 
          flexGrow: 0,
          flexBasis: widthMap.xs,
          maxWidth: widthMap.xs,
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