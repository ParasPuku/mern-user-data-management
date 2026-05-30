import { hasText, isEmail, validateWithRules } from '../../lib/validation';
import type { UserFormValues } from './types';

export const validateUserForm = (values: UserFormValues) =>
  validateWithRules(values, [
    ({ name }) => (hasText(name) ? null : 'Name is required'),
    ({ email }) => (isEmail(email) ? null : 'Enter a valid email address')
  ]);

