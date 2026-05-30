import {
  hasText,
  isEmail,
  isEmailOrMobile,
  isMobile,
  isSixDigitOtp,
  isStrongEnoughPassword,
  passwordsMatch,
  validateWithRules
} from '../../lib/validation';
import type {
  OtpRequestValues,
  OtpVerifyValues,
  PasswordLoginValues,
  ProfileValues,
  SetPasswordValues,
  SignUpValues
} from './types';

export const validatePasswordLogin = (values: PasswordLoginValues) =>
  validateWithRules(values, [
    ({ email }) => (isEmail(email) ? null : 'Enter a valid email address'),
    ({ password }) =>
      isStrongEnoughPassword(password)
        ? null
        : 'Password must be at least 8 characters'
  ]);

export const validateOtpRequest = (values: OtpRequestValues) =>
  validateWithRules(values, [
    ({ identifier }) =>
      isEmailOrMobile(identifier) ? null : 'Enter a valid email or mobile number'
  ]);

export const validateSignUp = (values: SignUpValues) =>
  validateWithRules(values, [
    ({ fullName }) => (hasText(fullName) ? null : 'Full name is required'),
    ({ email }) => (isEmail(email) ? null : 'Enter a valid email address'),
    ({ mobile }) => (isMobile(mobile) ? null : 'Enter a valid mobile number'),
    ({ password }) =>
      isStrongEnoughPassword(password)
        ? null
        : 'Password must be at least 8 characters',
    ({ password, confirmPassword }) =>
      passwordsMatch(password, confirmPassword) ? null : 'Passwords do not match',
    ({ termsAccepted }) =>
      termsAccepted ? null : 'Terms and policy must be accepted'
  ]);

export const validateOtpVerification = (values: OtpVerifyValues) =>
  validateWithRules(values, [
    ({ identifier }) =>
      isEmailOrMobile(identifier) ? null : 'Enter a valid email or mobile number',
    ({ code }) => (isSixDigitOtp(code) ? null : 'OTP must be 6 digits')
  ]);

export const validateSetPassword = (values: SetPasswordValues) =>
  validateWithRules(values, [
    ({ resetToken }) => (hasText(resetToken) ? null : 'Reset token is missing'),
    ({ password }) =>
      isStrongEnoughPassword(password)
        ? null
        : 'Password must be at least 8 characters',
    ({ password, confirmPassword }) =>
      passwordsMatch(password, confirmPassword) ? null : 'Passwords do not match'
  ]);

export const validateProfile = (values: ProfileValues) =>
  validateWithRules(values, [
    ({ fullName }) => (hasText(fullName) ? null : 'Full name is required'),
    ({ mobile }) => (isMobile(mobile) ? null : 'Enter a valid mobile number')
  ]);

