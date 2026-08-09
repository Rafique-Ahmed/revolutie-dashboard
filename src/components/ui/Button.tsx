// src/components/ui/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#367AFF] text-white hover:bg-[#2868E6] focus:ring-[#367AFF]',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        outline:
          'border-2 border-[#E6E8E7] bg-white text-[#232323] hover:bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
        ghost: 'hover:bg-gray-100 text-gray-700',
        google:
          'border border-[#E6E8E7] bg-white text-[#232323] hover:bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ variant, size, fullWidth, className }))} {...props}>
      {children}
    </button>
  );
};
