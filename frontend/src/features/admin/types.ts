import type { AccountRole } from '../auth/types';

export type AdminRequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ManagedAccount = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  mobile: string;
  role: AccountRole;
  updatedAt: string;
};

export type AccountRoleUpdateValues = {
  role: AccountRole;
};

export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};
