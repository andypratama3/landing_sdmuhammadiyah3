/**
 * Generic API Response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
  pagination?: Pagination;
}

/**
 * Pagination structure
 */
export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
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