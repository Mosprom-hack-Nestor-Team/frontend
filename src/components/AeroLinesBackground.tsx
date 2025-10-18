import { Box, useTheme } from '@mui/material';

const AeroLinesBackground = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 10% 20%, rgba(135, 200, 220, 0.05) 0%, transparent 40%),
          radial-gradient(circle at 90% 30%, rgba(15, 77, 188, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 50% 80%, rgba(0, 38, 100, 0.03) 0%, transparent 40%),
          linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)
        `,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AeroLinesBackground;