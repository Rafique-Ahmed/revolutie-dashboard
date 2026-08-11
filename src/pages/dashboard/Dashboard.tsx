// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { SalesChart } from '../../components/dashboard/SalesChart';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { useDashboard } from '../../hooks/useDashboard';

const Dashboard: React.FC = () => {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="font-semibold">Error loading dashboard</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Map API data to KPI cards
  const kpis = data?.kpis || [];

  return (
    <div>
      <h1 className="text-[32px] font-bold text-[#202224] mb-6 tracking-[-0.0036em]">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Sales Chart */}
      <div className="mb-6">
        <SalesChart data={data?.chartData} />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={data?.activities} />
    </div>
  );
};

export default Dashboard;
