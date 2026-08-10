// src/components/layout/AnimatedLayout.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};
