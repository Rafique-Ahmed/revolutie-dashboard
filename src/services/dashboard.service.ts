// src/services/dashboard.service.ts
import api from '../api/client';

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

// Mock data with safe values
export const getMockKpis = (): KpiData[] => [
  {
    title: 'Total Users',
    value: '40,689',
    change: '8.5% Up',
    changeType: 'up',
    icon: 'Users',
  },
  {
    title: 'Total Orders',
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
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [4000, 3000, 5000, 7000, 6000, 8000, 7500, 9000, 8500, 10000, 9500, 11000],
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
  getDashboardData: async () => {
    try {
      const response = await api.get('/dashboard');
      // Ensure activities array exists
      if (response.data?.data?.activities) {
        return response.data;
      }
      // If activities is missing, use mock data
      return {
        success: true,
        data: {
          ...response.data?.data,
          activities: getMockActivities(),
        },
      };
    } catch (error) {
      console.warn('API error, using mock data:', error);
      return {
        success: true,
        data: getMockData(),
      };
    }
  },
};
