'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import layoutLoader from './layout-loader';

export default function PublicRoute({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return layoutLoader();

  if (user) {
    redirect('/');
  }

  return children;
}
