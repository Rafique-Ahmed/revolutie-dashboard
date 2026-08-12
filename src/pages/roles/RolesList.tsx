// src/pages/roles/RolesList.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Shield, Users, Loader2, RefreshCw } from 'lucide-react';
import { Role } from '../../api/roles';
import { roleService } from '../../services/role.service';
import RoleFormModal from './RoleFormModal';
import DeleteRoleDialog from './DeleteRoleDialog';
import toast from 'react-hot-toast';
import { debug } from '../../lib/debug';

const RolesList: React.FC = () => {
  debug.log('🎯 RolesList component is rendering!');

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('Initializing...');

  useEffect(() => {
    debug.log('🔄 useEffect is running - about to fetch roles!');
    setDebugInfo('Component mounted, fetching roles...');
    loadRoles();
  }, []);

  const loadRoles = async () => {
    debug.log('📡 loadRoles function called!');
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Calling API...');

      debug.log('📡 Calling roleService.getRoles()...');
      const response = await roleService.getRoles({ per_page: 100 });

      debug.log('📦 Full API Response:', response);

      setDebugInfo(`Received ${response.data?.length || 0} roles`);

      let rolesData = [];

      if (response.data && Array.isArray(response.data)) {
        debug.log('✅ Case 1: response.data is array');
        rolesData = response.data;
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        debug.log('✅ Case 2: response.data.data is array');
        rolesData = response.data.data;
      } else if (Array.isArray(response)) {
        debug.log('✅ Case 3: response is array');
        rolesData = response;
      }

      debug.log('✅ Setting roles:', rolesData);
      debug.log('📊 Roles count:', rolesData.length);

      setRoles(rolesData);
      setDebugInfo(`Successfully loaded ${rolesData.length} roles`);

      if (rolesData.length === 0) {
        debug.warn('⚠️ No roles found in response');
        setDebugInfo('No roles found in database');
      }
    } catch (err: unknown) {
      debug.error('❌ Error loading roles:', err);

      let errorMessage = 'Failed to load roles';
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { message?: string }; status?: number } };
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as Error).message;
      }

      setError(errorMessage);
      setDebugInfo(`Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      debug.log('✅ loadRoles completed, loading set to false');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (name: string) => {
    const colors: Record<string, string> = {
      'super-admin':
        'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
      admin:
        'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      editor:
        'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
      viewer:
        'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600',
    };
    return (
      colors[name?.toLowerCase()] ||
      'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
    );
  };

  const getRoleIcon = (name: string) => {
    const icons: Record<string, string> = {
      'super-admin': '👑',
      admin: '🛡️',
      editor: '✏️',
      viewer: '👁️',
    };
    return icons[name?.toLowerCase()] || '🔑';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
        <span className="mt-3 text-gray-600 dark:text-gray-400">Loading roles...</span>
        <span className="mt-1 text-sm text-gray-400">{debugInfo}</span>
        <button
          onClick={loadRoles}
          className="mt-4 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 inline mr-1" />
          Retry
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-red-700 dark:text-red-400 font-medium">Error Loading Roles</p>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{debugInfo}</p>
          <button
            onClick={loadRoles}
            className="mt-4 w-full px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Debug Info */}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm flex items-center justify-between">
        <div>
          <span className="font-medium">🔍 Debug:</span>
          <span className="ml-2 text-gray-600 dark:text-gray-400">{debugInfo}</span>
          <span className="ml-4 text-gray-500 dark:text-gray-500">
            Roles in state: <strong>{roles.length}</strong>
          </span>
        </div>
        <button
          onClick={loadRoles}
          className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <RefreshCw className="w-3 h-3 inline mr-1" />
          Refresh
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#202224] dark:text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-[#4880FF]" />
            Roles & Permissions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage user roles and their permissions across the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-3 sm:mt-0 flex items-center px-4 py-2 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Roles</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">{roles.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Permissions</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {roles.reduce((acc, role) => acc + (role.permissions?.length || 0), 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Users with Roles</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {roles.reduce((acc, role) => acc + (role.users_count || 0), 0)}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent bg-gray-50 dark:bg-gray-900 text-[#202224] dark:text-white"
          />
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRoles.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <Shield className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p>{searchTerm ? 'No matching roles found' : 'No roles found'}</p>
                    {!searchTerm && roles.length === 0 && (
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-3 text-[#4880FF] hover:text-blue-700 font-medium"
                      >
                        Create your first role →
                      </button>
                    )}
                    {searchTerm && roles.length > 0 && (
                      <p className="text-sm mt-1">Try adjusting your search</p>
                    )}
                  </td>
                </tr>
              ) : (
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getRoleIcon(role.name)}</span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(role.name)}`}
                        >
                          {role.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {role.description || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 3).map((perm) => (
                          <span
                            key={perm.id}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          >
                            {perm.name.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {role.permissions && role.permissions.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                        {(!role.permissions || role.permissions.length === 0) && (
                          <span className="text-sm text-gray-400">No permissions</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-[#202224] dark:text-white">
                          {role.users_count || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {role.created_at
                          ? new Date(role.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setEditingRole(role)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Edit role"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingRole(role)}
                          className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <RoleFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadRoles}
        title="Create New Role"
      />

      <RoleFormModal
        isOpen={!!editingRole}
        onClose={() => setEditingRole(null)}
        onSuccess={loadRoles}
        initialData={editingRole || undefined}
        title="Edit Role"
      />

      <DeleteRoleDialog
        isOpen={!!deletingRole}
        onClose={() => setDeletingRole(null)}
        onConfirm={async () => {
          if (deletingRole) {
            await roleService.deleteRole(deletingRole.id);
            await loadRoles();
            setDeletingRole(null);
          }
        }}
        roleName={deletingRole?.name || ''}
        userCount={deletingRole?.users_count || 0}
      />
    </div>
  );
};

export default RolesList;
