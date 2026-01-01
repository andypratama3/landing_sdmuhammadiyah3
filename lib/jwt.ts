export class JWTManager {
  private static ACCESS_TOKEN_KEY = 'access_token'
  private static REFRESH_TOKEN_KEY = 'refresh_token'

  /**
   * Parse JWT payload tanpa verifikasi
   * ⚠️ Hanya untuk client-side, verification dilakukan di server
   */
  static decodeToken(token: string): any {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) return null

      const payload = parts[1]
      const decoded = JSON.parse(
        Buffer.from(payload, 'base64').toString('utf-8')
      )

      return decoded
    } catch (error) {
      console.error('❌ Failed to decode token:', error)
      return null
    }
  }

  /**
   * Get access token dari cookie
   */
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null

    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1]

    return cookie || null
  }

  /**
   * Get refresh token dari cookie
   */
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null

    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('refresh_token='))
      ?.split('=')[1]

    return cookie || null
  }

  /**
   * Check apakah access token sudah expired
   */
  static isAccessTokenExpired(): boolean {
    const token = this.getAccessToken()
    if (!token) return true

    const payload = this.decodeToken(token)
    if (!payload || !payload.exp) return true

    // exp adalah unix timestamp dalam seconds
    const expirationTime = payload.exp * 1000
    const currentTime = Date.now()

    // Token expired jika 5 menit mendatang (buffer)
    const buffer = 5 * 60 * 1000

    return currentTime + buffer > expirationTime
  }

  /**
   * Get waktu sisa token (dalam seconds)
   */
  static getTokenRemainingTime(): number {
    const token = this.getAccessToken()
    if (!token) return 0

    const payload = this.decodeToken(token)
    if (!payload || !payload.exp) return 0

    const expirationTime = payload.exp * 1000
    const currentTime = Date.now()
    const remaining = Math.max(0, expirationTime - currentTime)

    return Math.floor(remaining / 1000)
  }

  /**
   * Clear semua token
   */
  static clearTokens(): void {
    if (typeof document === 'undefined') return

    // Clear dari cookie dengan max-age=0
    document.cookie = 'access_token=; max-age=0; path=/'
    document.cookie = 'refresh_token=; max-age=0; path=/'
  }

  /**
   * Get user payload dari token
   */
  static getUserPayload(): any {
    const token = this.getAccessToken()
    if (!token) return null

    return this.decodeToken(token)
  }
}

