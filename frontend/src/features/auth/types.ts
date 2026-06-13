export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
export type AuthActionStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type AccountRole = 'admin' | 'manager' | 'member';

export type Account = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: AccountRole;
  sessionExpiresAt: string | null;
  sessionExpiresInMs: number | null;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type SignUpValues = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export type PasswordLoginValues = {
  email: string;
  password: string;
};

export type OtpRequestValues = {
  identifier: string;
};

export type OtpVerifyValues = {
  identifier: string;
  code: string;
};

export type SetPasswordValues = {
  resetToken: string;
  password: string;
  confirmPassword: string;
};

export type ProfileValues = {
  fullName: string;
  mobile: string;
};

export type OtpRequestResult = {
  deliveryTarget: string;
  devOtp?: string;
  expiresAt: string;
  message: string;
};

export type PasswordResetOtpResult = {
  resetToken: string;
};

export type ApiItemResponse<T> = {
  data: T;
};
