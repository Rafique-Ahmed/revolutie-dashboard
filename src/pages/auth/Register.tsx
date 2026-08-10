// src/pages/auth/Register.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { AuthLayout } from './components/AuthLayout';
import { AuthForm } from './components/AuthForm';
import { fadeInUp } from '../../lib/utils';
import { motion } from 'framer-motion';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async (data: FieldValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call here
      console.warn('Register data:', data);
      navigate('/verify-email');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      icon: <User className="w-5 h-5" />,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john@example.com',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      icon: <Lock className="w-5 h-5" />,
    },
    {
      name: 'password_confirmation',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with us today."
      footer={
        <motion.p
          variants={fadeInUp}
          className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign in
        </motion.p>
      }
    >
      <AuthForm
        fields={fields}
        schema={registerSchema}
        onSubmit={handleRegister}
        submitLabel="Create Account"
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default Register;
