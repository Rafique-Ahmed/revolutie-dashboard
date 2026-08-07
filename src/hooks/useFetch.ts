// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface UseFetchOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useFetch = <T>(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions = { immediate: true }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      options.onSuccess?.(result);
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, []);

  return { data, loading, error, refetch: execute };
};