// src/pages/users/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile as UserProfileType } from '../../types/userProfile';
import { userProfileService } from '../../services/userProfile.service';
import { Camera, Save, Edit2, Mail, MapPin, Briefcase, Link as LinkIcon } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfileType>>({});

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = parseInt(id || '1');
      const response = await userProfileService.getProfile(userId);
      if (response.success) {
        setProfile(response.data);
        setEditedProfile(response.data);
      } else {
        setError('Failed to load profile');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) {
      return;
    }
    try {
      const response = await userProfileService.updateProfile(profile.id, editedProfile);
      if (response.success) {
        setProfile(response.data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleChange = (field: keyof UserProfileType, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile || !e.target.files?.[0]) {
      return;
    }
    try {
      const file = e.target.files[0];
      const response = await userProfileService.uploadAvatar(profile.id, file);
      if (response.success) {
        setProfile((prev) => (prev ? { ...prev, avatar_url: response.data.avatar_url } : null));
      }
    } catch (err) {
      console.error('Failed to upload avatar:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="font-semibold">Error loading profile</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6FA] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[14px] border border-[#B9B9B9] p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>
            <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:text-blue-700">
              Edit Photo
            </p>
          </div>

          {/* Name and Role */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#202224]">{profile.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {profile.role?.toUpperCase().replace('-', ' ') || 'User'}
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                profile.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : profile.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {profile.status}
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#ADADAD] mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm text-[#202224] px-4 py-3 bg-[#F5F6FA] rounded-lg">
                  {profile.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#ADADAD] mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm text-[#202224] px-4 py-3 bg-[#F5F6FA] rounded-lg flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#ADADAD] mb-1">Department</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.department || ''}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-4 py-3 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm text-[#202224] px-4 py-3 bg-[#F5F6FA] rounded-lg flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  {profile.department || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#ADADAD] mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm text-[#202224] px-4 py-3 bg-[#F5F6FA] rounded-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {profile.location || 'Not specified'}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#ADADAD] mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                />
              ) : (
                <p className="text-sm text-[#202224] px-4 py-3 bg-[#F5F6FA] rounded-lg">
                  {profile.bio || 'No bio provided'}
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-[#ADADAD] mb-3">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> GitHub
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.github_url || ''}
                      onChange={(e) => handleChange('github_url', e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-2 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-[#202224] px-4 py-2 bg-[#F5F6FA] rounded-lg">
                      {profile.github_url ? (
                        <a
                          href={profile.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.github_url}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> Twitter
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.twitter_url || ''}
                      onChange={(e) => handleChange('twitter_url', e.target.value)}
                      placeholder="https://twitter.com/username"
                      className="w-full px-4 py-2 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-[#202224] px-4 py-2 bg-[#F5F6FA] rounded-lg">
                      {profile.twitter_url ? (
                        <a
                          href={profile.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.twitter_url}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> LinkedIn
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.linkedin_url || ''}
                      onChange={(e) => handleChange('linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-[#202224] px-4 py-2 bg-[#F5F6FA] rounded-lg">
                      {profile.linkedin_url ? (
                        <a
                          href={profile.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.linkedin_url}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedProfile.website_url || ''}
                      onChange={(e) => handleChange('website_url', e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-[#D5D5D5] rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    />
                  ) : (
                    <p className="text-sm text-[#202224] px-4 py-2 bg-[#F5F6FA] rounded-lg">
                      {profile.website_url ? (
                        <a
                          href={profile.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {profile.website_url}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
