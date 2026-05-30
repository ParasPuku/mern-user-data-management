export type ValidationRule<TValues> = (values: TValues) => string | null;

export const validateWithRules = <TValues>(
  values: TValues,
  rules: ValidationRule<TValues>[]
) => {
  const errors = rules
    .map((rule) => rule(values))
    .filter((message): message is string => Boolean(message));

  return {
    errors,
    isValid: errors.length === 0
  };
};

export const hasText = (value = '') => value.trim().length > 0;

export const isEmail = (value = '') => /^\S+@\S+\.\S+$/.test(value.trim());

export const isMobile = (value = '') =>
  /^\+?\d{7,15}$/.test(value.trim().replace(/[\s()-]/g, ''));

export const isEmailOrMobile = (value = '') => {
  const normalized = value.trim();
  return normalized.includes('@') ? isEmail(normalized) : isMobile(normalized);
};

export const isStrongEnoughPassword = (value = '') => value.length >= 8;

export const isSixDigitOtp = (value = '') => /^\d{6}$/.test(value.trim());

export const passwordsMatch = (password = '', confirmPassword = '') =>
  password === confirmPassword;

