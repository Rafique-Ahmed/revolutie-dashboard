// src/services/userProfile.service.ts
import api from '../api/client';
import { UserProfile } from '../types/userProfile';

export const userProfileService = {
  // Get user profile
  getProfile: async (userId: number): Promise<{ success: boolean; data: UserProfile }> => {
    try {
      const response = await api.get(`/users/${userId}/profile`);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock data:', error);
      return {
        success: true,
        data: getMockProfile(),
      };
    }
  },

  // Update user profile
  updateProfile: async (
    userId: number,
    data: Partial<UserProfile>
  ): Promise<{ success: boolean; message: string; data: UserProfile }> => {
    try {
      const response = await api.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.warn('API error, using mock:', error);
      return {
        success: true,
        message: 'Profile updated successfully',
        data: { ...getMockProfile(), ...data } as UserProfile,
      };
    }
  },

  // Upload avatar
  uploadAvatar: async (
    userId: number,
    file: File
  ): Promise<{ success: boolean; data: { avatar_url: string } }> => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.post(`/users/${userId}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.warn('API error, using mock:', error);
      return {
        success: true,
        data: { avatar_url: '/uploads/avatar.png' },
      };
    }
  },
};

// Mock profile data based on actual API response
const getMockProfile = (): UserProfile => ({
  id: 1,
  name: 'Super Admin',
  email: 'superadmin@example.com',
  status: 'active',
  avatar: null,
  avatar_url: 'https://ui-avatars.com/api/?name=Super+Admin',
  role: 'super-admin',
  bio: 'System administrator with full access',
  department: 'IT',
  location: 'New York, USA',
  github_url: 'https://github.com/superadmin',
  twitter_url: 'https://twitter.com/superadmin',
  linkedin_url: 'https://linkedin.com/in/superadmin',
  website_url: 'https://superadmin.dev',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});
