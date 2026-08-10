// src/routes/modules/dashboard.routes.tsx
import Dashboard from '../../pages/dashboard/Dashboard';
import Analytics from '../../pages/dashboard/Analytics';

export const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/analytics', element: <Analytics /> },
];
