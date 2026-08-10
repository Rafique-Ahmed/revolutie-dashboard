// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { authApi, User } from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string,
    remember?: boolean
  ) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password, remember = false) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ email, password, remember });
          const { user, token } = response.data.data;

          localStorage.setItem('token', token);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success('Welcome back! Redirecting to dashboard...');

          return { success: true };
        } catch (err) {
          const error = err as ApiError;
          const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });

          toast.error(errorMessage);
          return { success: false, message: errorMessage };
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          const { user, token } = response.data.data;

          localStorage.setItem('token', token);

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success('Registration successful! Redirecting to dashboard...');
          return { success: true };
        } catch (err) {
          const error = err as ApiError;
          const errorMessage =
            error.response?.data?.message || 'Registration failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });

          toast.error(errorMessage);
          return { success: false, message: errorMessage };
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
          toast.success('Logged out successfully');
        } catch {
          console.warn('Logout error');
        } finally {
          localStorage.removeItem('token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authApi.getUser();
          const user = response.data.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          localStorage.removeItem('token');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
