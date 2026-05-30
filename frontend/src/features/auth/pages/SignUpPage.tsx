import { FormEvent, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StatusBanner } from '../../../components/StatusBanner';
import {
  clearAuthError,
  selectAuthActionStatus,
  selectAuthError,
  signUp
} from '../authSlice';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const error = useAppSelector(selectAuthError);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isLoading = actionStatus === 'loading';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(
      signUp({
        fullName,
        email,
        mobile,
        password,
        confirmPassword,
        termsAccepted
      })
    ).unwrap();
    navigate('/');
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <p className="eyebrow">Create account</p>
        <h1>Sign Up</h1>

        <StatusBanner
          message={error}
          onDismiss={() => dispatch(clearAuthError())}
        />

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              autoComplete="name"
              onChange={(event) => setFullName(event.target.value)}
              required
              type="text"
              value={fullName}
            />
          </label>

          <div className="form-two-column">
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
              Mobile number
              <input
                autoComplete="tel"
                onChange={(event) => setMobile(event.target.value)}
                required
                type="tel"
                value={mobile}
              />
            </label>
          </div>

          <div className="form-two-column">
            <label>
              Password
              <input
                autoComplete="new-password"
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
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
          </div>

          <label className="checkbox-row">
            <input
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              required
              type="checkbox"
            />
            <span>I agree to the terms and policy</span>
          </label>

          <button className="primary-button" disabled={isLoading} type="submit">
            <UserPlus size={17} />
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </section>
    </main>
  );
};

