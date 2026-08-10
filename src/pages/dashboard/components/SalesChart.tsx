// src/pages/dashboard/components/SalesChart.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SalesChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#202224] font-nunitoSans text-2xl font-bold">Sales Details</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
          <span className="text-xs font-semibold text-[#2B3034]/40">October</span>
          <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[278px]">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[0, 20, 40, 60, 80, 100].map((percent) => (
            <div
              key={percent}
              className="absolute left-0 right-0 border-t border-[#EAEAEA]"
              style={{ bottom: `${percent}%` }}
            >
              <span className="absolute -left-10 text-xs font-semibold text-[#2B3034]/40">
                {percent}%
              </span>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs font-semibold text-[#2B3034]/40">
          <span>5k</span>
          <span>10k</span>
          <span>15k</span>
          <span>20k</span>
          <span>25k</span>
          <span>30k</span>
          <span>35k</span>
          <span>40k</span>
          <span>45k</span>
          <span>50k</span>
          <span>55k</span>
          <span>60k</span>
        </div>

        {/* Chart area - Placeholder for actual chart */}
        <div className="absolute bottom-0 left-0 right-0 h-[237px]">
          <div className="w-full h-full flex items-end justify-between px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-4 bg-[#4880FF] rounded-t"
                style={{
                  height: `${20 + Math.random() * 70}%`,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Data points */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#4880FF] rounded-full"
              style={{
                left: `${5 + i * 5}%`,
                bottom: `${20 + Math.random() * 70}%`,
                transform: 'translate(-50%, 50%)',
              }}
            />
          ))}
        </div>

        {/* Tooltip */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded px-3 py-1">
          <span className="text-xs font-bold text-[#4880FF]">64,3664.77</span>
        </div>
      </div>
    </div>
  );
};
