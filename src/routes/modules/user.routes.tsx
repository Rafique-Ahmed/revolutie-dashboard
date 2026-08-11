// src/routes/modules/user.routes.tsx
import UserList from '../../pages/users/UserList';
import UserProfile from '../../pages/users/UserProfile';

export const userRoutes = [
  { path: '/users', element: <UserList /> },
  { path: '/users/profile/:id?', element: <UserProfile /> },
];
