// src/components/analytics/CustomersCard.tsx
import React from 'react';

interface CustomersCardProps {
  newCustomers?: number;
  repeatedCustomers?: number;
}

export const CustomersCard: React.FC<CustomersCardProps> = ({
  newCustomers = 34249,
  repeatedCustomers = 1420,
}) => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <h3 className="text-[#202224] font-nunitoSans text-[22px] font-bold mb-4">Customers</h3>

      <div className="relative w-[146px] h-[146px] mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 161 161">
          <circle cx="80.5" cy="80.5" r="73" stroke="#C0D2F0" strokeWidth="15" fill="none" />
          <circle
            cx="80.5"
            cy="80.5"
            r="73"
            stroke="#4880FF"
            strokeWidth="15"
            fill="none"
            strokeDasharray="350 10000"
            strokeLinecap="round"
            transform="rotate(-90 80.5 80.5)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#202224]">96%</span>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-[#202224] text-[28px] font-bold">{newCustomers.toLocaleString()}</p>
          <p className="text-[#282D32] text-base font-semibold opacity-80">New Customers</p>
        </div>
        <div className="text-right">
          <p className="text-[#202224] text-[28px] font-bold">
            {repeatedCustomers.toLocaleString()}
          </p>
          <p className="text-[#282D32] text-base font-semibold opacity-80">Repeated</p>
        </div>
      </div>
    </div>
  );
};
