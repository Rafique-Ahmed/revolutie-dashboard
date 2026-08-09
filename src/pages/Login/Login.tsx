// src/pages/Login/Login.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { Divider } from '../../components/ui/Divider';
import { LoginForm } from './components/LoginForm';
import { SocialLogin } from './components/SocialLogin';
import { LoginIllustration } from './components/LoginIllustration';
import { LoginFormData, LoginProps } from './Login.types';
import { pageVariants, fadeInUp, staggerContainer } from '../../lib/utils';

export const Login: React.FC<LoginProps> = ({
  onLogin,
  onGoogleLogin,
  onRegister,
  onForgotPassword: _onForgotPassword,
  isLoading = false,
  error = null,
}) => {
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData): Promise<void> => {
    if (onLogin) {
      await onLogin(data);
    } else {
      console.warn('Login data:', data);
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    if (onGoogleLogin) {
      await onGoogleLogin();
    } else {
      console.warn('Google login clicked');
    }
  };

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    } else {
      navigate('/register');
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-start rounded-[32px] bg-white min-h-screen overflow-hidden"
    >
      {/* Left Column - Login Form */}
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
              Sign in
            </h1>
            <p className="text-[#969696] font-inter text-lg">
              Please login to continue to your account.
            </p>
          </motion.div>

          {/* Login Form */}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

          {/* Divider */}
          <Divider text="or" />

          {/* Social Login */}
          <SocialLogin onGoogleLogin={handleGoogleLogin} isLoading={isLoading} />

          {/* Register Link */}
          <motion.p
            variants={fadeInUp}
            className="text-[#367AFF] font-inter text-lg font-semibold w-full text-center cursor-pointer hover:text-[#2868E6] transition-colors"
            onClick={handleRegister}
          >
            Need an account? Create one
          </motion.p>
        </motion.div>
      </div>

      {/* Right Column - Illustration */}
      <LoginIllustration />
    </motion.div>
  );
};

export default Login;
