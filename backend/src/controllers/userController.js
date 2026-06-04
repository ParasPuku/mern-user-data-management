import mongoose from 'mongoose';

import { TeamMembership } from '../models/TeamMembership.js';
import { User } from '../models/User.js';
import { UserProfile } from '../models/UserProfile.js';
import { UserSkill } from '../models/UserSkill.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';

const pickUserFields = (payload) => {
  const allowedFields = ['name', 'email', 'role', 'status'];

  return Object.fromEntries(
    allowedFields
      .filter((field) => payload[field] !== undefined)
      .map((field) => [field, payload[field]])
  );
};

const pickUserProfileFields = (payload) => {
  const allowedFields = ['employeeId', 'department', 'location', 'notes'];

  return Object.fromEntries(
    allowedFields
      .filter((field) => payload[field] !== undefined)
      .map((field) => [field, payload[field]])
  );
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const toPositiveInteger = (value, fallback) => {
  const parsedValue = Number.parseInt(String(value), 10);

  if (!Number.isFinite(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
};

const ensureValidId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, 'Invalid user id');
  }
};

const findOwnedUser = async (accountId, id) => {
  ensureValidId(id);

  const user = await User.findOne({
    _id: id,
    owner: accountId
  });

  if (!user) {
    throw httpError(404, 'User not found');
  }

  return user;
};

export const getUsers = asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;
  const page = toPositiveInteger(req.query.page, DEFAULT_PAGE);
  const limit = Math.min(
    toPositiveInteger(req.query.limit, DEFAULT_LIMIT),
    MAX_LIMIT
  );
  const filters = {
    owner: req.account._id
  };

  if (role) {
    filters.role = role;
  }

  if (status) {
    filters.status = status;
  }

  if (search) {
    const searchRegex = new RegExp(String(search).trim(), 'i');
    filters.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  const [totalItems, activeItems, inactiveItems] = await Promise.all([
    User.countDocuments(filters),
    status === 'inactive'
      ? Promise.resolve(0)
      : User.countDocuments({ ...filters, status: 'active' }),
    status === 'active'
      ? Promise.resolve(0)
      : User.countDocuments({ ...filters, status: 'inactive' })
  ]);
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  const currentPage = Math.min(page, totalPages);
  const skip = (currentPage - 1) * limit;
  const users = await User.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    data: users,
    meta: {
      pagination: {
        page: currentPage,
        limit,
        totalItems,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1
      },
      summary: {
        total: totalItems,
        active: activeItems,
        inactive: inactiveItems
      }
    }
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);

  res.json({
    data: user
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const user = await User.create({
    ...pickUserFields(req.body),
    owner: req.account._id
  });

  res.status(201).json({
    data: user
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  ensureValidId(req.params.id);

  const user = await User.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.account._id
    },
    pickUserFields(req.body),
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    throw httpError(404, 'User not found');
  }

  res.json({
    data: user
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);

  await Promise.all([
    UserProfile.deleteOne({
      owner: req.account._id,
      user: user._id
    }),
    TeamMembership.deleteMany({
      owner: req.account._id,
      user: user._id
    }),
    UserSkill.deleteMany({
      owner: req.account._id,
      user: user._id
    }),
    user.deleteOne()
  ]);

  res.status(204).send();
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);
  const profile = await UserProfile.findOne({
    owner: req.account._id,
    user: user._id
  });

  res.json({
    data: profile
  });
});

export const upsertUserProfile = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);
  const profile = await UserProfile.findOneAndUpdate(
    {
      owner: req.account._id,
      user: user._id
    },
    {
      $set: pickUserProfileFields(req.body),
      $setOnInsert: {
        owner: req.account._id,
        user: user._id
      }
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true
    }
  );

  res.json({
    data: profile
  });
});

export const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);

  await UserProfile.deleteOne({
    owner: req.account._id,
    user: user._id
  });

  res.status(204).send();
});
