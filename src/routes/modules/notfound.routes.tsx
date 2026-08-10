// src/routes/modules/notfound.routes.tsx
import { Navigate } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';

export const notFoundRoutes = [
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate to="/404" replace /> },
];
