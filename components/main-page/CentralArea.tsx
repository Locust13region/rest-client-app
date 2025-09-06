import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

function CentralArea() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Добро пожаловать !
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" href="/login">
          Вход
        </Button>
        <Button variant="outlined" color="primary" href="/signup">
          Регистрация
        </Button>
      </Box>
    </Container>
  );
}

export default CentralArea;
