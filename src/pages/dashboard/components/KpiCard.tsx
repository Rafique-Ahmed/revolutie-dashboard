// src/pages/dashboard/components/KpiCard.tsx
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}

const KpiCard: React.FC<KpiCardProps> = memo(
  ({ title, value, change, icon, color = 'bg-[#4880FF]' }) => {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10 dark:bg-opacity-20`}>
            <div className={`${color} text-opacity-100`}>{icon}</div>
          </div>
          {change !== undefined && change !== 0 && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isPositive
                  ? 'text-green-600 dark:text-green-400'
                  : isNegative
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {isPositive && <ArrowUp className="w-4 h-4" />}
              {isNegative && <ArrowDown className="w-4 h-4" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-[#202224] dark:text-white mt-1">{value}</p>
        </div>
      </motion.div>
    );
  }
);

KpiCard.displayName = 'KpiCard';

export default KpiCard;
