import { FormEvent, useMemo, useState } from 'react';
import { ArrowLeft, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  requestLoginOtp,
  requestPasswordReset,
  selectAuthActionStatus,
  verifyLoginOtp,
  verifyPasswordResetOtp
} from '../authSlice';
import { validateOtpRequest, validateOtpVerification } from '../validation';

type OtpMode = 'login' | 'password-reset';

type OtpLocationState = {
  deliveryTarget?: string;
  devOtp?: string;
  identifier?: string;
  mode?: OtpMode;
};

export const OtpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const state = location.state as OtpLocationState | null;
  const mode = state?.mode || 'login';
  const [identifier, setIdentifier] = useState(state?.identifier || '');
  const [deliveryTarget, setDeliveryTarget] = useState(
    state?.deliveryTarget || ''
  );
  const [devOtp, setDevOtp] = useState(state?.devOtp || '');
  const [code, setCode] = useState('');
  const isLoading = actionStatus === 'loading';
  const verifyValues = useMemo(
    () => ({ code, identifier }),
    [code, identifier]
  );
  const requestValues = useMemo(() => ({ identifier }), [identifier]);
  const isVerifyValid = validateOtpVerification(verifyValues).isValid;
  const isResendValid = validateOtpRequest(requestValues).isValid;

  const heading = useMemo(
    () => (mode === 'login' ? 'Verify Sign In' : 'Verify Reset OTP'),
    [mode]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isVerifyValid) {
      return;
    }

    try {
      if (mode === 'password-reset') {
        const result = await dispatch(
          verifyPasswordResetOtp(verifyValues)
        ).unwrap();

        navigate('/set-password', {
          state: {
            resetToken: result.resetToken
          }
        });
        return;
      }

      await dispatch(verifyLoginOtp(verifyValues)).unwrap();
      navigate('/');
    } catch {
      // Toast middleware displays the API error.
    }
  };

  const handleResend = async () => {
    if (!isResendValid) {
      return;
    }

    try {
      const result =
        mode === 'password-reset'
          ? await dispatch(requestPasswordReset(requestValues)).unwrap()
          : await dispatch(requestLoginOtp(requestValues)).unwrap();

      setDeliveryTarget(result.deliveryTarget);
      setDevOtp(result.devOtp || '');
    } catch {
      // Toast middleware displays the API error.
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link
          className="inline-link auth-back-link"
          to={mode === 'password-reset' ? '/forgot-password' : '/signin'}
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <p className="eyebrow">OTP verification</p>
        <h1>{heading}</h1>

        {deliveryTarget ? (
          <p className="muted-copy">Code sent to {deliveryTarget}</p>
        ) : null}

        {devOtp ? (
          <div className="dev-otp-box">
            <span>Development OTP</span>
            <strong>{devOtp}</strong>
          </div>
        ) : null}

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

          <label>
            OTP
            <input
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              minLength={6}
              onChange={(event) => setCode(event.target.value)}
              pattern="\d{6}"
              required
              type="text"
              value={code}
            />
          </label>

          <LoadingButton
            className="primary-button"
            disabled={!isVerifyValid}
            isLoading={isLoading}
            loadingLabel="Verifying"
            type="submit"
          >
            <ShieldCheck size={17} />
            Verify OTP
          </LoadingButton>

          <LoadingButton
            className="text-button text-button--full"
            disabled={!isResendValid}
            isLoading={isLoading}
            loadingLabel="Sending OTP"
            onClick={handleResend}
            type="button"
          >
            <RotateCcw size={16} />
            Resend OTP
          </LoadingButton>
        </form>
      </section>
    </main>
  );
};
