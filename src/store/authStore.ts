// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/client';
import toast from 'react-hot-toast';
import { debug } from '../lib/debug';

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  avatar?: string | null;
  roles?: string[];
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ForgotPasswordCredentials {
  email: string;
}

interface ResetPasswordCredentials {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (credentials: ForgotPasswordCredentials) => Promise<void>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  verifyEmail: (id: number, hash: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  getUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }) => Promise<void>;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

type ApiError = {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
};

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as ApiError;
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.response?.data?.errors) {
      const errors = Object.values(err.response.data.errors).flat();
      return errors.join(', ');
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as Error).message;
  }
  return 'An unexpected error occurred';
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.post('/auth/login', credentials);
          debug.log('🔐 Login response:', response.data);

          const token = response.data.data?.token || response.data.token;
          const user = response.data.data?.user || response.data.user;

          if (!token) {
            throw new Error('No token received from server');
          }

          localStorage.setItem('token', token);

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success('Welcome back! 🎉');
        } catch (error) {
          debug.error('❌ Login error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.post('/auth/register', credentials);
          debug.log('📝 Register response:', response.data);

          const token = response.data.data?.token || response.data.token;
          const user = response.data.data?.user || response.data.user;

          if (!token) {
            throw new Error('No token received from server');
          }

          localStorage.setItem('token', token);

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success('Account created successfully! 🎉');
        } catch (error) {
          debug.error('❌ Register error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });

          const token = get().token;
          if (token) {
            await api.post('/auth/logout');
          }
        } catch (error) {
          debug.error('Logout error:', error);
        } finally {
          localStorage.removeItem('token');
          localStorage.removeItem('auth-storage');

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          toast.success('Logged out successfully');
        }
      },

      forgotPassword: async (credentials: ForgotPasswordCredentials) => {
        try {
          set({ isLoading: true, error: null });

          await api.post('/auth/forgot-password', credentials);

          set({ isLoading: false });
          toast.success('Password reset link sent to your email!');
        } catch (error) {
          debug.error('❌ Forgot password error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      resetPassword: async (credentials: ResetPasswordCredentials) => {
        try {
          set({ isLoading: true, error: null });

          await api.post('/auth/reset-password', credentials);

          set({ isLoading: false });
          toast.success('Password reset successfully! Please login.');
        } catch (error) {
          debug.error('❌ Reset password error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      verifyEmail: async (id: number, hash: string) => {
        try {
          set({ isLoading: true, error: null });

          await api.get(`/auth/verify/${id}/${hash}`);

          set({ isLoading: false });
          toast.success('Email verified successfully!');

          await get().getUser();
        } catch (error) {
          debug.error('❌ Verify email error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      resendVerification: async () => {
        try {
          set({ isLoading: true, error: null });

          await api.post('/auth/email/resend');

          set({ isLoading: false });
          toast.success('Verification email sent!');
        } catch (error) {
          debug.error('❌ Resend verification error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      getUser: async () => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.get('/auth/user');
          const user = response.data.data || response.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          debug.error('❌ Get user error:', error);

          if (error && typeof error === 'object' && 'response' in error) {
            const err = error as { response?: { status?: number } };
            if (err.response?.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('auth-storage');
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          } else {
            set({ isLoading: false });
          }

          throw error;
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null });

          const response = await api.put('/auth/profile', data);
          const user = response.data.data || response.data;

          set({
            user,
            isLoading: false,
          });

          toast.success('Profile updated successfully!');
        } catch (error) {
          debug.error('❌ Update profile error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      updatePassword: async (data: {
        current_password: string;
        new_password: string;
        new_password_confirmation: string;
      }) => {
        try {
          set({ isLoading: true, error: null });

          await api.put('/auth/password', data);

          set({ isLoading: false });
          toast.success('Password updated successfully!');
        } catch (error) {
          debug.error('❌ Update password error:', error);

          const message = getErrorMessage(error);

          set({
            isLoading: false,
            error: message,
          });

          toast.error(message);
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) {
          return false;
        }
        return user.permissions?.includes(permission) || false;
      },

      hasRole: (role: string) => {
        const { user } = get();
        if (!user) {
          return false;
        }
        return user.roles?.includes(role) || false;
      },

      hasAnyRole: (roles: string[]) => {
        const { user } = get();
        if (!user) {
          return false;
        }
        return roles.some((role) => user.roles?.includes(role));
      },

      hasAllPermissions: (permissions: string[]) => {
        const { user } = get();
        if (!user) {
          return false;
        }
        return permissions.every((perm) => user.permissions?.includes(perm));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        debug.log('🔄 Auth store rehydrating...');
        return (state) => {
          if (state) {
            debug.log(
              '✅ Auth store rehydrated:',
              state.isAuthenticated ? 'Authenticated' : 'Not authenticated'
            );
            if (state.token && !localStorage.getItem('token')) {
              localStorage.setItem('token', state.token);
            }
          }
        };
      },
    }
  )
);

// Sync token between localStorage and store
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key: string, value: string) {
  originalSetItem.call(this, key, value);
  if (key === 'token' && value) {
    const state = useAuthStore.getState();
    if (!state.token) {
      useAuthStore.setState({ token: value });
    }
  }
};

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    isAdmin: store.hasRole('admin') || store.hasRole('super-admin'),
    isSuperAdmin: store.hasRole('super-admin'),
    isEditor: store.hasRole('editor'),
    isViewer: store.hasRole('viewer'),
  };
};

export default useAuthStore;
