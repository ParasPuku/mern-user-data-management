import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

import { useAppSelector } from '../app/hooks';
import { selectAuthStatus } from '../features/auth/authSlice';

type PublicRouteProps = {
  children: ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus === 'authenticated') {
    return <Navigate replace to="/" />;
  }

  return children;
};

