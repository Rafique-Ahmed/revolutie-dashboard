// src/api/notifications.ts
import api from './client';
import type { ApiResponse, PaginatedResponse, Notification } from './types';

export const notificationApi = {
  getAll: (params?: Record<string, string | number>) =>
    api.get<PaginatedResponse<Notification>>('/notifications', { params }),

  getLatest: (limit: number = 5) =>
    api.get<ApiResponse<Notification[]>>(`/notifications/latest?limit=${limit}`),

  getUnreadCount: () => api.get<ApiResponse<{ count: number }>>('/notifications/unread/count'),

  markAsRead: (id: number) => api.put<ApiResponse<Notification>>(`/notifications/${id}/read`),

  markAllAsRead: () => api.put<ApiResponse<{ count: number }>>('/notifications/read-all'),

  delete: (id: number) => api.delete<ApiResponse<null>>(`/notifications/${id}`),

  clearAll: () => api.delete<ApiResponse<{ count: number }>>('/notifications/clear'),
};
