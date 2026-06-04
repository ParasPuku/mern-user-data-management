import type { RequestStatus, User } from '../users/types';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SkillFormValues = {
  name: string;
  category: string;
  description: string;
};

export type SkillUser = User & {
  skillLevel: SkillLevel;
  yearsOfExperience: number;
  assignedAt: string;
};

export type Skill = SkillFormValues & {
  id: string;
  userCount: number;
  userIds: string[];
  users?: SkillUser[];
  createdAt: string;
  updatedAt: string;
};

export type UserSkillFormValues = {
  skillId: string;
  level: SkillLevel;
  yearsOfExperience: number;
};

export type UserSkill = {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill | null;
  level: SkillLevel;
  yearsOfExperience: number;
  createdAt: string;
  updatedAt: string;
};

export type SkillsStateStatus = RequestStatus;

export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};
