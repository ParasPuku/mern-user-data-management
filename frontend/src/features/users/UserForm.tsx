import { FormEvent, useEffect, useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

import { LoadingButton } from '../../components/LoadingButton';
import type { RequestStatus, User, UserFormValues } from './types';
import { validateUserForm } from './validation';

const emptyForm: UserFormValues = {
  name: '',
  email: '',
  role: 'member',
  status: 'active'
};

type UserFormProps = {
  selectedUser: User | null;
  mutationStatus: RequestStatus;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
};

export const UserForm = ({
  selectedUser,
  mutationStatus,
  onCancel,
  onSubmit
}: UserFormProps) => {
  const [formValues, setFormValues] = useState<UserFormValues>(emptyForm);
  const [localError, setLocalError] = useState<string | null>(null);
  const isEditing = Boolean(selectedUser);
  const isSaving = mutationStatus === 'loading';
  const isFormValid = validateUserForm(formValues).isValid;

  useEffect(() => {
    if (!selectedUser) {
      setFormValues(emptyForm);
      return;
    }

    setFormValues({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status
    });
  }, [selectedUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const normalizedValues = {
      ...formValues,
      name: formValues.name.trim(),
      email: formValues.email.trim().toLowerCase()
    };

    const validation = validateUserForm(normalizedValues);

    if (!validation.isValid) {
      setLocalError(validation.errors[0] || 'Please complete the form');
      return;
    }

    try {
      await onSubmit(normalizedValues);

      if (!isEditing) {
        setFormValues(emptyForm);
      }
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to save user'
      );
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{isEditing ? 'Edit record' : 'New record'}</p>
          <h2>{isEditing ? selectedUser?.name : 'Create user'}</h2>
        </div>

        {isEditing ? (
          <button
            aria-label="Cancel edit"
            className="icon-button icon-button--ghost"
            onClick={onCancel}
            title="Cancel edit"
            type="button"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      {localError ? <p className="form-error">{localError}</p> : null}

      <label>
        Name
        <input
          autoComplete="name"
          maxLength={80}
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              name: event.target.value
            }))
          }
          required
          type="text"
          value={formValues.name}
        />
      </label>

      <label>
        Email
        <input
          autoComplete="email"
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              email: event.target.value
            }))
          }
          required
          type="email"
          value={formValues.email}
        />
      </label>

      <label>
        Role
        <select
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              role: event.target.value as UserFormValues['role']
            }))
          }
          value={formValues.role}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="member">Member</option>
        </select>
      </label>

      <label>
        Status
        <select
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              status: event.target.value as UserFormValues['status']
            }))
          }
          value={formValues.status}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>

      <LoadingButton
        className="primary-button"
        disabled={!isFormValid}
        isLoading={isSaving}
        loadingLabel={isEditing ? 'Saving changes' : 'Creating user'}
        type="submit"
      >
        {isEditing ? <Save size={17} /> : <Plus size={17} />}
        {isEditing ? 'Save changes' : 'Create user'}
      </LoadingButton>
    </form>
  );
};
