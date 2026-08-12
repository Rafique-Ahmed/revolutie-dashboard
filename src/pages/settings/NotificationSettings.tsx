// src/pages/settings/NotificationSettings.tsx
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import SettingsCard from '../../components/settings/SettingsCard';
import SettingsSwitch from '../../components/settings/SettingsSwitch';

interface NotificationPreferences {
  email_notifications: boolean;
  in_app_notifications: boolean;
  sound_enabled: boolean;
  marketing_emails: boolean;
  security_alerts: boolean;
  product_updates: boolean;
}

const NotificationSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_notifications: true,
    in_app_notifications: true,
    sound_enabled: false,
    marketing_emails: false,
    security_alerts: true,
    product_updates: true,
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      // TODO: Fetch preferences from API
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch {
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // TODO: Save preferences to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Preferences saved successfully!');
    } catch {
      toast.error('Failed to save preferences');
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
      title="Notification Preferences"
      description="Manage how you receive notifications"
    >
      <div className="space-y-4">
        <SettingsSwitch
          checked={preferences.email_notifications}
          onChange={() => handleToggle('email_notifications')}
          label="Email Notifications"
          description="Receive notifications via email"
        />

        <SettingsSwitch
          checked={preferences.in_app_notifications}
          onChange={() => handleToggle('in_app_notifications')}
          label="In-App Notifications"
          description="Show notifications within the app"
        />

        <SettingsSwitch
          checked={preferences.sound_enabled}
          onChange={() => handleToggle('sound_enabled')}
          label="Notification Sounds"
          description="Play a sound when you receive a notification"
        />

        <SettingsSwitch
          checked={preferences.marketing_emails}
          onChange={() => handleToggle('marketing_emails')}
          label="Marketing Emails"
          description="Receive promotional emails and updates"
        />

        <SettingsSwitch
          checked={preferences.security_alerts}
          onChange={() => handleToggle('security_alerts')}
          label="Security Alerts"
          description="Receive alerts about suspicious activity"
        />

        <SettingsSwitch
          checked={preferences.product_updates}
          onChange={() => handleToggle('product_updates')}
          label="Product Updates"
          description="Get notified about new features"
        />

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSave}
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
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default NotificationSettings;
