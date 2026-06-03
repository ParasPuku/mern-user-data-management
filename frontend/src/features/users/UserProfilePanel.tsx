import { FormEvent, useEffect, useState } from 'react';
import { Save, Trash2, X } from 'lucide-react';

import { LoadingButton } from '../../components/LoadingButton';
import type {
  RequestStatus,
  User,
  UserProfile,
  UserProfileValues
} from './types';

const emptyProfileValues: UserProfileValues = {
  employeeId: '',
  department: '',
  location: '',
  notes: ''
};

type UserProfilePanelProps = {
  mutationStatus: RequestStatus;
  onClose: () => void;
  onDelete: () => Promise<void>;
  onSubmit: (values: UserProfileValues) => Promise<void>;
  profile: UserProfile | null | undefined;
  profileStatus: RequestStatus;
  user: User | null;
};

export const UserProfilePanel = ({
  mutationStatus,
  onClose,
  onDelete,
  onSubmit,
  profile,
  profileStatus,
  user
}: UserProfilePanelProps) => {
  const [formValues, setFormValues] =
    useState<UserProfileValues>(emptyProfileValues);
  const [localError, setLocalError] = useState<string | null>(null);
  const isSaving = mutationStatus === 'loading';
  const isLoading = profileStatus === 'loading';

  useEffect(() => {
    setLocalError(null);

    if (!profile) {
      setFormValues(emptyProfileValues);
      return;
    }

    setFormValues({
      department: profile.department,
      employeeId: profile.employeeId,
      location: profile.location,
      notes: profile.notes
    });
  }, [profile, user?.id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!user) {
      setLocalError('Select a user first');
      return;
    }

    try {
      await onSubmit({
        department: formValues.department.trim(),
        employeeId: formValues.employeeId.trim(),
        location: formValues.location.trim(),
        notes: formValues.notes.trim()
      });
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to save profile'
      );
    }
  };

  const handleDelete = async () => {
    if (!profile) {
      return;
    }

    await onDelete();
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">User Details</p>
          <h2 id="user-profile-dialog-title">
            {user ? user.name : 'Select user'}
          </h2>
        </div>

        <button
          aria-label="Close profile"
          className="icon-button icon-button--ghost"
          onClick={onClose}
          title="Close profile"
          type="button"
        >
          <X size={16} />
        </button>
      </div>

      {localError ? <p className="form-error">{localError}</p> : null}
      {isLoading ? <p className="form-note">Loading profile details</p> : null}
      {!user ? <p className="form-note">Choose a user from the table</p> : null}

      <label>
        Employee ID
        <input
          disabled={!user || isLoading}
          maxLength={40}
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              employeeId: event.target.value
            }))
          }
          value={formValues.employeeId}
        />
      </label>

      <label>
        Department
        <input
          disabled={!user || isLoading}
          maxLength={80}
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              department: event.target.value
            }))
          }
          value={formValues.department}
        />
      </label>

      <label>
        Location
        <input
          disabled={!user || isLoading}
          maxLength={120}
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              location: event.target.value
            }))
          }
          value={formValues.location}
        />
      </label>

      <label>
        Notes
        <textarea
          disabled={!user || isLoading}
          maxLength={500}
          onChange={(event) =>
            setFormValues((current) => ({
              ...current,
              notes: event.target.value
            }))
          }
          rows={4}
          value={formValues.notes}
        />
      </label>

      <div className="profile-actions">
        <LoadingButton
          className="primary-button"
          disabled={!user}
          isLoading={isSaving}
          loadingLabel="Saving profile"
          type="submit"
        >
          <Save size={17} />
          Save profile
        </LoadingButton>

        <button
          className="text-button text-button--danger"
          disabled={!profile || isSaving}
          onClick={handleDelete}
          type="button"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>
    </form>
  );
};
