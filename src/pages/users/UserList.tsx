// src/pages/users/UserList.tsx
import React, { useState, useEffect } from 'react';
import { User } from '../../types/user';
import { userService } from '../../services/user.service';

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

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers();
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
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6FA] min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#202224] tracking-[-0.0036em]">
            User List
          </h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[14px] border border-[#B9B9B9] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FCFDFD] border-b border-[#D5D5D5]">
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">NAME</th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">ADDRESS</th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">DATE</th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">TYPE</th>
                  <th className="px-4 py-3 text-left text-sm font-extrabold text-[#202224] opacity-90">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-red-500">
                      {error}
                      <button
                        onClick={fetchUsers}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                        {String(user.id).padStart(5, '0')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                            {user.name.charAt(0)}
                          </div>
                          <span className="text-sm text-[#202224] opacity-80">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                        {user.address || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                        {user.date || new Date(user.created_at || '').toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#202224] opacity-80">
                        {user.type || user.role || 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={user.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
    </div>
  );
};

export default UserList;
