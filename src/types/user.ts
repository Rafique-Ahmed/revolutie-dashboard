// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  address?: string;
  date?: string;
  type?: string;
  status: 'active' | 'pending' | 'suspended' | 'completed' | 'processing' | 'rejected';
  avatar?: string;
  role?: string;
  roles?: Array<string | { name: string }>; // ✅ Add this
  created_at?: string;
  updated_at?: string;
}

export interface UserListResponse {
  success: boolean;
  data: {
    current_page: number;
    data: User[];
    total: number;
    per_page: number;
    last_page: number;
  };
}
