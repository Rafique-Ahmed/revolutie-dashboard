// src/routes/index.tsx
import React, { lazy, Suspense } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { authRoutes } from './modules/auth.routes';
import { notFoundRoutes } from './modules/notfound.routes';
import SystemLayout from '../pages/system/SystemLayout';
import SettingsLayout from '../pages/settings/SettingsLayout';

// ✅ Loading fallback component
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4880FF] border-t-transparent"></div>
      <p className="text-gray-500 dark:text-gray-400">Loading page...</p>
    </div>
  </div>
);

// ✅ Wrap routes with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<object>>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// ✅ Lazy load all page components
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Analytics = lazy(() => import('../pages/dashboard/Analytics'));
const UserList = lazy(() => import('../pages/users/UserList'));
const UserProfile = lazy(() => import('../pages/users/UserProfile'));
const RolesList = lazy(() => import('../pages/roles/RolesList'));
const NotificationsList = lazy(() => import('../pages/notifications/NotificationsList'));
const GeneralSettings = lazy(() => import('../pages/settings/GeneralSettings'));
const ProfileSettings = lazy(() => import('../pages/settings/ProfileSettings'));
const SecuritySettings = lazy(() => import('../pages/settings/SecuritySettings'));
const NotificationSettings = lazy(() => import('../pages/settings/NotificationSettings'));
const TeamSettings = lazy(() => import('../pages/settings/TeamSettings'));
const SystemLogs = lazy(() => import('../pages/system/SystemLogs'));
const ApiStatus = lazy(() => import('../pages/system/ApiStatus'));
const Backups = lazy(() => import('../pages/system/Backups'));

// ✅ Dashboard routes
const dashboardRoutes = [
  {
    path: 'dashboard',
    element: withSuspense(Dashboard),
  },
  {
    path: 'analytics',
    element: withSuspense(Analytics),
  },
];

// ✅ User routes
const userRoutes = [
  {
    path: 'users',
    element: withSuspense(UserList),
  },
  {
    path: 'users/profile',
    element: withSuspense(UserProfile),
  },
  {
    path: 'users/:id',
    element: withSuspense(UserProfile),
  },
];

// ✅ Role routes
const roleRoutes = [
  {
    path: 'roles',
    element: withSuspense(RolesList),
  },
];

// ✅ Notification routes
const notificationRoutes = [
  {
    path: 'notifications',
    element: withSuspense(NotificationsList),
  },
];

// ✅ Settings routes
const settingsRoutes = [
  {
    path: 'settings',
    element: <SettingsLayout />,
    children: [
      { index: true, element: withSuspense(GeneralSettings) },
      { path: 'general', element: withSuspense(GeneralSettings) },
      { path: 'profile', element: withSuspense(ProfileSettings) },
      { path: 'security', element: withSuspense(SecuritySettings) },
      { path: 'notifications', element: withSuspense(NotificationSettings) },
      { path: 'team', element: withSuspense(TeamSettings) },
    ],
  },
];

// ✅ System routes
const systemRoutes = [
  {
    path: 'system',
    element: <SystemLayout />,
    children: [
      { index: true, element: withSuspense(SystemLogs) },
      { path: 'logs', element: withSuspense(SystemLogs) },
      { path: 'status', element: withSuspense(ApiStatus) },
      { path: 'backups', element: withSuspense(Backups) },
    ],
  },
];

// ✅ Protected routes
const protectedRoutes = [
  ...dashboardRoutes,
  ...userRoutes,
  ...roleRoutes,
  ...notificationRoutes,
  ...settingsRoutes,
  ...systemRoutes,
];

const mainLayoutRoutes = protectedRoutes.map((route) => ({
  ...route,
  element: <ProtectedRoute>{route.element}</ProtectedRoute>,
}));

const allRoutes = [
  ...authRoutes,
  {
    path: '/',
    element: <MainLayout />,
    children: mainLayoutRoutes,
  },
  ...notFoundRoutes,
];

// ✅ Export all routes (only once, no duplicates)
export {
  authRoutes,
  dashboardRoutes,
  userRoutes,
  roleRoutes,
  notificationRoutes,
  settingsRoutes,
  systemRoutes,
  notFoundRoutes,
  allRoutes,
};
