import PrivateRoute from '@/components/common/PrivateRoute';
import { ReactNode } from 'react';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import NavBarAuth from '@/components/main-page/NavBarAuth';
import { Box } from '@mui/material';
import NavMenuAuth from '@/components/main-page/NavMenuAuth';

export default async function ClientLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  return (
    <PrivateRoute>
      <Box
        sx={{
          paddingTop: 8,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <NavBarAuth />

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            mt: 4,
            px: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            component="nav"
            sx={{
              width: { xs: '100%', sm: 200 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              gap: 2,
              borderRight: { xs: 'none', sm: '1px solid #ccc' },
              borderBottom: { xs: '1px solid #ccc', sm: 'none' },
              pr: { xs: 0, sm: 2 },
              pb: { xs: 1, sm: 0 },
              overflowX: { xs: 'auto', sm: 'visible' },
            }}
          >
            <NavMenuAuth />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pl: { xs: 0, sm: 2 },
              pt: { xs: 2, sm: 0 },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </PrivateRoute>
  );
}
