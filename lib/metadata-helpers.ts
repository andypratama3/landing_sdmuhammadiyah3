import { Metadata } from 'next'
import { BASE_URL, SCHOOL, SEO_KEYWORDS } from './school-info'
import { articleSchema, achievementSchema } from './structured-data'
import type { Berita } from '@/types/berita.types'
import type { PrestasiSiswa, PrestasiSekolah } from '@/types/prestasi.types'
import type { Gallery } from '@/types/gallery.types'
import { resolveImageUrl } from './image-url'

/** Potong di batas kata — jangan pernah memotong di tengah kata untuk meta. */
function clip(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const space = cut.lastIndexOf(' ')
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:·|-]+$/, '')}…`
}

function stripHtml(html: string, max = 158) {
  return clip(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(), max)
}

function beritaImage(foto?: string) {
  return foto ? resolveImageUrl(foto, "img/berita") : `${BASE_URL}/SD3_logo1.png`
}

function galleryImage(gallery: Gallery) {
  if (gallery.cover) return resolveImageUrl(gallery.cover, "img/gallery/cover")
  if (gallery.foto) return resolveImageUrl(gallery.foto.split(',')[0].trim(), "img/gallery")
  return `${BASE_URL}/SD3_logo1.png`
}

function prestasiImage(foto?: string | null) {
  return foto ? resolveImageUrl(foto, "img/prestasi") : `${BASE_URL}/SD3_logo1.png`
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

  // `absolute` menonaktifkan template `%s | <sekolah>` milik layout. Tanpa ini
  // setiap halaman mengulang nama sekolah 2x (title 77-105 karakter, dipotong
  // Google di ~60) dan berhenti tampil di SERP.
  return {
    title: { absolute: title },
    description: clip(description, 158),
    keywords: [...SEO_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: 'id_ID',
      url,
      title,
      description: clip(description, 158),
      siteName: SCHOOL.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: clip(description, 158),
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
