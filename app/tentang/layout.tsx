import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Tentang Kami — Visi Misi SD Muhammadiyah 3 Samarinda',
  description:
    'Visi, misi, dan kepengurusan SD Muhammadiyah 3 Samarinda — sekolah kreatif Islam terbaik di Samarinda Seberang dengan akreditasi Unggul.',
  path: '/tentang',
  keywords: ['visi misi', 'kepengurusan sekolah', 'tentang sekolah'],
})

export default function TentangLayout({ children }: { children: React.ReactNode }) {
  return children
}
