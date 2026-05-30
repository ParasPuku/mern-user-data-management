import { RefreshCcw, Search } from 'lucide-react';

import type { RequestStatus, UserFilters as UserFilterValues } from './types';

type UserFiltersProps = {
  filters: UserFilterValues;
  listStatus: RequestStatus;
  onChange: (filters: Partial<UserFilterValues>) => void;
  onRefresh: () => void;
  onReset: () => void;
};

export const UserFilters = ({
  filters,
  listStatus,
  onChange,
  onRefresh,
  onReset
}: UserFiltersProps) => (
  <div className="filters">
    <label className="search-field">
      <Search aria-hidden="true" size={18} />
      <input
        aria-label="Search users"
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search name or email"
        type="search"
        value={filters.search}
      />
    </label>

    <select
      aria-label="Filter by role"
      onChange={(event) =>
        onChange({ role: event.target.value as UserFilterValues['role'] })
      }
      value={filters.role}
    >
      <option value="all">All roles</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="member">Member</option>
    </select>

    <select
      aria-label="Filter by status"
      onChange={(event) =>
        onChange({ status: event.target.value as UserFilterValues['status'] })
      }
      value={filters.status}
    >
      <option value="all">All statuses</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    <button
      className="icon-button"
      disabled={listStatus === 'loading'}
      onClick={onRefresh}
      title="Refresh users"
      type="button"
    >
      <RefreshCcw size={16} />
    </button>

    <button className="text-button" onClick={onReset} type="button">
      Reset
    </button>
  </div>
);
