import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'SPMB SD Muhammadiyah 3 Samarinda 2025/2026 | Cara Daftar',
  description:
    'Pendaftaran SPMB SD Muhammadiyah 3 Samarinda 2025/2026 — syarat, jadwal gelombang, biaya, dan cara daftar online. SD swasta terbaik di Samarinda Seberang.',
  path: '/spmb',
  keywords: ['spmb sd samarinda', 'pendaftaran sd muhammadiyah', 'daftar siswa baru'],
})

export default function SpmbLayout({ children }: { children: React.ReactNode }) {
  return children
}
