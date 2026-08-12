// src/services/notification.service.ts
import { notificationsApi, NotificationFilters } from '../api/notifications';
import toast from 'react-hot-toast';
import { debug } from '../lib/debug';

export class NotificationService {
  async getNotifications(params?: NotificationFilters) {
    try {
      debug.log('📡 NotificationService.getNotifications called with params:', params);
      const response = await notificationsApi.getNotifications(params);
      debug.log('📦 NotificationService.getNotifications response:', response);

      return {
        data: response.data || [],
        meta: response.meta || {},
        links: response.links || {},
      };
    } catch (error: unknown) {
      debug.error('❌ NotificationService.getNotifications Error:', error);
      toast.error('Failed to fetch notifications');
      throw error;
    }
  }

  async getUnreadCount() {
    try {
      debug.log('📡 NotificationService.getUnreadCount called');
      const response = await notificationsApi.getUnreadCount();
      debug.log('📦 NotificationService.getUnreadCount response:', response);
      return response;
    } catch (error: unknown) {
      debug.error('❌ NotificationService.getUnreadCount Error:', error);
      return { count: 0 };
    }
  }

  async markAsRead(id: number) {
    try {
      debug.log(`📡 NotificationService.markAsRead called for id: ${id}`);
      const response = await notificationsApi.markAsRead(id);
      debug.log(`✅ NotificationService.markAsRead success for id ${id}`);
      toast.success('Notification marked as read');
      return response;
    } catch (error: unknown) {
      debug.error(`❌ NotificationService.markAsRead Error for id ${id}:`, error);
      toast.error('Failed to mark notification as read');
      throw error;
    }
  }

  async markAllAsRead() {
    try {
      debug.log('📡 NotificationService.markAllAsRead called');
      const response = await notificationsApi.markAllAsRead();
      debug.log('✅ NotificationService.markAllAsRead success');
      toast.success('All notifications marked as read');
      return response;
    } catch (error: unknown) {
      debug.error('❌ NotificationService.markAllAsRead Error:', error);
      toast.error('Failed to mark all notifications as read');
      throw error;
    }
  }

  async deleteNotification(id: number) {
    try {
      debug.log(`📡 NotificationService.deleteNotification called for id: ${id}`);
      const response = await notificationsApi.deleteNotification(id);
      debug.log(`✅ NotificationService.deleteNotification success for id ${id}`);
      toast.success('Notification deleted');
      return response;
    } catch (error: unknown) {
      debug.error(`❌ NotificationService.deleteNotification Error for id ${id}:`, error);
      toast.error('Failed to delete notification');
      throw error;
    }
  }

  async clearAll() {
    try {
      debug.log('📡 NotificationService.clearAll called');
      const response = await notificationsApi.clearAll();
      debug.log('✅ NotificationService.clearAll success');
      toast.success('All notifications cleared');
      return response;
    } catch (error: unknown) {
      debug.error('❌ NotificationService.clearAll Error:', error);
      toast.error('Failed to clear notifications');
      throw error;
    }
  }
}

export const notificationService = new NotificationService();
