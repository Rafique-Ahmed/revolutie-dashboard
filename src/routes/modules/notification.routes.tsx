// src/routes/modules/notification.routes.tsx
import { RouteObject } from 'react-router-dom';
import NotificationsList from '../../pages/notifications/NotificationsList';

export const notificationRoutes: RouteObject[] = [
  {
    path: 'notifications',
    element: <NotificationsList />,
  },
];

export default notificationRoutes;
