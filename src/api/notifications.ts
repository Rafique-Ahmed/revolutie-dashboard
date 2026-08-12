// src/api/notifications.ts
import api from './client';

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  data?: Record<string, string | number | boolean | null>;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationFilters {
  page?: number;
  per_page?: number;
  unread_only?: boolean;
  type?: string;
}

export const notificationsApi = {
  // Get all notifications
  getNotifications: async (params?: NotificationFilters) => {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread/count');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id: number) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id: number) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Clear all notifications
  clearAll: async () => {
    const response = await api.delete('/notifications/clear');
    return response.data;
  },
};
