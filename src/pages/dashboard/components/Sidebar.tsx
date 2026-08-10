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
  ChevronLeft,
  LogOut,
  BarChart3,
  User,
  UserCog,
  Key,
  BellRing,
  HardDrive,
  Activity,
  Home,
  FileText,
  UserPlus,
} from 'lucide-react';

interface SubNavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
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
      { path: '/dashboard', label: 'Overview', icon: <Home className="w-4 h-4" /> },
      { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Users',
    icon: <Users className="w-5 h-5" />,
    subItems: [
      { path: '/users', label: 'All Users', icon: <Users className="w-4 h-4" /> },
      { path: '/users/profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Roles',
    icon: <Shield className="w-5 h-5" />,
    path: '/roles',
  },
  {
    label: 'Notification',
    icon: <Bell className="w-5 h-5" />,
    path: '/notifications',
  },
  {
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { path: '/settings/general', label: 'General', icon: <Settings className="w-4 h-4" /> },
      { path: '/settings/profile', label: 'Profile', icon: <UserCog className="w-4 h-4" /> },
      { path: '/settings/security', label: 'Security', icon: <Key className="w-4 h-4" /> },
      {
        path: '/settings/notifications',
        label: 'Notifications',
        icon: <BellRing className="w-4 h-4" />,
      },
      { path: '/settings/team', label: 'Team Management', icon: <UserPlus className="w-4 h-4" /> },
    ],
  },
  {
    label: 'System',
    icon: <Database className="w-5 h-5" />,
    subItems: [
      { path: '/system/logs', label: 'System Logs', icon: <FileText className="w-4 h-4" /> },
      { path: '/system/status', label: 'API Status', icon: <Activity className="w-4 h-4" /> },
      { path: '/system/backups', label: 'Backups', icon: <HardDrive className="w-4 h-4" /> },
    ],
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Dashboard', 'Settings', 'System']);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isExpanded = (label: string) => expandedItems.includes(label);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[72px]' : 'w-[247px]'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex-shrink-0 flex items-center border-b border-gray-100 ${
          isCollapsed ? 'justify-center h-16' : 'px-6 h-16'
        }`}
      >
        {!isCollapsed ? (
          <p className="text-[#202224] font-nunitoSans text-xl font-extrabold">DashStack</p>
        ) : (
          <p className="text-[#202224] font-nunitoSans text-xl font-extrabold">DS</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        <nav>
          {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpandedItem = isExpanded(item.label);

            return (
              <div key={item.label} className="mb-0.5">
                {item.path && !hasSubItems ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center h-12 rounded-md transition-colors ${
                        isActive ? 'bg-[#4880FF] text-white' : 'text-[#202224] hover:bg-gray-100'
                      } ${isCollapsed ? 'justify-center mx-2' : 'px-4 mx-3'}`
                    }
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="text-sm font-semibold ml-4 truncate">{item.label}</span>
                    )}
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`flex items-center w-full h-12 rounded-md transition-colors ${
                        isExpandedItem && !isCollapsed
                          ? 'text-[#4880FF] bg-blue-50'
                          : 'text-[#202224] hover:bg-gray-100'
                      } ${isCollapsed ? 'justify-center mx-2' : 'px-4 mx-3'}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-semibold ml-4 flex-1 text-left truncate">
                            {item.label}
                          </span>
                          {hasSubItems && (
                            <span className="ml-2 flex-shrink-0">
                              {isExpandedItem ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </span>
                          )}
                        </>
                      )}
                    </button>

                    {hasSubItems && isExpandedItem && (
                      <div
                        className={`${
                          isCollapsed
                            ? 'flex flex-col items-center gap-0.5 mt-1'
                            : 'ml-4 pl-4 border-l-2 border-gray-200'
                        }`}
                      >
                        {item.subItems!.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 h-9 rounded-md transition-colors ${
                                isActive
                                  ? 'text-[#4880FF] bg-blue-50'
                                  : 'text-[#202224] hover:bg-gray-100'
                              } ${isCollapsed ? 'justify-center w-9 mx-auto' : 'px-3 mx-3'}`
                            }
                            title={isCollapsed ? subItem.label : undefined}
                          >
                            <span className="flex-shrink-0">{subItem.icon}</span>
                            {!isCollapsed && <span className="text-sm">{subItem.label}</span>}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className={`flex-shrink-0 border-t border-gray-100 bg-white p-2`}>
        <button
          className={`flex items-center h-12 rounded-md text-[#202224] hover:bg-gray-100 transition-colors ${
            isCollapsed ? 'justify-center mx-2' : 'px-4 mx-3'
          }`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <span className="flex-shrink-0">
            <LogOut className="w-5 h-5" />
          </span>
          {!isCollapsed && <span className="text-sm font-semibold ml-4">Logout</span>}
        </button>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300 z-10"
      >
        <ChevronLeft
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>
    </aside>
  );
};

export default Sidebar;
