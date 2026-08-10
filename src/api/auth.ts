// src/api/auth.ts
import api from './client';

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      status: string;
      role?: string;
    };
    token: string;
    token_type: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  role?: string;
  avatar?: string;
}

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post('/auth/logout'),

  getUser: () => api.get<{ success: boolean; data: User }>('/auth/user'),

  forgotPassword: (email: string) =>
    api.post<{ success: boolean; message: string }>('/auth/forgot-password', { email }),

  resetPassword: (data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) => api.post<{ success: boolean; message: string }>('/auth/reset-password', data),
};
