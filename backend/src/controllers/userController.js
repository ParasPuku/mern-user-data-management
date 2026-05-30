import mongoose from 'mongoose';

import { User } from '../models/User.js';
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

const ensureValidId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw httpError(400, 'Invalid user id');
  }
};

export const getUsers = asyncHandler(async (req, res) => {
  const { search, role, status } = req.query;
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

  const users = await User.find(filters).sort({ createdAt: -1 });

  res.json({
    data: users
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  ensureValidId(req.params.id);

  const user = await User.findOne({
    _id: req.params.id,
    owner: req.account._id
  });

  if (!user) {
    throw httpError(404, 'User not found');
  }

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
  ensureValidId(req.params.id);

  const user = await User.findOneAndDelete({
    _id: req.params.id,
    owner: req.account._id
  });

  if (!user) {
    throw httpError(404, 'User not found');
  }

  res.status(204).send();
});
