import { FormEvent, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StatusBanner } from '../../../components/StatusBanner';
import {
  clearAuthError,
  selectAuthActionStatus,
  selectAuthError,
  setPassword
} from '../authSlice';

type SetPasswordLocationState = {
  resetToken?: string;
};

export const SetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const error = useAppSelector(selectAuthError);
  const resetToken = (location.state as SetPasswordLocationState | null)
    ?.resetToken;
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLoading = actionStatus === 'loading';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resetToken) {
      return;
    }

    await dispatch(
      setPassword({
        resetToken,
        password,
        confirmPassword
      })
    ).unwrap();
    navigate('/reset-success');
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">New password</p>
        <h1>Set Password</h1>

        <StatusBanner
          message={error}
          onDismiss={() => dispatch(clearAuthError())}
        />

        {!resetToken ? (
          <div className="empty-state">
            <p>Password reset session is missing.</p>
            <Link className="primary-button" to="/forgot-password">
              Start again
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Password
              <input
                autoComplete="new-password"
                minLength={8}
                onChange={(event) => setPasswordValue(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>

            <label>
              Confirm password
              <input
                autoComplete="new-password"
                minLength={8}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type="password"
                value={confirmPassword}
              />
            </label>

            <button
              className="primary-button"
              disabled={isLoading}
              type="submit"
            >
              <LockKeyhole size={17} />
              Set Password
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

