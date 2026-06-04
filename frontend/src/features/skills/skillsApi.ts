import { http } from '../../services/http';
import type {
  ApiItemResponse,
  ApiListResponse,
  Skill,
  SkillFormValues,
  UserSkill,
  UserSkillFormValues
} from './types';

export const skillsApi = {
  async getSkills(userId?: string) {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    const response = await http.get<ApiListResponse<Skill>>(`/skills${query}`);
    return response.data;
  },
  async getSkillById(id: string) {
    const response = await http.get<ApiItemResponse<Skill>>(`/skills/${id}`);
    return response.data;
  },
  async createSkill(values: SkillFormValues) {
    const response = await http.post<ApiItemResponse<Skill>>('/skills', values);
    return response.data;
  },
  async updateSkill(id: string, values: SkillFormValues) {
    const response = await http.patch<ApiItemResponse<Skill>>(
      `/skills/${id}`,
      values
    );
    return response.data;
  },
  async deleteSkill(id: string) {
    await http.delete<void>(`/skills/${id}`);
  },
  async getUserSkills(userId: string) {
    const response = await http.get<ApiListResponse<UserSkill>>(
      `/users/${userId}/skills`
    );
    return response.data;
  },
  async addUserSkill(userId: string, values: UserSkillFormValues) {
    const response = await http.post<ApiListResponse<UserSkill>>(
      `/users/${userId}/skills`,
      values
    );
    return response.data;
  },
  async updateUserSkill(
    userId: string,
    skillId: string,
    values: Omit<UserSkillFormValues, 'skillId'>
  ) {
    const response = await http.patch<ApiListResponse<UserSkill>>(
      `/users/${userId}/skills/${skillId}`,
      values
    );
    return response.data;
  },
  async removeUserSkill(userId: string, skillId: string) {
    const response = await http.delete<ApiListResponse<UserSkill>>(
      `/users/${userId}/skills/${skillId}`
    );
    return response.data;
  }
};
