import { IdCard, Pencil, Trash2 } from 'lucide-react';

import { ButtonSpinner } from '../../components/LoadingButton';
import type { RequestStatus, User } from './types';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium'
});

type UserTableProps = {
  listStatus: RequestStatus;
  mutationStatus: RequestStatus;
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
  onProfile: (user: User) => void;
};

export const UserTable = ({
  listStatus,
  mutationStatus,
  users,
  onDelete,
  onEdit,
  onProfile
}: UserTableProps) => {
  const isLoading = listStatus === 'loading';
  const isMutating = mutationStatus === 'loading';

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {isLoading && users.length === 0 ? (
            <tr>
              <td className="empty-row" colSpan={6}>
                Loading users
              </td>
            </tr>
          ) : null}

          {!isLoading && users.length === 0 ? (
            <tr>
              <td className="empty-row" colSpan={6}>
                No users found
              </td>
            </tr>
          ) : null}

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>{user.name}</strong>
              </td>
              <td>{user.email}</td>
              <td>
                <span className="badge badge--role">{user.role}</span>
              </td>
              <td>
                <span className={`badge badge--${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td>{dateFormatter.format(new Date(user.createdAt))}</td>
              <td>
                <div className="row-actions">
                  <button
                    className="icon-button"
                    disabled={isMutating}
                    onClick={() => onProfile(user)}
                    title={`Manage profile for ${user.name}`}
                    type="button"
                  >
                    <IdCard size={16} />
                  </button>
                  <button
                    className="icon-button"
                    disabled={isMutating}
                    onClick={() => onEdit(user)}
                    title={`Edit ${user.name}`}
                    type="button"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="icon-button icon-button--danger"
                    disabled={isMutating}
                    onClick={() => onDelete(user.id)}
                    title={`Delete ${user.name}`}
                    type="button"
                  >
                    {isMutating ? <ButtonSpinner /> : <Trash2 size={16} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
