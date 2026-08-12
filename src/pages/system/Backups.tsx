// src/pages/system/Backups.tsx
import React, { useState, useEffect } from 'react';
import { HardDrive, Download, Trash2, RefreshCw, Loader2, Plus, FileArchive } from 'lucide-react';
import toast from 'react-hot-toast';

interface Backup {
  id: number;
  name: string;
  size: string;
  created_at: string;
  status: 'completed' | 'processing' | 'failed';
  type: 'full' | 'incremental';
  location: string;
}

const Backups: React.FC = () => {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      // TODO: Fetch backups from API
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBackups([
        {
          id: 1,
          name: 'full-backup-2026-08-13-00-00',
          size: '2.4 GB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          status: 'completed',
          type: 'full',
          location: 'S3://backups/full/',
        },
        {
          id: 2,
          name: 'incremental-backup-2026-08-13-06-00',
          size: '156 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          status: 'completed',
          type: 'incremental',
          location: 'S3://backups/incremental/',
        },
        {
          id: 3,
          name: 'incremental-backup-2026-08-12-18-00',
          size: '142 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          status: 'completed',
          type: 'incremental',
          location: 'S3://backups/incremental/',
        },
        {
          id: 4,
          name: 'full-backup-2026-08-12-00-00',
          size: '2.3 GB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          status: 'completed',
          type: 'full',
          location: 'S3://backups/full/',
        },
        {
          id: 5,
          name: 'incremental-backup-2026-08-12-12-00',
          size: '138 MB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
          status: 'processing',
          type: 'incremental',
          location: 'S3://backups/incremental/',
        },
        {
          id: 6,
          name: 'full-backup-2026-08-11-00-00',
          size: '2.2 GB',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          status: 'failed',
          type: 'full',
          location: 'S3://backups/full/',
        },
      ]);
    } catch {
      toast.error('Failed to fetch backups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setCreating(true);
      // TODO: Create backup via API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Backup created successfully!');
      await fetchBackups();
    } catch {
      toast.error('Failed to create backup');
    } finally {
      setCreating(false);
    }
  };

  const handleDownload = async (_id: number) => {
    try {
      // TODO: Download backup via API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Backup download started');
    } catch {
      toast.error('Failed to download backup');
    }
  };

  const handleDelete = async (_id: number) => {
    if (!window.confirm('Are you sure you want to delete this backup?')) {
      return;
    }

    try {
      // TODO: Delete backup via API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Backup deleted successfully');
      await fetchBackups();
    } catch {
      toast.error('Failed to delete backup');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': {
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      }
      case 'processing': {
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      }
      case 'failed': {
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      }
      default: {
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalBackupSize = () => {
    const total = backups.reduce((acc, b) => {
      const size = parseFloat(b.size);
      if (b.size.includes('GB')) {
        return acc + size * 1024;
      }
      return acc + size;
    }, 0);
    if (total > 1024) {
      return `${(total / 1024).toFixed(1)} GB`;
    }
    return `${total.toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading backups...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#202224] dark:text-white flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-[#4880FF]" />
          Backups
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCreateBackup}
            disabled={creating}
            className="flex items-center px-4 py-2 text-sm bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Create Backup
          </button>
          <button
            onClick={fetchBackups}
            className="flex items-center px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Backups</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">{backups.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Size</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {getTotalBackupSize()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Full Backups</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {backups.filter((b) => b.type === 'full').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Incremental</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">
            {backups.filter((b) => b.type === 'incremental').length}
          </p>
        </div>
      </div>

      {/* Backups Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {backups.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <HardDrive className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p>No backups found</p>
                    <p className="text-sm mt-1">Create your first backup</p>
                  </td>
                </tr>
              ) : (
                backups.map((backup) => (
                  <tr
                    key={backup.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileArchive className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {backup.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                          backup.type === 'full'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {backup.size}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(backup.status)}`}
                      >
                        {backup.status === 'processing' && (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        )}
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-gray-600 dark:text-gray-400">
                        {backup.location}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(backup.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(backup.id)}
                          className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Download backup"
                          disabled={backup.status === 'processing'}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(backup.id)}
                          className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete backup"
                          disabled={backup.status === 'processing'}
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
    </div>
  );
};

export default Backups;
