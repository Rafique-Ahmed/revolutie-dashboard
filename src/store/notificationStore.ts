// src/store/notificationStore.ts
import { create } from 'zustand';
import { notificationsApi } from '../api/notifications'; // ✅ Fix: Import from notifications.ts
import type { Notification } from '../api/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearAll: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // ✅ Fix: Use notificationsApi instead of notificationApi
      const response = await notificationsApi.getNotifications();
      const notifications = response.data || [];
      const unreadCount = notifications.filter((n: Notification) => !n.read_at).length;
      set({
        notifications,
        unreadCount,
        isLoading: false,
      });
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        error: err.response?.data?.message || 'Failed to fetch notifications',
        isLoading: false,
      });
    }
  },

  markAsRead: async (id: number) => {
    try {
      // ✅ Fix: Use notificationsApi instead of notificationApi
      await notificationsApi.markAsRead(id);
      set((state) => {
        const updatedNotifications = state.notifications.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        );
        const newUnreadCount = updatedNotifications.filter((n) => !n.read_at).length;
        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount,
        };
      });
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      // ✅ Fix: Use notificationsApi instead of notificationApi
      await notificationsApi.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          read_at: new Date().toISOString(),
        })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  },

  clearAll: async () => {
    try {
      // ✅ Fix: Use notificationsApi instead of notificationApi
      await notificationsApi.clearAll();
      set({ notifications: [], unreadCount: 0 });
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  },
}));
