import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  UsersRound,
  X
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ButtonSpinner, LoadingButton } from '../../components/LoadingButton';
import { StatusBanner } from '../../components/StatusBanner';
import {
  fetchUsers,
  selectUsers,
  selectUsersListStatus
} from '../users/usersSlice';
import {
  addUserSkill,
  clearSkillsError,
  createSkill,
  deleteSkill,
  fetchSkillById,
  fetchSkills,
  fetchUserSkills,
  removeUserSkill,
  selectSelectedSkill,
  selectSkillAssignmentStatus,
  selectSkills,
  selectSkillsDetailStatus,
  selectSkillsError,
  selectSkillsListStatus,
  selectSkillsMutationStatus,
  selectUserSkillsById,
  updateSkill
} from './skillsSlice';
import type { Skill, SkillFormValues, SkillLevel } from './types';

const emptySkillForm: SkillFormValues = {
  name: '',
  category: '',
  description: ''
};

const userFetchQuery = {
  search: '',
  role: 'all' as const,
  status: 'all' as const,
  page: 1,
  limit: 100
};

const skillLevels: SkillLevel[] = [
  'beginner',
  'intermediate',
  'advanced',
  'expert'
];

const formatLevel = (level: SkillLevel) =>
  level
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const SkillManagementPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersListStatus);
  const skills = useAppSelector(selectSkills);
  const selectedSkill = useAppSelector(selectSelectedSkill);
  const listStatus = useAppSelector(selectSkillsListStatus);
  const detailStatus = useAppSelector(selectSkillsDetailStatus);
  const mutationStatus = useAppSelector(selectSkillsMutationStatus);
  const assignmentStatus = useAppSelector(selectSkillAssignmentStatus);
  const error = useAppSelector(selectSkillsError);
  const [formValues, setFormValues] =
    useState<SkillFormValues>(emptySkillForm);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [level, setLevel] = useState<SkillLevel>('beginner');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);
  const selectedUserSkills = useAppSelector(
    selectUserSkillsById(selectedUserId)
  );

  const isLoadingSkills = listStatus === 'loading';
  const isLoadingUsers = usersStatus === 'loading';
  const isLoadingAssignments = assignmentStatus === 'loading';
  const isMutating = mutationStatus === 'loading';
  const assignedSkillIds = useMemo(
    () => new Set(selectedUserSkills.map((assignment) => assignment.skillId)),
    [selectedUserSkills]
  );
  const availableSkills = useMemo(
    () => skills.filter((skill) => !assignedSkillIds.has(skill.id)),
    [assignedSkillIds, skills]
  );
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;
  const totalAssignments = skills.reduce(
    (total, skill) => total + skill.userCount,
    0
  );
  const usersWithSkills = new Set(
    skills.flatMap((skill) => skill.userIds)
  ).size;
  const isEditing = Boolean(editingSkillId);
  const canSaveSkill =
    formValues.name.trim().length >= 2 && !isMutating;
  const canAssignSkill =
    Boolean(selectedUserId && selectedSkillId) && !isLoadingAssignments;

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchUsers(userFetchQuery));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedUserId && users[0]) {
      setSelectedUserId(users[0].id);
    }
  }, [selectedUserId, users]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(fetchUserSkills(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    const nextSkillId = availableSkills[0]?.id || '';

    if (!selectedSkillId || assignedSkillIds.has(selectedSkillId)) {
      setSelectedSkillId(nextSkillId);
    }
  }, [assignedSkillIds, availableSkills, selectedSkillId]);

  const resetSkillForm = () => {
    setEditingSkillId(null);
    setFormValues(emptySkillForm);
  };

  const refreshSkillContext = () => {
    dispatch(fetchSkills());

    if (selectedSkill) {
      dispatch(fetchSkillById(selectedSkill.id));
    }
  };

  const handleSkillSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const normalizedValues = {
      category: formValues.category.trim() || 'General',
      description: formValues.description.trim(),
      name: formValues.name.trim()
    };

    if (normalizedValues.name.length < 2) {
      setLocalError('Skill name must be at least 2 characters');
      return;
    }

    try {
      if (editingSkillId) {
        await dispatch(
          updateSkill({
            id: editingSkillId,
            values: normalizedValues
          })
        ).unwrap();
      } else {
        await dispatch(createSkill(normalizedValues)).unwrap();
      }

      resetSkillForm();
      dispatch(fetchSkills());
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to save skill'
      );
    }
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setFormValues({
      category: skill.category,
      description: skill.description,
      name: skill.name
    });
  };

  const handleDeleteSkill = async (skill: Skill) => {
    const shouldDelete = window.confirm(`Delete ${skill.name}?`);

    if (!shouldDelete) {
      return;
    }

    try {
      await dispatch(deleteSkill(skill.id)).unwrap();
      resetSkillForm();
      dispatch(fetchSkills());

      if (selectedUserId) {
        dispatch(fetchUserSkills(selectedUserId));
      }
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to delete skill'
      );
    }
  };

  const handleAssignSkill = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    if (!selectedUserId || !selectedSkillId) {
      setLocalError('Select a user and a skill');
      return;
    }

    try {
      await dispatch(
        addUserSkill({
          userId: selectedUserId,
          values: {
            level,
            skillId: selectedSkillId,
            yearsOfExperience
          }
        })
      ).unwrap();
      refreshSkillContext();
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to assign skill'
      );
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    if (!selectedUserId) {
      return;
    }

    try {
      await dispatch(
        removeUserSkill({
          skillId,
          userId: selectedUserId
        })
      ).unwrap();
      refreshSkillContext();
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to remove skill'
      );
    }
  };

  return (
    <>
      <header className="app-header">
        <div>
          <p className="eyebrow">Many-to-many relationship</p>
          <h1>Users & Skills</h1>
        </div>

        <div className="summary-strip" aria-label="Skill summary">
          <div>
            <span>{skills.length}</span>
            <p>Skills</p>
          </div>
          <div>
            <span>{totalAssignments}</span>
            <p>Assignments</p>
          </div>
          <div>
            <span>{usersWithSkills}</span>
            <p>Users linked</p>
          </div>
        </div>
      </header>

      <StatusBanner
        message={error || localError}
        onDismiss={() => {
          setLocalError(null);
          dispatch(clearSkillsError());
        }}
      />

      <main className="skills-grid">
        <section className="tool-panel skill-catalog-panel">
          <form className="skill-form" onSubmit={handleSkillSubmit}>
            <div className="panel-heading">
              <div>
                <p className="eyebrow">
                  {isEditing ? 'Edit skill' : 'Skill catalog'}
                </p>
                <h2>{isEditing ? 'Update skill' : 'Create skill'}</h2>
              </div>

              {isEditing ? (
                <button
                  aria-label="Cancel skill edit"
                  className="icon-button icon-button--ghost"
                  onClick={resetSkillForm}
                  title="Cancel edit"
                  type="button"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <label>
              Skill name
              <input
                maxLength={80}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    name: event.target.value
                  }))
                }
                placeholder="React, MongoDB, AWS"
                required
                value={formValues.name}
              />
            </label>

            <label>
              Category
              <input
                maxLength={80}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    category: event.target.value
                  }))
                }
                placeholder="Frontend, Backend, DevOps"
                value={formValues.category}
              />
            </label>

            <label>
              Description
              <textarea
                maxLength={240}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    description: event.target.value
                  }))
                }
                placeholder="Short internal note"
                rows={3}
                value={formValues.description}
              />
            </label>

            <LoadingButton
              className="primary-button"
              disabled={!canSaveSkill}
              isLoading={isMutating}
              loadingLabel={isEditing ? 'Saving skill' : 'Creating skill'}
              type="submit"
            >
              {isEditing ? <Save size={17} /> : <Plus size={17} />}
              {isEditing ? 'Save skill' : 'Create skill'}
            </LoadingButton>
          </form>

          <div className="skill-list-heading">
            <div>
              <p className="eyebrow">Reusable skills</p>
              <h2>Catalog</h2>
            </div>

            <button
              className="icon-button"
              disabled={isLoadingSkills}
              onClick={() => dispatch(fetchSkills())}
              title="Refresh skills"
              type="button"
            >
              {isLoadingSkills ? <ButtonSpinner /> : <RefreshCw size={16} />}
            </button>
          </div>

          <div className="skill-list">
            {!isLoadingSkills && skills.length === 0 ? (
              <p className="empty-row">Create a skill to start assigning users</p>
            ) : null}

            {skills.map((skill) => (
              <div
                className={`skill-list-item ${
                  selectedSkill?.id === skill.id ? 'is-active' : ''
                }`}
                key={skill.id}
              >
                <button
                  className="skill-list-main"
                  onClick={() => dispatch(fetchSkillById(skill.id))}
                  type="button"
                >
                  <span className="skill-list-icon">
                    <BadgeCheck size={18} />
                  </span>
                  <span>
                    <strong>{skill.name}</strong>
                    <small>
                      {skill.category || 'General'} - {skill.userCount} users
                    </small>
                  </span>
                </button>
                <span className="skill-list-actions">
                  <button
                    aria-label={`Edit ${skill.name}`}
                    className="icon-button"
                    disabled={isMutating}
                    onClick={() => handleEditSkill(skill)}
                    type="button"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    aria-label={`Delete ${skill.name}`}
                    className="icon-button icon-button--danger"
                    disabled={isMutating}
                    onClick={() => handleDeleteSkill(skill)}
                    type="button"
                  >
                    <Trash2 size={15} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="tool-panel skill-assignment-panel">
          <div className="panel-heading panel-heading--wide">
            <div>
              <p className="eyebrow">Assignment workspace</p>
              <h2>User skill map</h2>
            </div>

            <div className="relationship-chip">
              <UsersRound size={16} />
              Users &lt;-&gt; Skills
            </div>
          </div>

          <div className="skill-map-grid">
            <form className="assignment-form" onSubmit={handleAssignSkill}>
              <label>
                User
                <select
                  disabled={isLoadingUsers}
                  onChange={(event) => setSelectedUserId(event.target.value)}
                  value={selectedUserId}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Skill
                <select
                  disabled={!selectedUserId || availableSkills.length === 0}
                  onChange={(event) => setSelectedSkillId(event.target.value)}
                  value={selectedSkillId}
                >
                  {availableSkills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Level
                <select
                  onChange={(event) => setLevel(event.target.value as SkillLevel)}
                  value={level}
                >
                  {skillLevels.map((skillLevel) => (
                    <option key={skillLevel} value={skillLevel}>
                      {formatLevel(skillLevel)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Years
                <input
                  max={60}
                  min={0}
                  onChange={(event) =>
                    setYearsOfExperience(Number(event.target.value))
                  }
                  type="number"
                  value={yearsOfExperience}
                />
              </label>

              <LoadingButton
                className="primary-button"
                disabled={!canAssignSkill}
                isLoading={isLoadingAssignments}
                loadingLabel="Assigning skill"
                type="submit"
              >
                <Plus size={17} />
                Assign skill
              </LoadingButton>
            </form>

            <div className="skill-proof-panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Selected skill</p>
                  <h2>{selectedSkill?.name || 'Choose a skill'}</h2>
                </div>
              </div>

              {detailStatus === 'loading' ? (
                <p className="form-note">Loading skill users</p>
              ) : null}

              {selectedSkill?.users?.length ? (
                <div className="assigned-user-list">
                  {selectedSkill.users.map((user) => (
                    <div className="assigned-user-row" key={user.id}>
                      <span className="member-avatar">{user.name[0]}</span>
                      <span>
                        <strong>{user.name}</strong>
                        <small>
                          {formatLevel(user.skillLevel)} -{' '}
                          {user.yearsOfExperience} yrs
                        </small>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="form-note">No users linked to this skill yet</p>
              )}
            </div>
          </div>

          <div className="user-skill-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Selected user</p>
                <h2>{selectedUser?.name || 'No user selected'}</h2>
              </div>
            </div>

            {selectedUserSkills.length === 0 ? (
              <p className="empty-row">
                Assign multiple skills to this user. The same skill can still be
                assigned to other users.
              </p>
            ) : (
              <div className="user-skill-list">
                {selectedUserSkills.map((assignment) => (
                  <div className="user-skill-row" key={assignment.id}>
                    <span className="skill-list-icon">
                      <BadgeCheck size={16} />
                    </span>
                    <span>
                      <strong>{assignment.skill?.name || 'Skill removed'}</strong>
                      <small>
                        {formatLevel(assignment.level)} -{' '}
                        {assignment.yearsOfExperience} yrs
                      </small>
                    </span>
                    <button
                      aria-label={`Remove ${assignment.skill?.name || 'skill'}`}
                      className="icon-button icon-button--danger"
                      disabled={isLoadingAssignments}
                      onClick={() => handleRemoveSkill(assignment.skillId)}
                      type="button"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
