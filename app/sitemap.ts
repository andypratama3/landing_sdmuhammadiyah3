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

async function getAllBerita(): Promise<Berita[]> {
  try {
    const result = await serverGetPublic<any>('/list/berita')

    // Laravel success response
    if (result?.success && Array.isArray(result.data)) {
      return result.data.map((item: any) => ({
        slug: item.slug,
        updated_at: item.updated_at ?? new Date().toISOString(),
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching berita for sitemap:', error)
    return []
  }
}


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
    console.error('Error fetching gallery for sitemap:', error)
    return []
  }
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sdmuhammadiyah3smd.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/profil-sekolah`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/jadwal`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/guru`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tenaga-pendidikan`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/ekstrakurikuler`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/prestasi-siswa`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/prestasi-sekolah`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/fasilitas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/pembayaran`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/pendaftaran`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]

   
  const [berita, gallery] = await Promise.all([
    getAllBerita(),
    getAllGallery(),
  ])

  const beritaPages: MetadataRoute.Sitemap = berita.map((item) => ({
    url: `${baseUrl}/berita/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

 
  const galleryPages: MetadataRoute.Sitemap = gallery.map(item => ({
    url: `${baseUrl}/galeri/${item.slug}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

 

  return [...staticPages, ...beritaPages, ...galleryPages]
}
