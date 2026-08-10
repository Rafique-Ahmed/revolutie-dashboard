// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { Users, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import { DashboardLayout } from './components/DashboardLayout';
import { KpiCard } from './components/KpiCard';
import { SalesChart } from './components/SalesChart';
import { RecentActivity } from './components/RecentActivity';

export const Dashboard: React.FC = () => {
  const kpiData = [
    {
      title: 'Total User',
      value: '40,689',
      change: '8.5% Up',
      changeType: 'up' as const,
      icon: <Users className="w-8 h-8 text-[#4AD991]" />,
      iconBg: 'bg-[#4AD991]/20',
    },
    {
      title: 'Total Order',
      value: '10293',
      change: '1.3% Up',
      changeType: 'up' as const,
      icon: <ShoppingBag className="w-8 h-8 text-[#FEC53D]" />,
      iconBg: 'bg-[#FEC53D]/20',
    },
    {
      title: 'Total Sales',
      value: '$89,000',
      change: '4.3% Down',
      changeType: 'down' as const,
      icon: <DollarSign className="w-8 h-8 text-[#F93C65]" />,
      iconBg: 'bg-[#F93C65]/20',
    },
    {
      title: 'Total Pending',
      value: '2040',
      change: '1.8% Up',
      changeType: 'up' as const,
      icon: <Clock className="w-8 h-8 text-[#FF9066]" />,
      iconBg: 'bg-[#FF9066]/20',
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-[32px] font-bold text-[#202224] mb-6 tracking-[-0.0036em]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      <div className="mb-6">
        <SalesChart />
      </div>

      <RecentActivity />
    </DashboardLayout>
  );
};

export default Dashboard;
