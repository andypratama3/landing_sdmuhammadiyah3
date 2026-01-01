import { CacheManager } from './cache'
import { JWTManager } from './jwt'
import type { ApiResponse, RequestOptions } from '@/types'

export class ApiClient {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL
  private static maxRetries = 2
  private static retryDelay = 1000
  private static tokenInitialized = false
  private static tokenInitializationPromise: Promise<void> | null = null
  
  private static readonly TOKEN_CACHE_KEY = 'auth_token'
  private static readonly DEBUG = process.env.NODE_ENV === 'development' && false // Change to true for debugging

  /**
   * Silent console.log (only show if DEBUG enabled)
   */
  private static log(...args: any[]): void {
    if (this.DEBUG) {
      console.log('[API]', ...args)
    }
  }

  /**
   * Silent console.warn (only show if DEBUG enabled)
   */
  private static warn(...args: any[]): void {
    if (this.DEBUG) {
      console.warn('[API-WARN]', ...args)
    }
  }

  /**
   * Silent console.error (only show if DEBUG enabled)
   */
  private static error(...args: any[]): void {
    if (this.DEBUG) {
      console.error('[API-ERROR]', ...args)
    }
  }

  /**
   * 🔐 Initialize token on first request
   */
  private static async ensureTokenInitialized(): Promise<void> {
    if (this.tokenInitialized) {
      return
    }

    if (this.tokenInitializationPromise) {
      return this.tokenInitializationPromise
    }

    this.tokenInitializationPromise = this.generateNewToken().then(
      () => {
        this.tokenInitialized = true
      },
      (err) => {
        this.error('Token generation failed:', err)
        
        // 🔥 Fallback: Try to use cached token
        const cachedToken = this.getCachedToken()
        if (cachedToken) {
          this.warn('Using cached token (backend offline)')
          this.tokenInitialized = true
          return
        }
        
        this.tokenInitialized = false
        throw err
      }
    )

    return this.tokenInitializationPromise
  }

  /**
   * Get cached token dari localStorage
   */
  private static getCachedToken(): string | null {
    try {
      const cached = CacheManager.get<{
        access_token: string
        refresh_token: string
        timestamp: number
      }>(this.TOKEN_CACHE_KEY)

      if (!cached) return null

      // Check jika token masih valid (cache TTL)
      const age = Date.now() - cached.timestamp
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 hari

      if (age > maxAge) {
        this.warn('Cached token expired (older than 7 days)')
        return null
      }

      this.log('Using cached token')
      return cached.access_token
    } catch (error) {
      this.warn('Failed to get cached token:', error)
      return null
    }
  }

  /**
   * Generate / refresh token via HttpOnly cookie
   */
  private static async generateNewToken(): Promise<void> {
    try {
      this.log('Generating token...')

      const response = await fetch('/api/token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000), // Wait for cooldown message
      })

      // Handle cooldown (503 with RETRY_COOLDOWN)
      if (response.status === 503) {
        const data = await response.json()
        if (data.error === 'RETRY_COOLDOWN') {
          this.warn(`Token generation in cooldown: ${data.message}`)
          throw new Error('COOLDOWN')
        }
      }

      if (!response.ok) {
        throw new Error(`Token generation failed: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.success || !data.data?.access_token) {
        throw new Error('Invalid token response')
      }

      // 💾 Cache token untuk fallback
      try {
        CacheManager.set(
          this.TOKEN_CACHE_KEY,
          {
            access_token: data.data.access_token,
            refresh_token: data.data.refresh_token,
            timestamp: Date.now(),
          },
          7 * 24 * 60 * 60 * 1000 // 7 hari
        )
        this.log('Token cached for offline use')
      } catch (cacheError) {
        this.warn('Failed to cache token:', cacheError)
      }

      this.log('Token generated successfully')

    } catch (error) {
      // Silently handle cooldown errors
      if (error instanceof Error && error.message === 'COOLDOWN') {
        this.log('Token generation in cooldown, using cached token')
        return // Allow app to continue with cached token
      }

      this.error('Token generation error:', error)
      throw error
    }
  }

  /**
   * Generate cache key dari endpoint dan options
   */
  private static generateCacheKey(
    endpoint: string,
    fetchOptions: any
  ): string {
    const method = fetchOptions.method || 'GET'
    if (method === 'GET') {
      return `api_${endpoint}`
    }
    return `api_${endpoint}_${method}`
  }

  /**
   * Request core (COOKIE ONLY)
   */
  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      cache = true,
      cacheTTL = 5 * 60 * 1000, // Default 5 menit
      useCache = true,
      signal,
      ...fetchOptions
    } = options

    // 🔥 Ensure token is initialized (silent fail-over)
    try {
      await this.ensureTokenInitialized()
    } catch (error) {
      this.error('Failed to initialize token:', error)
      // Don't block - try to proceed with cached data
    }

    // Check if token expired, refresh if needed (silent)
    if (JWTManager.isAccessTokenExpired()) {
      this.log('Token expired, refreshing...')
      try {
        await this.generateNewToken()
      } catch (error) {
        this.warn('Token refresh failed, continuing with cache fallback')
      }
    }

    const cacheKey = this.generateCacheKey(endpoint, fetchOptions)
    const isGetRequest = !fetchOptions.method || fetchOptions.method === 'GET'

    // 📦 Check cache untuk GET requests
    if (useCache && isGetRequest) {
      const cached = CacheManager.get<ApiResponse<T>>(cacheKey)
      if (cached) {
        this.log(`Cache hit: ${endpoint}`)
        return cached
      }
    }

    let lastError: any = null

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000)
        const combinedSignal = signal || controller.signal

        this.log(`Request attempt ${attempt + 1}: ${endpoint}`)

        const response = await fetch(`${this.baseURL}${endpoint}`, {
          ...fetchOptions,
          credentials: 'include', // 🔐 COOKIE
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
          signal: combinedSignal,
        })

        clearTimeout(timeoutId)

        // 🔥 AUTH EXPIRED → REFRESH TOKEN ONCE
        if (response.status === 401 && attempt === 0) {
          this.log('Token expired (401), refreshing...')
          try {
            await this.generateNewToken()
          } catch (error) {
            this.warn('Token refresh failed')
          }

          const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
            ...fetchOptions,
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              ...fetchOptions.headers,
            },
            signal: combinedSignal,
          })

          const retryResult: ApiResponse<T> = await retryResponse.json()

          // Save to cache
          if (retryResult.success && cache && isGetRequest) {
            try {
              CacheManager.set(cacheKey, retryResult, cacheTTL)
              this.log(`Cached: ${endpoint}`)
            } catch (error) {
              this.warn('Failed to cache response:', error)
            }
          }

          return retryResult
        }

        // Parse response
        const contentType = response.headers.get('content-type')
        let result: ApiResponse<T>

        if (contentType?.includes('application/json')) {
          result = await response.json()
        } else {
          const text = await response.text()
          result = {
            success: response.ok,
            message: response.ok ? 'Success' : text,
            data: (response.ok ? text : null) as any,
          }
        }

        this.log(`Response: ${endpoint} (${response.status})`)

        // Save to cache untuk GET requests
        if (result.success && cache && isGetRequest) {
          try {
            CacheManager.set(cacheKey, result, cacheTTL)
            this.log(`Cached: ${endpoint}`)
          } catch (error) {
            this.warn('Failed to cache response:', error)
          }
        }

        return result

      } catch (error: any) {
        lastError = error

        if (error.name === 'AbortError') {
          return {
            success: false,
            message: 'Request cancelled',
            errors: error,
          }
        }

        this.log(`Request error (attempt ${attempt + 1}): ${error.message}`)

        if (attempt === this.maxRetries) break

        await new Promise(resolve =>
          setTimeout(resolve, this.retryDelay * Math.pow(2, attempt))
        )
      }
    }

    // 📦 FALLBACK: Jika semua request gagal, ambil dari cache (stale)
    if (useCache && isGetRequest) {
      try {
        const staleCache = CacheManager.get<ApiResponse<T>>(cacheKey)
        if (staleCache) {
          this.log(`Using stale cache: ${endpoint}`)
          return {
            ...staleCache,
            _fromCache: true,
            _stale: true,
          } as any
        }
      } catch (error) {
        this.warn('Failed to get stale cache:', error)
      }
    }

    this.error(`All requests failed for: ${endpoint}`)

    return {
      success: false,
      message: 'Network error - no cached data available',
      errors: lastError,
    }
  }

  static get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  static post<T>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  static put<T>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  static delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }

  /**
   * Clear all cache
   */
  static clearCache(): void {
    CacheManager.clear()
    this.log('Cache cleared')
  }

  /**
   * Get cache statistics
   */
  static getCacheStats() {
    return CacheManager.getStats()
  }

  /**
   * Initialize API client
   */
  static async initialize(): Promise<void> {
    try {
      await this.ensureTokenInitialized()
    } catch (error) {
      this.warn('Token initialization failed, will use cache fallback')
    }
  }

  /**
   * Logout
   */
  static logout(): void {
    JWTManager.clearTokens()
    this.clearCache()
    this.tokenInitialized = false
    this.tokenInitializationPromise = null
    this.log('Logged out')
  }

  /**
   * Enable/disable debug mode
   */
  static setDebugMode(enabled: boolean): void {
    const privateApiClient = this as any
    privateApiClient.DEBUG = enabled
    console.log(`Debug mode: ${enabled ? 'ON' : 'OFF'}`)
  }
}