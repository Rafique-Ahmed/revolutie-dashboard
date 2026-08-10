// src/routes/modules/settings.routes.tsx
const GeneralSettings = () => <div className="text-2xl font-bold p-6">General Settings</div>;
const ProfileSettings = () => <div className="text-2xl font-bold p-6">Profile Settings</div>;
const SecuritySettings = () => <div className="text-2xl font-bold p-6">Security Settings</div>;
const NotificationPreferences = () => (
  <div className="text-2xl font-bold p-6">Notification Preferences</div>
);
const TeamManagement = () => <div className="text-2xl font-bold p-6">Team Management</div>;

export const settingsRoutes = [
  { path: '/settings/general', element: <GeneralSettings /> },
  { path: '/settings/profile', element: <ProfileSettings /> },
  { path: '/settings/security', element: <SecuritySettings /> },
  { path: '/settings/notifications', element: <NotificationPreferences /> },
  { path: '/settings/team', element: <TeamManagement /> },
];
