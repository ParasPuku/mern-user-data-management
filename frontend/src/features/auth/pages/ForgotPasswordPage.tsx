import { FormEvent, useMemo, useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  requestPasswordReset,
  selectAuthActionStatus
} from '../authSlice';
import { validateOtpRequest } from '../validation';

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const [identifier, setIdentifier] = useState('');
  const isLoading = actionStatus === 'loading';
  const values = useMemo(() => ({ identifier }), [identifier]);
  const isFormValid = validateOtpRequest(values).isValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      const result = await dispatch(requestPasswordReset(values)).unwrap();

      navigate('/otp', {
        state: {
          deliveryTarget: result.deliveryTarget,
          devOtp: result.devOtp,
          identifier,
          mode: 'password-reset'
        }
      });
    } catch {
      // Toast middleware displays the API error.
    }
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

          <LoadingButton
            className="primary-button"
            disabled={!isFormValid}
            isLoading={isLoading}
            loadingLabel="Sending OTP"
            type="submit"
          >
            <Send size={17} />
            Send OTP
          </LoadingButton>
        </form>
      </section>
    </main>
  );
};
