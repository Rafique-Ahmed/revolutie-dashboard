// src/routes/modules/system.routes.tsx
import { RouteObject } from 'react-router-dom';
import SystemLayout from '../../pages/system/SystemLayout';
import SystemLogs from '../../pages/system/SystemLogs';
import ApiStatus from '../../pages/system/ApiStatus';
import Backups from '../../pages/system/Backups';

export const systemRoutes: RouteObject[] = [
  {
    path: 'system',
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <SystemLogs />,
      },
      {
        path: 'logs',
        element: <SystemLogs />,
      },
      {
        path: 'status',
        element: <ApiStatus />,
      },
      {
        path: 'backups',
        element: <Backups />,
      },
    ],
  },
];

export default systemRoutes;
