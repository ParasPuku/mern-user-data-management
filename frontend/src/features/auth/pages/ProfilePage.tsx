import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Camera, Save } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '../../../components/LoadingButton';
import {
  selectAccount,
  selectAuthActionStatus,
  updateProfile,
  uploadAvatar
} from '../authSlice';
import { validateProfile } from '../validation';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const actionStatus = useAppSelector(selectAuthActionStatus);
  const [fullName, setFullName] = useState(account?.fullName || '');
  const [mobile, setMobile] = useState(account?.mobile || '');
  const isLoading = actionStatus === 'loading';
  const values = useMemo(() => ({ fullName, mobile }), [fullName, mobile]);
  const isFormValid = validateProfile(values).isValid;
  const hasChanges =
    fullName !== (account?.fullName || '') || mobile !== (account?.mobile || '');

  const initials = useMemo(
    () => getInitials(account?.fullName),
    [account?.fullName]
  );

  useEffect(() => {
    setFullName(account?.fullName || '');
    setMobile(account?.mobile || '');
  }, [account]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid || !hasChanges) {
      return;
    }

    try {
      await dispatch(updateProfile(values)).unwrap();
    } catch {
      // Toast middleware displays the API error.
    }
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        await dispatch(uploadAvatar(file)).unwrap();
      } catch {
        // Toast middleware displays the API error.
      } finally {
        event.target.value = '';
      }
    }
  };

  return (
    <>
      <header className="app-header">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Profile</h1>
        </div>
      </header>

      <main className="profile-grid">
        <section className="tool-panel profile-card">
          <div className="profile-avatar-wrap">
            {account?.avatarUrl ? (
              <img
                alt={account.fullName}
                className="profile-avatar"
                src={account.avatarUrl}
              />
            ) : (
              <div className="profile-avatar profile-avatar--fallback">
                {initials}
              </div>
            )}

            <label className="avatar-upload">
              <Camera size={17} />
              <input
                accept="image/*"
                disabled={isLoading}
                onChange={handleAvatarChange}
                type="file"
              />
            </label>
          </div>

          <div>
            <h2>{account?.fullName}</h2>
            <p>{account?.email}</p>
          </div>
        </section>

        <section className="tool-panel profile-form-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Details</p>
              <h2>Account information</h2>
            </div>
          </div>

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

            <label>
              Email
              <input disabled type="email" value={account?.email || ''} />
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

            <LoadingButton
              className="primary-button"
              disabled={!isFormValid || !hasChanges}
              isLoading={isLoading}
              loadingLabel="Saving changes"
              type="submit"
            >
              <Save size={17} />
              Save changes
            </LoadingButton>
          </form>
        </section>
      </main>
    </>
  );
};
