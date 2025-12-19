import { JWTManager } from './jwt';
import { CacheManager } from './cache';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
  pagination?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

interface RequestOptions extends RequestInit {
  cache?: boolean;
  cacheTTL?: number;
  useCache?: boolean;
}

export class ApiClient {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  private static isRefreshing = false;
  private static refreshSubscribers: Array<(token: string) => void> = [];

  /**
   * Initialize token - panggil saat app pertama kali load
   */
  static async initialize(): Promise<void> {
    const token = JWTManager.getAccessToken();
    
    if (!token || JWTManager.isRefreshTokenExpired()) {
      // Generate token baru
      await this.generateNewToken();
    } else if (JWTManager.isAccessTokenExpired()) {
      // Refresh token
      await this.refreshToken();
    }

    // Setup auto refresh setiap 6 hari
    this.setupAutoRefresh();
  }

  /**
   * Generate token baru dari backend
   */
  private static async generateNewToken(): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiResponse<any> = await response.json();
      
      if (result.success && result.data) {
        JWTManager.saveTokens(result.data);
      }
    } catch (error) {
      console.error('Failed to generate token:', error);
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
      });

      const result: ApiResponse<any> = await response.json();
      
      if (result.success && result.data) {
        // Update hanya access token
        const currentRefresh = JWTManager.getRefreshToken();
        JWTManager.saveTokens({
          ...result.data,
          refresh_token: currentRefresh!,
        });
        
        return result.data.access_token;
      }
      
      // Jika refresh gagal, generate token baru
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
    // Cek setiap 1 jam apakah perlu refresh
    const checkInterval = 60 * 60 * 1000; // 1 jam
    
    setInterval(async () => {
      if (JWTManager.needsTokenRefresh()) {
        const refreshToken = JWTManager.getRefreshToken();
        if (refreshToken) {
          try {
            // Generate token pair baru dengan refresh token lama
            await this.generateNewToken();
          } catch (error) {
            console.error('Auto refresh failed:', error);
          }
        }
      }
    }, checkInterval);
  }

  /**
   * Request dengan auto retry dan cache
   */
  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { cache = true, cacheTTL, useCache = true, ...fetchOptions } = options;
    const cacheKey = `${endpoint}_${JSON.stringify(fetchOptions)}`;

    // Cek cache jika GET request dan cache enabled
    if (useCache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
      const cached = CacheManager.get<ApiResponse<T>>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Pastikan token valid
    if (JWTManager.isAccessTokenExpired()) {
      await this.refreshToken();
    }

    const token = JWTManager.getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      // Jika 401, coba refresh token dan retry
      if (response.status === 401) {
        const newToken = await this.refreshToken();
        if (newToken) {
          const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
            ...fetchOptions,
            headers: {
              ...headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
          
          const result: ApiResponse<T> = await retryResponse.json();
          
          // Cache jika success dan cache enabled
          if (result.success && cache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
            CacheManager.set(cacheKey, result, cacheTTL);
          }
          
          return result;
        }
      }

      const result: ApiResponse<T> = await response.json();

      // Cache jika success dan cache enabled
      if (result.success && cache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
        CacheManager.set(cacheKey, result, cacheTTL);
      }

      return result;
      
    } catch (error) {
      // Jika backend down, coba ambil dari cache
      if (useCache) {
        const cached = CacheManager.get<ApiResponse<T>>(cacheKey);
        if (cached) {
          console.warn('Backend down, using cached data');
          return cached;
        }
      }

      return {
        success: false,
        message: 'Network error or backend is down',
        errors: error,
      };
    }
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
}