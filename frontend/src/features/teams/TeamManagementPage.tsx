import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Layers3,
  Link2,
  Plus,
  RefreshCw,
  Trash2,
  UserPlus,
  UsersRound
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
  addTeamMember,
  clearTeamsError,
  createTeam,
  deleteTeam,
  fetchTeamById,
  fetchTeams,
  removeTeamMember,
  selectSelectedTeam,
  selectTeams,
  selectTeamsDetailStatus,
  selectTeamsError,
  selectTeamsListStatus,
  selectTeamsMutationStatus
} from './teamsSlice';
import type { TeamFormValues } from './types';

const emptyTeamForm: TeamFormValues = {
  name: '',
  description: ''
};

const userFetchQuery = {
  search: '',
  role: 'all' as const,
  status: 'all' as const,
  page: 1,
  limit: 100
};

export const TeamManagementPage = () => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(selectTeams);
  const selectedTeam = useAppSelector(selectSelectedTeam);
  const users = useAppSelector(selectUsers);
  const usersStatus = useAppSelector(selectUsersListStatus);
  const listStatus = useAppSelector(selectTeamsListStatus);
  const detailStatus = useAppSelector(selectTeamsDetailStatus);
  const mutationStatus = useAppSelector(selectTeamsMutationStatus);
  const error = useAppSelector(selectTeamsError);
  const [formValues, setFormValues] = useState<TeamFormValues>(emptyTeamForm);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const isLoadingTeams = listStatus === 'loading';
  const isLoadingDetails = detailStatus === 'loading';
  const isLoadingUsers = usersStatus === 'loading';
  const isMutating = mutationStatus === 'loading';
  const members = useMemo(
    () => selectedTeam?.members || [],
    [selectedTeam?.members]
  );
  const assignedUserIds = useMemo(() => {
    const userIds = new Set<string>();

    teams.forEach((team) => {
      team.memberIds.forEach((userId) => userIds.add(userId));
    });
    members.forEach((member) => userIds.add(member.id));

    return userIds;
  }, [members, teams]);
  const availableUsers = useMemo(
    () => users.filter((user) => !assignedUserIds.has(user.id)),
    [assignedUserIds, users]
  );
  const createTeamBlocker = (() => {
    if (isLoadingTeams || isLoadingUsers) {
      return 'Loading user assignments';
    }

    if (users.length === 0) {
      return 'Create at least one user before creating a team';
    }

    if (availableUsers.length === 0) {
      return 'All users are already assigned to teams';
    }

    return null;
  })();
  const canCreateTeam =
    formValues.name.trim().length >= 2 && !createTeamBlocker && !isMutating;
  const membershipCount = teams.reduce(
    (total, team) => total + (team.memberCount || 0),
    0
  );

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchUsers(userFetchQuery));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTeam && teams[0] && detailStatus !== 'loading') {
      dispatch(fetchTeamById(teams[0].id));
    }
  }, [detailStatus, dispatch, selectedTeam, teams]);

  useEffect(() => {
    setSelectedUserId(availableUsers[0]?.id || '');
  }, [availableUsers]);

  const handleCreateTeam = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const normalizedValues = {
      name: formValues.name.trim(),
      description: formValues.description.trim()
    };

    if (normalizedValues.name.length < 2) {
      setLocalError('Team name must be at least 2 characters');
      return;
    }

    if (createTeamBlocker) {
      setLocalError(createTeamBlocker);
      return;
    }

    try {
      await dispatch(createTeam(normalizedValues)).unwrap();
      setFormValues(emptyTeamForm);
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : 'Unable to create team'
      );
    }
  };

  const handleSelectTeam = (teamId: string) => {
    dispatch(fetchTeamById(teamId));
  };

  const handleRefresh = () => {
    dispatch(fetchTeams());

    if (selectedTeam) {
      dispatch(fetchTeamById(selectedTeam.id));
    }
  };

  const handleDeleteTeam = () => {
    if (!selectedTeam) {
      return;
    }

    const shouldDelete = window.confirm(`Delete ${selectedTeam.name}?`);

    if (shouldDelete) {
      dispatch(deleteTeam(selectedTeam.id));
    }
  };

  const handleAddMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTeam || !selectedUserId) {
      return;
    }

    await dispatch(
      addTeamMember({
        teamId: selectedTeam.id,
        userId: selectedUserId
      })
    ).unwrap();
  };

  const handleRemoveMember = (userId: string) => {
    if (!selectedTeam) {
      return;
    }

    dispatch(
      removeTeamMember({
        teamId: selectedTeam.id,
        userId
      })
    );
  };

  return (
    <>
      <header className="app-header">
        <div>
          <p className="eyebrow">Team assignment workspace</p>
          <h1>Teams & Users</h1>
        </div>

        <div className="summary-strip" aria-label="Team summary">
          <div>
            <span>{teams.length}</span>
            <p>Teams</p>
          </div>
          <div>
            <span>{membershipCount}</span>
            <p>Assigned</p>
          </div>
          <div>
            <span>{users.length}</span>
            <p>Users</p>
          </div>
        </div>
      </header>

      <StatusBanner
        message={error}
        onDismiss={() => dispatch(clearTeamsError())}
      />

      <main className="teams-grid">
        <section className="tool-panel teams-directory-panel">
          <form className="team-form" onSubmit={handleCreateTeam}>
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Team</p>
                <h2>Create team</h2>
              </div>
            </div>

            {localError ? <p className="form-error">{localError}</p> : null}
            {createTeamBlocker ? (
              <p className="form-note">{createTeamBlocker}</p>
            ) : null}

            <label>
              Name
              <input
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
              Description
              <textarea
                maxLength={240}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    description: event.target.value
                  }))
                }
                rows={3}
                value={formValues.description}
              />
            </label>

            <LoadingButton
              className="primary-button"
              disabled={!canCreateTeam}
              isLoading={isMutating}
              loadingLabel="Creating team"
              type="submit"
            >
              <Plus size={17} />
              Create team
            </LoadingButton>
          </form>

          <div className="team-list-heading">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>Teams</h2>
            </div>

            <button
              className="icon-button"
              disabled={isLoadingTeams || isMutating}
              onClick={handleRefresh}
              title="Refresh teams"
              type="button"
            >
              {isLoadingTeams ? <ButtonSpinner /> : <RefreshCw size={16} />}
            </button>
          </div>

          <div className="team-list">
            {isLoadingTeams && teams.length === 0 ? (
              <p className="empty-row">Loading teams</p>
            ) : null}

            {!isLoadingTeams && teams.length === 0 ? (
              <p className="empty-row">No teams found</p>
            ) : null}

            {teams.map((team) => (
              <button
                className={`team-list-item${
                  selectedTeam?.id === team.id ? ' is-active' : ''
                }`}
                disabled={isLoadingDetails}
                key={team.id}
                onClick={() => handleSelectTeam(team.id)}
                type="button"
              >
                <span className="team-list-icon">
                  <Layers3 size={18} />
                </span>
                <span>
                  <strong>{team.name}</strong>
                  <small>{team.memberCount} members</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="tool-panel team-members-panel">
          <div className="panel-heading panel-heading--wide">
            <div>
              <p className="eyebrow">Selected team</p>
              <h2>{selectedTeam?.name || 'No team selected'}</h2>
            </div>

            <button
              className="icon-button icon-button--danger"
              disabled={!selectedTeam || isMutating}
              onClick={handleDeleteTeam}
              title="Delete team"
              type="button"
            >
              {isMutating ? <ButtonSpinner /> : <Trash2 size={16} />}
            </button>
          </div>

          <div className="relationship-map" aria-label="Relationship map">
            <div>
              <Layers3 size={18} />
              <span>{selectedTeam?.name || 'Team'}</span>
            </div>
            <Link2 size={18} />
            <div>
              <UsersRound size={18} />
              <span>{members.length} users</span>
            </div>
          </div>

          <form className="membership-form" onSubmit={handleAddMember}>
            <label>
              Add user
              <select
                disabled={
                  !selectedTeam ||
                  availableUsers.length === 0 ||
                  isLoadingUsers ||
                  isMutating
                }
                onChange={(event) => setSelectedUserId(event.target.value)}
                value={selectedUserId}
              >
                {availableUsers.length === 0 ? (
                  <option value="">No available users</option>
                ) : null}
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
            </label>

            <LoadingButton
              className="text-button"
              disabled={!selectedTeam || !selectedUserId}
              isLoading={isMutating}
              loadingLabel="Adding"
              type="submit"
            >
              <UserPlus size={16} />
              Add
            </LoadingButton>
          </form>

          <div className="member-list">
            {isLoadingDetails ? <p className="empty-row">Loading members</p> : null}

            {!isLoadingDetails && selectedTeam && members.length === 0 ? (
              <p className="empty-row">No members in this team</p>
            ) : null}

            {!selectedTeam ? <p className="empty-row">Select a team</p> : null}

            {members.map((member) => (
              <div className="member-row" key={member.id}>
                <span className="member-avatar">{member.name.charAt(0)}</span>
                <span>
                  <strong>{member.name}</strong>
                  <small>{member.email}</small>
                </span>
                <span className={`badge badge--${member.status}`}>
                  {member.status}
                </span>
                <button
                  className="icon-button icon-button--danger"
                  disabled={isMutating}
                  onClick={() => handleRemoveMember(member.id)}
                  title={`Remove ${member.name}`}
                  type="button"
                >
                  {isMutating ? <ButtonSpinner /> : <Trash2 size={16} />}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
