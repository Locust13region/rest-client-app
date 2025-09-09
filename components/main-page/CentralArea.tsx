import { Box, Button, Typography, Container } from '@mui/material';

function CentralArea() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, sm: 8 },
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
          fontWeight: 700,
        }}
      >
        Добро пожаловать!
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          href="/login"
          size="large"
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Вход
        </Button>

        <Button
          variant="outlined"
          color="primary"
          href="/signup"
          size="large"
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Регистрация
        </Button>
      </Box>
    </Container>
  );
}

export default CentralArea;
