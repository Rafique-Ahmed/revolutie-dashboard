// src/pages/dashboard/Analytics.tsx
import React from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { BarChart, LineChart, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#202224] mb-2 tracking-[-0.0036em]">
          Analytics
        </h1>
        <p className="text-gray-500">View detailed analytics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: <DollarSign className="w-6 h-6" /> },
          { label: 'Total Users', value: '45,689', change: '+8.2%', icon: <Users className="w-6 h-6" /> },
          { label: 'Conversion Rate', value: '24.8%', change: '+2.1%', icon: <TrendingUp className="w-6 h-6" /> },
          { label: 'Active Sessions', value: '1,203', change: '-4.3%', icon: <Activity className="w-6 h-6" /> },
        ].map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                {kpi.icon}
              </div>
            </div>
            <p className={`text-sm mt-4 ${kpi.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {kpi.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <LineChart className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-400">Chart placeholder</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-400">Chart placeholder</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
