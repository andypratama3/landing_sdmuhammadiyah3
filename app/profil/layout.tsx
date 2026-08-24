import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'

export const metadata: Metadata = pageMetadata({
  title: 'Profil SD Muhammadiyah 3 Samarinda | SD Islam Terbaik di Samarinda Seberang',
  description:
    'Kenali SD Muhammadiyah 3 Samarinda — sekolah Islam kreatif dengan akreditasi A, program tahfidz, dan prestasi siswa. Lokasi strategis di Jl. Dato Iba, Samarinda Seberang. Lihat visi misi dan nilai sekolah kami.',
  path: '/profil',
  keywords: ['profil sekolah', 'visi misi', 'npsn sd muhammadiyah', 'sd islam samarinda', 'sekolah kreatif'],
})

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: BASE_URL },
          { name: 'Profil Sekolah', url: `${BASE_URL}/profil` },
        ]}
      />
      {children}
    </>
  )
}
