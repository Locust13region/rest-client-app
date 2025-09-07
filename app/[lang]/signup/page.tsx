'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Card, SignContainer } from '@/style/styledSign';
import z from 'zod';
import { useFormSchema, type FormData } from './types';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuiLink from '@mui/material/Link';
import { Link } from '@/i18n/navigation';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [userFormData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);
  const formSchema = useFormSchema();
  const t = useTranslations('Sign');

  const [createUser, , , createUserError] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = () => {
    const res = formSchema.safeParse(formData);
    if (res.success) {
      setShowErrors(false);
      return undefined;
    }
    return z.flattenError(res.error).fieldErrors;
  };

  const reset = () => setFormData(initialFormState);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    createUser(userFormData.email, userFormData.password);
    reset();
    router.push('/');
  };

  if (createUserError) {
    console.log(createUserError?.message);
  }

  const errors = showErrors ? validate() : undefined;

  return (
    <SignContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          {t('signUp')}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">{t('email')} </FormLabel>
            <TextField
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={userFormData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              error={errors?.email?.length ? true : false}
              helperText={errors?.email?.join(', ')}
              color={(errors?.email?.length ?? 0) ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">{t('password')} </FormLabel>
            <TextField
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
              error={errors?.password?.length ? true : false}
              helperText={errors?.password?.join(', ')}
              color={(errors?.password?.length ?? 0) ? 'error' : 'primary'}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!!errors}
          >
            {t('signUp')}
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
                {t('signIn')}
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignContainer>
  );
}
