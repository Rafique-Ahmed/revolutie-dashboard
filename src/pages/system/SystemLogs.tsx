// src/pages/system/SystemLogs.tsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Trash2,
  RefreshCw,
  Loader2,
  AlertCircle,
  AlertTriangle,
  Info,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LogEntry {
  id: number;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  context?: string;
  timestamp: string;
  source?: string;
}

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'info' | 'warning' | 'error'>('all');
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // TODO: Fetch logs from API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLogs([
        {
          id: 1,
          level: 'info',
          message: 'User admin logged in successfully',
          context: 'Authentication',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          source: 'auth.log',
        },
        {
          id: 2,
          level: 'warning',
          message: 'Database connection pool reaching limit',
          context: 'Database',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          source: 'database.log',
        },
        {
          id: 3,
          level: 'error',
          message: 'Failed to process payment for order #12345',
          context: 'Payment',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          source: 'payment.log',
        },
        {
          id: 4,
          level: 'info',
          message: 'Cron job completed: Daily backup',
          context: 'Cron',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          source: 'cron.log',
        },
        {
          id: 5,
          level: 'error',
          message: 'API rate limit exceeded for IP 192.168.1.100',
          context: 'Security',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          source: 'security.log',
        },
        {
          id: 6,
          level: 'warning',
          message: 'Disk usage at 85% on /dev/sda1',
          context: 'System',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
          source: 'system.log',
        },
        {
          id: 7,
          level: 'info',
          message: 'User jane.doe registered successfully',
          context: 'Registration',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          source: 'auth.log',
        },
        {
          id: 8,
          level: 'error',
          message: 'Connection timeout to external API',
          context: 'Integration',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          source: 'api.log',
        },
      ]);
    } catch {
      toast.error('Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.context?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const handleSelectAll = () => {
    if (selectedLogs.length === filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map((log) => log.id));
    }
  };

  const handleSelectLog = (id: number) => {
    setSelectedLogs((prev) =>
      prev.includes(id) ? prev.filter((logId) => logId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedLogs.length === 0) {
      toast.error('No logs selected');
      return;
    }

    if (!window.confirm(`Delete ${selectedLogs.length} log entries?`)) {
      return;
    }

    try {
      // TODO: Delete logs via API
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogs(logs.filter((log) => !selectedLogs.includes(log.id)));
      setSelectedLogs([]);
      toast.success(`${selectedLogs.length} logs deleted`);
    } catch {
      toast.error('Failed to delete logs');
    }
  };

  const handleExport = async () => {
    try {
      // TODO: Export logs via API
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Logs exported successfully');
    } catch {
      toast.error('Failed to export logs');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#202224] dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#4880FF]" />
          System Logs
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleDeleteSelected}
            className="flex items-center px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedLogs.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedLogs.length})
          </button>
          <button
            onClick={fetchLogs}
            className="flex items-center px-4 py-2 text-sm bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4880FF] focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterLevel('all')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterLevel === 'all'
                  ? 'bg-[#4880FF] text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterLevel('error')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterLevel === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Error
            </button>
            <button
              onClick={() => setFilterLevel('warning')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterLevel === 'warning'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setFilterLevel('info')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterLevel === 'info'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Info
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Logs</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white">{filteredLogs.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {filteredLogs.filter((l) => l.level === 'error').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {filteredLogs.filter((l) => l.level === 'warning').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Info</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {filteredLogs.filter((l) => l.level === 'info').length}
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-[#4880FF] border-gray-300 rounded focus:ring-[#4880FF] dark:border-gray-600 dark:bg-gray-700"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Context
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <FileText className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p>No logs found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      selectedLogs.includes(log.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLogs.includes(log.id)}
                        onChange={() => handleSelectLog(log.id)}
                        className="w-4 h-4 text-[#4880FF] border-gray-300 rounded focus:ring-[#4880FF] dark:border-gray-600 dark:bg-gray-700"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}
                      >
                        {getLevelIcon(log.level)}
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {log.message}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {log.context || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        {log.source || '—'}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {formatTimestamp(log.timestamp)}
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

export default SystemLogs;
