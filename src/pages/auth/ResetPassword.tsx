// src/pages/auth/ResetPassword.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { AuthLayout } from './components/AuthLayout';
import { AuthForm } from './components/AuthForm';
import { fadeInUp } from '../../lib/utils';
import { motion } from 'framer-motion';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleResetPassword = async (data: FieldValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call here
      console.warn('Reset password data:', data);
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter new password',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      name: 'password_confirmation',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm new password',
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password below."
      footer={
        <motion.p
          variants={fadeInUp}
          className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
          onClick={() => navigate('/login')}
        >
          Back to Sign in
        </motion.p>
      }
    >
      <AuthForm
        fields={fields}
        schema={resetPasswordSchema}
        onSubmit={handleResetPassword}
        submitLabel="Reset Password"
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default ResetPassword;
