// src/store/notificationStore.ts
import { create } from 'zustand';
import { notificationApi } from '../api/notifications';
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
      const response = await notificationApi.getAll();
      // Fix: Handle the nested data structure
      const notifications = response.data.data || [];
      const unreadCount = notifications.filter((n: Notification) => !n.is_read).length;
      set({ 
        notifications, 
        unreadCount,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch notifications', 
        isLoading: false 
      });
    }
  },

  markAsRead: async (id) => {
    try {
      await notificationApi.markAsRead(id);
      set((state) => {
        const updatedNotifications = state.notifications.map((n) =>
          n.id === id ? { ...n, is_read: true } : n
        );
        const newUnreadCount = updatedNotifications.filter((n) => !n.is_read).length;
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
      await notificationApi.markAllAsRead();
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  },

  clearAll: async () => {
    try {
      await notificationApi.clearAll();
      set({ notifications: [], unreadCount: 0 });
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  },
}));