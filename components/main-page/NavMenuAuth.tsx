'use client';
import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';

function NavMenuAuth() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const t = useTranslations('Home');

  return (
    <Box
      sx={{
        width: 180,
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ height: '100%' }}
      >
        <Tab label={t('restClient')} />
        <Tab label={t('history')} />
        <Tab label={t('variables')} />
      </Tabs>
    </Box>
  );
}

export default NavMenuAuth;
