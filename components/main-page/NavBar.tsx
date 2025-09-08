'use client';

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = [
  { label: 'Вход', path: '/login' },
  { label: 'Регистрация', path: '/SignUp' },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [lang, setLang] = React.useState<'ru' | 'en'>('ru');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleLang = (selectedLang: 'ru' | 'en') => {
    setLang(selectedLang);
    // возможно добавление логики переключения языка
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3b3e41ff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                width: 85,
                height: 85,
                cursor: 'pointer',
              }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mr: 3,
              gap: 1,
            }}
          >
            <Button
              variant={lang === 'ru' ? 'contained' : 'text'}
              color="inherit"
              onClick={() => toggleLang('ru')}
              sx={{ color: lang === 'ru' ? 'white' : 'gray' }}
            >
              RU
            </Button>
            <Button
              variant={lang === 'en' ? 'contained' : 'text'}
              color="inherit"
              onClick={() => toggleLang('en')}
              sx={{ color: lang === 'en' ? 'white' : 'gray' }}
            >
              EN
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  style={{ textDecoration: 'none' }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>
                      {label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Link href="/" style={{ display: 'inline-flex' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 2,
                width: 70,
                height: 70,
                cursor: 'pointer',
              }}
            />
          </Link>

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              gap: 1,
              mr: 2,
            }}
          >
            <Button
              variant={lang === 'ru' ? 'contained' : 'text'}
              color="inherit"
              onClick={() => toggleLang('ru')}
              sx={{
                color: lang === 'ru' ? 'white' : 'gray',
                minWidth: '30px',
                padding: '4px 8px',
              }}
            >
              RU
            </Button>
            <Button
              variant={lang === 'en' ? 'contained' : 'text'}
              color="inherit"
              onClick={() => toggleLang('en')}
              sx={{
                color: lang === 'en' ? 'white' : 'gray',
                minWidth: '30px',
                padding: '4px 8px',
              }}
            >
              EN
            </Button>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}
          >
            {pages.map(({ label, path }) => (
              <Link key={label} href={path} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
