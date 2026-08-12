// src/routes/modules/user.routes.tsx
import { RouteObject } from 'react-router-dom';
import UserList from '../../pages/users/UserList';
import UserProfile from '../../pages/users/UserProfile';

export const userRoutes: RouteObject[] = [
  {
    path: 'users',
    element: <UserList />,
  },
  {
    // This handles /users/profile (legacy route)
    path: 'users/profile',
    element: <UserProfile />,
  },
  {
    // This handles /users/:id (numeric ID)
    path: 'users/:id',
    element: <UserProfile />,
  },
];

export default userRoutes;
