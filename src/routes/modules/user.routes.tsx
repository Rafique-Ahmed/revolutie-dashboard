// src/routes/modules/user.routes.tsx'
const Users = () => <div className="text-2xl font-bold p-6">All Users</div>;
const UserProfile = () => <div className="text-2xl font-bold p-6">User Profile</div>;

export const userRoutes = [
  { path: '/users', element: <Users /> },
  { path: '/users/profile', element: <UserProfile /> },
];
