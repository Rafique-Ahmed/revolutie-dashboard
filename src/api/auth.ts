// src/api/auth.ts
import api from './client';
import type { LoginRequest, RegisterRequest, AuthResponse } from './types';

export const authApi = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post('/auth/logout'),

  getUser: () => api.get('/auth/user'),

  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),

  resetPassword: (data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) => api.post('/auth/reset-password', data),
};
