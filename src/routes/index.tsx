// src/routes/index.tsx
import { MainLayout } from '../components/layout/MainLayout';
import { authRoutes } from './modules/auth.routes';
import { dashboardRoutes } from './modules/dashboard.routes';
import { userRoutes } from './modules/user.routes';
import { roleRoutes } from './modules/role.routes';
import { notificationRoutes } from './modules/notification.routes';
import { settingsRoutes } from './modules/settings.routes';
import { systemRoutes } from './modules/system.routes';
import { notFoundRoutes } from './modules/notfound.routes';

// All routes that use MainLayout (with Sidebar & Header)
export const mainLayoutRoutes = [
  ...dashboardRoutes,
  ...userRoutes,
  ...roleRoutes,
  ...notificationRoutes,
  ...settingsRoutes,
  ...systemRoutes,
];

// Complete route configuration
export const allRoutes = [
  ...authRoutes,
  {
    path: '/',
    element: <MainLayout />,
    children: mainLayoutRoutes,
  },
  ...notFoundRoutes,
];

// Export individual route modules for flexibility
export {
  authRoutes,
  dashboardRoutes,
  userRoutes,
  roleRoutes,
  notificationRoutes,
  settingsRoutes,
  systemRoutes,
  notFoundRoutes,
};
