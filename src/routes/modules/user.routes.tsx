// src/routes/modules/user.routes.tsx
import UserList from '../../pages/users/UserList';

const UserProfile = () => <div className="text-2xl font-bold p-6">User Profile</div>;

export const userRoutes = [
  { path: '/users', element: <UserList /> },
  { path: '/users/profile', element: <UserProfile /> },
];
