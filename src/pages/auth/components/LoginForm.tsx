// src/pages/auth/components/LoginForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';
import { LoginFormData } from '../LoginTypes';
import { fadeInUp, staggerContainer } from '../../../lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false, error }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  return (
    <motion.form
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      onSubmit={handleSubmit((data) => onSubmit(data as LoginFormData))}
      className="flex flex-col justify-center items-start gap-5 w-full"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={fadeInUp} className="w-full">
        <Input
          label="Email"
          type="email"
          placeholder="jonas_kahnwald@gmail.com"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message as string | undefined}
          {...register('email')}
          disabled={isLoading}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full">
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message as string | undefined}
          {...register('password')}
          disabled={isLoading}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full flex items-center justify-between">
        <Checkbox label="Keep me logged in" {...register('remember')} disabled={isLoading} />
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-[#367AFF] hover:text-[#2868E6] text-sm font-medium transition-colors"
        >
          Forgot password?
        </button>
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full">
        <Button type="submit" variant="primary" size="xl" fullWidth disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
