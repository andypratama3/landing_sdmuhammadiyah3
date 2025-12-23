/**
 * Berita entity from database
 */
export interface Berita {
  id: string;
  judul: string;
  desc: string;
  foto: string;
  slug: string;
  category: string;
  views: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * API Response wrapper
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
 * Response for list of berita
 */
export interface BeritaListResponse {
  success: boolean;
  message: string;
  data: Berita[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

/**
 * Response for single berita
 */
export interface BeritaDetailResponse {
  success: boolean;
  message: string;
  data: Berita;
}

/**
 * Category count response
 */
export interface CategoryCount {
  category: string;
  total: number;
}

/**
 * Category count response wrapper
 */
export interface CategoryCountResponse {
  success: boolean;
  message: string;
  data: CategoryCount[];
}

/**
 * Popular berita response
 */
export interface PopularBeritaResponse {
  success: boolean;
  message: string;
  data: Berita[];
}

/**
 * Create berita payload
 */
export interface CreateBeritaPayload {
  judul: string;
  desc: string;
  foto: string;
  category: string;
  slug?: string;
}

/**
 * Update berita payload
 */
export interface UpdateBeritaPayload {
  judul?: string;
  desc?: string;
  foto?: string;
  category?: string;
  slug?: string;
}

/**
 * Berita filters for query
 */
export interface BeritaFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: 'latest' | 'popular' | 'oldest';
}

/**
 * Pagination type
 */
export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}