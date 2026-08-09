// src/components/ui/Divider.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text = 'or' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-2.5 w-full"
    >
      <svg
        width="182"
        height="1"
        viewBox="0 0 182 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-1"
      >
        <path d="M181.5 0.5H0" stroke="#D9D9D9" />
      </svg>
      <p className="text-[#6E6E6E] font-inter text-base font-medium">{text}</p>
      <svg
        width="182"
        height="1"
        viewBox="0 0 182 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-1"
      >
        <path d="M181.5 0.5H0" stroke="#D9D9D9" />
      </svg>
    </motion.div>
  );
};
