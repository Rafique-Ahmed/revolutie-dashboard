// src/components/ui/Input.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full"
    >
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`
            w-full px-4 py-4 rounded-xl border-2 
            ${error ? 'border-red-500 focus:border-red-500' : 'border-[#D9D9D9] focus:border-[#367AFF]'}
            bg-white text-[#232323] placeholder:text-[#9A9A9A] outline-none transition-colors
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        {label && (
          <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium text-[#367AFF] bg-white">
            {label}
          </label>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#6B7280] transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </motion.div>
  );
};
