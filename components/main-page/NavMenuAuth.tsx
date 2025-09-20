'use client';
import React from 'react';
import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';

function NavMenuAuth() {
  const [user] = useAuthState(auth);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const t = useTranslations('Home');

  return (
    <Tabs
      component="nav"
      orientation={isSmUp ? 'vertical' : 'horizontal'}
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Content tabs"
      sx={{ borderRight: 1, borderColor: 'divider' }}
    >
      <Tab
        component={Link}
        href="/client"
        label={t('restClient')}
        sx={{ whiteSpace: 'nowrap', paddingX: 4 }}
      />
      <Tab
        component={Link}
        href={`/history?user=${user?.uid}`}
        label={t('history')}
        sx={{ whiteSpace: 'nowrap', paddingX: 4 }}
      />
      <Tab
        component={Link}
        href="/variables"
        label={t('variables')}
        sx={{ whiteSpace: 'nowrap', paddingX: 4 }}
      />
    </Tabs>
  );
}

export default NavMenuAuth;
