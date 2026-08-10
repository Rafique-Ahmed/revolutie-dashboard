// src/pages/dashboard/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  User,
  Shield,
  Bell,
  Settings,
  Database,
  Activity,
  HardDrive,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
  { path: '/analytics', icon: <TrendingUp className="w-5 h-5" />, label: 'Analytics' },
  { path: '/users', icon: <Users className="w-5 h-5" />, label: 'Users' },
  { path: '/users/profile', icon: <User className="w-5 h-5" />, label: 'User Profile' },
  { path: '/roles', icon: <Shield className="w-5 h-5" />, label: 'Roles' },
  { path: '/notifications', icon: <Bell className="w-5 h-5" />, label: 'Notification' },
  { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  { path: '/system/logs', icon: <Database className="w-5 h-5" />, label: 'System' },
  { path: '/system/status', icon: <Activity className="w-5 h-5" />, label: 'API Status' },
  { path: '/system/backups', icon: <HardDrive className="w-5 h-5" />, label: 'Backups' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-[247px] bg-white border-r border-gray-200 z-50">
      <div className="flex items-center px-6 py-6">
        <p className="text-[#202224] font-nunitoSans text-xl font-extrabold">DashStack</p>
      </div>

      <nav className="mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 mx-3 rounded-md transition-colors ${
                isActive ? 'bg-[#4880FF] text-white' : 'text-[#202224] hover:bg-gray-100'
              }`
            }
          >
            <span className="mr-4">{item.icon}</span>
            <span className="text-sm font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-8 w-full px-3">
        <button className="flex items-center px-6 py-3 w-full rounded-md text-[#202224] hover:bg-gray-100 transition-colors">
          <span className="mr-4">🚪</span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};
