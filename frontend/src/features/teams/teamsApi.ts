import { http } from '../../services/http';
import type {
  ApiItemResponse,
  ApiListResponse,
  Team,
  TeamFormValues
} from './types';

export const teamsApi = {
  async getTeams(userId?: string) {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    const response = await http.get<ApiListResponse<Team>>(`/teams${query}`);
    return response.data;
  },
  async getTeamById(id: string) {
    const response = await http.get<ApiItemResponse<Team>>(`/teams/${id}`);
    return response.data;
  },
  async createTeam(values: TeamFormValues) {
    const response = await http.post<ApiItemResponse<Team>>('/teams', values);
    return response.data;
  },
  async updateTeam(id: string, values: TeamFormValues) {
    const response = await http.patch<ApiItemResponse<Team>>(
      `/teams/${id}`,
      values
    );
    return response.data;
  },
  async deleteTeam(id: string) {
    await http.delete<void>(`/teams/${id}`);
  },
  async addTeamMember(teamId: string, userId: string) {
    const response = await http.post<ApiItemResponse<Team>>(
      `/teams/${teamId}/members`,
      { userId }
    );
    return response.data;
  },
  async removeTeamMember(teamId: string, userId: string) {
    const response = await http.delete<ApiItemResponse<Team>>(
      `/teams/${teamId}/members/${userId}`
    );
    return response.data;
  }
};
