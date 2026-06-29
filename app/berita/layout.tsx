import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Berita & Pengumuman SD Muhammadiyah 3 Samarinda',
  description:
    'Berita terbaru, pengumuman SPMB, dan informasi kegiatan SD Muhammadiyah 3 Samarinda — sekolah kreatif Islam terbaik di Samarinda Seberang.',
  path: '/berita',
  keywords: ['berita sekolah', 'pengumuman spmb', 'info pendaftaran'],
})

export default function BeritaLayout({ children }: { children: React.ReactNode }) {
  return children
}
