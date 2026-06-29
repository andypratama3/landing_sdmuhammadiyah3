import { Metadata } from 'next'
import { BASE_URL, SCHOOL, SEO_KEYWORDS } from './school-info'
import { articleSchema, achievementSchema } from './structured-data'
import type { Berita } from '@/types/berita.types'
import type { PrestasiSiswa, PrestasiSekolah } from '@/types/prestasi.types'
import type { Gallery } from '@/types/gallery.types'

const STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://dashboard.sdmuhammadiyah3smd.com/storage'

function stripHtml(html: string, max = 160) {
  return html.replace(/<[^>]*>/g, '').trim().slice(0, max)
}

function beritaImage(foto?: string) {
  return foto ? `${STORAGE}/img/berita/${foto}` : `${BASE_URL}/SD3_logo1.png`
}

function galleryImage(gallery: Gallery) {
  if (gallery.cover) return `${STORAGE}/img/gallery/cover/${gallery.cover}`
  if (gallery.foto) return `${STORAGE}/img/gallery/${gallery.foto.split(',')[0].trim()}`
  return `${BASE_URL}/SD3_logo1.png`
}

function prestasiImage(foto?: string | null) {
  return foto ? `${STORAGE}/img/prestasi/${foto}` : `${BASE_URL}/SD3_logo1.png`
}

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
  type?: 'website' | 'article'
}): Metadata {
  const url = `${BASE_URL}${path}`
  const image = ogImage || `${BASE_URL}/SD3_logo1.png`

  return {
    title,
    description,
    keywords: [...SEO_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'id_ID',
      url,
      title,
      description,
      siteName: SCHOOL.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function generateBeritaMetadata(berita: Berita): Metadata {
  const description = stripHtml(berita.desc || 'Berita terbaru dari SD Muhammadiyah 3 Samarinda')
  const imageUrl = beritaImage(berita.foto)

  return pageMetadata({
    title: berita.judul,
    description,
    path: `/berita/${berita.slug}`,
    keywords: [berita.category, 'berita sekolah', 'pengumuman sd samarinda'],
    ogImage: imageUrl,
    type: 'article',
  })
}

export function generateGalleryMetadata(gallery: Gallery): Metadata {
  const description = `Galeri foto ${gallery.name} - ${SCHOOL.name}`
  return pageMetadata({
    title: gallery.name,
    description,
    path: `/galeri/${gallery.slug}`,
    keywords: ['galeri sekolah', 'foto kegiatan', 'aktivitas siswa'],
    ogImage: galleryImage(gallery),
  })
}

export function generatePrestasiSiswaMetadata(prestasi: PrestasiSiswa): Metadata {
  const description =
    stripHtml(prestasi.description || '') ||
    `${prestasi.juara} ${prestasi.name} - ${SCHOOL.name}`
  return pageMetadata({
    title: `${prestasi.juara} - ${prestasi.name}`,
    description,
    path: `/prestasi-siswa/${prestasi.slug}`,
    keywords: [prestasi.juara, prestasi.tingkat, 'prestasi siswa', 'juara samarinda'],
    ogImage: prestasiImage(prestasi.foto),
    type: 'article',
  })
}

export function generatePrestasiSekolahMetadata(prestasi: PrestasiSekolah): Metadata {
  const description =
    stripHtml(prestasi.description || '') || `${prestasi.name} - ${SCHOOL.name}`
  return pageMetadata({
    title: prestasi.name,
    description,
    path: `/prestasi-sekolah/${prestasi.slug}`,
    keywords: ['prestasi sekolah', 'penghargaan sekolah'],
    ogImage: prestasiImage(prestasi.foto),
    type: 'article',
  })
}

export function generateArticleJsonLd(berita: Berita) {
  return articleSchema({
    title: berita.judul,
    description: stripHtml(berita.desc || ''),
    image: beritaImage(berita.foto),
    slug: berita.slug,
    publishedAt: berita.created_at,
    modifiedAt: berita.updated_at,
  })
}

export function generatePrestasiSiswaJsonLd(prestasi: PrestasiSiswa) {
  return achievementSchema({
    title: prestasi.name,
    description: stripHtml(prestasi.description || ''),
    image: prestasiImage(prestasi.foto),
    slug: prestasi.slug,
    juara: prestasi.juara,
    date: prestasi.tanggal,
    level: prestasi.tingkat,
    type: 'siswa',
  })
}

export function generatePrestasiSekolahJsonLd(prestasi: PrestasiSekolah) {
  return achievementSchema({
    title: prestasi.name,
    description: stripHtml(prestasi.description || ''),
    image: prestasiImage(prestasi.foto),
    slug: prestasi.slug,
    date: prestasi.tanggal,
    type: 'sekolah',
  })
}
