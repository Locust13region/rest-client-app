import PrivateRoute from '@/components/common/PrivateRoute';
import { ReactNode } from 'react';
import { Stack } from '@mui/material';
import NavMenuAuth from '@/components/main-page/NavMenuAuth';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  return (
    <PrivateRoute>
      <Stack
        marginTop={4}
        direction={{ xs: 'column', sm: 'row' }}
        flexGrow={1}
        paddingX={{ xs: 1, sm: 0 }}
      >
        <NavMenuAuth />
        {children}
      </Stack>
    </PrivateRoute>
  );
}
