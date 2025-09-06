import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

function FooterElement() {
  return (
    <Container maxWidth="lg" sx={{ py: 3, textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Link
          href="https://github.com/Locust13region"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          Git Hub Profile
        </Link>

        <Typography variant="body2" color="text.secondary">
          © 2025
        </Typography>

        <Link
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: 'inline-block' }}
        >
          <Box
            component="img"
            src="/logo-rs.svg"
            alt="Logo"
            sx={{ width: 65, height: 55 }}
          />
        </Link>
      </Box>
    </Container>
  );
}

export default FooterElement;
