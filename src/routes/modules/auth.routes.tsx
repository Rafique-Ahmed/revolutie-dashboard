// src/routes/modules/auth.routes.tsx
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword';
import VerifyEmail from '../../pages/auth/VerifyEmail';

export const authRoutes = [
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/verify-email', element: <VerifyEmail /> },
];
