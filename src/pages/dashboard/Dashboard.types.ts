// src/pages/dashboard/Dashboard.types.ts
import React from 'react';

export interface KpiData {
  title: string;
  value: string | number;
  change: string;
  changeType: 'up' | 'down';
  icon: React.ReactNode;
}

export interface ActivityItem {
  id: number;
  product: string;
  location: string;
  date: string;
  time: string;
  piece: number;
  amount: number;
  status: 'delivered' | 'pending' | 'rejected';
  avatar: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalSales: number;
  totalPending: number;
}
