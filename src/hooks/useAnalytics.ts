// src/hooks/useAnalytics.ts
import { useState, useEffect } from 'react';
import {
  analyticsService,
  AnalyticsData,
  getMockAnalyticsData,
} from '../services/analytics.service';

export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData>(getMockAnalyticsData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const analyticsData = await analyticsService.getAnalyticsData();
        setData(analyticsData);
      } catch {
        setError('Failed to load analytics data');
        setData(getMockAnalyticsData());
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { data, loading, error };
};
