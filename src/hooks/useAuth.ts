// src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, checkAuth, clearError } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
    clearError,
  };
};