'use client';

import { FormEvent, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import z from 'zod';
import { useFormSchema, type FormData } from './types';
import { redirect, useRouter } from 'next/navigation';
import SignForm from '@/components/signForm/SignForm';
import LayoutLoader from '@/components/common/LayoutLoader';
// import { MessageContext } from '@/components/common/MessageContextProvider';
// test Container in RootLayout

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [user, loader] = useAuthState(auth);
  const [userFormData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);
  const formSchema = useFormSchema();
  // const { addSnackMessage } = useContext(MessageContext);

  const [createUser, result, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  if (loader || loading) return LayoutLoader();
  if (user) redirect('/');

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    createUser(userFormData.email, userFormData.password);
  };

  if (!loading && result) {
    console.log('Signed up:', result.user);
    reset();
    router.push('/');
  }

  if (!loading && createUserError) {
    // addSnackMessage({ text: 'Signed up1', messageType: 'success' });
    // addSnackMessage({ text: 'Signed up2', messageType: 'success' });
    // addSnackMessage({ text: 'Signed up3', messageType: 'success' });
    console.log('Signed up:', createUserError.message);
  }

  const errors = showErrors ? validate() : undefined;

  return (
    <SignForm
      formType={'signUp'}
      userFormData={userFormData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
