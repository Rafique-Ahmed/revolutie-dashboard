// src/types/userProfile.ts
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  avatar: string | null;
  avatar_url: string;
  role: string;
  bio?: string;
  department?: string;
  location?: string;
  github_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}
