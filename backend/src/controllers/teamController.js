import mongoose from 'mongoose';

import { Team } from '../models/Team.js';
import { TeamMembership } from '../models/TeamMembership.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';

const pickTeamFields = (payload) => {
  const allowedFields = ['name', 'description'];

  return Object.fromEntries(
    allowedFields
      .filter((field) => payload[field] !== undefined)
      .map((field) => [field, payload[field]])
  );
};

const ensureValidId = (id, label) => {
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, `Invalid ${label} id`);
  }
};

const findOwnedTeam = async (accountId, teamId) => {
  ensureValidId(teamId, 'team');

  const team = await Team.findOne({
    _id: teamId,
    owner: accountId
  });

  if (!team) {
    throw httpError(404, 'Team not found');
  }

  return team;
};

const findOwnedUser = async (accountId, userId) => {
  ensureValidId(userId, 'user');

  const user = await User.findOne({
    _id: userId,
    owner: accountId
  });

  if (!user) {
    throw httpError(404, 'User not found');
  }

  return user;
};

const assertUniqueTeamName = async (accountId, name, teamId = null) => {
  if (!name) {
    return;
  }

  const existingTeam = await Team.findOne({
    owner: accountId,
    name,
    ...(teamId ? { _id: { $ne: teamId } } : {})
  });

  if (existingTeam) {
    throw httpError(409, 'A team with this name already exists');
  }
};

const assertHasUnassignedUser = async (accountId) => {
  const assignedUserIds = await TeamMembership.distinct('user', {
    owner: accountId
  });
  const availableUser = await User.exists({
    owner: accountId,
    ...(assignedUserIds.length ? { _id: { $nin: assignedUserIds } } : {})
  });

  if (!availableUser) {
    throw httpError(
      409,
      'All users are already assigned to teams. Remove a user from a team or create another user before creating a new team'
    );
  }
};

const getMembershipSummary = async (accountId, teamIds) => {
  if (!teamIds.length) {
    return new Map();
  }

  const memberships = await TeamMembership.aggregate([
    {
      $match: {
        owner: accountId,
        team: { $in: teamIds }
      }
    },
    {
      $group: {
        _id: '$team',
        count: { $sum: 1 },
        userIds: { $push: '$user' }
      }
    }
  ]);

  return new Map(
    memberships.map((item) => [
      String(item._id),
      {
        memberCount: item.count,
        memberIds: item.userIds.map(String)
      }
    ])
  );
};

const serializeTeam = (team, extra = {}) => ({
  ...team.toJSON(),
  ...extra
});

const serializeTeamWithMembers = async (accountId, team) => {
  const memberships = await TeamMembership.find({
    owner: accountId,
    team: team._id
  })
    .populate('user')
    .sort({ createdAt: -1 });
  const members = memberships
    .map((membership) => membership.user?.toJSON())
    .filter(Boolean);

  return serializeTeam(team, {
    memberCount: members.length,
    memberIds: members.map((member) => member.id),
    members
  });
};

export const getTeams = asyncHandler(async (req, res) => {
  const filters = {
    owner: req.account._id
  };

  if (req.query.userId) {
    await findOwnedUser(req.account._id, req.query.userId);

    const memberships = await TeamMembership.find({
      owner: req.account._id,
      user: req.query.userId
    }).select('team');

    filters._id = {
      $in: memberships.map((membership) => membership.team)
    };
  }

  const teams = await Team.find(filters).sort({ createdAt: -1 });
  const membershipSummary = await getMembershipSummary(
    req.account._id,
    teams.map((team) => team._id)
  );

  res.json({
    data: teams.map((team) => {
      const summary = membershipSummary.get(String(team._id));

      return serializeTeam(team, {
        memberCount: summary?.memberCount || 0,
        memberIds: summary?.memberIds || []
      });
    })
  });
});

export const getTeamById = asyncHandler(async (req, res) => {
  const team = await findOwnedTeam(req.account._id, req.params.id);

  res.json({
    data: await serializeTeamWithMembers(req.account._id, team)
  });
});

export const createTeam = asyncHandler(async (req, res) => {
  const teamFields = pickTeamFields(req.body);

  await assertHasUnassignedUser(req.account._id);
  await assertUniqueTeamName(req.account._id, teamFields.name);

  const team = await Team.create({
    ...teamFields,
    owner: req.account._id
  });

  res.status(201).json({
    data: serializeTeam(team, {
      memberCount: 0,
      memberIds: [],
      members: []
    })
  });
});

export const updateTeam = asyncHandler(async (req, res) => {
  const team = await findOwnedTeam(req.account._id, req.params.id);
  const teamFields = pickTeamFields(req.body);

  await assertUniqueTeamName(req.account._id, teamFields.name, team._id);
  Object.assign(team, teamFields);
  await team.save();

  res.json({
    data: await serializeTeamWithMembers(req.account._id, team)
  });
});

export const deleteTeam = asyncHandler(async (req, res) => {
  const team = await findOwnedTeam(req.account._id, req.params.id);

  await TeamMembership.deleteMany({
    owner: req.account._id,
    team: team._id
  });
  await team.deleteOne();

  res.status(204).send();
});

export const addTeamMember = asyncHandler(async (req, res) => {
  const team = await findOwnedTeam(req.account._id, req.params.id);
  const user = await findOwnedUser(req.account._id, req.body.userId);
  const existingMembership = await TeamMembership.findOne({
    owner: req.account._id,
    user: user._id
  });

  if (existingMembership) {
    const isSameTeam = String(existingMembership.team) === String(team._id);

    throw httpError(
      409,
      isSameTeam
        ? 'User already belongs to this team'
        : 'User already belongs to another team'
    );
  }

  await TeamMembership.create({
    owner: req.account._id,
    team: team._id,
    user: user._id
  });

  res.status(201).json({
    data: await serializeTeamWithMembers(req.account._id, team)
  });
});

export const removeTeamMember = asyncHandler(async (req, res) => {
  const team = await findOwnedTeam(req.account._id, req.params.id);
  await findOwnedUser(req.account._id, req.params.userId);

  const membership = await TeamMembership.findOneAndDelete({
    owner: req.account._id,
    team: team._id,
    user: req.params.userId
  });

  if (!membership) {
    throw httpError(404, 'Team membership not found');
  }

  res.json({
    data: await serializeTeamWithMembers(req.account._id, team)
  });
});
