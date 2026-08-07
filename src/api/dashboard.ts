// src/api/dashboard.ts
import api from './client';
import type { DashboardStats, ChartData, Activity } from './types';

export const dashboardApi = {
  getStats: () => api.get<DashboardStats>('/dashboard/stats'),

  getCharts: () => api.get<ChartData>('/dashboard/charts'),

  getActivity: () => api.get<Activity[]>('/dashboard/activity'),

  getAnalytics: () => api.get('/dashboard/analytics'),

  getAll: () => api.get('/dashboard'),
};
