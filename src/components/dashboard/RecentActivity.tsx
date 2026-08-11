// src/components/dashboard/RecentActivity.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

type StatusType = 'delivered' | 'pending' | 'rejected';

interface ActivityItem {
  id: number;
  product: string;
  location: string;
  date: string;
  time: string;
  piece: number;
  amount: number;
  status: StatusType;
  avatar: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

const statusColors: Record<StatusType, string> = {
  delivered: 'bg-[#00B69B]',
  pending: 'bg-[#FCBE2D]',
  rejected: 'bg-[#FD5454]',
};

const statusLabels: Record<StatusType, string> = {
  delivered: 'Delivered',
  pending: 'Pending',
  rejected: 'Rejected',
};

// Fallback mock data
const mockActivities: ActivityItem[] = [
  {
    id: 1,
    product: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2026',
    time: '12.53 PM',
    piece: 423,
    amount: 34295,
    status: 'delivered',
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
    status: 'pending',
    avatar: '/Bitmap(1).png',
  },
  {
    id: 3,
    product: 'Apple Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2026',
    time: '12.53 PM',
    piece: 423,
    amount: 34295,
    status: 'rejected',
    avatar: '/Bitmap(2).png',
  },
];

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  // Use provided activities or fallback to mock data
  const activityData = activities && activities.length > 0 ? activities : mockActivities;

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#202224] font-nunitoSans text-2xl font-bold">Recent Activities</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
          <span className="text-xs font-semibold text-[#2B3034]/40">October</span>
          <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F1F4F9] rounded-xl">
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold rounded-l-xl">
                Product Name
              </th>
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold">Location</th>
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold">Date - Time</th>
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold">Piece</th>
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold">Amount</th>
              <th className="text-left py-3 px-4 text-[#202224] text-sm font-bold rounded-r-xl">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((activity) => (
              <tr key={activity.id} className="border-b border-gray-100">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activity.avatar || '/placeholder.png'}
                      alt={activity.product || 'Product'}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-[#202224] opacity-80">
                      {activity.product || 'Unknown Product'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-[#202224] opacity-80">
                  {activity.location || 'Unknown Location'}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-[#202224] opacity-80">
                  {activity.date || 'N/A'} - {activity.time || 'N/A'}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-[#202224] opacity-80">
                  {activity.piece || 0}
                </td>
                <td className="py-3 px-4 text-sm font-semibold text-[#202224] opacity-80">
                  ${(activity.amount || 0).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-4 py-1 rounded-full text-white text-sm font-bold ${
                      statusColors[activity.status] || 'bg-gray-500'
                    }`}
                  >
                    {statusLabels[activity.status] || activity.status || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
