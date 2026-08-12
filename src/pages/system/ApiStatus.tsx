// src/pages/system/ApiStatus.tsx
import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Clock, RefreshCw, Loader2, Server } from 'lucide-react';
import toast from 'react-hot-toast';

interface ApiEndpoint {
  id: number;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: 'up' | 'down' | 'degraded';
  responseTime: number;
  lastChecked: string;
  uptime: number;
}

const ApiStatus: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallStatus, setOverallStatus] = useState<'up' | 'down' | 'degraded'>('up');

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      // TODO: Fetch API status from backend
      await new Promise((resolve) => setTimeout(resolve, 800));
      setEndpoints([
        {
          id: 1,
          name: 'Authentication API',
          url: '/api/v1/auth',
          method: 'POST',
          status: 'up',
          responseTime: 45,
          lastChecked: new Date().toISOString(),
          uptime: 99.98,
        },
        {
          id: 2,
          name: 'Users API',
          url: '/api/v1/users',
          method: 'GET',
          status: 'up',
          responseTime: 78,
          lastChecked: new Date().toISOString(),
          uptime: 99.95,
        },
        {
          id: 3,
          name: 'Dashboard API',
          url: '/api/v1/dashboard',
          method: 'GET',
          status: 'degraded',
          responseTime: 250,
          lastChecked: new Date().toISOString(),
          uptime: 98.5,
        },
        {
          id: 4,
          name: 'Notifications API',
          url: '/api/v1/notifications',
          method: 'GET',
          status: 'up',
          responseTime: 62,
          lastChecked: new Date().toISOString(),
          uptime: 99.9,
        },
        {
          id: 5,
          name: 'Analytics API',
          url: '/api/v1/analytics',
          method: 'GET',
          status: 'down',
          responseTime: 0,
          lastChecked: new Date().toISOString(),
          uptime: 85.2,
        },
        {
          id: 6,
          name: 'Settings API',
          url: '/api/v1/settings',
          method: 'PUT',
          status: 'up',
          responseTime: 52,
          lastChecked: new Date().toISOString(),
          uptime: 99.87,
        },
      ]);

      const hasDown = endpoints.some((e) => e.status === 'down');
      const hasDegraded = endpoints.some((e) => e.status === 'degraded');
      if (hasDown) {
        setOverallStatus('down');
      } else if (hasDegraded) {
        setOverallStatus('degraded');
      } else {
        setOverallStatus('up');
      }
    } catch {
      toast.error('Failed to fetch API status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'degraded':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'up':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'down':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      POST: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[method] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#4880FF] animate-spin" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Checking API status...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-[#202224] dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#4880FF]" />
          API Status
        </h2>
        <button
          onClick={fetchStatus}
          className="flex items-center px-4 py-2 text-sm bg-[#4880FF] text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Overall Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-4 h-4 rounded-full ${
                overallStatus === 'up'
                  ? 'bg-green-500 animate-pulse'
                  : overallStatus === 'degraded'
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-red-500 animate-pulse'
              }`}
            />
            <div>
              <p className="text-lg font-semibold text-[#202224] dark:text-white">
                Overall System Status
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {overallStatus === 'up'
                  ? 'All systems operational'
                  : overallStatus === 'degraded'
                    ? 'Some services are degraded'
                    : 'Critical services are down'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#202224] dark:text-white">
              {endpoints.filter((e) => e.status === 'up').length}/{endpoints.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Services online</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-700 dark:text-green-400">Operational</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">
            {endpoints.filter((e) => e.status === 'up').length}
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-700 dark:text-yellow-400">Degraded</p>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
            {endpoints.filter((e) => e.status === 'degraded').length}
          </p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl shadow-sm p-4">
          <p className="text-sm text-red-700 dark:text-red-400">Down</p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-400">
            {endpoints.filter((e) => e.status === 'down').length}
          </p>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Checked
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {endpoints.map((endpoint) => (
                <tr
                  key={endpoint.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {endpoint.name}
                      </span>
                    </div>
                    <code className="text-xs text-gray-500 dark:text-gray-400">{endpoint.url}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getMethodBadge(endpoint.method)}`}
                    >
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(endpoint.status)}`}
                    >
                      {getStatusIcon(endpoint.status)}
                      {endpoint.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {endpoint.responseTime > 0 ? `${endpoint.responseTime}ms` : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {endpoint.uptime}%
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(endpoint.lastChecked).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiStatus;
