import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Profil Sekolah SD Muhammadiyah 3 Samarinda | Akreditasi A',
  description:
    'Profil lengkap SD Muhammadiyah 3 Samarinda — visi misi, NPSN 30404112, akreditasi Unggul (A), sejarah sekolah kreatif Islam di Samarinda Seberang.',
  path: '/profil',
  keywords: ['profil sekolah', 'visi misi', 'npsn sd muhammadiyah'],
})

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return children
}
