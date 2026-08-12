// src/pages/settings/SecuritySettings.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Key, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import SettingsCard from '../../components/settings/SettingsCard';
import SettingsSwitch from '../../components/settings/SettingsSwitch';

const securitySettingsSchema = z
  .object({
    current_password: z.string().min(6, 'Password must be at least 6 characters'),
    new_password: z.string().min(6, 'Password must be at least 6 characters'),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords don't match",
    path: ['new_password_confirmation'],
  });

type SecuritySettingsForm = z.infer<typeof securitySettingsSchema>;

const SecuritySettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecuritySettingsForm>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  });

  // ✅ Fixed: Changed `data` to `_data` to indicate it's intentionally unused
  const onSubmit = async (_data: SecuritySettingsForm) => {
    try {
      setSaving(true);
      // TODO: Update password via API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      reset({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch {
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleTwoFactorToggle = async (checked: boolean) => {
    try {
      // TODO: Toggle 2FA via API
      setTwoFactorEnabled(checked);
      toast.success(checked ? '2FA enabled!' : '2FA disabled!');
    } catch {
      toast.error('Failed to toggle 2FA');
    }
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <SettingsCard
        title="Change Password"
        description="Update your password to keep your account secure"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('current_password')}
                type="password"
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter current password"
              />
            </div>
            {errors.current_password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.current_password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              {...register('new_password')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter new password"
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              {...register('new_password_confirmation')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Confirm new password"
            />
            {errors.new_password_confirmation && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.new_password_confirmation.message}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#4880FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </SettingsCard>

      {/* Two-Factor Authentication */}
      <SettingsCard
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      >
        <div className="space-y-4">
          <SettingsSwitch
            checked={twoFactorEnabled}
            onChange={handleTwoFactorToggle}
            label="Enable 2FA"
            description="Protect your account with two-factor authentication"
          />
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                2FA is currently enabled. You will be prompted for a code on login.
              </p>
            </div>
          )}
        </div>
      </SettingsCard>
    </div>
  );
};

export default SecuritySettings;
