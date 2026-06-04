import mongoose from 'mongoose';

import { Skill } from '../models/Skill.js';
import { User } from '../models/User.js';
import { UserSkill } from '../models/UserSkill.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { httpError } from '../utils/httpError.js';

const pickSkillFields = (payload) => {
  const allowedFields = ['name', 'category', 'description'];

  return Object.fromEntries(
    allowedFields
      .filter((field) => payload[field] !== undefined)
      .map((field) => [field, payload[field]])
  );
};

const pickUserSkillFields = (payload) => {
  const allowedFields = ['level', 'yearsOfExperience'];

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

const findOwnedSkill = async (accountId, skillId) => {
  ensureValidId(skillId, 'skill');

  const skill = await Skill.findOne({
    _id: skillId,
    owner: accountId
  });

  if (!skill) {
    throw httpError(404, 'Skill not found');
  }

  return skill;
};

const assertUniqueSkillName = async (accountId, name, skillId = null) => {
  if (!name) {
    return;
  }

  const existingSkill = await Skill.findOne({
    owner: accountId,
    name,
    ...(skillId ? { _id: { $ne: skillId } } : {})
  });

  if (existingSkill) {
    throw httpError(409, 'A skill with this name already exists');
  }
};

const getAssignmentSummary = async (accountId, skillIds) => {
  if (!skillIds.length) {
    return new Map();
  }

  const assignments = await UserSkill.aggregate([
    {
      $match: {
        owner: accountId,
        skill: { $in: skillIds }
      }
    },
    {
      $group: {
        _id: '$skill',
        count: { $sum: 1 },
        userIds: { $push: '$user' }
      }
    }
  ]);

  return new Map(
    assignments.map((item) => [
      String(item._id),
      {
        userCount: item.count,
        userIds: item.userIds.map(String)
      }
    ])
  );
};

const serializeSkill = (skill, extra = {}) => ({
  ...skill.toJSON(),
  ...extra
});

const serializeUserAssignment = (assignment) => ({
  ...assignment.user.toJSON(),
  skillLevel: assignment.level,
  yearsOfExperience: assignment.yearsOfExperience,
  assignedAt: assignment.createdAt
});

const serializeUserSkill = (assignment) => ({
  id: assignment._id.toString(),
  userId: String(assignment.user?._id || assignment.user),
  skillId: String(assignment.skill?._id || assignment.skill),
  skill: assignment.skill?.toJSON ? assignment.skill.toJSON() : null,
  level: assignment.level,
  yearsOfExperience: assignment.yearsOfExperience,
  createdAt: assignment.createdAt,
  updatedAt: assignment.updatedAt
});

const getSerializedUserSkills = async (accountId, userId) => {
  const assignments = await UserSkill.find({
    owner: accountId,
    user: userId
  })
    .populate('skill')
    .sort({ createdAt: -1 });

  return assignments
    .filter((assignment) => assignment.skill)
    .map(serializeUserSkill);
};

const serializeSkillWithUsers = async (accountId, skill) => {
  const assignments = await UserSkill.find({
    owner: accountId,
    skill: skill._id
  })
    .populate('user')
    .sort({ createdAt: -1 });
  const users = assignments
    .filter((assignment) => assignment.user)
    .map(serializeUserAssignment);

  return serializeSkill(skill, {
    userCount: users.length,
    userIds: users.map((user) => user.id),
    users
  });
};

export const getSkills = asyncHandler(async (req, res) => {
  const filters = {
    owner: req.account._id
  };

  if (req.query.userId) {
    const user = await findOwnedUser(req.account._id, req.query.userId);
    const assignments = await UserSkill.find({
      owner: req.account._id,
      user: user._id
    }).select('skill');

    filters._id = {
      $in: assignments.map((assignment) => assignment.skill)
    };
  }

  const skills = await Skill.find(filters).sort({ name: 1 });
  const assignmentSummary = await getAssignmentSummary(
    req.account._id,
    skills.map((skill) => skill._id)
  );

  res.json({
    data: skills.map((skill) => {
      const summary = assignmentSummary.get(String(skill._id));

      return serializeSkill(skill, {
        userCount: summary?.userCount || 0,
        userIds: summary?.userIds || []
      });
    })
  });
});

export const getSkillById = asyncHandler(async (req, res) => {
  const skill = await findOwnedSkill(req.account._id, req.params.id);

  res.json({
    data: await serializeSkillWithUsers(req.account._id, skill)
  });
});

export const createSkill = asyncHandler(async (req, res) => {
  const skillFields = pickSkillFields(req.body);

  await assertUniqueSkillName(req.account._id, skillFields.name);

  const skill = await Skill.create({
    ...skillFields,
    owner: req.account._id
  });

  res.status(201).json({
    data: serializeSkill(skill, {
      userCount: 0,
      userIds: [],
      users: []
    })
  });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await findOwnedSkill(req.account._id, req.params.id);
  const skillFields = pickSkillFields(req.body);

  await assertUniqueSkillName(req.account._id, skillFields.name, skill._id);
  Object.assign(skill, skillFields);
  await skill.save();

  res.json({
    data: await serializeSkillWithUsers(req.account._id, skill)
  });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await findOwnedSkill(req.account._id, req.params.id);

  await Promise.all([
    UserSkill.deleteMany({
      owner: req.account._id,
      skill: skill._id
    }),
    skill.deleteOne()
  ]);

  res.status(204).send();
});

export const getUserSkills = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);

  res.json({
    data: await getSerializedUserSkills(req.account._id, user._id)
  });
});

export const addUserSkill = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);
  const skill = await findOwnedSkill(req.account._id, req.body.skillId);
  const existingAssignment = await UserSkill.findOne({
    owner: req.account._id,
    user: user._id,
    skill: skill._id
  });

  if (existingAssignment) {
    throw httpError(409, 'User already has this skill');
  }

  await UserSkill.create({
    ...pickUserSkillFields(req.body),
    owner: req.account._id,
    user: user._id,
    skill: skill._id
  });

  res.status(201).json({
    data: await getSerializedUserSkills(req.account._id, user._id)
  });
});

export const updateUserSkill = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);
  const skill = await findOwnedSkill(req.account._id, req.params.skillId);
  const assignment = await UserSkill.findOneAndUpdate(
    {
      owner: req.account._id,
      user: user._id,
      skill: skill._id
    },
    pickUserSkillFields(req.body),
    {
      new: true,
      runValidators: true
    }
  );

  if (!assignment) {
    throw httpError(404, 'User skill not found');
  }

  res.json({
    data: await getSerializedUserSkills(req.account._id, user._id)
  });
});

export const removeUserSkill = asyncHandler(async (req, res) => {
  const user = await findOwnedUser(req.account._id, req.params.id);
  const skill = await findOwnedSkill(req.account._id, req.params.skillId);
  const assignment = await UserSkill.findOneAndDelete({
    owner: req.account._id,
    user: user._id,
    skill: skill._id
  });

  if (!assignment) {
    throw httpError(404, 'User skill not found');
  }

  res.json({
    data: await getSerializedUserSkills(req.account._id, user._id)
  });
});
