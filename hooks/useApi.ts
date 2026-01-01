'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ApiClient } from '@/lib/api';
import type { ApiResponse, Pagination } from '@/types';

interface UseApiOptions {
  cache?: boolean;
  cacheTTL?: number;
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface UseApiResult<T> {
  data: T | null;
  meta: Pagination | null;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  } | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
  isStale: boolean;
  response: ApiResponse<T> | null;
}

async function ensureAuthenticated(): Promise<void> {
  const res = await fetch('/api/token', {
    method: 'POST',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Authentication failed');
  }
}


/**
 * Hook untuk fetch data dengan auto retry, cache, dan error handling
 * Menerima full response termasuk meta dan links
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
  const [meta, setMeta] = useState<Pagination | null>(null);
  const [links, setLinks] = useState<any>(null);
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef<boolean>(true);
  const authTriedRef = useRef<boolean>(false); // 🔐 prevent infinite loop

  const fetchData = useCallback(async () => {
    authTriedRef.current = false;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setIsStale(false);

    let lastError: string | null = null;

    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const apiResponse = await ApiClient.get<T>(endpoint, {
          cache,
          cacheTTL,
          signal: abortControllerRef.current.signal,
        });

        if (!mountedRef.current) return;

        if (apiResponse.success && apiResponse.data) {
          setData(apiResponse.data);
          setMeta(apiResponse.meta || null);
          setLinks(apiResponse.links || null);
          setResponse(apiResponse);
          setLoading(false);
          return;
        }

        // 🔐 AUTH HANDLING (TOKEN MISSING / EXPIRED)
        if (
          !authTriedRef.current &&
          (
            apiResponse.message === 'Token not provided' ||
            apiResponse.message === 'Unauthenticated' ||
            apiResponse.message === 'Unauthorized'
          )
        ) {
          authTriedRef.current = true;

          await ensureAuthenticated();
          continue; // 🔁 retry original request
        }

        lastError = apiResponse.message || 'Failed to fetch data';

        if (attempt === retryCount) {
          setError(lastError);
          setIsStale(true);
        }

      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        lastError = err instanceof Error ? err.message : 'Unknown error';

        if (attempt === retryCount) {
          if (!mountedRef.current) return;
          setError(lastError);
          setIsStale(true);
        } else {
          await new Promise(res =>
            setTimeout(res, retryDelay * (attempt + 1))
          );
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

    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, [fetchData, immediate]);

  const clearCache = useCallback(() => {
    ApiClient.clearCache();
  }, []);

  return {
    data,
    meta,
    links,
    response,
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
  response: ApiResponse<T> | null;
  reset: () => void;
}

/**
 * Result dari mutation operation
 */
interface MutationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  response?: ApiResponse<T>;
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
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  
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
          let apiResponse: ApiResponse<T>;
          
          switch (method) {
            case 'POST':
              apiResponse = await ApiClient.post<T>(endpoint, requestData);
              break;
            case 'PUT':
              apiResponse = await ApiClient.put<T>(endpoint, requestData);
              break;
            case 'DELETE':
              apiResponse = await ApiClient.delete<T>(endpoint);
              break;
          }

          if (!mountedRef.current) return { success: false, error: 'Component unmounted' };

          if (apiResponse.success) {
            setData(apiResponse.data || null);
            setResponse(apiResponse);
            setError(null);
            setLoading(false);
            return { 
              success: true, 
              data: apiResponse.data,
              response: apiResponse
            };
          } else {
            lastError = apiResponse.message || 'Mutation failed';
            
            if (attempt === retryCount) {
              setError(lastError);
              setResponse(apiResponse);
              setLoading(false);
              return { 
                success: false, 
                error: lastError,
                response: apiResponse
              };
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
      setResponse(null);
    }
  }, []);

  return {
    mutate,
    loading,
    error,
    data,
    response,
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
  meta: Record<string, Pagination>;
  links: Record<string, any>;
  responses: Record<string, ApiResponse<any>>;
  loading: boolean;
  errors: Record<string, string>;
  refetchAll: () => Promise<void>;
}

export function useMultipleApi(requests: MultiApiRequest[]): MultiApiResult {
  const [data, setData] = useState<Record<string, any>>({});
  const [meta, setMeta] = useState<Record<string, Pagination>>({});
  const [links, setLinks] = useState<Record<string, any>>({});
  const [responses, setResponses] = useState<Record<string, ApiResponse<any>>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const mountedRef = useRef<boolean>(true);

  const fetchAll = useCallback(async () => {
    // Validate requests is an array
    if (!Array.isArray(requests)) {
      console.error('useMultipleApi: requests must be an array');
      setLoading(false);
      return;
    }

    setLoading(true);
    const newData: Record<string, any> = {};
    const newMeta: Record<string, Pagination> = {};
    const newLinks: Record<string, any> = {};
    const newResponses: Record<string, ApiResponse<any>> = {};
    const newErrors: Record<string, string> = {};

    await Promise.all(
      requests.map(async ({ endpoint, key, options = {} }) => {
        try {
          const response = await ApiClient.get(endpoint, options);
          
          if (response.success && response.data) {
            newData[key] = response.data;
            if (response.meta) newMeta[key] = response.meta;
            if (response.links) newLinks[key] = response.links;
            newResponses[key] = response;
          } else {
            newErrors[key] = response.message || 'Failed to fetch';
            newResponses[key] = response;
          }
        } catch (err) {
          newErrors[key] = err instanceof Error ? err.message : 'Unknown error';
        }
      })
    );

    if (mountedRef.current) {
      setData(newData);
      setMeta(newMeta);
      setLinks(newLinks);
      setResponses(newResponses);
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
    meta,
    links,
    responses,
    loading,
    errors,
    refetchAll: fetchAll,
  };
}