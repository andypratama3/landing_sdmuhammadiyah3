import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Jadwal Pelajaran SD Muhammadiyah 3 Samarinda 2025/2026 | Download PDF',
  description:
    'Lihat dan unduh jadwal pelajaran SD Muhammadiyah 3 Samarinda per kelas. Jadwal terbaru tahun ajaran 2025/2026 — interaktif dan bisa dicetak.',
  path: '/jadwal',
  keywords: ['jadwal pelajaran sd', 'jadwal kelas', 'download jadwal pdf'],
})

export default function JadwalLayout({ children }: { children: React.ReactNode }) {
  return children
}
