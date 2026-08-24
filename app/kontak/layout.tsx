import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata-helpers'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { BASE_URL } from '@/lib/school-info'
import { organizationSchema } from '@/lib/structured-data'

export const metadata: Metadata = pageMetadata({
  title: 'Hubungi SD Muhammadiyah 3 Samarinda | Daftar SPMB & Informasi Sekolah',
  description:
    'Kontak SD Muhammadiyah 3 Samarinda sekarang! Alamat Jl. Dato Iba Seberang, telepon (0541) 260066, WhatsApp 24/7. Hubungi kami untuk pendaftaran SPMB, pertanyaan, atau kunjungan sekolah.',
  path: '/kontak',
  keywords: ['kontak sd samarinda', 'alamat sekolah', 'lokasi google maps', 'pendaftaran sd', 'spmb samarinda'],
})

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = organizationSchema()
  
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: BASE_URL },
          { name: 'Kontak', url: `${BASE_URL}/kontak` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            mainEntity: orgSchema,
          }),
        }}
      />
      {children}
    </>
  )
}
