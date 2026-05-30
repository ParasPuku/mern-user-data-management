import { FormEvent, useMemo, useState } from 'react';
import { KeyRound, Mail, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  requestLoginOtp,
  selectAuthActionStatus,
  signInWithPassword
} from '../authSlice';
import { validateOtpRequest, validatePasswordLogin } from '../validation';

type SignInMode = 'password' | 'otp';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const [mode, setMode] = useState<SignInMode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const isLoading = actionStatus === 'loading';
  const passwordValues = useMemo(() => ({ email, password }), [email, password]);
  const otpValues = useMemo(() => ({ identifier }), [identifier]);
  const isPasswordValid = validatePasswordLogin(passwordValues).isValid;
  const isOtpValid = validateOtpRequest(otpValues).isValid;

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPasswordValid) {
      return;
    }

    try {
      await dispatch(signInWithPassword(passwordValues)).unwrap();
      navigate('/');
    } catch {
      // Toast middleware displays the API error.
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isOtpValid) {
      return;
    }

    try {
      const result = await dispatch(requestLoginOtp(otpValues)).unwrap();

      navigate('/otp', {
        state: {
          deliveryTarget: result.deliveryTarget,
          devOtp: result.devOtp,
          identifier,
          mode: 'login'
        }
      });
    } catch {
      // Toast middleware displays the API error.
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign In</h1>

        <div className="segmented-control" role="tablist">
          <button
            aria-selected={mode === 'password'}
            className={mode === 'password' ? 'is-active' : ''}
            onClick={() => setMode('password')}
            type="button"
          >
            <Mail size={16} />
            Email
          </button>
          <button
            aria-selected={mode === 'otp'}
            className={mode === 'otp' ? 'is-active' : ''}
            onClick={() => setMode('otp')}
            type="button"
          >
            <Smartphone size={16} />
            OTP
          </button>
        </div>

        {mode === 'password' ? (
          <form className="auth-form" onSubmit={handlePasswordSubmit}>
            <label>
              Email
              <input
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>

            <label>
              Password
              <input
                autoComplete="current-password"
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            <Link className="inline-link align-right" to="/forgot-password">
              Forgot Password
            </Link>

            <LoadingButton
              className="primary-button"
              disabled={!isPasswordValid}
              isLoading={isLoading}
              loadingLabel="Signing in"
              type="submit"
            >
              <KeyRound size={17} />
              Sign In
            </LoadingButton>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleOtpSubmit}>
            <label>
              Email or mobile number
              <input
                autoComplete="username"
                onChange={(event) => setIdentifier(event.target.value)}
                required
                type="text"
                value={identifier}
              />
            </label>

            <LoadingButton
              className="primary-button"
              disabled={!isOtpValid}
              isLoading={isLoading}
              loadingLabel="Sending OTP"
              type="submit"
            >
              <Smartphone size={17} />
              Send OTP
            </LoadingButton>
          </form>
        )}

        <p className="auth-switch">
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </section>
    </main>
  );
};
