// src/api/users.ts
import api from './client';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  avatar?: string | null;
  roles?: string[];
  permissions?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  roles?: string[];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  roles?: string[];
}

export const usersApi = {
  // Get all users
  getUsers: async (params?: { page?: number; per_page?: number; search?: string }) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Get single user
  getUser: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  },

  // Create user
  createUser: async (data: CreateUserData) => {
    const response = await api.post('/users', data);
    return response.data.data;
  },

  // Update user
  updateUser: async (id: number, data: UpdateUserData) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data.data;
  },

  // Delete user
  deleteUser: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Get user activities
  getUserActivities: async (id: number) => {
    const response = await api.get(`/users/${id}/activities`);
    return response.data.data;
  },

  // Assign roles to user
  assignRoles: async (id: number, roles: string[]) => {
    const response = await api.post(`/users/${id}/roles`, { roles });
    return response.data.data;
  },

  // Sync roles for user (replace all roles)
  syncRoles: async (id: number, roles: string[]) => {
    const response = await api.put(`/users/${id}/roles`, { roles });
    return response.data.data;
  },

  // Remove a role from user
  removeRole: async (id: number, role: string) => {
    const response = await api.delete(`/users/${id}/roles/${role}`);
    return response.data.data;
  },
};
