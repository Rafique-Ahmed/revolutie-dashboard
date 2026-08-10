// src/components/analytics/SalesAnalyticsCard.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesAnalyticsCardProps {
  data?: {
    labels: string[];
    data: number[];
  };
}

export const SalesAnalyticsCard: React.FC<SalesAnalyticsCardProps> = ({ data }) => {
  const chartData = data?.labels.map((label, index) => ({
    name: label,
    value: data?.data[index] || 0,
  })) || [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 52 },
    { name: 'Apr', value: 38 },
    { name: 'May', value: 60 },
    { name: 'Jun', value: 55 },
    { name: 'Jul', value: 48 },
    { name: 'Aug', value: 70 },
    { name: 'Sep', value: 65 },
    { name: 'Oct', value: 80 },
    { name: 'Nov', value: 75 },
    { name: 'Dec', value: 90 },
  ];

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#202224] font-nunitoSans text-[22px] font-bold">Sales Analytics</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
          <span className="text-xs font-semibold text-[#2B3034]/40">2026</span>
          <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
        </div>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4880FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F9978A]" />
          <span className="text-[#282D32] font-bold">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E3B9FF]" />
          <span className="text-[#282D32] font-bold">Profit</span>
        </div>
      </div>
    </div>
  );
};
