import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResetSuccessPage = () => (
  <main className="auth-page">
    <section className="auth-card success-card">
      <CheckCircle2 size={42} />
      <p className="eyebrow">Password updated</p>
      <h1>Reset Password Success</h1>
      <p className="muted-copy">Your new password is ready to use.</p>
      <Link className="primary-button" to="/signin">
        Sign In
      </Link>
    </section>
  </main>
);

