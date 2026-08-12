// src/pages/roles/RoleFormModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Role, Permission } from '../../api/roles';
import { roleService } from '../../services/role.service';
import { debug } from '../../lib/debug';

const roleSchema = z.object({
  name: z
    .string()
    .min(3, 'Role name must be at least 3 characters')
    .max(50, 'Role name must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed')
    .transform((val) => val.toLowerCase()),
  description: z.string().max(255, 'Description must be less than 255 characters').optional(),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Role;
  title?: string;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  title = 'Create New Role',
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [permissionError, setPermissionError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      debug.log('📝 Modal opened - loading permissions...');

      const loadData = async () => {
        try {
          setLoadingPermissions(true);
          const permissions = await roleService.getPermissions();
          debug.log('📝 Permissions loaded:', permissions.length);
          setAllPermissions(permissions || []);
        } catch (error) {
          debug.error('Failed to load permissions:', error);
        } finally {
          setLoadingPermissions(false);
        }
      };

      loadData();

      if (initialData) {
        debug.log('📝 Editing role:', initialData);
        reset({
          name: initialData.name,
          description: initialData.description || '',
        });
        setSelectedPermissions(initialData.permissions?.map((p) => p.id) || []);
      } else {
        reset({ name: '', description: '' });
        setSelectedPermissions([]);
      }
      setPermissionError('');
    }
  }, [isOpen, initialData]);

  const handleTogglePermission = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
    setPermissionError('');
  };

  const onSubmit = async (data: RoleFormData) => {
    if (selectedPermissions.length === 0) {
      setPermissionError('Please select at least one permission');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...data,
        permissions: selectedPermissions,
      };

      if (initialData) {
        await roleService.updateRole(initialData.id, payload);
      } else {
        await roleService.createRole(payload);
      }

      onSuccess();
      onClose();
    } catch (error) {
      debug.error('Failed to save role:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loadingPermissions ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading permissions...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., manager, editor, viewer"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Only lowercase letters, numbers, and hyphens
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="What is this role for?"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Permissions *
                  </label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedPermissions.length} selected
                  </span>
                </div>

                {permissionError && (
                  <p className="mb-3 text-sm text-red-600 dark:text-red-400">{permissionError}</p>
                )}

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {allPermissions.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.id)}
                          onChange={() => handleTogglePermission(perm.id)}
                          className="w-4 h-4 text-[#4880FF] border-gray-300 rounded focus:ring-[#4880FF] dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {perm.name.replace(/_/g, ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#4880FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {initialData ? 'Updating...' : 'Creating...'}
                    </div>
                  ) : initialData ? (
                    'Update Role'
                  ) : (
                    'Create Role'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleFormModal;
