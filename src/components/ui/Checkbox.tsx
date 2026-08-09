// src/components/ui/Checkbox.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <motion.label
      whileHover={{ scale: 1.02 }}
      className={`flex items-center gap-2.5 cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-300 text-[#367AFF] focus:ring-[#367AFF] accent-[#367AFF]"
        {...props}
      />
      {label && <span className="text-[#232323] font-medium">{label}</span>}
    </motion.label>
  );
};
