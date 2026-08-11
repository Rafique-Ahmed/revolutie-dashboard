// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { dashboardService, DashboardData, getMockData } from '../services/dashboard.service';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData>(getMockData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dashboardService.getDashboardData();
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to load dashboard data');
        }
      } catch (err) {
        const error = err as ApiError;
        console.error('Dashboard fetch error:', error);
        setError(error.response?.data?.message || 'Failed to load dashboard data');
        // Use mock data as fallback
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};
