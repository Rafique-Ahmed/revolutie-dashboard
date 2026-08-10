// src/pages/dashboard/components/KpiCard.tsx
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
  iconBg?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg = 'bg-[#8280FF]/20',
}) => {
  const isUp = changeType === 'up';

  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#202224] text-base font-semibold opacity-70">{title}</p>
          <p className="text-[#202224] text-[28px] font-bold tracking-[0.0357em]">{value}</p>
        </div>
        <div
          className={`w-[60px] h-[60px] rounded-[23px] ${iconBg} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className={`text-sm font-semibold ${isUp ? 'text-[#00B69B]' : 'text-[#F93C65]'}`}>
          {change}
        </span>
        <span className="text-[#606060] text-base font-semibold">from yesterday</span>
      </div>
    </div>
  );
};
