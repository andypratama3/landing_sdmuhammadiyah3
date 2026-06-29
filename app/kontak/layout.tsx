import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Kontak SD Muhammadiyah 3 | Jl. Dato Iba Samarinda Seberang',
  description:
    'Hubungi SD Muhammadiyah 3 Samarinda — alamat Jl. Dato Iba Seberang, telepon (0541) 260066, WhatsApp, email. Buka lokasi di Google Maps.',
  path: '/kontak',
  keywords: ['kontak sd samarinda', 'alamat sekolah', 'lokasi google maps'],
})

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children
}
