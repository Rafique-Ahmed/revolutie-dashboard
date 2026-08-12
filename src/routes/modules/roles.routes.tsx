// src/routes/modules/roles.routes.tsx
import { RouteObject } from 'react-router-dom';
import RolesList from '../../pages/roles/RolesList';

export const permissionRoutes: RouteObject[] = [
  {
    path: 'roles',
    element: <RolesList />,
  },
];

export default permissionRoutes;
