import type { RequestStatus, User } from '../users/types';

export type TeamFormValues = {
  name: string;
  description: string;
};

export type Team = TeamFormValues & {
  id: string;
  memberCount: number;
  memberIds: string[];
  members?: User[];
  createdAt: string;
  updatedAt: string;
};

export type TeamsStateStatus = RequestStatus;

export type ApiListResponse<T> = {
  data: T[];
};

export type ApiItemResponse<T> = {
  data: T;
};
