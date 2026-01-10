// lib/metadata-helpers.ts
import { Metadata } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sdmuhammadiyah3smd.com'

// ================= GENERATE BERITA METADATA =================
export function generateBeritaMetadata(berita: {
  title: string
  excerpt?: string
  content?: string
  image?: string
  slug: string
  created_at?: string
  author?: string
}): Metadata {
  const description =
    berita.excerpt ||
    berita.content?.substring(0, 160) ||
    'Berita terbaru dari SD Muhammadiyah 3 Samarinda'

  const imageUrl = berita.image
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${berita.image}`
    : `${BASE_URL}/SD3_logo1.png`

  return {
    title: berita.title,
    description,
    keywords: [
      berita.title,
      'SD Muhammadiyah 3 Samarinda',
      'Berita Sekolah',
      'Sekolah Kreatif',
      'Berita Pendidikan',
    ],
    authors: [{ name: berita.author || 'SD Muhammadiyah 3 Samarinda' }],
    openGraph: {
      type: 'article',
      title: berita.title,
      description,
      url: `${BASE_URL}/berita/${berita.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: berita.title,
        },
      ],
      publishedTime: berita.created_at,
      siteName: 'SD Muhammadiyah 3 Samarinda',
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/berita/${berita.slug}`,
    },
  }
}

// ================= GENERATE GALLERY METADATA =================
export function generateGalleryMetadata(gallery: {
  title: string
  description?: string
  image?: string
  slug: string
  created_at?: string
}): Metadata {
  const description =
    gallery.description ||
    `Galeri foto ${gallery.title} - SD Muhammadiyah 3 Samarinda`

  const imageUrl = gallery.image
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${gallery.image}`
    : `${BASE_URL}/SD3_logo1.png`

  return {
    title: gallery.title,
    description,
    keywords: [
      gallery.title,
      'SD Muhammadiyah 3 Samarinda',
      'Galeri Sekolah',
      'Foto Kegiatan',
      'Aktivitas Siswa',
    ],
    openGraph: {
      type: 'website',
      title: gallery.title,
      description,
      url: `${BASE_URL}/galeri/${gallery.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: gallery.title,
        },
      ],
      siteName: 'SD Muhammadiyah 3 Samarinda',
    },
    twitter: {
      card: 'summary_large_image',
      title: gallery.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/galeri/${gallery.slug}`,
    },
  }
}

// ================= GENERATE PRESTASI METADATA =================
export function generatePrestasiMetadata(prestasi: {
  title: string
  description?: string
  juara?: string
  image?: string
  slug: string
  type: 'siswa' | 'sekolah'
}): Metadata {
  const description =
    prestasi.description ||
    `Prestasi ${prestasi.juara || ''} - ${prestasi.title} - SD Muhammadiyah 3 Samarinda`

  const imageUrl = prestasi.image
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${prestasi.image}`
    : `${BASE_URL}/SD3_logo1.png`

  const basePath = prestasi.type === 'siswa' ? 'prestasi-siswa' : 'prestasi-sekolah'

  return {
    title: prestasi.title,
    description,
    keywords: [
      prestasi.title,
      prestasi.juara || '',
      'SD Muhammadiyah 3 Samarinda',
      'Prestasi Sekolah',
      'Prestasi Siswa',
      'Juara',
    ],
    openGraph: {
      type: 'article',
      title: prestasi.title,
      description,
      url: `${BASE_URL}/${basePath}/${prestasi.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: prestasi.title,
        },
      ],
      siteName: 'SD Muhammadiyah 3 Samarinda',
    },
    twitter: {
      card: 'summary_large_image',
      title: prestasi.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/${basePath}/${prestasi.slug}`,
    },
  }
}

// ================= GENERATE JSON-LD FOR ARTICLES =================
export function generateArticleJsonLd(berita: {
  title: string
  content: string
  image?: string
  slug: string
  created_at?: string
  updated_at?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: berita.title,
    image: berita.image
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${berita.image}`
      : `${BASE_URL}/SD3_logo1.png`,
    datePublished: berita.created_at,
    dateModified: berita.updated_at || berita.created_at,
    author: {
      '@type': 'Organization',
      name: berita.author || 'SD Muhammadiyah 3 Samarinda',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SD Muhammadiyah 3 Samarinda',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/SD3_logo1.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/berita/${berita.slug}`,
    },
  }
}