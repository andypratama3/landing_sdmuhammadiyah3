interface TokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
}

interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
}

const TOKEN_KEY = 'app_token';
const REFRESH_KEY = 'app_refresh_token';
const EXPIRES_KEY = 'app_token_expires';
const REFRESH_EXPIRES_KEY = 'app_refresh_expires';

export class JWTManager {
  static saveTokens(tokenData: TokenData) {
    const now = Date.now();
    const expiresAt = now + tokenData.expires_in * 1000;
    const refreshExpiresAt = now + (tokenData.refresh_expires_in || 7 * 24 * 60 * 60) * 1000;

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, tokenData.access_token);
      localStorage.setItem(REFRESH_KEY, tokenData.refresh_token);
      localStorage.setItem(EXPIRES_KEY, expiresAt.toString());
      localStorage.setItem(REFRESH_EXPIRES_KEY, refreshExpiresAt.toString());
    }
  }

  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_KEY);
  }

  static isAccessTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    const expiresAt = localStorage.getItem(EXPIRES_KEY);
    if (!expiresAt) return true;
    const buffer = 5 * 60 * 1000; // 5 menit
    return Date.now() >= parseInt(expiresAt) - buffer;
  }

  static isRefreshTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    const expiresAt = localStorage.getItem(REFRESH_EXPIRES_KEY);
    if (!expiresAt) return true;
    return Date.now() >= parseInt(expiresAt);
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(REFRESH_EXPIRES_KEY);
  }

  static getTokenInfo(): TokenInfo | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    if (!accessToken || !refreshToken) return null;
    const expiresAt = localStorage.getItem(EXPIRES_KEY);
    const refreshExpiresAt = localStorage.getItem(REFRESH_EXPIRES_KEY);
    return {
      accessToken,
      refreshToken,
      expiresAt: expiresAt ? parseInt(expiresAt) : 0,
      refreshExpiresAt: refreshExpiresAt ? parseInt(refreshExpiresAt) : 0,
    };
  }

  static needsTokenRefresh(): boolean {
    if (typeof window === 'undefined') return false;
    const refreshExpiresAt = localStorage.getItem(REFRESH_EXPIRES_KEY);
    if (!refreshExpiresAt) return false;
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() >= parseInt(refreshExpiresAt) - oneDay;
  }
}
