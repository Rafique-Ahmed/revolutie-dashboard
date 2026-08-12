// src/pages/users/UserList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';
import { userService } from '../../services/user.service';
import { roleService } from '../../services/role.service';
import { Edit, Trash2, Loader2, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { debug } from '../../lib/debug';

// Status badge component
const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
  const statusConfig = {
    completed: { bg: 'bg-[#00B69B]/20', text: 'text-[#00B69B]', label: 'Completed' },
    processing: { bg: 'bg-[#6226EF]/20', text: 'text-[#6226EF]', label: 'Processing' },
    rejected: { bg: 'bg-[#EF3826]/20', text: 'text-[#EF3826]', label: 'Rejected' },
    active: { bg: 'bg-green-500/20', text: 'text-green-500', label: 'Active' },
    pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', label: 'Pending' },
    suspended: { bg: 'bg-red-500/20', text: 'text-red-500', label: 'Suspended' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={`rounded-[4.5px] ${config.bg} px-4 py-1.5 inline-flex items-center`}>
      <span className={`text-xs font-bold ${config.text}`}>{config.label}</span>
    </div>
  );
};

// Role badge component
const RoleBadge: React.FC<{ role: string | { name: string } }> = ({ role }) => {
  const roleName = typeof role === 'string' ? role : role?.name || '';

  const getRoleColor = (name: string) => {
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

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(roleName)}`}
    >
      <span className="text-sm">{getRoleIcon(roleName)}</span>
      {roleName}
    </span>
  );
};

// User Edit Modal
const UserEditModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
  allRoles: string[];
}> = ({ isOpen, onClose, onSuccess, user, allRoles }) => {
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active' as User['status'],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        status: user.status || 'active',
      });
      const userRoles = user.roles || [];
      const roleNames = userRoles
        .map((role: string | { name: string }) =>
          typeof role === 'string' ? role : role?.name || ''
        )
        .filter(Boolean);
      setSelectedRoles(roleNames);
    }
  }, [user]);

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    try {
      setLoading(true);
      await userService.updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        status: formData.status,
      });
      await userService.syncRoles(user.id, selectedRoles);
      toast.success('User updated successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      debug.error('Error updating user:', error);
      toast.error('Failed to update user');
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
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit User</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as User['status'] })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roles
              </label>
              <div className="flex flex-wrap gap-2">
                {allRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedRoles.includes(role)
                        ? 'bg-[#4880FF] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              {selectedRoles.length === 0 && (
                <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                  No roles selected. User will have limited permissions.
                </p>
              )}
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
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [allRoles, setAllRoles] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers(currentPage);
      if (response.success) {
        setUsers(response.data.data);
        setTotalPages(response.data.last_page);
      } else {
        setError('Failed to load users');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fixed: Properly typed fetchRoles
  const fetchRoles = async () => {
    try {
      const response = await roleService.getRoles();
      // Properly typed mapping
      const roles = response.data.map((r: { name: string }) => r.name || r);
      setAllRoles(roles);
    } catch (error) {
      debug.error('Failed to fetch roles:', error);
    }
  };

  const handleDeleteUser = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      await userService.deleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      debug.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleEditUser = (user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingUser(user);
  };

  const handleViewProfile = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4880FF]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6FA] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-[#202224] tracking-[-0.0036em]">User List</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click on a user to view their profile
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Total: <strong>{users.length}</strong> users
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[14px] border border-[#B9B9B9] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FCFDFD] border-b border-[#D5D5D5]">
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    NAME
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    ADDRESS
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    ROLES
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    DATE
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    TYPE
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    STATUS
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-red-500">
                      {error}
                      <button
                        onClick={fetchUsers}
                        className="ml-4 px-4 py-2 bg-[#4880FF] text-white rounded-lg hover:bg-blue-700"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    // Fixed: Properly typed roles mapping
                    const userRoles: Array<string | { name: string }> = user.roles || [];
                    const roleNames = userRoles
                      .map((role: string | { name: string }) =>
                        typeof role === 'string' ? role : role?.name || ''
                      )
                      .filter(Boolean);

                    return (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleViewProfile(user.id)}
                      >
                        <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                          {String(user.id).padStart(5, '0')}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                              {user.name?.charAt(0) || 'U'}
                            </div>
                            <span className="text-sm text-[#202224] opacity-80">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                          {user.address || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {roleNames.length > 0 ? (
                              roleNames
                                .slice(0, 2)
                                .map((role) => <RoleBadge key={role} role={role} />)
                            ) : (
                              <span className="text-sm text-gray-400">No roles</span>
                            )}
                            {roleNames.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                +{roleNames.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                          {user.date || new Date(user.created_at || '').toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                          {user.type || user.role || 'N/A'}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={user.status || 'pending'} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(user.id);
                              }}
                              className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="View profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleEditUser(user, e)}
                              className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Edit user"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteUser(user.id, e)}
                              className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Showing {users.length} of {users.length} users
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <UserEditModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={fetchUsers}
        user={editingUser}
        allRoles={allRoles}
      />
    </div>
  );
};

export default UserList;
