'use client';

// import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { Card, SignUpContainer } from './styled';
import z from 'zod';
import { formSchema, type FormData } from './types';
import { useRouter } from 'next/navigation';

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [userFormData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [showErrors, setShowErrors] = useState(false);

  const [createUser] = useCreateUserWithEmailAndPassword(auth);

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
    return z.flattenError(res.error);
  };

  const reset = () => setFormData(initialFormState);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    try {
      const response = await createUser(
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

  const errors = showErrors ? validate() : undefined;

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
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
              error={errors?.fieldErrors.email?.length ? true : false}
              helperText={errors?.fieldErrors.email?.join(', ')}
              color={
                (errors?.fieldErrors.email?.length ?? 0) ? 'error' : 'primary'
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
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
              error={errors?.fieldErrors.password?.length ? true : false}
              helperText={errors?.fieldErrors.password?.join(',')}
              color={
                (errors?.fieldErrors.password?.length ?? 0)
                  ? 'error'
                  : 'primary'
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!!errors}
          >
            Sign up
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: 'text.secondary' }}>or</Typography>
        </Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
