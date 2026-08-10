// src/pages/auth/components/AuthLayout.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../../../components/ui/Logo';
import { LoginIllustration } from './LoginIllustration';
import { pageVariants, fadeInUp, staggerContainer } from '../../../lib/utils';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, footer }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-start rounded-[32px] bg-white min-h-screen overflow-hidden"
    >
      {/* Left Column - Auth Form */}
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
              {title}
            </h1>
            <p className="text-[#969696] font-inter text-lg">{subtitle}</p>
          </motion.div>

          {children}

          {footer && (
            <motion.div variants={fadeInUp} className="w-full">
              {footer}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Column - Illustration */}
      <LoginIllustration />
    </motion.div>
  );
};
