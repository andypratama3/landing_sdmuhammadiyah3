import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Prestasi Sekolah SD Muhammadiyah 3 Samarinda',
  description:
    'Penghargaan dan prestasi sekolah SD Muhammadiyah 3 Samarinda — akreditasi Unggul, Sekolah Penggerak, dan berbagai penghargaan pendidikan.',
  path: '/prestasi-sekolah',
  keywords: ['prestasi sekolah', 'penghargaan sekolah', 'sekolah penggerak'],
})

export default function PrestasiSekolahLayout({ children }: { children: React.ReactNode }) {
  return children
}
