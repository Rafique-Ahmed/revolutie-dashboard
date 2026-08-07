// src/api/dashboard.ts
import api from './client';
import type { ApiResponse } from './types';

export interface DashboardStats {
  total_users: number;
  active_users: number;
  pending_users: number;
  suspended_users: number;
  new_users_today: number;
  user_growth: number;
  recent_logins: Array<{
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    last_login_at?: string;
  }>;
}

export interface ChartData {
  user_registrations: Array<{ date: string; count: number }>;
  user_status: { active: number; pending: number; suspended: number };
  role_distribution: Array<{ name: string; count: number }>;
}

export interface Activity {
  user: string;
  action: string;
  target?: string;
  time: string;
}

export interface AnalyticsData {
  monthly_revenue: number;
  monthly_growth: number;
  active_sessions: number;
  conversion_rate: number;
}

export const dashboardApi = {
  getStats: () =>
    api.get<ApiResponse<DashboardStats>>('/dashboard/stats'),

  getCharts: () =>
    api.get<ApiResponse<ChartData>>('/dashboard/charts'),

  getActivity: () =>
    api.get<ApiResponse<Activity[]>>('/dashboard/activity'),

  getAnalytics: () =>
    api.get<ApiResponse<AnalyticsData>>('/dashboard/analytics'),

  getAll: () =>
    api.get<ApiResponse<{ stats: DashboardStats; charts: ChartData; activity: Activity[]; analytics: AnalyticsData }>>('/dashboard'),
};
