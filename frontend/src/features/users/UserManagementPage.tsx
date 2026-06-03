import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatusBanner } from '../../components/StatusBanner';
import { UserFilters } from './UserFilters';
import { UserForm } from './UserForm';
import { UserPagination } from './UserPagination';
import { UserProfilePanel } from './UserProfilePanel';
import { UserTable } from './UserTable';
import type { User, UserFormValues, UserProfileValues } from './types';
import {
  clearUsersError,
  createUser,
  deleteUser,
  deleteUserProfile,
  fetchUsers,
  fetchUserProfile,
  resetFilters,
  saveUserProfile,
  selectUserFilters,
  selectUserProfileById,
  selectUserProfileMutationStatus,
  selectUserProfileStatus,
  selectUsers,
  selectUsersError,
  selectUsersListStatus,
  selectUsersMutationStatus,
  selectUsersPagination,
  selectUsersSummary,
  setFilters,
  setUsersPage,
  setUsersPageLimit,
  updateUser
} from './usersSlice';

export const UserManagementPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const filters = useAppSelector(selectUserFilters);
  const listStatus = useAppSelector(selectUsersListStatus);
  const mutationStatus = useAppSelector(selectUsersMutationStatus);
  const pagination = useAppSelector(selectUsersPagination);
  const summary = useAppSelector(selectUsersSummary);
  const error = useAppSelector(selectUsersError);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [profileUserId, setProfileUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [selectedUserId, users]
  );
  const profileUser = useMemo(
    () => users.find((user) => user.id === profileUserId) || null,
    [profileUserId, users]
  );
  const selectedProfile = useAppSelector(selectUserProfileById(profileUserId));
  const profileStatus = useAppSelector(selectUserProfileStatus);
  const profileMutationStatus = useAppSelector(
    selectUserProfileMutationStatus
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, filters, pagination.limit, pagination.page]);

  useEffect(() => {
    if (profileUserId) {
      dispatch(fetchUserProfile(profileUserId));
    }
  }, [dispatch, profileUserId]);

  useEffect(() => {
    if (!profileUserId) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileUserId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [profileUserId]);

  const handleCloseProfile = () => {
    setProfileUserId(null);
  };

  const handleSubmit = async (values: UserFormValues) => {
    if (selectedUser) {
      await dispatch(updateUser({ id: selectedUser.id, values })).unwrap();
      setSelectedUserId(null);
      dispatch(fetchUsers());
      return;
    }

    await dispatch(createUser(values)).unwrap();

    if (pagination.page === 1) {
      dispatch(fetchUsers());
      return;
    }

    dispatch(setUsersPage(1));
  };

  const handleDelete = async (id: string) => {
    const user = users.find((item) => item.id === id);
    const shouldDelete = window.confirm(
      `Delete ${user?.name || 'this user'}?`
    );

    if (shouldDelete) {
      try {
        await dispatch(deleteUser(id)).unwrap();
      } catch {
        return;
      }

      if (profileUserId === id) {
        setProfileUserId(null);
      }

      if (users.length === 1 && pagination.page > 1) {
        dispatch(setUsersPage(pagination.page - 1));
        return;
      }

      dispatch(fetchUsers());
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id);
  };

  const handleProfile = (user: User) => {
    setProfileUserId(user.id);
  };

  const handleProfileSubmit = async (values: UserProfileValues) => {
    if (!profileUser) {
      return;
    }

    await dispatch(
      saveUserProfile({
        userId: profileUser.id,
        values
      })
    ).unwrap();
    handleCloseProfile();
  };

  const handleProfileDelete = async () => {
    if (!profileUser) {
      return;
    }

    await dispatch(deleteUserProfile(profileUser.id)).unwrap();
    handleCloseProfile();
  };

  const handleRefresh = () => {
    dispatch(fetchUsers());

    if (profileUserId) {
      dispatch(fetchUserProfile(profileUserId));
    }
  };

  return (
    <>
      <header className="app-header">
        <div>
          <p className="eyebrow">Private workspace</p>
          <h1>User Data Management</h1>
        </div>

        <div className="summary-strip" aria-label="User summary">
          <div>
            <span>{summary.total}</span>
            <p>Total results</p>
          </div>
          <div>
            <span>{summary.active}</span>
            <p>Active</p>
          </div>
          <div>
            <span>{summary.inactive}</span>
            <p>Inactive</p>
          </div>
        </div>
      </header>

      <StatusBanner
        message={error}
        onDismiss={() => dispatch(clearUsersError())}
      />

      <main className="content-grid">
        <aside className="tool-panel form-panel">
          <UserForm
            mutationStatus={mutationStatus}
            onCancel={() => setSelectedUserId(null)}
            onSubmit={handleSubmit}
            selectedUser={selectedUser}
          />
        </aside>

        <section className="tool-panel users-panel">
          <div className="panel-heading panel-heading--wide">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>Users</h2>
            </div>

            <UserFilters
              filters={filters}
              listStatus={listStatus}
              onChange={(nextFilters) => dispatch(setFilters(nextFilters))}
              onRefresh={handleRefresh}
              onReset={() => dispatch(resetFilters())}
            />
          </div>

          <UserTable
            listStatus={listStatus}
            mutationStatus={mutationStatus}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onProfile={handleProfile}
            users={users}
          />

          <UserPagination
            listStatus={listStatus}
            onLimitChange={(limit) => dispatch(setUsersPageLimit(limit))}
            onPageChange={(page) => dispatch(setUsersPage(page))}
            pagination={pagination}
          />
        </section>
      </main>

      {profileUser ? (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseProfile();
            }
          }}
          role="presentation"
        >
          <div
            aria-labelledby="user-profile-dialog-title"
            aria-modal="true"
            className="modal-panel"
            role="dialog"
          >
            <UserProfilePanel
              mutationStatus={profileMutationStatus}
              onClose={handleCloseProfile}
              onDelete={handleProfileDelete}
              onSubmit={handleProfileSubmit}
              profile={selectedProfile}
              profileStatus={profileStatus}
              user={profileUser}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
