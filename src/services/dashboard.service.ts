// src/services/dashboard.service.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface KpiData {
  title: string;
  value: string | number;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
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

export interface ChartData {
  labels: string[];
  values: number[];
}

export interface DashboardData {
  kpis: KpiData[];
  chartData: ChartData;
  activities: ActivityItem[];
}

// Mock data
export const getMockKpis = (): KpiData[] => [
  {
    title: 'Total User',
    value: '40,689',
    change: '8.5% Up',
    changeType: 'up',
    icon: 'Users',
  },
  {
    title: 'Total Order',
    value: '10,293',
    change: '1.3% Up',
    changeType: 'up',
    icon: 'ShoppingBag',
  },
  {
    title: 'Total Sales',
    value: '$89,000',
    change: '4.3% Down',
    changeType: 'down',
    icon: 'DollarSign',
  },
  {
    title: 'Total Pending',
    value: '2,040',
    change: '1.8% Up',
    changeType: 'up',
    icon: 'Clock',
  },
];

export const getMockChartData = (): ChartData => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [4000, 3000, 5000, 7000, 6000, 8000],
});

export const getMockActivities = (): ActivityItem[] => [
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

export const getMockData = (): DashboardData => ({
  kpis: getMockKpis(),
  chartData: getMockChartData(),
  activities: getMockActivities(),
});

export const dashboardService = {
  // Get dashboard data from API
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard`);
      return response.data;
    } catch {
      console.warn('API not available, using mock data');
      return getMockData();
    }
  },

  // Get only KPI data
  getKpis: async (): Promise<KpiData[]> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`);
      return response.data;
    } catch {
      return getMockKpis();
    }
  },

  // Get chart data
  getChartData: async (): Promise<ChartData> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/charts`);
      return response.data;
    } catch {
      return getMockChartData();
    }
  },

  // Get recent activity
  getRecentActivity: async (): Promise<ActivityItem[]> => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/activity`);
      return response.data;
    } catch {
      return getMockActivities();
    }
  },
};
