import { http } from '../../services/http';
import type {
  AccountRoleUpdateValues,
  ApiItemResponse,
  ApiListResponse,
  ManagedAccount
} from './types';

export const adminApi = {
  async getAccounts() {
    const response =
      await http.get<ApiListResponse<ManagedAccount>>('/admin/accounts');
    return response.data;
  },
  async updateAccountRole(id: string, values: AccountRoleUpdateValues) {
    const response = await http.patch<ApiItemResponse<ManagedAccount>>(
      `/admin/accounts/${id}/role`,
      values
    );
    return response.data;
  }
};
