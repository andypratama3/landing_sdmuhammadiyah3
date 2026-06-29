import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Guru & Tenaga Pendidik SD Muhammadiyah 3 Samarinda',
  description:
    'Kenali guru profesional SD Muhammadiyah 3 Samarinda — tenaga pendidik berpengalaman, metode kreatif, dan dedikasi tinggi untuk pendidikan Islam terbaik.',
  path: '/guru',
  keywords: ['guru sd samarinda', 'tenaga pendidik', 'pengajar profesional'],
})

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return children
}
