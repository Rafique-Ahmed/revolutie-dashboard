// src/routes/modules/settings.routes.tsx
import { RouteObject } from 'react-router-dom';
import SettingsLayout from '../../pages/settings/SettingsLayout';
import GeneralSettings from '../../pages/settings/GeneralSettings';
import ProfileSettings from '../../pages/settings/ProfileSettings';
import SecuritySettings from '../../pages/settings/SecuritySettings';
import NotificationSettings from '../../pages/settings/NotificationSettings';
import TeamSettings from '../../pages/settings/TeamSettings';

export const settingsRoutes: RouteObject[] = [
  {
    path: 'settings',
    element: <SettingsLayout />,
    children: [
      {
        index: true,
        element: <GeneralSettings />,
      },
      {
        path: 'general',
        element: <GeneralSettings />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'security',
        element: <SecuritySettings />,
      },
      {
        path: 'notifications',
        element: <NotificationSettings />,
      },
      {
        path: 'team',
        element: <TeamSettings />,
      },
    ],
  },
];

export default settingsRoutes;
