// src/components/dashboard/KpiCard.tsx
import React from 'react';
import { Users, ShoppingBag, DollarSign, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  iconBg?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-8 h-8" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
};

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg = 'bg-blue-50',
}) => {
  const isUp = changeType === 'up';

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#202224] text-base font-semibold opacity-70">{title}</p>
          <p className="text-[#202224] text-[28px] font-bold tracking-[0.0357em]">{value}</p>
        </div>
        <div
          className={`w-[60px] h-[60px] rounded-[23px] ${iconBg} flex items-center justify-center`}
        >
          {iconMap[icon]}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {isUp ? (
          <TrendingUp className="w-4 h-4 text-[#00B69B]" />
        ) : (
          <TrendingDown className="w-4 h-4 text-[#F93C65]" />
        )}
        <span className={`text-sm font-semibold ${isUp ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
          {change}
        </span>
        <span className="text-[#606060] text-base font-semibold">from yesterday</span>
      </div>
    </div>
  );
};
