import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Fasilitas & Sarana Prasarana SD Muhammadiyah 3 Samarinda',
  description:
    'Fasilitas modern SD Muhammadiyah 3 Samarinda — ruang kelas, perpustakaan, lapangan, lab komputer untuk pendidikan kreatif terbaik.',
  path: '/fasilitas',
  keywords: ['fasilitas sekolah', 'sarana prasarana', 'ruang kelas modern'],
})

export default function FasilitasLayout({ children }: { children: React.ReactNode }) {
  return children
}
