// src/routes/modules/role.routes.tsx
import { RouteObject } from 'react-router-dom';
import RolesList from '../../pages/roles/RolesList';

// Your existing role routes (if any)
// If you have existing role management routes, keep them here

export const roleRoutes: RouteObject[] = [
  {
    path: 'roles',
    element: <RolesList />, // ✅ This will render the new Roles & Permissions UI
  },
  // Add any other role-related routes here
];

export default roleRoutes;
