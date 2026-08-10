// src/routes/modules/system.routes.tsx
const SystemLogs = () => <div className="text-2xl font-bold p-6">System Logs</div>;
const ApiStatus = () => <div className="text-2xl font-bold p-6">API Status</div>;
const Backups = () => <div className="text-2xl font-bold p-6">Backups</div>;

export const systemRoutes = [
  { path: '/system/logs', element: <SystemLogs /> },
  { path: '/system/status', element: <ApiStatus /> },
  { path: '/system/backups', element: <Backups /> },
];
