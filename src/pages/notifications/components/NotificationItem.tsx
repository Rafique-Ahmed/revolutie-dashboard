// src/pages/notifications/components/NotificationItem.tsx
import React from 'react';
import { Bell, Check, Trash2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Notification } from '../../../api/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'info': {
        return <Info className="w-5 h-5 text-blue-500" />;
      }
      case 'success': {
        return <Check className="w-5 h-5 text-green-500" />;
      }
      case 'warning': {
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      }
      case 'error': {
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      }
      default: {
        return <Bell className="w-5 h-5 text-gray-500" />;
      }
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) {
      return `${diff}s ago`;
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }
    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }
    if (diff < 604800) {
      return `${Math.floor(diff / 86400)}d ago`;
    }
    return past.toLocaleDateString();
  };

  return (
    <div
      className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
        !notification.read_at ? 'bg-blue-50 dark:bg-blue-900/10' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className={`text-sm font-medium ${!notification.read_at ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {notification.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {getTimeAgo(notification.created_at)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!notification.read_at && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
