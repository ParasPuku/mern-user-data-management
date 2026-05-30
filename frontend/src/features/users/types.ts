export type UserRole = 'admin' | 'manager' | 'member';
export type UserStatus = 'active' | 'inactive';
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type UserFilters = {
  search: string;
  role: UserRole | 'all';
  status: UserStatus | 'all';
};

export type UserFormValues = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type User = UserFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};

