// src/api/settings.ts
import api from './client';
import type { ApiResponse, TeamMember } from './types';

export interface GeneralSettings {
  company_name: string;
  company_logo: string | null;
  timezone: string;
  date_format: string;
  time_format: string;
  currency: string;
  currency_position: string;
  language: string;
}

export interface ProfileSettings {
  name: string;
  email: string;
  avatar: string | null;
  avatar_url: string;
  bio: string | null;
  department: string | null;
  location: string | null;
  github_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
}

export interface SecuritySettings {
  two_factor_enabled: boolean;
  two_factor_secret: string | null;
  recovery_codes: string[] | null;
}

export interface NotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  weekly_digest: boolean;
  user_registrations: boolean;
  user_updates: boolean;
  security_alerts: boolean;
  system_updates: boolean;
}

export const settingsApi = {
  // General Settings
  getGeneral: () => api.get<ApiResponse<GeneralSettings>>('/settings/general'),

  updateGeneral: (data: Partial<GeneralSettings>) =>
    api.put<ApiResponse<GeneralSettings>>('/settings/general', data),

  uploadLogo: (file: File) => {
    const formData = new FormData();
    formData.append('logo', file);
    return api.post<ApiResponse<{ logo_url: string }>>('/settings/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Profile Settings
  getProfile: () => api.get<ApiResponse<ProfileSettings>>('/settings/profile'),

  updateProfile: (data: Partial<ProfileSettings>) =>
    api.put<ApiResponse<ProfileSettings>>('/settings/profile', data),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<ApiResponse<{ avatar_url: string }>>('/settings/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Security Settings
  changePassword: (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) => api.post<ApiResponse<null>>('/settings/change-password', data),

  getTwoFactor: () => api.get<ApiResponse<SecuritySettings>>('/settings/2fa'),

  enableTwoFactor: () =>
    api.post<ApiResponse<{ enabled: boolean; secret: string }>>('/settings/2fa/enable'),

  disableTwoFactor: () => api.post<ApiResponse<null>>('/settings/2fa/disable'),

  // Notification Preferences
  getNotificationPreferences: () =>
    api.get<ApiResponse<NotificationPreferences>>('/settings/notifications'),

  updateNotificationPreferences: (data: Partial<NotificationPreferences>) =>
    api.put<ApiResponse<NotificationPreferences>>('/settings/notifications', data),

  // Team Management
  getTeam: () => api.get<ApiResponse<TeamMember[]>>('/settings/team'),

  inviteTeamMember: (data: { email: string; role: string }) =>
    api.post<ApiResponse<{ invited_at: string; status: string }>>('/settings/team/invite', data),

  removeTeamMember: (memberId: number) =>
    api.delete<ApiResponse<null>>(`/settings/team/${memberId}`),

  updateTeamMemberRole: (memberId: number, data: { role: string }) =>
    api.put<ApiResponse<null>>(`/settings/team/${memberId}/role`, data),
};
