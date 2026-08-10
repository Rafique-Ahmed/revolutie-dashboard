// src/components/analytics/RevenueChart.tsx
import React from 'react';
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

interface RevenueChartProps {
  data?: {
    labels: string[];
    sales: number[];
    profit: number[];
  };
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const chartData = data?.labels.map((label, index) => ({
    name: label,
    sales: data?.sales[index] || 0,
    profit: data?.profit[index] || 0,
  })) || [
    { name: '2015', sales: 5000, profit: 2000 },
    { name: '2016', sales: 10000, profit: 4000 },
    { name: '2017', sales: 15000, profit: 6000 },
    { name: '2018', sales: 20000, profit: 8000 },
    { name: '2019', sales: 25000, profit: 10000 },
    { name: '2020', sales: 30000, profit: 12000 },
    { name: '2021', sales: 35000, profit: 14000 },
    { name: '2022', sales: 40000, profit: 16000 },
    { name: '2023', sales: 45000, profit: 18000 },
    { name: '2024', sales: 50000, profit: 20000 },
    { name: '2025', sales: 55000, profit: 22000 },
    { name: '2026', sales: 60000, profit: 24000 },
  ];

  return (
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
            dataKey="sales"
            stroke="#F9978A"
            strokeWidth={2}
            dot={{ fill: '#F9978A', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#E3B9FF"
            strokeWidth={2}
            dot={{ fill: '#E3B9FF', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
