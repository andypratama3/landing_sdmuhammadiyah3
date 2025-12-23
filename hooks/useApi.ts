'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiClient } from '@/lib/api';
import type { ApiResponse } from '@/types';

interface UseApiOptions {
  cache?: boolean;
  cacheTTL?: number;
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
  isStale: boolean;
}

/**
 * Hook untuk fetch data dengan auto retry, cache, dan error handling
 */
export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { 
    cache = true, 
    cacheTTL, 
    immediate = true,
    retryCount = 2,
    retryDelay = 1000
  } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef<boolean>(true);

  const fetchData = useCallback(async () => {
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setIsStale(false);

    let lastError: string | null = null;

    // Retry logic
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const response = await ApiClient.get<T>(endpoint, { 
          cache, 
          cacheTTL,
          signal: abortControllerRef.current.signal 
        });

        // Only update state if component is still mounted
        if (!mountedRef.current) return;

        if (response.success && response.data) {
          setData(response.data);
          setError(null);
          setIsStale(false);
          setLoading(false);
          return;
        } else {
          lastError = response.message || 'Failed to fetch data';
          
          // If this is the last attempt, set error
          if (attempt === retryCount) {
            setError(lastError);
            // Try to use stale cache data
            setIsStale(true);
          }
        }
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        lastError = err instanceof Error ? err.message : 'Unknown error';
        
        // If this is the last attempt
        if (attempt === retryCount) {
          if (!mountedRef.current) return;
          
          setError(lastError);
          setIsStale(true); // Data might be from cache
          
          console.warn(`Failed to fetch ${endpoint} after ${retryCount + 1} attempts:`, lastError);
        } else {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        }
      }
    }

    if (mountedRef.current) {
      setLoading(false);
    }
  }, [endpoint, cache, cacheTTL, retryCount, retryDelay]);

  useEffect(() => {
    mountedRef.current = true;

    if (immediate) {
      fetchData();
    }

    // Cleanup
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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
    isStale,
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
 * Hook untuk mutation (POST, PUT, DELETE) dengan retry logic
 */
export function useMutation<T, D = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options: { retryCount?: number; retryDelay?: number } = {}
): UseMutationResult<T, D> {
  const { retryCount = 1, retryDelay = 1000 } = options;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(
    async (requestData?: D): Promise<MutationResult<T>> => {
      setLoading(true);
      setError(null);

      let lastError: string | null = null;

      for (let attempt = 0; attempt <= retryCount; attempt++) {
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

          if (!mountedRef.current) return { success: false, error: 'Component unmounted' };

          if (response.success) {
            setData(response.data || null);
            setError(null);
            setLoading(false);
            return { success: true, data: response.data };
          } else {
            lastError = response.message || 'Mutation failed';
            
            if (attempt === retryCount) {
              setError(lastError);
              setLoading(false);
              return { success: false, error: lastError };
            }
          }
        } catch (err) {
          lastError = err instanceof Error ? err.message : 'Unknown error';
          
          if (attempt === retryCount) {
            if (!mountedRef.current) return { success: false, error: lastError };
            
            setError(lastError);
            setLoading(false);
            return { success: false, error: lastError };
          } else {
            await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
          }
        }
      }

      setLoading(false);
      return { success: false, error: lastError || 'Unknown error' };
    },
    [endpoint, method, retryCount, retryDelay]
  );

  const reset = useCallback(() => {
    if (mountedRef.current) {
      setLoading(false);
      setError(null);
      setData(null);
    }
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
 */
interface MultiApiRequest {
  endpoint: string;
  key: string;
  options?: UseApiOptions;
}

interface MultiApiResult {
  data: Record<string, any>;
  loading: boolean;
  errors: Record<string, string>;
  refetchAll: () => Promise<void>;
}

export function useMultipleApi(requests: MultiApiRequest[]): MultiApiResult {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const mountedRef = useRef<boolean>(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const newData: Record<string, any> = {};
    const newErrors: Record<string, string> = {};

    await Promise.all(
      requests.map(async ({ endpoint, key, options = {} }) => {
        try {
          const response = await ApiClient.get(endpoint, options);
          
          if (response.success && response.data) {
            newData[key] = response.data;
          } else {
            newErrors[key] = response.message || 'Failed to fetch';
          }
        } catch (err) {
          newErrors[key] = err instanceof Error ? err.message : 'Unknown error';
        }
      })
    );

    if (mountedRef.current) {
      setData(newData);
      setErrors(newErrors);
      setLoading(false);
    }
  }, [requests]);

  useEffect(() => {
    mountedRef.current = true;
    fetchAll();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchAll]);

  return {
    data,
    loading,
    errors,
    refetchAll: fetchAll,
  };
}