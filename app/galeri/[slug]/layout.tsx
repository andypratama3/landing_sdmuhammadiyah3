import type { Metadata } from 'next'
import { getSystemAuthToken } from '@/lib/server-api'
import { generateGalleryMetadata } from '@/lib/metadata-helpers'
import type { Gallery } from '@/types/gallery.types'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

async function fetchGallery(slug: string): Promise<Gallery | null> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://dashboard.sdmuhammadiyah3smd.com/api/v2'
  try {
    const token = await getSystemAuthToken()
    const res = await fetch(`${apiUrl}/gallery/${slug}`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data?.data || json?.data || json
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const gallery = await fetchGallery(slug)
  if (!gallery?.name) return { title: 'Galeri Tidak Ditemukan' }
  return generateGalleryMetadata(gallery)
}

export default function GaleriSlugLayout({ children }: Props) {
  return children
}
