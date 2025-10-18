import React from 'react';
import { Box, Container, Stack, Link, Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.50', mt: 'auto', py: 3 }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 MyApp. Все права защищены.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Конфиденциальность
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Условия использования
            </Link>
            <Link href="#" variant="body2" color="text.secondary" underline="hover">
              Контакты
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;