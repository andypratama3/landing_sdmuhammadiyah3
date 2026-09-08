import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'

export const metadata: Metadata = pageMetadata({
  title: 'Fasilitas & Sarana Prasarana SD Muhammadiyah 3 Samarinda',
  description:
    'Fasilitas modern SD Muhammadiyah 3 Samarinda — ruang kelas, perpustakaan, lapangan, lab komputer untuk pendidikan kreatif terbaik.',
  path: '/fasilitas',
  keywords: ['fasilitas sekolah', 'sarana prasarana', 'ruang kelas modern'],
})

export default function FasilitasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: BASE_URL },
          { name: 'Fasilitas', url: `${BASE_URL}/fasilitas` },
        ]}
      />
      {children}
    </>
  )
}
