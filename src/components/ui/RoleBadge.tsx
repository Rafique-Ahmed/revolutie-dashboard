// src/components/ui/RoleBadge.tsx
import React from 'react';

interface RoleBadgeProps {
  role: string;
  size?: 'sm' | 'md' | 'lg';
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = 'sm' }) => {
  const getRoleColor = (name: string) => {
    const colors: Record<string, string> = {
      'super-admin':
        'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      admin:
        'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      editor:
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      viewer:
        'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    };
    return (
      colors[name?.toLowerCase()] ||
      'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
    );
  };

  const getRoleIcon = (name: string) => {
    const icons: Record<string, string> = {
      'super-admin': '👑',
      admin: '🛡️',
      editor: '✏️',
      viewer: '👁️',
    };
    return icons[name?.toLowerCase()] || '🔑';
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${sizeClasses[size]} ${getRoleColor(role)}`}
    >
      <span className="text-sm">{getRoleIcon(role)}</span>
      {role}
    </span>
  );
};

export default RoleBadge;
