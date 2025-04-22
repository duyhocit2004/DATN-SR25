import { useState, useEffect, useCallback } from 'react';
import api, { getCachedData } from '@/services/api';

interface CacheItem {
  data: any;
  timestamp: number;
}

export const useApi = <T>(url: string, options: RequestInit = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check cache first
      const cachedData = getCachedData(url, options);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      const response = await api({
        url,
        method: options.method || 'GET',
        data: options.body ? JSON.parse(options.body as string) : undefined,
        params: options.params,
      });

      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}; 