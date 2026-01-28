/**
 * Prestasi Types
 * Types untuk halaman prestasi siswa dan prestasi sekolah
 */

// ===== KATEGORI =====
export interface Kategori {
  id?: string;
  name: string;
  slug: string;
}

// ===== PRESTASI SISWA =====
export interface PrestasiSiswa {
  id?: string;
  slug: string;
  name: string;
  description: string | null;
  foto: string | null
  status: number // 1 = Prestasi Siswa
  tingkat: 'Sekolah' | 'Kecamatan' | 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional'
  penyelenggara: string
  tanggal: string // Format: YYYY-MM-DD
  juara: string // Contoh: "Juara 1", "Juara 2", "Harapan 3"
  views?: number
  kategori: Kategori[]
}

export interface PrestasiSiswaDetail extends PrestasiSiswa {
  created_at?: string
  updated_at?: string
}

// ===== PRESTASI SEKOLAH =====
export interface PrestasiSekolah {
  id?: string
  slug: string
  name: string
  description: string | null
  foto: string | null
  status: number // 2 = Prestasi Sekolah
  tanggal: string // Format: YYYY-MM-DD
  views: number
  kategori: Kategori[]
}

export interface PrestasiSekolahDetail extends PrestasiSekolah {
  created_at?: string
  updated_at?: string
}

// ===== STATISTICS =====
export interface PrestasiStatistics {
  total_prestasi_siswa: number
  total_prestasi_sekolah: number
  prestasi_siswa_by_level: {
    sekolah: number
    kecamatan: number
    kota: number
    provinsi: number
    nasional: number
    internasional: number
  }
}

// ===== FILTER PARAMS =====
export interface PrestasiSiswaFilterParams {
  page?: number
  per_page?: number
  tahun?: string | number
  tingkat?: 'Sekolah' | 'Kecamatan' | 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional'
  kategori_slug?: string | number
}

export interface PrestasiSekolahFilterParams {
  page?: number
  per_page?: number
  tahun?: string | number
  kategori_slug?: string | number
}

// ===== AWARD TYPES =====
export type AwardType = 'Juara 1' | 'Juara 2' | 'Juara 3' | 'Harapan 1' | 'Harapan 2' | 'Harapan 3' | string

export interface AwardColor {
  color: string
  textColor: string
}

// ===== LEVEL TYPES =====
export type PrestasiLevel = 'Sekolah' | 'Kecamatan' | 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional'

export interface LevelOption {
  id: PrestasiLevel | 'all'
  label: string
}

export interface CategoryOption {
  name: string
  value: string
}