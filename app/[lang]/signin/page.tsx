'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Card, SignContainer } from '@/style/styledSign';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuiLink from '@mui/material/Link';
import { Link } from '@/i18n/navigation';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignIn() {
  const [userFormData, setFormData] = useState(initialFormState);
  const t = useTranslations('Sign');

  const [signInUser] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const reset = () => setFormData(initialFormState);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userFormData.email || !userFormData.password) {
      return;
    }
    try {
      const response = await signInUser(
        userFormData.email,
        userFormData.password
      );
      console.log({ response });
      reset();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
              value={userFormData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
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
              value={userFormData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            {t('signIn')}
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>{t('or')} </Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            {t('alreadyHave')}{' '}
            <Link href="/sign-in" passHref>
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
