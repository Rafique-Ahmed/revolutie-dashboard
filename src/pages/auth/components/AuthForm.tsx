// src/pages/auth/components/AuthForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';
import { Input } from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../../lib/utils';

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
}

interface AuthFormProps {
  fields: FieldConfig[];
  schema: ZodSchema;
  onSubmit: (data: FieldValues) => void | Promise<void>;
  submitLabel: string;
  isLoading?: boolean;
  error?: string | null;
  showRemember?: boolean;
  showForgotPassword?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  schema,
  onSubmit,
  submitLabel,
  isLoading = false,
  error = null,
  showRemember = false,
  showForgotPassword = false,
}) => {
  const defaultValues = fields.reduce(
    (acc, field) => {
      acc[field.name] = '';
      return acc;
    },
    {} as Record<string, string>
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<FieldValues>,
  });

  return (
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

      {fields.map((field) => (
        <motion.div key={field.name} variants={fadeInUp} className="w-full">
          <Input
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            icon={field.icon}
            error={errors[field.name]?.message as string | undefined}
            {...register(field.name)}
            disabled={isLoading}
          />
        </motion.div>
      ))}

      {(showRemember || showForgotPassword) && (
        <motion.div variants={fadeInUp} className="w-full flex items-center justify-between">
          {showRemember && (
            <Checkbox label="Keep me logged in" {...register('remember')} disabled={isLoading} />
          )}
          {showForgotPassword && (
            <a
              href="/forgot-password"
              className="text-[#367AFF] hover:text-[#2868E6] text-sm font-medium transition-colors"
            >
              Forgot password?
            </a>
          )}
        </motion.div>
      )}

      <motion.div variants={fadeInUp} className="w-full">
        <Button type="submit" variant="primary" size="xl" fullWidth disabled={isLoading}>
          {isLoading ? 'Loading...' : submitLabel}
        </Button>
      </motion.div>
    </motion.form>
  );
};
