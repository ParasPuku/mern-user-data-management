import { http } from '../../services/http';
import type {
  ApiItemResponse,
  ApiListResponse,
  User,
  UserFilters,
  UserFormValues,
  UserProfile,
  UserProfileValues
} from './types';

const toQueryString = (filters?: UserFilters) => {
  const params = new URLSearchParams();

  if (filters?.search.trim()) {
    params.set('search', filters.search.trim());
  }

  if (filters?.role && filters.role !== 'all') {
    params.set('role', filters.role);
  }

  if (filters?.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const usersApi = {
  async getUsers(filters?: UserFilters) {
    const response = await http.get<ApiListResponse<User>>(
      `/users${toQueryString(filters)}`
    );
    return response.data;
  },
  async createUser(values: UserFormValues) {
    const response = await http.post<ApiItemResponse<User>>('/users', values);
    return response.data;
  },
  async updateUser(id: string, values: UserFormValues) {
    const response = await http.patch<ApiItemResponse<User>>(
      `/users/${id}`,
      values
    );
    return response.data;
  },
  async deleteUser(id: string) {
    await http.delete<void>(`/users/${id}`);
  },
  async getUserProfile(userId: string) {
    const response = await http.get<ApiItemResponse<UserProfile | null>>(
      `/users/${userId}/profile`
    );
    return response.data;
  },
  async saveUserProfile(userId: string, values: UserProfileValues) {
    const response = await http.put<ApiItemResponse<UserProfile>>(
      `/users/${userId}/profile`,
      values
    );
    return response.data;
  },
  async deleteUserProfile(userId: string) {
    await http.delete<void>(`/users/${userId}/profile`);
  }
};
