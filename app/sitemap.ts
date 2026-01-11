// app/sitemap.ts
import { MetadataRoute } from 'next'
import { serverGetPublic } from '@/lib/server-api'

type Berita = {
  slug: string
  updated_at: string
}

type Gallery = {
  slug: string
  updated_at: string
}

type PrestasiSiswa = {
  slug: string
  updated_at: string
}

type PrestasiSekolah = {
  slug: string
  updated_at: string
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sdmuhammadiyah3smd.com'

// ================= HELPER: Safe Date Parsing =================
function safeParseDate(dateString: string | null | undefined): Date {
  if (!dateString) return new Date()
  const parsed = new Date(dateString)
  return isNaN(parsed.getTime()) ? new Date() : parsed
}

// ================= FETCH BERITA =================
async function getAllBerita(): Promise<Berita[]> {
  try {
    const result = await serverGetPublic<any>('/list/berita')

    if (result?.success && Array.isArray(result.data)) {
      return result.data
        .filter((item: any) => item?.slug) // Filter out items without slug
        .map((item: any) => ({
          slug: item.slug,
          updated_at: item.updated_at ?? new Date().toISOString(),
        }))
    }
    return []
  } catch (error) {
    console.error('[SITEMAP] Error fetching berita:', error)
    return []
  }
}

// ================= FETCH GALLERY =================
async function getAllGallery(): Promise<Gallery[]> {
  try {
    const result = await serverGetPublic<any>('/list/gallery')

    if (result?.success && Array.isArray(result.data)) {
      return result.data
        .filter((item: any) => item?.slug)
        .map((item: any) => ({
          slug: item.slug,
          updated_at: item.updated_at ?? new Date().toISOString(),
        }))
    }
    return []
  } catch (error) {
    console.error('[SITEMAP] Error fetching gallery:', error)
    return []
  }
}

// ================= FETCH PRESTASI SISWA =================
async function getAllPrestasiSiswa(): Promise<PrestasiSiswa[]> {
  try {
    const result = await serverGetPublic<any>('/list/prestasi-siswa')

    if (result?.success && Array.isArray(result.data)) {
      return result.data
        .filter((item: any) => item?.slug)
        .map((item: any) => ({
          slug: item.slug,
          updated_at: item.updated_at ?? new Date().toISOString(),
        }))
    }
    return []
  } catch (error) {
    console.error('[SITEMAP] Error fetching prestasi siswa:', error)
    return []
  }
}

// ================= FETCH PRESTASI SEKOLAH =================
async function getAllPrestasiSekolah(): Promise<PrestasiSekolah[]> {
  try {
    const result = await serverGetPublic<any>('/list/prestasi-sekolah')

    if (result?.success && Array.isArray(result.data)) {
      return result.data
        .filter((item: any) => item?.slug)
        .map((item: any) => ({
          slug: item.slug,
          updated_at: item.updated_at ?? new Date().toISOString(),
        }))
    }
    return []
  } catch (error) {
    console.error('[SITEMAP] Error fetching prestasi sekolah:', error)
    return []
  }
}

// ================= SITEMAP =================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ===== STATIC PAGES =====
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/profil`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tentang`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/berita`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/galeri`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/prestasi-siswa`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prestasi-sekolah`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guru`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tenaga-pendidikan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/fasilitas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ekstrakurikuler`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/jadwal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pendaftaran`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ===== FETCH DYNAMIC DATA =====
  const [berita, gallery, prestasiSiswa, prestasiSekolah] = await Promise.allSettled([
    getAllBerita(),
    getAllGallery(),
    getAllPrestasiSiswa(),
    getAllPrestasiSekolah(),
  ])

  // ===== BERITA PAGES =====
  const beritaPages: MetadataRoute.Sitemap =
    berita.status === 'fulfilled'
      ? berita.value.map((item) => ({
          url: `${BASE_URL}/berita/${item.slug}`,
          lastModified: safeParseDate(item.updated_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      : []

  // ===== GALLERY PAGES =====
  const galleryPages: MetadataRoute.Sitemap =
    gallery.status === 'fulfilled'
      ? gallery.value.map((item) => ({
          url: `${BASE_URL}/galeri/${item.slug}`,
          lastModified: safeParseDate(item.updated_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      : []

  // ===== PRESTASI SISWA PAGES =====
  const prestasiSiswaPages: MetadataRoute.Sitemap =
    prestasiSiswa.status === 'fulfilled'
      ? prestasiSiswa.value.map((item) => ({
          url: `${BASE_URL}/prestasi-siswa/${item.slug}`,
          lastModified: safeParseDate(item.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      : []

  // ===== PRESTASI SEKOLAH PAGES =====
  const prestasiSekolahPages: MetadataRoute.Sitemap =
    prestasiSekolah.status === 'fulfilled'
      ? prestasiSekolah.value.map((item) => ({
          url: `${BASE_URL}/prestasi-sekolah/${item.slug}`,
          lastModified: safeParseDate(item.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      : []

  // ===== LOG STATISTICS =====
  console.log('[SITEMAP] Generated:', {
    static: staticPages.length,
    berita: beritaPages.length,
    gallery: galleryPages.length,
    prestasiSiswa: prestasiSiswaPages.length,
    prestasiSekolah: prestasiSekolahPages.length,
    total:
      staticPages.length +
      beritaPages.length +
      galleryPages.length +
      prestasiSiswaPages.length +
      prestasiSekolahPages.length,
  })

  // ===== COMBINE ALL =====
  return [
    ...staticPages,
    ...beritaPages,
    ...galleryPages,
    ...prestasiSiswaPages,
    ...prestasiSekolahPages,
  ]
}