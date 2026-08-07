// src/api/users.ts
import api from './client';
import type { User, ApiResponse, PaginatedResponse } from './types';

export const usersApi = {
  getAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<User>>('/users', { params }),

  getById: (id: number) =>
    api.get<ApiResponse<User>>(`/users/${id}`),

  create: (data: Partial<User>) =>
    api.post<ApiResponse<User>>('/users', data),

  update: (id: number, data: Partial<User>) =>
    api.put<ApiResponse<User>>(`/users/${id}`, data),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/users/${id}`),

  getStats: () =>
    api.get<ApiResponse<{ total: number; active: number; pending: number; suspended: number; new_today: number }>>('/users/stats'),

  uploadAvatar: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<ApiResponse<{ avatar_url: string }>>(`/users/${id}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
