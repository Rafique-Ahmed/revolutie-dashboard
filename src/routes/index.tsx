// src/routes/index.tsx
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { authRoutes } from './modules/auth.routes';
import { dashboardRoutes } from './modules/dashboard.routes';
import { userRoutes } from './modules/user.routes';
import { roleRoutes } from './modules/role.routes'; // ✅ Only one import
import { notificationRoutes } from './modules/notification.routes';
import { settingsRoutes } from './modules/settings.routes';
import { systemRoutes } from './modules/system.routes';
import { notFoundRoutes } from './modules/notfound.routes';

// Wrap all protected routes with ProtectedRoute
const protectedRoutes = [
  ...dashboardRoutes,
  ...userRoutes,
  ...roleRoutes, // ✅ Single role routes
  ...notificationRoutes,
  ...settingsRoutes,
  ...systemRoutes,
];

export const mainLayoutRoutes = protectedRoutes.map((route) => ({
  ...route,
  element: <ProtectedRoute>{route.element}</ProtectedRoute>,
}));

export const allRoutes = [
  ...authRoutes,
  {
    path: '/',
    element: <MainLayout />,
    children: mainLayoutRoutes,
  },
  ...notFoundRoutes,
];

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
