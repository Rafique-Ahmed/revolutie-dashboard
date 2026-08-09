// src/pages/Login/Login.types.ts
export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginProps {
  onLogin?: (data: LoginFormData) => Promise<void>;
  onGoogleLogin?: () => Promise<void>;
  onRegister?: () => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string | null;
}
