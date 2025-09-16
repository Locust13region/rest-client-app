import type { Metadata } from 'next';
import './globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import ClientThemeProvider from '@/components/common/ThemeProvider';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import NavBar from '@/components/main-page/NavBar';
import FooterElement from '@/components/main-page/FooterElement';
import { Box, Container } from '@mui/material';
import MessageProvider from '@/components/common/MessageContextProvider';

export const metadata: Metadata = {
  title: 'Rest API app',
  description: 'RSSchool REACT2025Q3 final task',
};

export default async function RootLayout({
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
    <html lang={lang}>
      <body>
        <ClientThemeProvider>
          <NextIntlClientProvider>
            <MessageProvider>
              <Container
                sx={{
                  paddingTop: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
                maxWidth={false}
                disableGutters={true}
              >
                <NavBar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      zIndex: -1,
                      inset: 0,
                      backgroundImage:
                        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                    },
                  }}
                >
                  {children}
                </Box>
                <FooterElement />
              </Container>
            </MessageProvider>
          </NextIntlClientProvider>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
