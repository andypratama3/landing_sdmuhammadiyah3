import type { Metadata } from 'next'
import { getSystemAuthToken } from '@/lib/server-api'
import {
  generatePrestasiSiswaMetadata,
  generatePrestasiSiswaJsonLd,
} from '@/lib/metadata-helpers'
import { JsonLd } from '@/components/JsonLd'
import type { PrestasiSiswa } from '@/types/prestasi.types'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

async function fetchPrestasi(slug: string): Promise<PrestasiSiswa | null> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    'https://dashboard.sdmuhammadiyah3smd.com/api/v2'
  try {
    const token = await getSystemAuthToken()
    const res = await fetch(`${apiUrl}/prestasi/siswa/${slug}`, {
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
  return generatePrestasiSiswaMetadata(prestasi)
}

export default async function PrestasiSiswaSlugLayout({
  params,
  children,
}: Props) {
  const { slug } = await params
  const prestasi = await fetchPrestasi(slug)

  return (
    <>
      {prestasi?.name && (
        <JsonLd data={generatePrestasiSiswaJsonLd(prestasi)} />
      )}
      {children}
    </>
  )
}
