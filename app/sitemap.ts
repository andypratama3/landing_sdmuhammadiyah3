// app/sitemap.ts
import { MetadataRoute } from 'next'

async function getAllBerita() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://dashobard.sdmuhammadiyah3smd.com/api/v2'
    const response = await fetch(`${baseURL}/berita?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      return []
    }

    const result = await response.json()
    return result.success && result.data ? result.data : []
  } catch (error) {
    console.error('Error fetching berita for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sdmuhammadiyah3smd.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fasilitas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pendaftaran`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Dynamic berita pages
  const allBerita = await getAllBerita()
  const beritaPages: MetadataRoute.Sitemap = allBerita.map((berita: any) => ({
    url: `${baseUrl}/berita/${berita.slug}`,
    lastModified: new Date(berita.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...beritaPages]
}
