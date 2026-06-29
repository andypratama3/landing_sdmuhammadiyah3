import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Galeri Foto Kegiatan SD Muhammadiyah 3 Samarinda',
  description:
    'Galeri foto kegiatan, acara, dan aktivitas siswa SD Muhammadiyah 3 Samarinda — dokumentasi sekolah kreatif Islam terbaik di Samarinda.',
  path: '/galeri',
  keywords: ['galeri sekolah', 'foto kegiatan', 'dokumentasi siswa'],
})

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children
}
