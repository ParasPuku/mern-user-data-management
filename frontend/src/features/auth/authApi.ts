import { http } from '../../services/http';
import type {
  Account,
  ApiItemResponse,
  OtpRequestResult,
  OtpRequestValues,
  OtpVerifyValues,
  PasswordLoginValues,
  PasswordResetOtpResult,
  ProfileValues,
  SetPasswordValues,
  SignUpValues
} from './types';

export const authApi = {
  async getMe() {
    const response = await http.get<ApiItemResponse<Account>>('/auth/session');
    return response.data;
  },
  async refreshSession() {
    const response = await http.post<ApiItemResponse<Account>>(
      '/auth/session/refresh'
    );
    return response.data;
  },
  async signUp(values: SignUpValues) {
    const response = await http.post<ApiItemResponse<Account>>(
      '/auth/signup',
      values
    );
    return response.data;
  },
  async signInWithPassword(values: PasswordLoginValues) {
    const response = await http.post<ApiItemResponse<Account>>(
      '/auth/login/password',
      values
    );
    return response.data;
  },
  async requestLoginOtp(values: OtpRequestValues) {
    const response = await http.post<ApiItemResponse<OtpRequestResult>>(
      '/auth/login/otp/request',
      values
    );
    return response.data;
  },
  async verifyLoginOtp(values: OtpVerifyValues) {
    const response = await http.post<ApiItemResponse<Account>>(
      '/auth/login/otp/verify',
      values
    );
    return response.data;
  },
  async requestPasswordReset(values: OtpRequestValues) {
    const response = await http.post<ApiItemResponse<OtpRequestResult>>(
      '/auth/password/forgot',
      values
    );
    return response.data;
  },
  async verifyPasswordResetOtp(values: OtpVerifyValues) {
    const response = await http.post<ApiItemResponse<PasswordResetOtpResult>>(
      '/auth/password/verify-otp',
      values
    );
    return response.data;
  },
  async setPassword(values: SetPasswordValues) {
    await http.post<{ message: string }>('/auth/password/set', values);
  },
  async updateProfile(values: ProfileValues) {
    const response = await http.patch<ApiItemResponse<Account>>(
      '/auth/profile',
      values
    );
    return response.data;
  },
  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.set('avatar', file);

    const response = await http.upload<ApiItemResponse<Account>>(
      '/auth/profile/avatar',
      formData
    );
    return response.data;
  },
  async logout() {
    await http.post<{ message: string }>('/auth/logout');
  }
};
