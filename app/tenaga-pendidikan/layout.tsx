import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Tenaga Pendidikan SD Muhammadiyah 3 Samarinda',
  description:
    'Struktur organisasi dan tenaga pendidikan SD Muhammadiyah 3 Samarinda — tim profesional mendukung pendidikan Islam terbaik.',
  path: '/tenaga-pendidikan',
  keywords: ['tenaga pendidikan', 'struktur organisasi sekolah'],
})

export default function TenagaPendidikanLayout({ children }: { children: React.ReactNode }) {
  return children
}
