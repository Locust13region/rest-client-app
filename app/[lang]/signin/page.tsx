'use client';

import { FormEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { Card, SignContainer } from '@/style/styledSign';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuiLink from '@mui/material/Link';
import { Link } from '@/i18n/navigation';
import SignForm from '@/components/sign-form/sign-form';

export default function SignIn() {
  const t = useTranslations('Sign');

  const [signInUser, result, loading, signInUserError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (
      !email ||
      typeof email !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      return;
    }

    signInUser(email, password);
  };

  useEffect(() => {
    if (!loading && result) {
      console.log('Signed in:', result.user);
      router.push('/');
    }
  }, [loading, result, router]);

  useEffect(() => {
    if (!loading && signInUserError) {
      console.log('Signed in:', signInUserError.message);
    }
  }, [loading, signInUserError]);

  return (
    <SignContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          {t('signIn')}
        </Typography>
        <SignForm handleSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">{t('email')} </FormLabel>
            <TextField
              required
              fullWidth
              name="email"
              placeholder="your@email.com"
              type="email"
              id="email"
              autoComplete="email"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">{t('password')} </FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {t('signIn')}
          </Button>
        </SignForm>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>{t('or')} </Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            {t('alreadyHave')}{' '}
            <Link href="/signup">
              <MuiLink
                component="span"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                {t('signUp')}
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignContainer>
  );
}
