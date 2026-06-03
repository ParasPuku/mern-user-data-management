import { http } from '../../services/http';
import type {
  ApiItemResponse,
  ApiListResponse,
  User,
  UserFormValues,
  UserListQuery,
  UserProfile,
  UserProfileValues
} from './types';

const toQueryString = (query?: UserListQuery) => {
  const params = new URLSearchParams();

  if (query?.search.trim()) {
    params.set('search', query.search.trim());
  }

  if (query?.role && query.role !== 'all') {
    params.set('role', query.role);
  }

  if (query?.status && query.status !== 'all') {
    params.set('status', query.status);
  }

  if (query?.page) {
    params.set('page', String(query.page));
  }

  if (query?.limit) {
    params.set('limit', String(query.limit));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

export const usersApi = {
  async getUsers(query?: UserListQuery) {
    const response = await http.get<ApiListResponse<User>>(
      `/users${toQueryString(query)}`
    );
    return response;
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
