// src/pages/auth/components/LoginForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../../lib/utils';

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, register, errors, isLoading, error }) => {
  return (
    <motion.form
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-start gap-5 w-full max-w-[399px]"
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
          error={errors.email?.message}
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
          error={errors.password?.message}
          {...register('password')}
          disabled={isLoading}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full">
        <Checkbox label="Keep me logged in" {...register('remember')} disabled={isLoading} />
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
