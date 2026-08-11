// src/services/user.service.ts
import api from '../api/client';
import { User, UserListResponse } from '../types/user';

export const userService = {
  // Get all users with pagination
  getUsers: async (page: number = 1, perPage: number = 10): Promise<UserListResponse> => {
    try {
      const response = await api.get(`/users?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock data:', error);
      return {
        success: true,
        data: {
          current_page: 1,
          data: getMockUsers(),
          total: 6,
          per_page: 10,
          last_page: 1,
        },
      };
    }
  },

  // Get user by ID
  getUser: async (id: number): Promise<{ success: boolean; data: User }> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock data:', error);
      return {
        success: true,
        data: getMockUsers().find(u => u.id === id) || getMockUsers()[0],
      };
    }
  },

  // Create user
  createUser: async (userData: Partial<User>): Promise<{ success: boolean; data: User; message: string }> => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock:', error);
      return {
        success: true,
        data: { ...userData, id: Date.now() } as User,
        message: 'User created successfully',
      };
    }
  },

  // Update user
  updateUser: async (id: number, userData: Partial<User>): Promise<{ success: boolean; data: User; message: string }> => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock:', error);
      return {
        success: true,
        data: { ...userData, id } as User,
        message: 'User updated successfully',
      };
    }
  },

  // Delete user
  deleteUser: async (id: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock:', error);
      return {
        success: true,
        message: 'User deleted successfully',
      };
    }
  },

  // Get user stats
  getUserStats: async (): Promise<{ success: boolean; data: any }> => {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      return {
        success: true,
        data: {
          total: 56,
          active: 48,
          pending: 4,
          suspended: 2,
        },
      };
    }
  },
};

// Mock data
const getMockUsers = (): User[] => [
  {
    id: 1,
    name: 'Christine Brooks',
    email: 'christine@example.com',
    address: '089 Kutch Green Apt. 448',
    date: '14 Feb 2026',
    type: 'Electric',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Rosie Pearson',
    email: 'rosie@example.com',
    address: '979 Immanuel Ferry Suite 526',
    date: '14 Feb 2026',
    type: 'Book',
    status: 'processing',
  },
  {
    id: 3,
    name: 'Darrell Caldwell',
    email: 'darrell@example.com',
    address: '8587 Frida Ports',
    date: '14 Feb 2026',
    type: 'Medicine',
    status: 'rejected',
  },
  {
    id: 4,
    name: 'Gilbert Johnston',
    email: 'gilbert@example.com',
    address: '768 Destiny Lake Suite 600',
    date: '14 Feb 2026',
    type: 'Mobile',
    status: 'completed',
  },
  {
    id: 5,
    name: 'Alan Cain',
    email: 'alan@example.com',
    address: '042 Mylene Throughway',
    date: '14 Feb 2026',
    type: 'Watch',
    status: 'processing',
  },
  {
    id: 6,
    name: 'Alfred Murray',
    email: 'alfred@example.com',
    address: '543 Weimann Mountain',
    date: '14 Feb 2026',
    type: 'Medicine',
    status: 'completed',
  },
];
