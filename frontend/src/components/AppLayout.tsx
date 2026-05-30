import { LogOut, UserRound, UsersRound } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ButtonSpinner } from './LoadingButton';
import {
  logout,
  selectAccount,
  selectAuthActionStatus
} from '../features/auth/authSlice';
import { clearUsers } from '../features/users/usersSlice';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U';

export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const account = useAppSelector(selectAccount);
  const actionStatus = useAppSelector(selectAuthActionStatus);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } finally {
      dispatch(clearUsers());
      navigate('/signin');
    }
  };

  return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <NavLink className="brand-mark" to="/">
          UDM
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">
            <UsersRound size={17} />
            Users
          </NavLink>
          <NavLink to="/profile">
            <UserRound size={17} />
            Profile
          </NavLink>
        </div>

        <div className="account-menu">
          {account?.avatarUrl ? (
            <img
              alt={account.fullName}
              className="nav-avatar"
              src={account.avatarUrl}
            />
          ) : (
            <span className="nav-avatar nav-avatar--fallback">
              {getInitials(account?.fullName)}
            </span>
          )}

          <button
            aria-busy={actionStatus === 'loading'}
            className="icon-button"
            disabled={actionStatus === 'loading'}
            onClick={handleLogout}
            title="Sign out"
            type="button"
          >
            {actionStatus === 'loading' ? <ButtonSpinner /> : <LogOut size={17} />}
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
