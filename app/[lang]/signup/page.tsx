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
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import z from 'zod';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export const formSchema = z.object({
  email: z.email({ error: 'Enter valid email' }),
  password: z
    .string()
    .min(8, { error: 'Must be at least 8 characters' })
    .refine((value) => /[a-z]/.test(value), {
      error: 'Add one lowercase',
    })
    .refine((value) => /[A-Z]/.test(value), {
      error: 'Add one uppercase',
    })
    .refine((value) => /\d/.test(value), {
      error: 'Add one number',
    })
    .refine((value) => /[!@#$%^&*+-]/.test(value), {
      error: 'Add one special character ',
    }),
});
type FormData = z.infer<typeof formSchema>;

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [userFormData, setFormData] = useState<Partial<FormData>>({
    email: '',
    password: '',
  });
  const [showErrors, setShowErrors] = useState(false);

  const [createUser] = useCreateUserWithEmailAndPassword(auth);

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
      reset();
      console.log({ response });
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
