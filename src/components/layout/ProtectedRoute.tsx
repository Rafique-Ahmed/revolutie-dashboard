// src/components/layout/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  requireVerified?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  requireVerified = false,
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const { isAuthenticated, isLoading, user, getUser, hasPermission, hasAnyRole } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated && !user) {
        try {
          await getUser();
        } catch (error) {
          console.error('Failed to get user:', error);
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, user, getUser]);

  // Show loading state
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check email verification
  if (requireVerified && user && !user.email_verified_at) {
    toast.error('Please verify your email address');
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }

  // Check roles
  if (requiredRoles.length > 0) {
    const hasRequiredRole = hasAnyRole(requiredRoles);
    if (!hasRequiredRole) {
      toast.error('You do not have the required role to access this page');
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((perm) => hasPermission(perm));
    if (!hasAllPermissions) {
      toast.error('You do not have permission to access this page');
      return <Navigate to="/dashboard" replace />;
    }
  }

  // All checks passed
  return <>{children}</>;
};

export default ProtectedRoute;
