// src/services/analytics.service.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface RevenueData {
  labels: string[];
  sales: number[];
  profit: number[];
}

export interface CustomerData {
  newCustomers: number;
  repeatedCustomers: number;
}

export interface FeaturedProduct {
  name: string;
  price: string;
  image?: string;
}

export interface AnalyticsData {
  revenue: RevenueData;
  customers: CustomerData;
  featuredProduct: FeaturedProduct;
  salesAnalytics: {
    data: number[];
    labels: string[];
  };
}

export const analyticsService = {
  getAnalyticsData: async (): Promise<AnalyticsData> => {
    try {
      const response = await axios.get(`${API_URL}/analytics`);
      return response.data;
    } catch {
      console.warn('API not available, using mock data');
      return getMockAnalyticsData();
    }
  },
};

export const getMockAnalyticsData = (): AnalyticsData => ({
  revenue: {
    labels: [
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
    ],
    sales: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000],
    profit: [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000],
  },
  customers: {
    newCustomers: 34249,
    repeatedCustomers: 1420,
  },
  featuredProduct: {
    name: 'Beats Headphone 2026',
    price: '$89.00',
  },
  salesAnalytics: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [30, 45, 52, 38, 60, 55, 48, 70, 65, 80, 75, 90],
  },
});
