// src/components/analytics/FeaturedProductCard.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedProductCardProps {
  name?: string;
  price?: string;
  image?: string;
}

export const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  name = 'Beats Headphone 2026',
  price = '$89.00',
}) => {
  return (
    <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6">
      <h3 className="text-[#202224] font-nunitoSans text-[22px] font-bold mb-6">
        Featured Product
      </h3>

      <div className="flex justify-center mb-6">
        <div className="w-[147px] h-[186px] bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-6xl">🎧</span>
        </div>
      </div>

      <p className="text-[#282D32] font-nunitoSans text-lg font-bold text-center">{name}</p>
      <p className="text-[#4880FF] font-nunitoSans text-base font-bold opacity-70 text-center">
        {price}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button className="w-[41px] h-[41px] rounded-full bg-[#E2EAF8]/40 flex items-center justify-center hover:bg-[#E2EAF8] transition-colors">
          <ChevronLeft className="w-5 h-5 text-[#626262]" />
        </button>
        <button className="w-[41px] h-[41px] rounded-full bg-[#E2EAF8]/40 flex items-center justify-center hover:bg-[#E2EAF8] transition-colors">
          <ChevronRight className="w-5 h-5 text-[#626262]" />
        </button>
      </div>
    </div>
  );
};
