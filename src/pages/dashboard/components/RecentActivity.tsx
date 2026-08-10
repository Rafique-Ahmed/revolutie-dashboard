// src/pages/dashboard/components/RecentActivity.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

const mockActivities = [
  {
    id: 1,
    product: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2026',
    time: '12.53 PM',
    piece: 423,
    amount: 34295,
    status: 'delivered' as const,
    avatar: '/Bitmap.png',
  },
  {
    id: 2,
    product: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2026',
    time: '12.53 PM',
    piece: 423,
    amount: 34295,
    status: 'pending' as const,
    avatar: '/Bitmap.png',
  },
  {
    id: 3,
    product: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2026',
    time: '12.53 PM',
    piece: 423,
    amount: 34295,
    status: 'rejected' as const,
    avatar: '/Bitmap.png',
  },
];

const statusColors = {
  delivered: 'bg-[#00B69B]',
  pending: 'bg-[#FCBE2D]',
  rejected: 'bg-[#FD5454]',
};

const statusLabels = {
  delivered: 'Delivered',
  pending: 'Pending',
  rejected: 'Rejected',
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#202224] font-nunitoSans text-2xl font-bold">Recent Activities</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
          <span className="text-xs font-semibold text-[#2B3034]/40">October</span>
          <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-[#F1F4F9] rounded-xl px-6 py-3 grid grid-cols-7 gap-4 mb-2">
        <span className="text-[#202224] text-sm font-bold">Product Name</span>
        <span className="text-[#202224] text-sm font-bold">Location</span>
        <span className="text-[#202224] text-sm font-bold">Date - Time</span>
        <span className="text-[#202224] text-sm font-bold">Piece</span>
        <span className="text-[#202224] text-sm font-bold">Amount</span>
        <span className="text-[#202224] text-sm font-bold col-span-2">Status</span>
      </div>

      {/* Table Rows */}
      {mockActivities.map((activity) => (
        <div
          key={activity.id}
          className="grid grid-cols-7 gap-4 items-center py-4 border-b border-gray-100"
        >
          <div className="flex items-center gap-3">
            <img
              src={activity.avatar}
              alt={activity.product}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-[#202224] opacity-80">
              {activity.product}
            </span>
          </div>
          <span className="text-sm font-semibold text-[#202224] opacity-80">
            {activity.location}
          </span>
          <span className="text-sm font-semibold text-[#202224] opacity-80">
            {activity.date} - {activity.time}
          </span>
          <span className="text-sm font-semibold text-[#202224] opacity-80">{activity.piece}</span>
          <span className="text-sm font-semibold text-[#202224] opacity-80">
            ${activity.amount.toLocaleString()}
          </span>
          <div className="col-span-2">
            <span
              className={`px-4 py-1 rounded-full text-white text-sm font-bold ${
                statusColors[activity.status]
              }`}
            >
              {statusLabels[activity.status]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
