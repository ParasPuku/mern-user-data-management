export type UserRole = 'admin' | 'manager' | 'member';
export type UserStatus = 'active' | 'inactive';
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type UserFilters = {
  search: string;
  role: UserRole | 'all';
  status: UserStatus | 'all';
};

export type UserPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type UserSummary = {
  total: number;
  active: number;
  inactive: number;
};

export type UserListQuery = UserFilters & {
  page: number;
  limit: number;
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

export type UserProfileValues = {
  employeeId: string;
  department: string;
  location: string;
  notes: string;
};

export type UserProfile = UserProfileValues & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiListResponse<T> = {
  data: T[];
  meta: {
    pagination: UserPagination;
    summary: UserSummary;
  };
};

export type ApiItemResponse<T> = {
  data: T;
};
