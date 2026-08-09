// src/pages/Login/components/LoginIllustration.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const LoginIllustration: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="hidden lg:block flex-1"
    >
      <div className="flex p-3 items-start gap-2.5 w-full h-full">
        <img
          src="/container.png"
          className="flex items-start gap-2.5 rounded-3xl w-full h-full max-w-none object-cover"
          alt="Login illustration"
        />
      </div>
    </motion.div>
  );
};
