'use client';

import { FormEvent, useContext, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import z from 'zod';
import { useFormSchema, type FormData } from './types';
// import { redirect, useRouter } from 'next/navigation';
import SignForm from '@/components/signForm/SignForm';
import LayoutLoader from '@/components/common/LayoutLoader';
import { MessageContext } from '@/components/common/MessageContextProvider';
// test Container in RootLayout

const initialFormState = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [loader] = useAuthState(auth);
  const [userFormData, setFormData] = useState<FormData>(initialFormState);
  const [showErrors, setShowErrors] = useState(false);
  const formSchema = useFormSchema();
  const { addSnackMessage } = useContext(MessageContext);
  const [createUser, result, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);
  // const router = useRouter();

  // if (user) redirect('/');

  if (loader) return LayoutLoader();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();

    if (errors || !userFormData.email || !userFormData.password) {
      setShowErrors(true);
      return;
    }
    await createUser(userFormData.email, userFormData.password);

    if (!loading && result) {
      addSnackMessage({ text: 'Signed up!', messageType: 'success' });
      console.log('Signed up:', result.user);
      reset();
      // router.replace('/');
    }

    console.log('ERROR', loading, createUserError);

    if (!loading && createUserError) {
      addSnackMessage({ text: createUserError.code, messageType: 'error' });
    }
  };

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
