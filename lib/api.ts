import { JWTManager } from './jwt';
import { CacheManager } from './cache';
import type { ApiResponse, RequestOptions } from '@/types';

export class ApiClient {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL;

  private static isRefreshing = false;
  private static refreshSubscribers: Array<(token: string) => void> = [];
  private static maxRetries = 2;
  private static retryDelay = 1000;

  /**
   * Initialize token - panggil saat app pertama kali load
   */
  static async initialize(): Promise<void> {
    try {
      const token = JWTManager.getAccessToken();
      
      if (!token || JWTManager.isRefreshTokenExpired()) {
        await this.generateNewToken();
      } else if (JWTManager.isAccessTokenExpired()) {
        await this.refreshToken();
      }

      this.setupAutoRefresh();
    } catch (error) {
      console.error('Failed to initialize API client:', error);
    }
  }
  
  /**
   * Generate token baru dari backend
   */
  private static async generateNewToken(): Promise<void> {
    const response = await fetch('/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Token generation failed: ${response.status}`);
    }

    const result: ApiResponse<any> = await response.json();

    if (result.success && result.data) {
      JWTManager.saveTokens(result.data);
    }
  }


  /**
   * Refresh access token
   */
  private static async refreshToken(): Promise<string | null> {
    const refreshToken = JWTManager.getRefreshToken();
    
    if (!refreshToken || JWTManager.isRefreshTokenExpired()) {
      await this.generateNewToken();
      return JWTManager.getAccessToken();
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status}`);
      }

      const result: ApiResponse<any> = await response.json();
      
      if (result.success && result.data) {
        const currentRefresh = JWTManager.getRefreshToken();
        JWTManager.saveTokens({
          ...result.data,
          refresh_token: currentRefresh!,
        });
        
        return result.data.access_token;
      }
      
      await this.generateNewToken();
      return JWTManager.getAccessToken();
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await this.generateNewToken();
      return JWTManager.getAccessToken();
    }
  }

  /**
   * Setup auto refresh token setiap 6 hari
   */
  private static setupAutoRefresh(): void {
    const checkInterval = 60 * 60 * 1000; // 1 jam
    
    setInterval(async () => {
      if (JWTManager.needsTokenRefresh()) {
        const refreshToken = JWTManager.getRefreshToken();
        if (refreshToken) {
          try {
            await this.generateNewToken();
          } catch (error) {
            console.error('Auto refresh failed:', error);
          }
        }
      }
    }, checkInterval);
  }

  /**
   * Request dengan auto retry, cache, dan proper error handling
   */
  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { 
      cache = true, 
      cacheTTL, 
      useCache = true,
      signal,
      ...fetchOptions 
    } = options;
    
    const cacheKey = `${endpoint}_${JSON.stringify(fetchOptions)}`;

    // Cek cache jika GET request dan cache enabled
    if (useCache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
      const cached = CacheManager.get<ApiResponse<T>>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Pastikan token valid
    try {
      if (JWTManager.isAccessTokenExpired()) {
        await this.refreshToken();
      }
    } catch (error) {
      console.warn('Token refresh failed, continuing with current token:', error);
    }

    const token = JWTManager.getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    };

    // Retry logic
    let lastError: any = null;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        // Combine user signal with timeout signal
        const combinedSignal = signal || controller.signal;

        const response = await fetch(`${this.baseURL}${endpoint}`, {
          ...fetchOptions,
          headers,
          signal: combinedSignal,
        });

        clearTimeout(timeoutId);

        // Handle 401 - token expired
        if (response.status === 401 && attempt === 0) {
          try {
            const newToken = await this.refreshToken();
            if (newToken) {
              const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
                ...fetchOptions,
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newToken}`,
                },
                signal: combinedSignal,
              });
              
              const result: ApiResponse<T> = await retryResponse.json();
              
              if (result.success && cache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
                CacheManager.set(cacheKey, result, cacheTTL);
              }
              
              return result;
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
          }
        }

        // Parse response
        const contentType = response.headers.get('content-type');
        let result: ApiResponse<T>;

        if (contentType?.includes('application/json')) {
          result = await response.json();
        } else {
          // Handle non-JSON responses
          const text = await response.text();
          result = {
            success: response.ok,
            message: response.ok ? 'Success' : text || response.statusText,
            data: (response.ok ? text : null) as any,
          };
        }

        // Cache successful GET requests
        if (result.success && cache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
          CacheManager.set(cacheKey, result, cacheTTL);
        }

        return result;

      } catch (error: any) {
        lastError = error;

        // Don't retry on abort
        if (error.name === 'AbortError') {
          return {
            success: false,
            message: 'Request was cancelled',
            errors: error,
          };
        }

        // Don't retry on last attempt
        if (attempt === this.maxRetries) {
          break;
        }

        // Wait before retry with exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * Math.pow(2, attempt))
        );
      }
    }

    // All retries failed - try cache as fallback
    if (useCache) {
      const cached = CacheManager.get<ApiResponse<T>>(cacheKey);
      if (cached) {
        console.warn(`All attempts failed for ${endpoint}, using stale cache`);
        return {
          ...cached,
          _fromCache: true,
          _stale: true,
        } as any;
      }
    }

    // No cache available, return error
    const errorMessage = lastError?.message || 'Network error';
    return {
      success: false,
      message: errorMessage.includes('fetch') 
        ? 'Server tidak dapat dijangkau. Periksa koneksi internet Anda.'
        : errorMessage,
      errors: lastError,
    };
  }

  /**
   * GET request
   */
  static get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  static post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  static put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  static delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Clear all cache
   */
  static clearCache(): void {
    CacheManager.clear();
  }

  /**
   * Clear specific cache by key pattern
   */
  static clearCacheByPattern(pattern: string): void {
    // Implementation depends on your cache manager
    // This is a placeholder
    console.log('Clearing cache for pattern:', pattern);
  }
}