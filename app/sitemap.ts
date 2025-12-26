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

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sdmuhammadiyah3smd.com'

// ================= FETCH BERITA =================
async function getAllBerita(): Promise<Berita[]> {
  try {
    const result = await serverGetPublic<any>('/list/berita')

    if (result?.success && Array.isArray(result.data)) {
      return result.data.map((item: any) => ({
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
      return result.data.map((item: any) => ({
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

// ================= SITEMAP =================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ===== STATIC PAGES =====
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/profil-sekolah`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/jadwal`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/guru`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tenaga-pendidikan`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ekstrakurikuler`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/prestasi-siswa`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/prestasi-sekolah`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/berita`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/fasilitas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/pendaftaran`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]

  // ===== DYNAMIC DATA =====
  const [berita, gallery] = await Promise.all([
    getAllBerita(),
    getAllGallery(),
  ])

  const beritaPages: MetadataRoute.Sitemap = berita.map(item => ({
    url: `${BASE_URL}/berita/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const galleryPages: MetadataRoute.Sitemap = gallery.map(item => ({
    url: `${BASE_URL}/gallery/${item.slug}`, // ✅ konsisten
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...beritaPages, ...galleryPages]
}
