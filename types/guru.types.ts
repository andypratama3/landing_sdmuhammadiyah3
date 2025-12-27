/**
 * Karyawan/Staff Info
 */
export interface Karyawan {
  id: string;
  name: string;
  email?: string;
  foto?: string;
  sex?: string;
  phone?: string;
  slug?: string;
  user_id?: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Pelajaran/Subject
 */
export interface Pelajaran {
  id?: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Pelajaran with guru count
 */
export interface PelajaranWithCount extends Pelajaran {
  gurus_count: number;
}

/**
 * Guru/Teacher - Bisa untuk list dan detail
 */
export interface Guru {
  name: string;
  slug: string;
  foto?: string;
  karyawan_id: string;
  description: string;
  lulusan: string;
  created_at?: string;
  updated_at: string;
  pelajarans?: Pelajaran[];
  karyawan?: Karyawan;
}

/**
 * Request parameters
 */
export interface GuruListParams {
  limit?: number;
}

export interface GuruFilterParams {
  search?: string;
  pelajaran?: string;
}
