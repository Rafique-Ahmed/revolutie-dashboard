// src/pages/notifications/NotificationsList.tsx
import React, { useState, useEffect } from 'react';
import { Bell, Trash2, Loader2, RefreshCw, Filter, CheckCheck } from 'lucide-react';
import { Notification } from '../../api/notifications';
import { notificationService } from '../../services/notification.service';
import NotificationItem from './components/NotificationItem';
import toast from 'react-hot-toast';
import { debug } from '../../lib/debug';

const NotificationsList: React.FC = () => {
  debug.log('🔔 NotificationsList component is rendering!');

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [debugInfo, setDebugInfo] = useState<string>('Initializing...');

  useEffect(() => {
    debug.log('🔄 useEffect - fetching notifications...');
    loadNotifications();
    loadUnreadCount();
  }, []);

  const loadNotifications = async () => {
    debug.log('📡 loadNotifications called');
    try {
      setLoading(true);
      setDebugInfo('Fetching notifications...');

      const params = filter === 'unread' ? { unread_only: true } : {};
      const response = await notificationService.getNotifications(params);

      debug.log('📦 Notifications response:', response);
      setNotifications(response.data || []);
      setDebugInfo(`Loaded ${response.data?.length || 0} notifications`);
    } catch (error) {
      debug.error('❌ Error loading notifications:', error);
      setDebugInfo('Error loading notifications');
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.count || 0);
    } catch (error) {
      debug.error('❌ Error loading unread count:', error);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      debug.error('❌ Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      debug.error('❌ Error marking all as read:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await notificationService.deleteNotification(id);
      await loadNotifications();
      await loadUnreadCount();
    } catch (error) {
      debug.error('❌ Error deleting notification:', error);
    }
  };

  const handleClearAll = async () => {
    if (notifications.length === 0) {
      toast.info('No notifications to clear');
      return;
    }

    if (window.confirm('Are you sure you want to clear all notifications?')) {
      try {
        await notificationService.clearAll();
        await loadNotifications();
        await loadUnreadCount();
      } catch (error) {
        debug.error('❌ Error clearing notifications:', error);
      }
    }
  };

  const handleRefresh = () => {
    loadNotifications();
    loadUnreadCount();
  };

  const handleFilterChange = (newFilter: 'all' | 'unread') => {
    setFilter(newFilter);
    loadNotifications();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
        <span className="mt-3 text-gray-600 dark:text-gray-400">Loading notifications...</span>
        <span className="mt-1 text-sm text-gray-400">{debugInfo}</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Debug Info */}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm flex items-center justify-between">
        <div>
          <span className="font-medium">🔍 Debug:</span>
          <span className="ml-2 text-gray-600 dark:text-gray-400">{debugInfo}</span>
          <span className="ml-4 text-gray-500 dark:text-gray-500">
            Notifications: <strong>{notifications.length}</strong>
          </span>
          <span className="ml-4 text-blue-600 dark:text-blue-400">
            Unread: <strong>{unreadCount}</strong>
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <RefreshCw className="w-3 h-3 inline mr-1" />
          Refresh
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#202224] dark:text-white flex items-center">
            <Bell className="w-6 h-6 mr-2 text-[#4880FF]" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-3 px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Stay updated with your latest notifications
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark All Read
            </button>
          )}
          <button
            onClick={handleClearAll}
            className="flex items-center px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Notifications</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {notifications.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{unreadCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Read</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {notifications.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter:</span>
          <div className="flex gap-1">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-[#4880FF] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('unread')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-[#4880FF] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Unread Only
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No notifications found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              {filter === 'unread'
                ? 'You have no unread notifications'
                : 'Your notifications will appear here'}
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
