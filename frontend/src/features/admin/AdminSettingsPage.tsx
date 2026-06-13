import { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Save, ShieldCheck, UserCog } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ButtonSpinner, LoadingButton } from '../../components/LoadingButton';
import { StatusBanner } from '../../components/StatusBanner';
import {
  selectAccount,
  verifyAuthSession
} from '../auth/authSlice';
import type { AccountRole } from '../auth/types';
import {
  clearAdminError,
  fetchManagedAccounts,
  selectAdminError,
  selectAdminListStatus,
  selectAdminMutationStatus,
  selectManagedAccounts,
  selectUpdatingAccountId,
  updateManagedAccountRole
} from './adminSlice';
import type { ManagedAccount } from './types';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium'
});

const roleOptions: { label: string; value: AccountRole }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Member', value: 'member' }
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'A';

const buildRoleDrafts = (accounts: ManagedAccount[]) =>
  accounts.reduce<Record<string, AccountRole>>((drafts, account) => {
    drafts[account.id] = account.role;
    return drafts;
  }, {});

export const AdminSettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const accounts = useAppSelector(selectManagedAccounts);
  const listStatus = useAppSelector(selectAdminListStatus);
  const mutationStatus = useAppSelector(selectAdminMutationStatus);
  const updatingAccountId = useAppSelector(selectUpdatingAccountId);
  const error = useAppSelector(selectAdminError);
  const [roleDrafts, setRoleDrafts] = useState<Record<string, AccountRole>>({});

  const isLoading = listStatus === 'loading';
  const isMutating = mutationStatus === 'loading';

  const roleSummary = useMemo(
    () =>
      accounts.reduce(
        (summary, managedAccount) => ({
          ...summary,
          [managedAccount.role]: summary[managedAccount.role] + 1
        }),
        {
          admin: 0,
          manager: 0,
          member: 0
        } satisfies Record<AccountRole, number>
      ),
    [accounts]
  );

  useEffect(() => {
    dispatch(fetchManagedAccounts());
  }, [dispatch]);

  useEffect(() => {
    setRoleDrafts(buildRoleDrafts(accounts));
  }, [accounts]);

  const handleRefresh = () => {
    dispatch(fetchManagedAccounts());
  };

  const handleRoleChange = (accountId: string, role: AccountRole) => {
    setRoleDrafts((current) => ({
      ...current,
      [accountId]: role
    }));
  };

  const handleSaveRole = async (managedAccount: ManagedAccount) => {
    const role = roleDrafts[managedAccount.id];

    if (!role || role === managedAccount.role) {
      return;
    }

    try {
      const updatedAccount = await dispatch(
        updateManagedAccountRole({
          id: managedAccount.id,
          values: {
            role
          }
        })
      ).unwrap();

      if (updatedAccount.id === account?.id) {
        dispatch(verifyAuthSession());
      }
    } catch {
      setRoleDrafts((current) => ({
        ...current,
        [managedAccount.id]: managedAccount.role
      }));
    }
  };

  return (
    <>
      <header className="app-header">
        <div>
          <p className="eyebrow">Authorization</p>
          <h1>Admin Settings</h1>
        </div>

        <div className="summary-strip admin-summary-strip">
          <div>
            <span>{accounts.length}</span>
            <p>Accounts</p>
          </div>
          <div>
            <span>{roleSummary.admin}</span>
            <p>Admins</p>
          </div>
          <div>
            <span>{roleSummary.manager}</span>
            <p>Managers</p>
          </div>
          <div>
            <span>{roleSummary.member}</span>
            <p>Members</p>
          </div>
        </div>
      </header>

      <StatusBanner
        message={error}
        onDismiss={() => dispatch(clearAdminError())}
      />

      <section className="tool-panel admin-panel">
        <div className="panel-heading panel-heading--wide">
          <div>
            <p className="eyebrow">Accounts</p>
            <h2>Role assignment</h2>
          </div>

          <button
            className="text-button"
            disabled={isLoading}
            onClick={handleRefresh}
            type="button"
          >
            {isLoading ? <ButtonSpinner /> : <RefreshCw size={16} />}
            Refresh
          </button>
        </div>

        <div className="table-wrap admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Mobile</th>
                <th>Current role</th>
                <th>Assign role</th>
                <th>Updated</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {isLoading && accounts.length === 0 ? (
                <tr>
                  <td className="empty-row" colSpan={6}>
                    Loading accounts
                  </td>
                </tr>
              ) : null}

              {!isLoading && accounts.length === 0 ? (
                <tr>
                  <td className="empty-row" colSpan={6}>
                    No accounts found
                  </td>
                </tr>
              ) : null}

              {accounts.map((managedAccount) => {
                const roleDraft =
                  roleDrafts[managedAccount.id] || managedAccount.role;
                const hasRoleChanged = roleDraft !== managedAccount.role;
                const isSaving =
                  isMutating && updatingAccountId === managedAccount.id;

                return (
                  <tr key={managedAccount.id}>
                    <td>
                      <div className="admin-account-cell">
                        {managedAccount.avatarUrl ? (
                          <img
                            alt={managedAccount.fullName}
                            className="admin-account-avatar"
                            src={managedAccount.avatarUrl}
                          />
                        ) : (
                          <span className="admin-account-avatar admin-account-avatar--fallback">
                            {getInitials(managedAccount.fullName)}
                          </span>
                        )}

                        <span>
                          <strong>{managedAccount.fullName}</strong>
                          <small>{managedAccount.email}</small>
                        </span>
                      </div>
                    </td>
                    <td>{managedAccount.mobile}</td>
                    <td>
                      <span className={`badge badge--role-${managedAccount.role}`}>
                        {managedAccount.role}
                      </span>
                    </td>
                    <td>
                      <label className="sr-only" htmlFor={`role-${managedAccount.id}`}>
                        Assign role
                      </label>
                      <select
                        className="role-select"
                        disabled={isMutating}
                        id={`role-${managedAccount.id}`}
                        onChange={(event) =>
                          handleRoleChange(
                            managedAccount.id,
                            event.target.value as AccountRole
                          )
                        }
                        value={roleDraft}
                      >
                        {roleOptions.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {dateFormatter.format(new Date(managedAccount.updatedAt))}
                    </td>
                    <td>
                      <LoadingButton
                        className="text-button"
                        disabled={!hasRoleChanged || isMutating}
                        isLoading={isSaving}
                        loadingLabel="Saving"
                        onClick={() => handleSaveRole(managedAccount)}
                      >
                        <Save size={16} />
                        Save
                      </LoadingButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="admin-access-map">
          <div>
            <ShieldCheck size={19} />
            <span>Admin</span>
            <strong>Full access</strong>
          </div>
          <div>
            <UserCog size={19} />
            <span>Manager</span>
            <strong>Limited access</strong>
          </div>
          <div>
            <UserCog size={19} />
            <span>Member</span>
            <strong>Limited access</strong>
          </div>
        </div>
      </section>
    </>
  );
};
