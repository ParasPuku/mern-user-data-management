import { FormEvent, useMemo, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  selectAuthActionStatus,
  setPassword
} from '../authSlice';
import { validateSetPassword } from '../validation';

type SetPasswordLocationState = {
  resetToken?: string;
};

export const SetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const resetToken = (location.state as SetPasswordLocationState | null)
    ?.resetToken;
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLoading = actionStatus === 'loading';
  const values = useMemo(
    () => ({
      confirmPassword,
      password,
      resetToken: resetToken || ''
    }),
    [confirmPassword, password, resetToken]
  );
  const isFormValid = validateSetPassword(values).isValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      await dispatch(setPassword(values)).unwrap();
      navigate('/reset-success');
    } catch {
      // Toast middleware displays the API error.
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">New password</p>
        <h1>Set Password</h1>

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

            <LoadingButton
              className="primary-button"
              disabled={!isFormValid}
              isLoading={isLoading}
              loadingLabel="Saving password"
              type="submit"
            >
              <LockKeyhole size={17} />
              Set Password
            </LoadingButton>
          </form>
        )}
      </section>
    </main>
  );
};
