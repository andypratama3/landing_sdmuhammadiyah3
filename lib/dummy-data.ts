/**
 * Dummy Data for Local Development Only
 * This file should NEVER be used in production
 * All data here is for development/testing purposes only
 */

import type { Berita } from '@/types/berita.types'
import type { Gallery, GalleryKategori } from '@/types/gallery.types'
import type { Fasilitas } from '@/types'
import type { Dukungan } from '@/types/dukungan.types'
import type { Alumni } from '@/types/alumni.types'
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
 * Dummy Visitor Data
 */
export const dummyVisitorData = {
  visitor_by_day: 128,
  visitor_by_month: 2450,
  visitor_by_year: 18920,
  visitor_all_year: 45280,
  trend: 'up' as const,
  trend_percentage: 12.5,
  peak_hour: '10:00 - 11:00',
}

/**
 * Dummy Tenaga Kependidikan Data
 */
export const dummyTenagaKependidikan = [
  {
    id: '1',
    name: 'Kepala Sekolah',
    slug: 'kepala-sekolah',
    staff: [
      {
        id: 'staff-1',
        name: 'H. Ahmad Fauzi, M.Pd',
        jabatan: 'Kepala Sekolah',
        foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        slug: 'h-ahmad-fauzi-mpd',
        description: 'Kepala SD Muhammadiyah 3 Samarinda',
      },
    ],
    children: [
      {
        id: '2',
        name: 'Wakil Kepala Sekolah',
        slug: 'wakil-kepala-sekolah',
        staff: [],
        children: [
          {
            id: '3',
            name: 'Waka Kurikulum',
            slug: 'waka-kurikulum',
            staff: [
              {
                id: 'staff-2',
                name: 'Siti Rahmah, S.Pd',
                jabatan: 'Waka Kurikulum',
                foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
                slug: 'siti-rahmah-spd',
                description: 'Penanggung Jawab Kurikulum dan Pembelajaran',
              },
            ],
            children: [],
          },
          {
            id: '4',
            name: 'Waka Kesiswaan',
            slug: 'waka-kesiswaan',
            staff: [
              {
                id: 'staff-3',
                name: 'Budi Santoso, S.Pd',
                jabatan: 'Waka Kesiswaan',
                foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
                slug: 'budi-santoso-spd',
                description: 'Penanggung Jawab Kesiswaan dan Ekstrakurikuler',
              },
            ],
            children: [],
          },
        ],
      },
      {
        id: '5',
        name: 'Tata Usaha & Administrasi',
        slug: 'tata-usaha-administrasi',
        staff: [
          {
            id: 'staff-4',
            name: 'Dewi Lestari, A.Md',
            jabatan: 'Kepala TU',
            foto: 'https://images.unsplash.com/photo-1580894732468-9556886e00b8?w=400&h=500&fit=crop',
            slug: 'dewi-lestari-amd',
            description: 'Staf Administrasi & Tata Usaha',
          },
        ],
        children: [],
      },
    ],
  },
]

/**
 * Dummy Alumni Data — 20 entries with realistic Indonesian profiles
 */
export const dummyAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Ahmad Fadhilah Rizky',
    slug: 'ahmad-fadhilah-rizky',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
    graduation_year: 2020,
    class_name: '6A',
    current_profession: 'Pelajar SMA',
    workplace: 'SMA Muhammadiyah 1 Samarinda',
    achievement: 'Juara 1 Olimpiade Matematika Tingkat Kota Samarinda 2023',
    description:
      'Alumni berprestasi yang kini melanjutkan pendidikan di SMA Muhammadiyah 1 Samarinda dengan berbagai prestasi akademik.',
    social_media: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '2',
    name: 'Siti Aisyah Maharani',
    slug: 'siti-aisyah-maharani',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80',
    graduation_year: 2018,
    class_name: '6B',
    current_profession: 'Mahasiswi Kedokteran',
    workplace: 'Universitas Mulawarman',
    achievement: 'Penerima Beasiswa Bidikmisi & Hafizah 15 Juz',
    description:
      'Kini menempuh pendidikan Kedokteran di Universitas Mulawarman. Aktif sebagai relawan kesehatan di berbagai kegiatan sosial.',
    social_media: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '3',
    name: 'Muhammad Hafizh Pratama',
    slug: 'muhammad-hafizh-pratama',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80',
    graduation_year: 2015,
    class_name: '6C',
    current_profession: 'Software Engineer',
    workplace: 'PT Telkom Indonesia',
    achievement: 'Top 10 Hackathon Nasional Kominfo 2024',
    description:
      'Bekerja sebagai Software Engineer di PT Telkom Indonesia. Mengembangkan aplikasi digital untuk transformasi layanan publik.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '4',
    name: 'Nur Haliza Putri',
    slug: 'nur-haliza-putri',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80',
    graduation_year: 2016,
    class_name: '6A',
    current_profession: 'Guru SD',
    workplace: 'SD Islam Terpadu Al-Furqan Samarinda',
    achievement: 'Guru Berprestasi Tingkat Kota Samarinda 2023',
    description:
      'Menjadi guru SD dan menginspirasi generasi berikutnya dengan metode pembelajaran kreatif. Peraih penghargaan guru berprestasi.',
    social_media: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '5',
    name: 'Rizal Maulana Akbar',
    slug: 'rizal-maulana-akbar',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=80',
    graduation_year: 2012,
    class_name: '6B',
    current_profession: 'Dokter Umum',
    workplace: 'RSUD Abdul Wahab Sjahranie Samarinda',
    achievement: 'Lulusan Terbaik Fakultas Kedokteran UNMUL 2022',
    description:
      'Dokter umum yang bertugas di RSUD AWS Samarinda. Aktif dalam program kesehatan masyarakat di Kalimantan Timur.',
    social_media: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '6',
    name: 'Farah Nabilah Zahra',
    slug: 'farah-nabilah-zahra',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&q=80',
    graduation_year: 2019,
    class_name: '6A',
    current_profession: 'Content Creator',
    workplace: 'Freelance / YouTube',
    achievement: '100K Subscribers YouTube — Konten Edukasi Islam Anak',
    description:
      'Membuat konten edukatif Islam untuk anak-anak di YouTube dengan lebih dari 100 ribu subscriber. Menginspirasi generasi muda.',
    social_media: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },
  {
    id: '7',
    name: 'Bagas Eko Prasetyo',
    slug: 'bagas-eko-prasetyo',
    photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&q=80',
    graduation_year: 2014,
    class_name: '6C',
    current_profession: 'Atlet Renang Nasional',
    workplace: 'PRSI Kalimantan Timur',
    achievement: 'Medali Perak PON XX Papua 2021 cabang Renang',
    description:
      'Atlet renang kebanggaan Kalimantan Timur yang meraih medali perak di PON XX Papua. Kini melatih atlet muda di Samarinda.',
    social_media: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '8',
    name: 'Dina Rahmawati',
    slug: 'dina-rahmawati',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop&q=80',
    graduation_year: 2017,
    class_name: '6B',
    current_profession: 'Mahasiswi Hukum',
    workplace: 'Universitas Brawijaya Malang',
    achievement: 'Penerima Beasiswa Unggulan Kemendikbud 2022',
    description:
      'Menempuh pendidikan Hukum di Universitas Brawijaya dengan beasiswa unggulan. Aktif di organisasi kemahasiswaan.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '9',
    name: 'Yusuf Al-Hakim',
    slug: 'yusuf-al-hakim',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80',
    graduation_year: 2013,
    class_name: '6A',
    current_profession: 'Pengusaha Muda',
    workplace: 'CV. Berkah Kaltim — Kuliner',
    achievement: 'Forbes 30 Under 30 Indonesia 2024 — Kategori Bisnis',
    description:
      'Mendirikan bisnis kuliner yang kini memiliki 12 cabang di Kalimantan Timur. Terinspirasi nilai kewirausahaan dari sekolah.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },
  {
    id: '10',
    name: 'Anisa Dewi Cahyani',
    slug: 'anisa-dewi-cahyani',
    photo: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=500&fit=crop&q=80',
    graduation_year: 2020,
    class_name: '6C',
    current_profession: 'Pelajar SMA',
    workplace: 'SMAN 1 Samarinda',
    achievement: 'Juara 1 Lomba Baca Puisi Tingkat Provinsi Kaltim 2024',
    description:
      'Siswi SMAN 1 Samarinda yang aktif di bidang sastra dan seni. Membawa nama harum SD Muhammadiyah 3 ke tingkat provinsi.',
    social_media: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '11',
    name: 'Ilham Firdaus Habibi',
    slug: 'ilham-firdaus-habibi',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
    graduation_year: 2011,
    class_name: '6B',
    current_profession: 'Dosen',
    workplace: 'Universitas Mulawarman — Fakultas Teknik',
    achievement: 'Peneliti Muda Terbaik LPPM UNMUL 2023',
    description:
      'Dosen Teknik Informatika di Universitas Mulawarman. Aktif melakukan penelitian di bidang kecerdasan buatan dan IoT.',
    social_media: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '12',
    name: 'Rahma Aulia Sari',
    slug: 'rahma-aulia-sari',
    photo: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=500&fit=crop&q=80',
    graduation_year: 2018,
    class_name: '6A',
    current_profession: 'Apoteker',
    workplace: 'Apotek Kimia Farma Samarinda',
    achievement: 'Lulusan Cum Laude Farmasi UNMUL 2023',
    description:
      'Apoteker profesional yang lulus dengan predikat cumlaude dari Fakultas Farmasi Universitas Mulawarman.',
    social_media: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '13',
    name: 'Daffa Miftahul Ulum',
    slug: 'daffa-miftahul-ulum',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80',
    graduation_year: 2016,
    class_name: '6C',
    current_profession: 'ASN / PNS',
    workplace: 'Dinas Pendidikan Kota Samarinda',
    achievement: 'ASN Berprestasi Kota Samarinda 2024',
    description:
      'Pegawai Negeri Sipil di Dinas Pendidikan Kota Samarinda. Berkontribusi dalam peningkatan mutu pendidikan daerah.',
    social_media: {
      facebook: 'https://facebook.com',
    },
  },
  {
    id: '14',
    name: 'Safira Nur Indah',
    slug: 'safira-nur-indah',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80',
    graduation_year: 2019,
    class_name: '6B',
    current_profession: 'Desainer Grafis',
    workplace: 'Studio Kreatif Borneo Design',
    achievement: 'Juara 1 Lomba Desain Logo Kaltim Youth Festival 2023',
    description:
      'Desainer grafis berbakat yang mendirikan studio kreatif sendiri di usia muda. Karya-karyanya telah digunakan oleh berbagai instansi pemerintah.',
    social_media: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: '15',
    name: 'Hendra Kurniawan',
    slug: 'hendra-kurniawan',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=500&fit=crop&q=80',
    graduation_year: 2010,
    class_name: '6A',
    current_profession: 'Notaris',
    workplace: 'Kantor Notaris & PPAT Samarinda',
    achievement: 'Notaris Termuda Kalimantan Timur 2020',
    description:
      'Notaris & PPAT yang telah melayani ribuan klien di Samarinda. Alumni tertua yang masih aktif berkontribusi di komunitas alumni.',
    social_media: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
    },
  },
  {
    id: '16',
    name: 'Zahra Fauziyah Noor',
    slug: 'zahra-fauziyah-noor',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&q=80',
    graduation_year: 2021,
    class_name: '6B',
    current_profession: 'Pelajar SMP',
    workplace: 'SMP Muhammadiyah 1 Samarinda',
    achievement: 'Hafizah 30 Juz di usia 14 tahun',
    description:
      'Alumni termuda yang telah menyelesaikan hafalan 30 Juz Al-Quran di usia 14 tahun. Kebanggaan keluarga besar SD Muhammadiyah 3.',
    social_media: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '17',
    name: 'Farhan Maulana Syah',
    slug: 'farhan-maulana-syah',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&q=80',
    graduation_year: 2015,
    class_name: '6C',
    current_profession: 'Jurnalis',
    workplace: 'Kaltim Post — Media Group',
    achievement: 'Penulis Opini Terbaik AJI Samarinda 2023',
    description:
      'Jurnalis profesional di Kaltim Post. Fokus pada liputan pendidikan dan sosial kemasyarakatan di Kalimantan Timur.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },
  {
    id: '18',
    name: 'Putri Annisa Ramadhani',
    slug: 'putri-annisa-ramadhani',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&q=80',
    graduation_year: 2017,
    class_name: '6A',
    current_profession: 'Bidan',
    workplace: 'Puskesmas Samarinda Seberang',
    achievement: 'Tenaga Kesehatan Teladan Puskesmas 2024',
    description:
      'Bidan profesional yang bertugas di Puskesmas Samarinda Seberang. Memberikan pelayanan kesehatan ibu dan anak di wilayah sekitar sekolah.',
    social_media: {
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '19',
    name: 'Alif Hidayatullah',
    slug: 'alif-hidayatullah',
    photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop&q=80',
    graduation_year: 2014,
    class_name: '6B',
    current_profession: 'Arsitek',
    workplace: 'PT. Cipta Karya Nusantara',
    achievement: 'Juara 2 Kompetisi Desain Arsitektur Hijau Nasional 2023',
    description:
      'Arsitek yang menekuni desain bangunan ramah lingkungan. Telah merancang lebih dari 50 bangunan di Kalimantan Timur.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: '20',
    name: 'Nadia Pertiwi Kusuma',
    slug: 'nadia-pertiwi-kusuma',
    photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&q=80',
    graduation_year: 2013,
    class_name: '6C',
    current_profession: 'Psikolog Klinis',
    workplace: 'Klinik Psikologi Harmoni Samarinda',
    achievement: 'Psikolog Terbaik Kalimantan Timur versi IDI 2024',
    description:
      'Psikolog klinis yang mendirikan klinik konseling khusus anak dan remaja. Telah membantu ratusan siswa mengatasi masalah psikologis.',
    social_media: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
    },
  },
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
    case '/views':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyVisitorData,
      } as unknown as T
    case '/tenaga-kependidikan':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyTenagaKependidikan,
      } as unknown as T
    case '/list/alumni':
      return {
        success: true,
        message: 'Dummy data (development only)',
        data: dummyAlumni,
        meta: {
          total: dummyAlumni.length,
          page: 1,
          per_page: dummyAlumni.length,
        },
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