// src/pages/dashboard/Analytics.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { RevenueChart } from '../../components/analytics/RevenueChart';
import { CustomersCard } from '../../components/analytics/CustomersCard';
import { FeaturedProductCard } from '../../components/analytics/FeaturedProductCard';
import { SalesAnalyticsCard } from '../../components/analytics/SalesAnalyticsCard';

const Analytics: React.FC = () => {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="font-semibold">Error loading analytics</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-[32px] font-bold text-[#202224] mb-6 tracking-[-0.0036em]">Dashboard</h1>

      {/* Revenue Chart */}
      <div className="bg-white rounded-[14px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#202224] font-nunitoSans text-2xl font-bold">Revenue</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#D5D5D5] rounded">
            <span className="text-xs font-semibold text-[#2B3034]/40">October</span>
            <ChevronDown className="w-4 h-4 text-[#2B3034]/40" />
          </div>
        </div>
        <RevenueChart data={data.revenue} />
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

      {/* 3 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CustomersCard
          newCustomers={data.customers.newCustomers}
          repeatedCustomers={data.customers.repeatedCustomers}
        />

        <FeaturedProductCard name={data.featuredProduct.name} price={data.featuredProduct.price} />

        <SalesAnalyticsCard data={data.salesAnalytics} />
      </div>
    </div>
  );
};

export default Analytics;
