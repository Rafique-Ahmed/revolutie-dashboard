// src/pages/auth/ForgotPassword.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { AuthLayout } from './components/AuthLayout';
import { AuthForm } from './components/AuthForm';
import { fadeInUp } from '../../lib/utils';
import { motion } from 'framer-motion';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleForgotPassword = async (data: FieldValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call here
      console.warn('Forgot password data:', data);
      navigate('/reset-password');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset link';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john@example.com',
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password. We'll send you a link."
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
        schema={forgotPasswordSchema}
        onSubmit={handleForgotPassword}
        submitLabel="Send Reset Link"
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
