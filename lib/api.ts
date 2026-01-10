// lib/api.ts - FIXED VERSION
import { CacheManager } from './cache'
import { JWTManager } from './jwt'
import type { ApiResponse, RequestOptions } from '@/types'

/**
 * Token Ready State Manager
 * Memastikan token sudah di-generate sebelum API call
 */
class TokenReadyManager {
  private static isReady = false
  private static waitingQueue: Array<() => void> = []
  private static initPromise: Promise<void> | null = null

  /**
   * Set token sebagai ready
   */
  static markReady(): void {
    this.isReady = true
    // Process semua yang menunggu
    this.waitingQueue.forEach(resolve => resolve())
    this.waitingQueue = []
  }

  /**
   * Reset state (untuk logout)
   */
  static reset(): void {
    this.isReady = false
    this.initPromise = null
  }

  /**
   * Tunggu sampai token ready
   * Returns immediately jika sudah ready
   */
  static async waitUntilReady(timeout = 10000): Promise<boolean> {
    // Jika sudah ready, langsung return
    if (this.isReady) return true

    // Jika ada token di cookie, mark as ready
    const existingToken = JWTManager.getAccessToken()
    if (existingToken && !JWTManager.isAccessTokenExpired()) {
      this.markReady()
      return true
    }

    // Tunggu dengan timeout
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.warn('⏱️ Token ready timeout')
        resolve(false)
      }, timeout)

      this.waitingQueue.push(() => {
        clearTimeout(timer)
        resolve(true)
      })
    })
  }

  /**
   * Get current status
   */
  static getStatus(): boolean {
    return this.isReady
  }
}

export class ApiClient {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL
  private static apiSecret = process.env.NEXT_PUBLIC_API_SECRET
  private static maxRetries = 2
  private static retryDelay = 1000
  private static isInitializing = false
  
  private static readonly DEBUG = process.env.NODE_ENV === 'development'

  private static log(...args: any[]): void {
    if (this.DEBUG) console.log('[API]', ...args)
  }

  private static warn(...args: any[]): void {
    if (this.DEBUG) console.warn('[API-WARN]', ...args)
  }

  private static error(...args: any[]): void {
    console.error('[API-ERROR]', ...args)
  }

  /**
   * Generate HMAC-SHA256 signature
   */
  private static async generateSignature(
    timestamp: string,
    nonce: string
  ): Promise<string> {
    const stringToSign = `${timestamp}.${nonce}`
    const secretBytes = new Uint8Array(
      (this.apiSecret || '').match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
    )

    const encoder = new TextEncoder()
    const data = encoder.encode(stringToSign)

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * Generate UUID v4
   */
  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  /**
   * 🔐 Generate new token dari backend
   */
  private static async generateNewToken(): Promise<boolean> {
    try {
      this.log('🔑 Generating token...')

      const timestamp = Math.floor(Date.now() / 1000).toString()
      const nonce = this.generateUUID()

      if (!this.apiSecret) {
        throw new Error('API_SECRET not configured')
      }

      const signature = await this.generateSignature(timestamp, nonce)

      const response = await fetch(`${this.baseURL}/auth/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-TIMESTAMP': timestamp,
          'X-NONCE': nonce,
          'X-SIGNATURE': signature,
        },
        signal: AbortSignal.timeout(10000),
      })

      if (!response.ok) {
        throw new Error(`Token generation failed: ${response.status}`)
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error('Invalid token response')
      }

      this.log('✅ Token generated successfully')
      
      // Mark token as ready
      TokenReadyManager.markReady()
      
      return true

    } catch (error) {
      this.error('❌ Token generation failed:', error)
      return false
    }
  }

  /**
   * 🚀 Initialize API Client
   * Harus dipanggil di ApiInitializer sebelum request apapun
   */
  static async initialize(): Promise<void> {
    // Cegah double initialization
    if (this.isInitializing) {
      this.log('⏳ Already initializing, waiting...')
      await TokenReadyManager.waitUntilReady()
      return
    }

    // Check existing token
    const existingToken = JWTManager.getAccessToken()
    if (existingToken && !JWTManager.isAccessTokenExpired()) {
      this.log('✅ Valid token exists, skipping generation')
      TokenReadyManager.markReady()
      return
    }

    this.isInitializing = true

    try {
      const success = await this.generateNewToken()
      
      if (!success) {
        this.warn('⚠️ Token generation failed, API calls may fail')
      }
    } finally {
      this.isInitializing = false
    }
  }

  /**
   * Generate cache key
   */
  private static generateCacheKey(endpoint: string, fetchOptions: any): string {
    const method = fetchOptions.method || 'GET'
    return `api_${method}_${endpoint}`
  }

  /**
   * 🌐 Core request method
   */
  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      cache = true,
      cacheTTL = 5 * 60 * 1000,
      useCache = true,
      signal,
      ...fetchOptions
    } = options

    const cacheKey = this.generateCacheKey(endpoint, fetchOptions)
    const isGetRequest = !fetchOptions.method || fetchOptions.method === 'GET'

    // 📦 Check cache untuk GET requests
    if (useCache && isGetRequest) {
      const cached = CacheManager.get<ApiResponse<T>>(cacheKey)
      if (cached) {
        this.log(`💾 Cache hit: ${endpoint}`)
        return cached
      }
    }

    // 🔐 Tunggu token ready (max 10 detik)
    const tokenReady = await TokenReadyManager.waitUntilReady(10000)
    
    if (!tokenReady) {
      this.warn('⚠️ Token not ready, attempting request anyway...')
    }

    let lastError: any = null

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        this.log(`🌐 Request (attempt ${attempt + 1}): ${endpoint}`)

        const response = await fetch(`${this.baseURL}${endpoint}`, {
          ...fetchOptions,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
          },
          signal: signal || AbortSignal.timeout(30000),
        })

        // 🔥 Handle 401 - Token expired atau tidak ada
        if (response.status === 401) {
          this.warn('🔐 Got 401, refreshing token...')
          
          // Reset token ready state
          TokenReadyManager.reset()
          
          // Generate new token
          const tokenGenerated = await this.generateNewToken()
          
          if (!tokenGenerated) {
            throw new Error('Failed to refresh token')
          }

          // Retry original request (hanya sekali)
          if (attempt === 0) {
            continue
          }
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

        // Cache GET requests yang sukses
        if (result.success && cache && isGetRequest) {
          try {
            CacheManager.set(cacheKey, result, cacheTTL)
            this.log(`💾 Cached: ${endpoint}`)
          } catch (cacheError) {
            this.warn('Failed to cache:', cacheError)
          }
        }

        return result

      } catch (error: any) {
        lastError = error

        if (error.name === 'AbortError') {
          return {
            success: false,
            message: 'Request timeout',
            errors: error,
          }
        }

        this.log(`❌ Error (attempt ${attempt + 1}): ${error.message}`)

        // Retry dengan exponential backoff
        if (attempt < this.maxRetries) {
          await new Promise(resolve =>
            setTimeout(resolve, this.retryDelay * Math.pow(2, attempt))
          )
        }
      }
    }

    // 📦 Fallback ke stale cache
    if (useCache && isGetRequest) {
      const staleCache = CacheManager.get<ApiResponse<T>>(cacheKey)
      if (staleCache) {
        this.log(`♻️ Using stale cache: ${endpoint}`)
        return {
          ...staleCache,
          _fromCache: true,
          _stale: true,
        } as any
      }
    }

    return {
      success: false,
      message: lastError?.message || 'Network error',
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

  static clearCache(): void {
    CacheManager.clear()
  }

  static logout(): void {
    JWTManager.clearTokens()
    TokenReadyManager.reset()
    this.clearCache()
    this.log('👋 Logged out')
  }

  /**
   * Get token ready status
   */
  static isTokenReady(): boolean {
    return TokenReadyManager.getStatus()
  }
}