// src/pages/system/SystemLayout.tsx
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Server,
  Activity,
  HardDrive,
  FileText,
  // Database, // ✅ Remove this - it's not used
} from 'lucide-react';

const SystemLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/system/logs', icon: FileText, label: 'System Logs' },
    { path: '/system/status', icon: Activity, label: 'API Status' },
    { path: '/system/backups', icon: HardDrive, label: 'Backups' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#202224] dark:text-white flex items-center">
          <Server className="w-8 h-8 mr-3 text-[#4880FF]" />
          System
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Monitor and manage your system</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 sticky top-24">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#4880FF] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SystemLayout;
