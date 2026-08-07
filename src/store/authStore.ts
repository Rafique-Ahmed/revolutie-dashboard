// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/auth';
import type { User } from '../api/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login({ email, password });
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          const error = err as { response?: { data?: { message?: string } } };
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw err;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          const error = err as { response?: { data?: { message?: string } } };
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
          throw err;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        }catch (error) {
  console.error('Logout error:', error);
} finally {
          localStorage.removeItem('token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        try {
          const response = await authApi.getUser();
          set({
            user: response.data,
            isAuthenticated: true,
          });
        } catch {
          localStorage.removeItem('token');
          set({ user: null, isAuthenticated: false });
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
