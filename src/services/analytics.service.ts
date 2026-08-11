// src/services/analytics.service.ts
import api from '../api/client';

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

export interface SalesAnalytics {
  labels: string[];
  data: number[];
}

export interface AnalyticsData {
  revenue: RevenueData;
  customers: CustomerData;
  featuredProduct: FeaturedProduct;
  salesAnalytics: SalesAnalytics;
}

// Mock data
export const getMockRevenueData = (): RevenueData => ({
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
});

export const getMockCustomerData = (): CustomerData => ({
  newCustomers: 34249,
  repeatedCustomers: 1420,
});

export const getMockFeaturedProduct = (): FeaturedProduct => ({
  name: 'Beats Headphone 2026',
  price: '$89.00',
});

export const getMockSalesAnalytics = (): SalesAnalytics => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data: [30, 45, 52, 38, 60, 55, 48, 70, 65, 80, 75, 90],
});

export const getMockAnalyticsData = (): AnalyticsData => ({
  revenue: getMockRevenueData(),
  customers: getMockCustomerData(),
  featuredProduct: getMockFeaturedProduct(),
  salesAnalytics: getMockSalesAnalytics(),
});

export const analyticsService = {
  // Get all analytics data
  getAnalyticsData: async (): Promise<{ success: boolean; data: AnalyticsData }> => {
    try {
      const response = await api.get('/analytics');
      if (response.data?.success && response.data?.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      return {
        success: true,
        data: getMockAnalyticsData(),
      };
    } catch (error) {
      console.warn('API error, using mock data:', error);
      return {
        success: true,
        data: getMockAnalyticsData(),
      };
    }
  },
};
