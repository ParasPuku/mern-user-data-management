import { FormEvent, useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StatusBanner } from '../../../components/StatusBanner';
import {
  clearAuthError,
  requestPasswordReset,
  selectAuthActionStatus,
  selectAuthError
} from '../authSlice';

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const error = useAppSelector(selectAuthError);
  const [identifier, setIdentifier] = useState('');
  const isLoading = actionStatus === 'loading';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(requestPasswordReset({ identifier })).unwrap();

    navigate('/otp', {
      state: {
        deliveryTarget: result.deliveryTarget,
        devOtp: result.devOtp,
        identifier,
        mode: 'password-reset'
      }
    });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="inline-link auth-back-link" to="/signin">
          <ArrowLeft size={16} />
          Sign In
        </Link>

        <p className="eyebrow">Account recovery</p>
        <h1>Forgot Password</h1>

        <StatusBanner
          message={error}
          onDismiss={() => dispatch(clearAuthError())}
        />

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button className="primary-button" disabled={isLoading} type="submit">
            <Send size={17} />
            Send OTP
          </button>
        </form>
      </section>
    </main>
  );
};
