/**
 * Generic API Response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Pagination;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  errors?: any;
  _fromCache?: boolean;
  _stale?: boolean;
}

/**
 * Pagination structure
 */
export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

/**
 * Request options
 */
export interface RequestOptions extends RequestInit {
  cache?: boolean;
  cacheTTL?: number;
  useCache?: boolean;
}

/**
 * Token data from backend
 */
export interface TokenData {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  refresh_expires_in?: number;
}

/**
 * Token info stored in localStorage
 */
export interface TokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  refreshExpiresAt: number;
}