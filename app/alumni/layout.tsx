import { Metadata } from 'next'
import BreadcrumbJsonLd from '@/components/breadcrumb-json-ld'
import { pageMetadata } from '@/lib/metadata-helpers'

export const metadata: Metadata = pageMetadata({
  title: 'Portal Alumni - SD Muhammadiyah 3 Samarinda',
  description: 'Portal alumni SD Muhammadiyah 3 Samarinda — Jejak prestasi dan kisah sukses lulusan sekolah Islam terbaik di Samarinda. Temukan jaringan alumni dan koneksi profesional.',
  path: '/alumni',
  keywords: [
    'alumni SD Muhammadiyah 3 Samarinda',
    'portal alumni',
    'lulusan sekolah',
    'prestasi alumni',
    'jejak karir alumni',
    'networking alumni',
    'alumni sukses',
    'SD Muhammadiyah 3 Samarinda alumni'
  ],
})

export default function AlumniLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', item: '/' },
          { name: 'Portal Alumni', item: '/alumni' },
        ]}
      />
      {children}
    </>
  )
}