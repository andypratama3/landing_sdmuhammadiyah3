import { Metadata } from 'next'
import BreadcrumbJsonLd from '@/components/breadcrumb-json-ld'

export const metadata: Metadata = {
  title: 'Portal Alumni - SD Muhammadiyah 3 Samarinda',
  description: 'Portal alumni SD Muhammadiyah 3 Samarinda — Jejak prestasi dan kisah sukses lulusan sekolah Islam terbaik di Samarinda.',
  keywords: ['alumni SD Muhammadiyah 3 Samarinda', 'portal alumni', 'lulusan sekolah', 'prestasi alumni'],
}

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