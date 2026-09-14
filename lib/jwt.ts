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
   * Simpan token ke in-memory saja (Security: Removed localStorage/document.cookie to prevent XSS token theft)
   * Tokens should only be stored in HttpOnly cookies by the server
   */
  static saveTokens(tokenData: {
    access_token: string
    refresh_token?: string
    expires_in?: number
  }): void {
    const expiresInSec = tokenData.expires_in || 3600
    const expiresAtMs = Date.now() + expiresInSec * 1000

    // Security: Only store in memory - no localStorage or document.cookie
    // Tokens are stored in HttpOnly cookies by the server (/api/token route)
    this.inMemoryToken = tokenData.access_token
    this.inMemoryExpiresAt = expiresAtMs
    if (tokenData.refresh_token) {
      this.inMemoryRefreshToken = tokenData.refresh_token
    }
  }

  /**
   * Get access token dari in-memory (Security: Removed localStorage/document.cookie access)
   * Tokens are now only accessible via HttpOnly cookies (server-side) or in-memory cache
   */
  static getAccessToken(): string | null {
    // In-memory check only - tokens should be in HttpOnly cookies
    if (this.inMemoryToken && !this.isAccessTokenExpired()) {
      return this.inMemoryToken
    }

    return this.inMemoryToken || null
  }

  /**
   * Get refresh token dari in-memory (Security: Removed localStorage/document.cookie access)
   * Tokens are now only accessible via HttpOnly cookies (server-side) or in-memory cache
   */
  static getRefreshToken(): string | null {
    return this.inMemoryRefreshToken || null
  }

  /**
   * Check apakah access token sudah expired (Security: Removed localStorage access)
   */
  static isAccessTokenExpired(): boolean {
    const token = this.inMemoryToken
    if (!token) return true

    const buffer = 5 * 60 * 1000 // 5 menit buffer

    // Check in-memory expiry
    if (this.inMemoryExpiresAt > 0) {
      return Date.now() + buffer >= this.inMemoryExpiresAt
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
   * Get waktu sisa token (dalam seconds) (Security: Removed localStorage access)
   */
  static getTokenRemainingTime(): number {
    const token = this.getAccessToken()
    if (!token) return 0

    if (this.inMemoryExpiresAt > 0) {
      return Math.max(0, Math.floor((this.inMemoryExpiresAt - Date.now()) / 1000))
    }

    const payload = this.decodeToken(token)
    if (payload && payload.exp) {
      return Math.max(0, Math.floor((payload.exp * 1000 - Date.now()) / 1000))
    }

    return 3600
  }

  /**
   * Clear semua token (Security: Removed localStorage/document.cookie cleanup)
   * Note: HttpOnly cookies must be cleared server-side via /api/logout endpoint
   */
  static clearTokens(): void {
    this.inMemoryToken = null
    this.inMemoryRefreshToken = null
    this.inMemoryExpiresAt = 0
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


