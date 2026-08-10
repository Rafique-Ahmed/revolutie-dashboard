// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { dashboardService, DashboardData, getMockData } from '../services/dashboard.service';

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData>(getMockData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const dashboardData = await dashboardService.getDashboardData();
        setData(dashboardData);
      } catch {
        setError('Failed to load dashboard data');
        setData(getMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};
