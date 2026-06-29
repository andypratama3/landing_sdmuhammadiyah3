import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Sistem Pembayaran SPP SD Muhammadiyah 3 Samarinda',
  description:
    'Cek tagihan dan riwayat pembayaran SPP SD Muhammadiyah 3 Samarinda secara online. Sistem pembayaran digital yang aman dan transparan.',
  path: '/pembayaran',
  keywords: ['pembayaran spp', 'tagihan sekolah', 'spp sd samarinda'],
})

export default function PembayaranLayout({ children }: { children: React.ReactNode }) {
  return children
}
