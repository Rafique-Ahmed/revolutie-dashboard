// src/components/dashboard/SalesChart.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SalesChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  // Convert data to chart format
  const chartData = data?.labels?.map((label, index) => ({
    name: label,
    value: data?.values?.[index] || 0,
  })) || [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 8000 },
  ];

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#202224] font-nunitoSans text-2xl font-bold">Sales Details</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
          <span className="text-xs font-semibold text-[#2B3034]/40">October</span>
          <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4880FF"
              strokeWidth={2}
              dot={{ fill: '#4880FF', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
