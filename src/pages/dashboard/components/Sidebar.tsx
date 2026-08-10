// src/pages/dashboard/components/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Bell, 
  Settings, 
  Database,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface SubNavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { 
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    subItems: [
      { path: '/dashboard', label: '📋 Overview' },
      { path: '/analytics', label: '📈 Analytics' },
    ]
  },
  { 
    label: 'Users',
    icon: <Users className="w-5 h-5" />,
    subItems: [
      { path: '/users', label: '📋 All Users' },
      { path: '/users/profile', label: '👤 User Profile' },
    ]
  },
  { 
    label: 'Roles',
    icon: <Shield className="w-5 h-5" />,
    path: '/roles'
  },
  { 
    label: 'Notification',
    icon: <Bell className="w-5 h-5" />,
    path: '/notifications'
  },
  { 
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { path: '/settings/general', label: '🔧 General' },
      { path: '/settings/profile', label: '👤 Profile' },
      { path: '/settings/security', label: '🔒 Security' },
      { path: '/settings/notifications', label: '🔔 Notifications' },
      { path: '/settings/team', label: '👥 Team Management' },
    ]
  },
  { 
    label: 'System',
    icon: <Database className="w-5 h-5" />,
    subItems: [
      { path: '/system/logs', label: '📋 System Logs' },
      { path: '/system/status', label: '📊 API Status' },
      { path: '/system/backups', label: '💾 Backups' },
    ]
  },
];

export const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard', 'Settings', 'System']);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isExpanded = (label: string) => expandedItems.includes(label);

  return (
    <aside className="fixed left-0 top-0 h-full w-[247px] bg-white border-r border-gray-200 z-50 flex flex-col">
      <div className="flex-shrink-0 flex items-center px-6 py-6 border-b border-gray-100">
        <p className="text-[#202224] font-nunitoSans text-xl font-extrabold">
          DashStack
        </p>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4">
        <nav className="mt-2">
          {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpandedItem = isExpanded(item.label);

            return (
              <div key={item.label} className="mb-0.5">
                {item.path && !hasSubItems ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 mx-3 rounded-md transition-colors ${
                        isActive
                          ? 'bg-[#4880FF] text-white'
                          : 'text-[#202224] hover:bg-gray-100'
                      }`
                    }
                  >
                    <span className="mr-4 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-semibold flex-1 truncate">{item.label}</span>
                  </NavLink>
                ) : (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`flex items-center w-full px-6 py-3 mx-3 rounded-md transition-colors ${
                      isExpandedItem
                        ? 'text-[#4880FF] bg-blue-50'
                        : 'text-[#202224] hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-4 flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-semibold flex-1 text-left truncate">{item.label}</span>
                    {hasSubItems && (
                      <span className="ml-2 flex-shrink-0">
                        {isExpandedItem ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </button>
                )}

                {hasSubItems && isExpandedItem && (
                  <div className="ml-6 pl-3 border-l-2 border-gray-200">
                    {item.subItems!.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 mx-3 rounded-md transition-colors ${
                            isActive
                              ? 'text-[#4880FF] bg-blue-50'
                              : 'text-[#202224] hover:bg-gray-100'
                          }`
                        }
                      >
                        <span className="text-sm truncate">{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex-shrink-0 border-t border-gray-100 p-3 bg-white">
        <button className="flex items-center px-6 py-3 w-full rounded-md text-[#202224] hover:bg-gray-100 transition-colors">
          <span className="mr-4">🚪</span>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
