// src/pages/auth/Register.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Logo } from '../../components/ui/Logo';
import { Divider } from '../../components/ui/Divider';
import { SocialLogin } from './components/SocialLogin';
import { LoginIllustration } from './components/LoginIllustration';
import { useAuthStore } from '../../store/authStore';
import { pageVariants, fadeInUp, staggerContainer } from '../../lib/utils';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

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

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError, isAuthenticated } = useAuthStore();
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
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    clearError();
    console.warn('📝 Register attempt:', { email: data.email, name: data.name });

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      console.warn('✅ Register result:', result);

      if (result.success) {
        setIsRedirecting(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Register error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    toast('Google sign up coming soon!', {
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
      {/* Left Column - Register Form */}
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
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center items-start gap-3 w-full"
          >
            <h1 className="text-[#232323] font-inter text-[40px] font-bold leading-[1.1em] tracking-[-0.04em]">
              Create Account
            </h1>
            <p className="text-[#969696] font-inter text-lg">Start your journey with us today.</p>
          </motion.div>

          {/* Register Form */}
          <motion.form
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            onSubmit={handleSubmit(onSubmit)}
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
                label="Full Name"
                type="text"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
                disabled={isLoading}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full">
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                error={errors.email?.message}
                {...register('email')}
                disabled={isLoading}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full">
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                {...register('password')}
                disabled={isLoading}
              />
              {password && password.length > 0 && (
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-1 flex-1 rounded ${
                        password.length < 6
                          ? 'bg-red-500'
                          : password.length < 8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    <span className="text-xs text-gray-500">
                      {password.length < 6 ? 'Weak' : password.length < 8 ? 'Fair' : 'Strong'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full">
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={errors.password_confirmation?.message}
                {...register('password_confirmation')}
                disabled={isLoading}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full">
              <Button type="submit" variant="primary" size="xl" fullWidth disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <Divider text="or" />

          {/* Social Login */}
          <SocialLogin onGoogleLogin={handleGoogleLogin} isLoading={isLoading} />

          {/* Login Link */}
          <motion.p
            variants={fadeInUp}
            className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
            onClick={() => navigate('/login')}
          >
            Already have an account? Sign in
          </motion.p>
        </motion.div>
      </div>

      {/* Right Column - Illustration */}
      <LoginIllustration />
    </motion.div>
  );
};

export default Register;
