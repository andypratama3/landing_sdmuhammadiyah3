import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'

export const metadata: Metadata = pageMetadata({
  title: 'Guru SD Muhammadiyah 3 Samarinda | Tenaga Pendidik Profesional Islam',
  description:
    'Temukan guru profesional SD Muhammadiyah 3 Samarinda — tenaga pendidik berpengalaman dengan metode kreatif Islam. Lihat profil guru per mata pelajaran dan hubungi kami untuk informasi lebih lanjut.',
  path: '/guru',
  keywords: ['guru sd samarinda', 'tenaga pendidik', 'pengajar profesional', 'guru islam samarinda'],
})

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: BASE_URL },
          { name: 'Guru & Tenaga Pendidik', url: `${BASE_URL}/guru` },
        ]}
      />
      {children}
    </>
  )
}
