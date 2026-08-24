import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'

export const metadata: Metadata = pageMetadata({
  title: 'Jadwal Pelajaran SD Muhammadiyah 3 Samarinda | Cek Jadwal Kelas 1-6',
  description:
    'Lihat jadwal pelajaran lengkap SD Muhammadiyah 3 Samarinda untuk semua kelas. Jadwal terbaru tahun ajaran 2025/2026 — interaktif, bisa dicetak, dan tersedia PDF. Cek jadwal anak Anda sekarang!',
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
