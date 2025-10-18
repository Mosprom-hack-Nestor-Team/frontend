import React from 'react';
import { Box, Container, Stack, Link, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, rgba(0, 38, 100, 0.03) 0%, rgba(15, 77, 188, 0.06) 100%)',
        borderTop: '2px solid rgba(135, 200, 220, 0.3)',
        mt: 'auto', 
        py: 4 
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#002664',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            © 2025 AeroDocs. Все права защищены.
          </Typography>

          <Stack 
            direction="row" 
            spacing={4}
            sx={{
              '& .MuiLink-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: '#002664',
                  transform: 'translateY(-2px)',
                }
              }
            }}
          >
            <Link 
              href="#" 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Конфиденциальность
            </Link>
            <Link 
              href="#" 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Условия использования
            </Link>
            <Link 
              href="#" 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Контакты
            </Link>
          </Stack>
        </Stack>

        {/* Дополнительная информация */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 3,
            pt: 3,
            borderTop: '1px solid rgba(135, 200, 220, 0.2)'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Создано с ❤️ командой Nestor team для эффективной работы с данными и аналитикой
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;