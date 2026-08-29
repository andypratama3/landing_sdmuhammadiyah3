/**
 * Dummy Data for Local Development Only
 * This file should NEVER be used in production
 * All data here is for development/testing purposes only
 */

import type { Berita } from '@/types/berita.types'
import type { Gallery, GalleryKategori } from '@/types/gallery.types'
import type { Fasilitas } from '@/types'
import type { Dukungan } from '@/types/dukungan.types'
import { isDummyDataEnabled } from '@/config/dummy-data.config'

/**
 * Check if we should use dummy data
 * Only returns true in development mode when explicitly enabled
 * ALWAYS returns false in production
 */
export function shouldUseDummyData(): boolean {
  return isDummyDataEnabled()
}

/**
 * Dummy Berita Data
 */
export const dummyBerita: Berita[] = [
  {
    id: '1',
    judul: 'SD Muhammadiyah 3 Samarinda Raih Predikat Sekolah Adiwiyata',
    desc: `<p>SD Muhammadiyah 3 Samarinda berhasil meraih predikat Sekolah Adiwiyata tahun 2024. Prestasi ini merupakan bukti komitmen sekolah dalam menjaga lingkungan hidup dan mendidik siswa untuk peduli terhadap alam.</p>
    
    <p>Kepala Sekolah SD Muhammadiyah 3 Samarinda, Bapak H. Ahmad Fauzi, M.Pd menyatakan bahwa penghargaan ini adalah hasil kerja keras seluruh warga sekolah dalam program lingkungan yang telah dijalankan selama 2 tahun terakhir.</p>
    
    <h3>Program Lingkungan Sekolah</h3>
    <p>Beberapa program yang dijalankan antara lain:</p>
    <ul>
    <li>Bank Sampah Sekolah</li>
    <li>Taman Hidroponik</li>
    <li>Program Penghijauan</li>
    <li>Edukasi Daur Ulang</li>
    </ul>
    
    <p>Semua program ini melibatkan aktif siswa, guru, dan orang tua dalam menciptakan lingkungan sekolah yang hijau dan sehat.</p>`,
    foto: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    slug: 'sd-muhammadiyah-3-samarinda-raih-predikat-sekolah-adiwiyata',
    category: 'Prestasi',
    views: 1250,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    judul: 'Pendaftaran Siswa Baru SPMB 2025/2026 Telah Dibuka',
    desc: `<p>SD Muhammadiyah 3 Samarinda telah membuka pendaftaran siswa baru untuk tahun ajaran 2025/2026. Pendaftaran dibuka mulai tanggal 1 Februari 2024 hingga 30 April 2024.</p>
    
    <h3>Persyaratan Pendaftaran</h3>
    <ul>
    <li>Fotokopi Akta Kelahiran</li>
    <li>Fotokopi Kartu Keluarga</li>
    <li>Passfoto 3x4 (4 lembar)</li>
    <li>Fotokopi KK dan KTP Orang Tua</li>
    </ul>
    
    <h3>Jadwal Seleksi</h3>
    <p>Seleksi akan dilakukan dalam 2 tahap:</p>
    <ol>
    <li>Tes Potensi Akademik - 10 Mei 2024</li>
    <li>Wawancara Orang Tua - 17 Mei 2024</li>
    </ol>
    
    <p>Untuk informasi lebih lanjut, silakan hubungi sekretariat sekolah atau kunjungi website resmi kami.</p>`,
    foto: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    slug: 'pendaftaran-siswa-baru-spmb-2025-2026-telah-dibuka',
    category: 'Pengumuman',
    views: 2340,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: '3',
    judul: 'Kegiatan Maulid Nabi Muhammad SAW 1445 H',
    desc: `<p>SD Muhammadiyah 3 Samarinda menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1445 H dengan berbagai kegiatan religius dan kegiatan sosial.</p>
    
    <h3>Rangkaian Kegiatan</h3>
    <p>Kegiatan dimulai dengan:</p>
    <ul>
    <li>Lomba Adzan dan Qiraat Al-Quran</li>
    <li>Pembacaan Maulid</li>
    <li>Ceramah Agama</li>
    <li>Pembagian Sembako kepada Warga Sekitar</li>
    </ul>
    
    <p>Kegiatan ini bertujuan untuk menanamkan nilai-nilai keislaman dan kepedulian sosial kepada siswa sejak dini.</p>`,
    foto: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=600&fit=crop',
    slug: 'kegiatan-maulid-nabi-muhammad-saw-1445-h',
    category: 'Kegiatan',
    views: 890,
    created_at: '2024-01-20T14:00:00Z',
    updated_at: '2024-01-20T14:00:00Z',
  },
]

/**
 * Dummy Gallery Data
 */
const dummyKategori: GalleryKategori[] = [
  { id: '1', name: 'Akademik' },
  { id: '2', name: 'Ekstrakurikuler' },
  { id: '3', name: 'Prestasi' },
  { id: '4', name: 'Kegiatan' },
]

export const dummyGallery: Gallery[] = [
  {
    id: '1',
    name: 'Kegiatan Belajar Mengajar Semester Ganjil',
    foto: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    cover: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
    slug: 'kegiatan-belajar-mengajar-semester-ganjil',
    link: null,
    created_at: '2024-01-10T07:00:00Z',
    updated_at: '2024-01-10T07:00:00Z',
    gallery_kategori: [dummyKategori[0]],
  },
  {
    id: '2',
    name: 'Pertandingan Futsal Antar Kelas',
    foto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop',
    cover: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    slug: 'pertandingan-futsal-antar-kelas',
    link: null,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    gallery_kategori: [dummyKategori[1]],
  },
  {
    id: '3',
    name: 'Juara 1 Lomba Menggambar Tingkat Kota',
    foto: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
    slug: 'juara-1-lomba-menggambar-tingkat-kota',
    link: null,
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z',
    gallery_kategori: [dummyKategori[2]],
  },
  {
    id: '4',
    name: 'Peringatan Hari Kemerdekaan Indonesia',
    foto: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop,https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&h=600&fit=crop',
    cover: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=600&fit=crop',
    slug: 'peringatan-hari-kemerdekaan-indonesia',
    link: null,
    created_at: '2024-08-17T07:00:00Z',
    updated_at: '2024-08-17T07:00:00Z',
    gallery_kategori: [dummyKategori[3]],
  },
]

/**
 * Dummy Fasilitas Data
 */
export const dummyFasilitas: Fasilitas[] = [
  {
    id: '1',
    nama_fasilitas: 'Ruang Kelas Modern',
    desc: 'Ruang kelas yang dilengkapi dengan AC, proyektor, dan papan tulis interaktif untuk mendukung pembelajaran yang efektif dan nyaman.',
    foto: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&h=600&fit=crop',
    slug: 'ruang-kelas-modern',
    ukuran: '8m x 6m',
    kapasitas: 30,
    kelengkapan: [
      { id: '1', nama: 'AC', fasilitas_id: '1', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '2', nama: 'Proyektor', fasilitas_id: '1', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '3', nama: 'Papan Interaktif', fasilitas_id: '1', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
    ],
    deleted_at: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    nama_fasilitas: 'Laboratorium Komputer',
    desc: 'Laboratorium komputer dengan 40 unit komputer spesifikasi terbaru untuk mendukung pembelajaran TIK dan pengenalan teknologi sejak dini.',
    foto: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    slug: 'laboratorium-komputer',
    ukuran: '10m x 8m',
    kapasitas: 40,
    kelengkapan: [
      { id: '4', nama: '40 Unit PC', fasilitas_id: '2', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '5', nama: 'Internet Cepat', fasilitas_id: '2', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '6', nama: 'Software Edukasi', fasilitas_id: '2', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
    ],
    deleted_at: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    nama_fasilitas: 'Perpustakaan Digital',
    desc: 'Perpustakaan dengan koleksi buku fisik dan digital, dilengkapi dengan area baca yang nyaman dan akses internet untuk penelitian.',
    foto: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    slug: 'perpustakaan-digital',
    ukuran: '12m x 10m',
    kapasitas: 50,
    kelengkapan: [
      { id: '7', nama: 'Koleksi Buku', fasilitas_id: '3', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '8', nama: 'Area Baca', fasilitas_id: '3', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { id: '9', nama: 'WiFi Gratis', fasilitas_id: '3', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
    ],
    deleted_at: null,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

/**
 * Dummy Dukungan/Kerjasama Data
 */
export const dummyDukungan: Dukungan[] = [
  { name: 'Pimpinan Pusat Muhammadiyah', foto: 'muhammadiyah.png' },
  { name: 'Kementerian Pendidikan dan Kebudayaan', foto: 'kemendikbud.png' },
  { name: 'Dinas Pendidikan Kota Samarinda', foto: 'disdik.png' },
  { name: 'Majelis Dikdasmen Muhammadiyah', foto: 'dikdasmen.png' },
  { name: 'Lazismu', foto: 'lazismu.png' },
  { name: 'Pimpinan Wilayah Muhammadiyah Kaltim', foto: 'pwm-kaltim.png' },
]

/**
 * Get dummy data by endpoint
 * Returns null if dummy data is not enabled or endpoint not found
 */
export function getDummyData<T>(endpoint: string): T | null {
  if (!shouldUseDummyData()) {
    return null
  }

  // Remove query parameters
  const cleanEndpoint = endpoint.split('?')[0]

  switch (cleanEndpoint) {
    case '/berita':
    case '/berita/page':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyBerita,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: dummyBerita.length,
          from: 1,
          to: dummyBerita.length
        },
        links: {
          first: '/berita?page=1',
          last: '/berita?page=1',
          prev: null,
          next: null
        }
      } as unknown as T
    case '/gallery':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyGallery,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: dummyGallery.length,
          from: 1,
          to: dummyGallery.length
        },
        links: {
          first: '/gallery?page=1',
          last: '/gallery?page=1',
          prev: null,
          next: null
        }
      } as unknown as T
    case '/fasilitas':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyFasilitas,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 10,
          total: dummyFasilitas.length,
          from: 1,
          to: dummyFasilitas.length
        },
        links: {
          first: '/fasilitas?page=1',
          last: '/fasilitas?page=1',
          prev: null,
          next: null
        }
      } as unknown as T
    case '/dukungan-kerja-sama':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyDukungan,
      } as unknown as T
    default:
      // Try to match specific items
      if (cleanEndpoint.startsWith('/berita/')) {
        const slug = cleanEndpoint.replace('/berita/', '')
        const item = dummyBerita.find(b => b.slug === slug)
        if (item) {
          return {
            success: true,
            message: 'Dummy data (development only)',
            data: {
              data: item
            }
          } as unknown as T
        }
      }
      if (cleanEndpoint.startsWith('/gallery/')) {
        const slug = cleanEndpoint.replace('/gallery/', '')
        const item = dummyGallery.find(g => g.slug === slug)
        if (item) {
          return {
            success: true,
            message: 'Dummy data (development only)',
            data: {
              data: item
            }
          } as unknown as T
        }
      }
      return null
  }
}

/**
 * Log warning when using dummy data
 */
export function logDummyDataUsage(endpoint: string): void {
  if (shouldUseDummyData()) {
    console.warn(`🎭 [DUMMY DATA] Using dummy data for: ${endpoint}`)
    console.warn('🎭 [DUMMY DATA] This is ONLY for local development!')
  }
}