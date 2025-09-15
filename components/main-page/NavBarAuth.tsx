'use client';

import * as React from 'react';
import Link from '@mui/material/Link';
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
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { auth } from '@/firebase/config';
import { useSignOut } from 'react-firebase-hooks/auth';

function NavBarAuth() {
  const [signOut] = useSignOut(auth);
  const t = useTranslations('Home');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleLang = (selectedLang: 'ru' | 'en') => {
    if (selectedLang === locale) return;
    router.push(pathname, { locale: selectedLang });
  };

  const handleSignOut = () => {
    signOut();
    handleCloseNavMenu();
  };

  interface ILanguageButton {
    languageToggle: 'ru' | 'en';
    languageName: 'RU' | 'EN';
  }

  function LanguageButton({ languageToggle, languageName }: ILanguageButton) {
    return (
      <Button
        variant={locale === languageToggle ? 'contained' : 'text'}
        color="inherit"
        onClick={() => toggleLang(languageToggle)}
        sx={{ color: locale === languageToggle ? 'white' : 'gray' }}
      >
        {languageName}
      </Button>
    );
  }

  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{
        backgroundColor: '#3b3e41ff',
        top: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
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
            <LanguageButton languageToggle={'ru'} languageName={'RU'} />
            <LanguageButton languageToggle={'en'} languageName={'EN'} />
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
              <MenuItem onClick={handleSignOut}>
                <Typography sx={{ textAlign: 'center' }}>
                  {t('signOut')}
                </Typography>
              </MenuItem>
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
            <LanguageButton languageToggle={'ru'} languageName={'RU'} />
            <LanguageButton languageToggle={'en'} languageName={'EN'} />
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}
          >
            <Button
              onClick={handleSignOut}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
              }}
            >
              {t('signOut')}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarAuth;
