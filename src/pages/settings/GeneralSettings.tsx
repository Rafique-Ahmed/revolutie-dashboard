// src/pages/settings/GeneralSettings.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Globe, Clock, Calendar, Type } from 'lucide-react';
import toast from 'react-hot-toast';
import SettingsCard from '../../components/settings/SettingsCard';

const generalSettingsSchema = z.object({
  company_name: z.string().min(2, 'Company name must be at least 2 characters'),
  timezone: z.string().min(1, 'Please select a timezone'),
  date_format: z.string().min(1, 'Please select a date format'),
  time_format: z.string().min(1, 'Please select a time format'),
  language: z.string().min(1, 'Please select a language'),
});

type GeneralSettingsForm = z.infer<typeof generalSettingsSchema>;

const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Dubai',
  'Asia/Tokyo',
  'Australia/Sydney',
];

const dateFormats = ['YYYY-MM-DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'MMM DD, YYYY', 'DD MMM YYYY'];

const timeFormats = ['12-hour', '24-hour'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

const GeneralSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralSettingsForm>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      company_name: '',
      timezone: 'UTC',
      date_format: 'YYYY-MM-DD',
      time_format: '12-hour',
      language: 'English',
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // TODO: Fetch settings from API
      reset({
        company_name: 'Revolutie',
        timezone: 'UTC',
        date_format: 'YYYY-MM-DD',
        time_format: '12-hour',
        language: 'English',
      });
    } catch {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed: Changed `data` to `_data` to indicate it's intentionally unused
  const onSubmit = async (_data: GeneralSettingsForm) => {
    try {
      setSaving(true);
      // TODO: Save settings to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Settings updated successfully!');
    } catch {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4880FF] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <SettingsCard
      title="General Settings"
      description="Manage your company and application settings"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('company_name')}
              type="text"
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Acme Inc."
            />
          </div>
          {errors.company_name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.company_name.message}
            </p>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Timezone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              {...register('timezone')}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          {errors.timezone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.timezone.message}</p>
          )}
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Format
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <select
              {...register('date_format')}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {dateFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
          {errors.date_format && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.date_format.message}
            </p>
          )}
        </div>

        {/* Time Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Format
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              {...register('time_format')}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {timeFormats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
          {errors.time_format && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.time_format.message}
            </p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <select
              {...register('language')}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          {errors.language && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.language.message}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#4880FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </SettingsCard>
  );
};

export default GeneralSettings;
