import React from 'react';
import NextLink from 'next/link';
import { Box, Typography, Link, Container } from '@mui/material';
interface IGithubLinkProps {
  link: string;
  name: string;
}

function GithubLink({ link, name }: IGithubLinkProps) {
  return (
    <Link
      component={NextLink}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        fontSize: { xs: '0.9rem', sm: '1rem' },
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {name}
    </Link>
  );
}

function FooterElement() {
  return (
    <Container
      component="footer"
      maxWidth="lg"
      sx={{ py: 3, textAlign: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <GithubLink
          link={'https://github.com/Locust13region'}
          name={'Locust13region'}
        />

        <GithubLink link={'https://github.com/iakhot'} name={'iakhot'} />

        <GithubLink link={'https://github.com/Dedal88'} name={'Dedal88'} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          © 2025
        </Typography>

        <Link
          component={NextLink}
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-block',
            mt: { xs: 1, sm: 0 },
            '& img': {
              width: { xs: 45, sm: 65 },
              height: { xs: 38, sm: 55 },
            },
          }}
        >
          <Box component="img" src="/logo-rs.svg" alt="Logo RS School" />
        </Link>
      </Box>
    </Container>
  );
}

export default FooterElement;
