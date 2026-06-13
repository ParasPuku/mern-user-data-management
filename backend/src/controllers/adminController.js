import mongoose from 'mongoose';

import { Account } from '../models/Account.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';

const allowedRoles = ['admin', 'manager', 'member'];

const serializeManagedAccount = (account) => {
  const serializedAccount = account.toJSON();

  return {
    avatarUrl: serializedAccount.avatarUrl,
    createdAt: serializedAccount.createdAt,
    email: serializedAccount.email,
    fullName: serializedAccount.fullName,
    id: serializedAccount.id,
    mobile: serializedAccount.mobile,
    role: serializedAccount.role || 'admin',
    updatedAt: serializedAccount.updatedAt
  };
};

const assertValidRole = (role) => {
  if (!allowedRoles.includes(role)) {
    throw httpError(400, 'Select a valid account role');
  }
};

const adminRoleFilter = {
  $or: [{ role: 'admin' }, { role: { $exists: false } }, { role: null }]
};

const assertCanChangeAdminRole = async (account, nextRole) => {
  const currentRole = account.role || 'admin';

  if (currentRole !== 'admin' || nextRole === 'admin') {
    return;
  }

  const adminCount = await Account.countDocuments(adminRoleFilter);

  if (adminCount <= 1) {
    throw httpError(400, 'At least one admin account is required');
  }
};

export const getAccounts = asyncHandler(async (_req, res) => {
  const accounts = await Account.find().sort({ createdAt: -1 });

  res.json({
    data: accounts.map(serializeManagedAccount)
  });
});

export const updateAccountRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  assertValidRole(role);

  if (!mongoose.isValidObjectId(req.params.id)) {
    throw httpError(400, 'Invalid account id');
  }

  const account = await Account.findById(req.params.id);

  if (!account) {
    throw httpError(404, 'Account not found');
  }

  await assertCanChangeAdminRole(account, role);

  account.role = role;
  await account.save();

  res.json({
    data: serializeManagedAccount(account)
  });
});
