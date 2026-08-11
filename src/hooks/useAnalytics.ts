// src/hooks/useAnalytics.ts
import { useState, useEffect } from 'react';
import {
  analyticsService,
  AnalyticsData,
  getMockAnalyticsData,
} from '../services/analytics.service';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData>(getMockAnalyticsData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await analyticsService.getAnalyticsData();
        if (response.success) {
          setData(response.data);
        } else {
          setError('Failed to load analytics data');
        }
      } catch (err) {
        const error = err as ApiError;
        console.error('Analytics fetch error:', error);
        setError(error.response?.data?.message || 'Failed to load analytics data');
        setData(getMockAnalyticsData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { data, loading, error };
};
