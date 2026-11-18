import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'

export const metadata: Metadata = pageMetadata({
  title: 'Jadwal Kelas 1-6 | SD Muhammadiyah 3 Samarinda',
  description:
    'Jadwal pelajaran SD Muhammadiyah 3 Samarinda untuk kelas 1-6, tahun ajaran berjalan. Interaktif dan bisa dicetak — cek jadwal anak Anda.',
  path: '/jadwal',
  keywords: ['jadwal pelajaran sd', 'jadwal kelas', 'download jadwal pdf', 'jadwal sd samarinda'],
})

export default function JadwalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: BASE_URL },
          { name: 'Jadwal Pelajaran', url: `${BASE_URL}/jadwal` },
        ]}
      />
      {children}
    </>
  )
}
