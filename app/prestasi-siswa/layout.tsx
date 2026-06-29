import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Prestasi Siswa SD Muhammadiyah 3 Samarinda | Juara Kota & Provinsi',
  description:
    'Prestasi membanggakan siswa SD Muhammadiyah 3 Samarinda — juara panahan, taekwondo, akademik tingkat kota hingga provinsi. Bukti SD terbaik di Samarinda.',
  path: '/prestasi-siswa',
  keywords: ['prestasi siswa', 'juara panahan', 'juara taekwondo samarinda'],
})

export default function PrestasiSiswaLayout({ children }: { children: React.ReactNode }) {
  return children
}
