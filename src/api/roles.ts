// src/api/roles.ts
import api from './client';

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  module: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  description?: string;
  permissions: Permission[];
  users_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateRoleData {
  name: string;
  description?: string;
  permissions: number[];
}

export const rolesApi = {
  getRoles: async (params?: { page?: number; per_page?: number; search?: string }) => {
    const response = await api.get('/roles', { params });
    return response.data;
  },

  getRole: async (id: number) => {
    const response = await api.get(`/roles/${id}`);
    return response.data.data;
  },

  createRole: async (data: CreateRoleData) => {
    const response = await api.post('/roles', data);
    return response.data.data;
  },

  updateRole: async (id: number, data: Partial<CreateRoleData>) => {
    const response = await api.put(`/roles/${id}`, data);
    return response.data.data;
  },

  deleteRole: async (id: number) => {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  },

  getPermissions: async () => {
    const response = await api.get('/roles/permissions');
    return response.data.data;
  },

  getRolePermissions: async (id: number) => {
    const response = await api.get(`/roles/${id}/permissions`);
    return response.data.data;
  },

  updateRolePermissions: async (id: number, permissionIds: number[]) => {
    const response = await api.put(`/roles/${id}/permissions`, {
      permissions: permissionIds,
    });
    return response.data.data;
  },
};
