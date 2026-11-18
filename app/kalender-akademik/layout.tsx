import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

// Halaman ini 'use client', jadi metadata tidak boleh diekspor dari page.tsx.
// Route ini sudah terindeks organik tapi sebelumnya memakai title default
// layout (72 char, deskripsi 224 char — keduanya dipotong Google).
export const metadata: Metadata = pageMetadata({
  title: 'Kalender Akademik | SD Muhammadiyah 3 Samarinda',
  description:
    'Jadwal akademik SD Muhammadiyah 3 Samarinda — ujian, libur, kegiatan, dan deadline dalam satu kalender yang selalu terupdate.',
  path: '/kalender-akademik',
  keywords: ['kalender akademik sd', 'jadwal ujian sd', 'jadwal libur sekolah', 'kalender sekolah samarinda'],
})

export default function KalenderAkademikLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}