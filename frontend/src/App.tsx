import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { StatusBanner } from './components/StatusBanner';
import { UserFilters } from './features/users/UserFilters';
import { UserForm } from './features/users/UserForm';
import { UserTable } from './features/users/UserTable';
import type { User, UserFormValues } from './features/users/types';
import {
  clearUsersError,
  createUser,
  deleteUser,
  fetchUsers,
  resetFilters,
  selectUserFilters,
  selectUsers,
  selectUsersError,
  selectUsersListStatus,
  selectUsersMutationStatus,
  setFilters,
  updateUser
} from './features/users/usersSlice';

export const App = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const filters = useAppSelector(selectUserFilters);
  const listStatus = useAppSelector(selectUsersListStatus);
  const mutationStatus = useAppSelector(selectUsersMutationStatus);
  const error = useAppSelector(selectUsersError);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [selectedUserId, users]
  );

  const activeUsers = users.filter((user) => user.status === 'active').length;
  const inactiveUsers = users.length - activeUsers;

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [dispatch, filters]);

  const handleSubmit = async (values: UserFormValues) => {
    if (selectedUser) {
      await dispatch(updateUser({ id: selectedUser.id, values })).unwrap();
      setSelectedUserId(null);
      return;
    }

    await dispatch(createUser(values)).unwrap();
  };

  const handleDelete = (id: string) => {
    const user = users.find((item) => item.id === id);
    const shouldDelete = window.confirm(
      `Delete ${user?.name || 'this user'}?`
    );

    if (shouldDelete) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id);
  };

  const handleRefresh = () => {
    dispatch(fetchUsers(filters));
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">MERN workspace</p>
          <h1>User Data Management</h1>
        </div>

        <div className="summary-strip" aria-label="User summary">
          <div>
            <span>{users.length}</span>
            <p>Total</p>
          </div>
          <div>
            <span>{activeUsers}</span>
            <p>Active</p>
          </div>
          <div>
            <span>{inactiveUsers}</span>
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
            users={users}
          />
        </section>
      </main>
    </div>
  );
};

