import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAppSelector } from '../app/hooks';
import { selectAuthStatus } from '../features/auth/authSlice';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus !== 'authenticated') {
    return <Navigate replace to="/signin" />;
  }

  return children;
};

