import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Ekstrakurikuler SD Muhammadiyah 3 Samarinda',
  description:
    'Program ekstrakurikuler SD Muhammadiyah 3 Samarinda — panahan, taekwondo, pramuka, dan kegiatan pengembangan bakat siswa.',
  path: '/ekstrakurikuler',
  keywords: ['ekstrakurikuler sd', 'panahan', 'taekwondo samarinda'],
})

export default function EkstrakurikulerLayout({ children }: { children: React.ReactNode }) {
  return children
}
