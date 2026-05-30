import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { AppLayout } from './components/AppLayout';
import { PublicRoute } from './components/PublicRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import {
  bootstrapAuth,
  selectAuthStatus,
  verifyAuthSession
} from './features/auth/authSlice';
import { ForgotPasswordPage } from './features/auth/pages/ForgotPasswordPage';
import { OtpPage } from './features/auth/pages/OtpPage';
import { ProfilePage } from './features/auth/pages/ProfilePage';
import { ResetSuccessPage } from './features/auth/pages/ResetSuccessPage';
import { SetPasswordPage } from './features/auth/pages/SetPasswordPage';
import { SignInPage } from './features/auth/pages/SignInPage';
import { SignUpPage } from './features/auth/pages/SignUpPage';
import { UserManagementPage } from './features/users/UserManagementPage';

const SESSION_CHECK_INTERVAL_MS = 60000;

export const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === 'idle') {
      dispatch(bootstrapAuth());
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (authStatus !== 'authenticated') {
      return undefined;
    }

    const validateSessionWithBackend = () => {
      dispatch(verifyAuthSession());
    };

    const intervalId = window.setInterval(
      validateSessionWithBackend,
      SESSION_CHECK_INTERVAL_MS
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        validateSessionWithBackend();
      }
    };

    window.addEventListener('focus', validateSessionWithBackend);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', validateSessionWithBackend);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authStatus, dispatch]);

  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <div className="boot-screen">
        <div className="loader" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
        path="/signin"
      />
      <Route
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
        path="/signup"
      />
      <Route
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
        path="/forgot-password"
      />
      <Route
        element={
          <PublicRoute>
            <OtpPage />
          </PublicRoute>
        }
        path="/otp"
      />
      <Route
        element={
          <PublicRoute>
            <SetPasswordPage />
          </PublicRoute>
        }
        path="/set-password"
      />
      <Route
        element={
          <PublicRoute>
            <ResetSuccessPage />
          </PublicRoute>
        }
        path="/reset-success"
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
        path="/"
      >
        <Route index element={<UserManagementPage />} />
        <Route element={<ProfilePage />} path="profile" />
      </Route>

      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
};
