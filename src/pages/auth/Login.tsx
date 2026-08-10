// src/pages/auth/Login.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Logo } from '../../components/ui/Logo';
import { Divider } from '../../components/ui/Divider';
import LoginForm from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import { LoginIllustration } from './components/LoginIllustration';
import { useAuthStore } from '../../store/authStore';
import { pageVariants, fadeInUp, staggerContainer } from '../../lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    clearError();
    console.warn('🔐 Login attempt:', { email: data.email, remember: data.remember });

    try {
      const result = await login(data.email, data.password, data.remember);
      console.warn('✅ Login result:', result);

      if (result.success) {
        setIsRedirecting(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    toast('Google login coming soon!', {
      icon: '🔜',
      duration: 3000,
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  };

  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-start rounded-[32px] bg-white min-h-screen overflow-hidden"
    >
      <div className="flex p-8 flex-col items-start w-full lg:w-1/2 h-full">
        <div className="flex flex-col items-start gap-2.5 w-full">
          <Logo />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex py-0 px-0 lg:px-16 flex-col justify-center items-start gap-8 w-full h-full mt-8"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center items-start gap-3 w-full"
          >
            <h1 className="text-[#232323] font-inter text-[40px] font-bold leading-[1.1em] tracking-[-0.04em]">
              Sign in
            </h1>
            <p className="text-[#969696] font-inter text-lg">
              Please login to continue to your account.
            </p>
          </motion.div>

          <LoginForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isLoading={isLoading}
            error={error}
          />

          <Divider text="or" />

          <SocialLogin onGoogleLogin={handleGoogleLogin} isLoading={isLoading} />

          <motion.p
            variants={fadeInUp}
            className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
            onClick={() => navigate('/register')}
          >
            Need an account? Create one
          </motion.p>
        </motion.div>
      </div>

      <LoginIllustration />
    </motion.div>
  );
};

export default Login;
