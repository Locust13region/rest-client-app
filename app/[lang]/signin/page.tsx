'use client';

import { FormEvent, useContext, useEffect, useRef } from 'react';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { redirect, useRouter } from 'next/navigation';
import SignForm from '@/components/signForm/SignForm';
import LayoutLoader from '@/components/common/LayoutLoader';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

export default function SignIn() {
  const [user, loadingUser] = useAuthState(auth);
  const { addSnackMessage } = useContext(MessageContext);
  const [signInUser, signInUserResult, signInUserLoading, signInUserError] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  if (user) redirect('/');

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

    const res = await signInUser(email, password);
    if (res) {
      addSnackMessage({ text: 'Signed In!', messageType: 'success' });
    }
  };

  const lastErrorRef = useRef<FirebaseError | null>(null);
  const signInUserRef = useRef<UserCredential | null>(null);

  useEffect(() => {
    if (signInUserResult && signInUserResult !== signInUserRef.current) {
      signInUserRef.current = signInUserResult;
      router.replace('/');
    }

    if (signInUserError && signInUserError !== lastErrorRef.current) {
      lastErrorRef.current = signInUserError;
      addSnackMessage({ text: signInUserError.code, messageType: 'error' });
    }
  }, [addSnackMessage, router, signInUserError, signInUserResult]);

  const content =
    loadingUser || signInUserLoading ? (
      LayoutLoader()
    ) : (
      <SignForm
        formType={'signIn'}
        required={true}
        handleSubmit={handleSubmit}
      />
    );

  return content;
}
