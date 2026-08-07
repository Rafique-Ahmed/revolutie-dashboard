// src/api/types.ts

// Use unknown instead of any for generic responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

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
  user: User;
  token: string;
  token_type: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  avatar_url?: string;
  status: 'active' | 'pending' | 'suspended';
  role?: string;
  permissions?: string[];
  department?: string;
  location?: string;
  bio?: string;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_users: number;
  active_users: number;
  pending_users: number;
  suspended_users: number;
  new_users_today: number;
  user_growth: number;
  recent_logins: User[];
}

export interface ChartData {
  user_registrations: Array<{ date: string; count: number }>;
  user_status: { active: number; pending: number; suspended: number };
  role_distribution: Array<{ name: string; count: number }>;
}

export interface Activity {
  user: string;
  action: string;
  target?: string;
  time: string;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  icon: string;
  color: string;
  action_url?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
  avatar?: string;
  joined_at: string;
}
