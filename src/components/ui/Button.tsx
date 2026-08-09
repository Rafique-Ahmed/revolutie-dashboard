// src/components/ui/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-[#4880FF] text-white hover:bg-[#3770E6] focus:ring-[#4880FF]',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        outline: 'border-2 border-[#4880FF] text-[#4880FF] hover:bg-[#4880FF] hover:text-white',
        ghost: 'hover:bg-gray-100 text-gray-700',
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
