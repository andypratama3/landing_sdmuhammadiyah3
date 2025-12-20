import type { Pagination } from './api.types';

/**
 * Berita entity from database
 */
export interface Berita {
  id: string;
  judul: string;
  desc: string;
  foto: string;
  slug: string;
  views: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Response for list of berita
 */
export interface BeritaListResponse {
  data: Berita[];
  pagination?: Pagination;
}

/**
 * Response for single berita
 */
export interface BeritaDetailResponse {
  data: Berita;
}

/**
 * Create berita payload
 */
export interface CreateBeritaPayload {
  judul: string;
  desc: string;
  foto: string;
  slug?: string;
}

/**
 * Update berita payload
 */
export interface UpdateBeritaPayload {
  judul?: string;
  desc?: string;
  foto?: string;
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