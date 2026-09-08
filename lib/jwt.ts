import type { TokenData, TokenInfo } from '@/types'

function safeBase64Decode(str: string): string {
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return decodeURIComponent(
        Array.prototype.map
          .call(window.atob(str.replace(/-/g, '+').replace(/_/g, '/')), (c: string) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'base64').toString('utf-8')
    }
  } catch {
    // Decoding failed
  }
  return ''
}

export class JWTManager {
  private static readonly AUTH_TOKEN_KEY = 'auth_token'
  private static readonly ACCESS_TOKEN_KEY = 'access_token'
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private static readonly EXPIRES_KEY = 'app_token_expires'

  // In-memory cache
  private static inMemoryToken: string | null = null
  private static inMemoryRefreshToken: string | null = null
  private static inMemoryExpiresAt: number = 0

  /**
   * Parse JWT payload tanpa verifikasi
   * Aman untuk client-side dan server-side
   */
  static decodeToken(token: string): any {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null

      const decodedStr = safeBase64Decode(parts[1])
      if (!decodedStr) return null

      return JSON.parse(decodedStr)
    } catch {
      return null
    }
  }

  /**
   * Simpan token ke in-memory, localStorage, dan cookie
   */
  static saveTokens(tokenData: {
    access_token: string
    refresh_token?: string
    expires_in?: number
  }): void {
    const expiresInSec = tokenData.expires_in || 3600
    const expiresAtMs = Date.now() + expiresInSec * 1000

    this.inMemoryToken = tokenData.access_token
    this.inMemoryExpiresAt = expiresAtMs
    if (tokenData.refresh_token) {
      this.inMemoryRefreshToken = tokenData.refresh_token
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.AUTH_TOKEN_KEY, tokenData.access_token)
        localStorage.setItem(this.ACCESS_TOKEN_KEY, tokenData.access_token)
        localStorage.setItem(this.EXPIRES_KEY, expiresAtMs.toString())

        if (tokenData.refresh_token) {
          localStorage.setItem(this.REFRESH_TOKEN_KEY, tokenData.refresh_token)
        }

        // Set non-HttpOnly cookie for client fallback
        document.cookie = `${this.ACCESS_TOKEN_KEY}=${tokenData.access_token}; max-age=${expiresInSec}; path=/; SameSite=Lax`
        if (tokenData.refresh_token) {
          document.cookie = `${this.REFRESH_TOKEN_KEY}=${tokenData.refresh_token}; max-age=${expiresInSec * 12}; path=/; SameSite=Lax`
        }
      } catch (err) {
        console.warn('⚠️ Could not persist tokens to localStorage/cookie:', err)
      }
    }
  }

  /**
   * Get access token dari in-memory, localStorage, atau cookie
   */
  static getAccessToken(): string | null {
    // 1. In-memory check
    if (this.inMemoryToken && !this.isAccessTokenExpired()) {
      return this.inMemoryToken
    }

    // 2. Client-side storage check
    if (typeof window !== 'undefined') {
      try {
        const localToken =
          localStorage.getItem(this.AUTH_TOKEN_KEY) ||
          localStorage.getItem(this.ACCESS_TOKEN_KEY)

        if (localToken) {
          this.inMemoryToken = localToken
          const expiresAt = localStorage.getItem(this.EXPIRES_KEY)
          if (expiresAt) {
            this.inMemoryExpiresAt = parseInt(expiresAt, 10)
          }
          return localToken
        }

        // Fallback to cookie
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith(`${this.ACCESS_TOKEN_KEY}=`))
          ?.split('=')[1]

        if (cookieToken) {
          this.inMemoryToken = cookieToken
          return cookieToken
        }
      } catch {
        // Storage access error (e.g. sandbox/private mode)
      }
    }

    return this.inMemoryToken || null
  }

  /**
   * Get refresh token dari in-memory, localStorage, atau cookie
   */
  static getRefreshToken(): string | null {
    if (this.inMemoryRefreshToken) return this.inMemoryRefreshToken

    if (typeof window !== 'undefined') {
      try {
        const localRefresh = localStorage.getItem(this.REFRESH_TOKEN_KEY)
        if (localRefresh) return localRefresh

        const cookie = document.cookie
          .split('; ')
          .find(row => row.startsWith(`${this.REFRESH_TOKEN_KEY}=`))
          ?.split('=')[1]

        return cookie || null
      } catch {
        return null
      }
    }

    return null
  }

  /**
   * Check apakah access token sudah expired
   */
  static isAccessTokenExpired(): boolean {
    const token = this.inMemoryToken || (typeof window !== 'undefined' ? localStorage.getItem(this.AUTH_TOKEN_KEY) : null)
    if (!token) return true

    const buffer = 5 * 60 * 1000 // 5 menit buffer

    // Check in-memory expiry
    if (this.inMemoryExpiresAt > 0) {
      return Date.now() + buffer >= this.inMemoryExpiresAt
    }

    // Check localStorage expiry
    if (typeof window !== 'undefined') {
      try {
        const storedExpiresAt = localStorage.getItem(this.EXPIRES_KEY)
        if (storedExpiresAt) {
          const expMs = parseInt(storedExpiresAt, 10)
          if (!isNaN(expMs) && expMs > 0) {
            return Date.now() + buffer >= expMs
          }
        }
      } catch {
        // Ignore storage read error
      }
    }

    // Check if token is a standard JWT with exp claim
    const payload = this.decodeToken(token)
    if (payload && payload.exp) {
      const expirationTime = payload.exp * 1000
      return Date.now() + buffer > expirationTime
    }

    // If token exists and we don't have expiry metadata, assume valid
    return false
  }

  /**
   * Get waktu sisa token (dalam seconds)
   */
  static getTokenRemainingTime(): number {
    const token = this.getAccessToken()
    if (!token) return 0

    if (this.inMemoryExpiresAt > 0) {
      return Math.max(0, Math.floor((this.inMemoryExpiresAt - Date.now()) / 1000))
    }

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.EXPIRES_KEY)
        if (stored) {
          const exp = parseInt(stored, 10)
          return Math.max(0, Math.floor((exp - Date.now()) / 1000))
        }
      } catch {
        // Ignore
      }
    }

    const payload = this.decodeToken(token)
    if (payload && payload.exp) {
      return Math.max(0, Math.floor((payload.exp * 1000 - Date.now()) / 1000))
    }

    return 3600
  }

  /**
   * Clear semua token
   */
  static clearTokens(): void {
    this.inMemoryToken = null
    this.inMemoryRefreshToken = null
    this.inMemoryExpiresAt = 0

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.AUTH_TOKEN_KEY)
        localStorage.removeItem(this.ACCESS_TOKEN_KEY)
        localStorage.removeItem(this.REFRESH_TOKEN_KEY)
        localStorage.removeItem(this.EXPIRES_KEY)
      } catch {
        // Ignore
      }

      if (typeof document !== 'undefined') {
        document.cookie = `${this.ACCESS_TOKEN_KEY}=; max-age=0; path=/`
        document.cookie = `${this.REFRESH_TOKEN_KEY}=; max-age=0; path=/`
      }
    }
  }

  /**
   * Get user payload dari token
   */
  static getUserPayload(): any {
    const token = this.getAccessToken()
    if (!token) return null

    return this.decodeToken(token)
  }

  /**
   * Get complete token info
   */
  static getTokenInfo(): TokenInfo | null {
    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()
    if (!accessToken) return null

    return {
      accessToken,
      refreshToken: refreshToken || '',
      expiresAt: this.inMemoryExpiresAt,
      refreshExpiresAt: this.inMemoryExpiresAt + 7 * 24 * 60 * 60 * 1000,
    }
  }
}


