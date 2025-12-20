
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiClient } from '@/lib/api';
import type { ApiResponse } from '@/types';

interface UseApiOptions {
  cache?: boolean;
  cacheTTL?: number;
  immediate?: boolean;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
}

/**
 * Hook untuk fetch data dengan auto retry dan cache
 * 
 * @example
 * ```typescript
 * import type { BeritaListResponse } from '@/types';
 * 
 * const { data, loading, error, refetch } = useApi<BeritaListResponse>('/berita', {
 *   cache: true,
 *   cacheTTL: 3600000,
 *   immediate: true
 * });
 * ```
 */
export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { cache = true, cacheTTL, immediate = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiClient.get<T>(endpoint, { cache, cacheTTL });

      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [endpoint, cache, cacheTTL]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  const clearCache = useCallback(() => {
    ApiClient.clearCache();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    clearCache,
  };
}

/**
 * Return type untuk useMutation hook
 */
interface UseMutationResult<T, D> {
  mutate: (data?: D) => Promise<MutationResult<T>>;
  loading: boolean;
  error: string | null;
  data: T | null;
  reset: () => void;
}

/**
 * Result dari mutation operation
 */
interface MutationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Hook untuk mutation (POST, PUT, DELETE)
 * 
 * @example
 * ```typescript
 * import type { Berita, CreateBeritaPayload } from '@/types';
 * 
 * const { mutate, loading, error, data } = useMutation<Berita, CreateBeritaPayload>(
 *   '/berita',
 *   'POST'
 * );
 * 
 * const handleSubmit = async (formData: CreateBeritaPayload) => {
 *   const result = await mutate(formData);
 *   if (result.success) {
 *     console.log('Success:', result.data);
 *   }
 * };
 * ```
 */
export function useMutation<T, D = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): UseMutationResult<T, D> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (requestData?: D): Promise<MutationResult<T>> => {
      setLoading(true);
      setError(null);

      try {
        let response: ApiResponse<T>;
        
        switch (method) {
          case 'POST':
            response = await ApiClient.post<T>(endpoint, requestData);
            break;
          case 'PUT':
            response = await ApiClient.put<T>(endpoint, requestData);
            break;
          case 'DELETE':
            response = await ApiClient.delete<T>(endpoint);
            break;
        }

        if (response.success) {
          setData(response.data || null);
          return { success: true, data: response.data };
        } else {
          const errorMsg = response.message || 'Mutation failed';
          setError(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    mutate,
    loading,
    error,
    data,
    reset,
  };
}

/**
 * Hook untuk multiple API calls (parallel fetching)
 * 
 * @example
 * ```typescript
 * const results = useMultipleApi([
 *   { endpoint: '/berita', key: 'berita' },
 *   { endpoint: '/siswa', key: 'siswa' },
 * ]);
 * 
 * if (results.loading) return <Loading />;
 * const berita = results.data.berita;
 * const siswa = results.data.siswa;
 * ```
 */
