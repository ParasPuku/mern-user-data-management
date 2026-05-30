import { FormEvent, useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  selectAuthActionStatus,
  signUp
} from '../authSlice';
import { validateSignUp } from '../validation';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isLoading = actionStatus === 'loading';
  const values = useMemo(
    () => ({
      confirmPassword,
      email,
      fullName,
      mobile,
      password,
      termsAccepted
    }),
    [confirmPassword, email, fullName, mobile, password, termsAccepted]
  );
  const isFormValid = validateSignUp(values).isValid;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    try {
      await dispatch(signUp(values)).unwrap();
      navigate('/');
    } catch {
      // Toast middleware displays the API error.
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <p className="eyebrow">Create account</p>
        <h1>Sign Up</h1>

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

          <LoadingButton
            className="primary-button"
            disabled={!isFormValid}
            isLoading={isLoading}
            loadingLabel="Creating account"
            type="submit"
          >
            <UserPlus size={17} />
            Sign Up
          </LoadingButton>
        </form>

        <p className="auth-switch">
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </section>
    </main>
  );
};
