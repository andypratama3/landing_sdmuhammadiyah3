import type { Metadata } from 'next'
import { getSystemAuthToken } from '@/lib/server-api'
import {
  generatePrestasiSekolahMetadata,
  generatePrestasiSekolahJsonLd,
} from '@/lib/metadata-helpers'
import { JsonLd } from '@/components/JsonLd'
import type { PrestasiSekolah } from '@/types/prestasi.types'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

async function fetchPrestasi(slug: string): Promise<PrestasiSekolah | null> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://app.sdmuhammadiyah3smd.com/api/v2'
  try {
    const token = await getSystemAuthToken()
    const res = await fetch(`${apiUrl}/prestasi/sekolah/${slug}`, {
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
  const prestasi = await fetchPrestasi(slug)
  if (!prestasi?.name) return { title: 'Prestasi Tidak Ditemukan' }
  return generatePrestasiSekolahMetadata(prestasi)
}

export default async function PrestasiSekolahSlugLayout({
  params,
  children,
}: Props) {
  const { slug } = await params
  const prestasi = await fetchPrestasi(slug)

  return (
    <>
      {prestasi?.name && (
        <JsonLd data={generatePrestasiSekolahJsonLd(prestasi)} />
      )}
      {children}
    </>
  )
}
