import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverGetPublic } from '@/lib/server-api'
import type { Alumni } from '@/types/alumni.types'
import { resolveImageUrl } from '@/lib/image-url'
import BreadcrumbJsonLd from '@/components/breadcrumb-json-ld'
import { pageMetadata } from '@/lib/metadata-helpers'

interface AlumniDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AlumniDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const response = await serverGetPublic<Alumni>(`/alumni/${slug}`)
    const alumni = response?.data
    
    if (!alumni) {
      return pageMetadata({
        title: 'Alumni Tidak Ditemukan - SD Muhammadiyah 3 Samarinda',
        description: 'Data alumni yang Anda cari tidak ditemukan.',
        path: `/alumni/${slug}`,
      })
    }

    const description = alumni.description 
      ? `${alumni.description} ${alumni.current_profession ? `Saat ini bekerja sebagai ${alumni.current_profession}` : ''} ${alumni.workplace ? `di ${alumni.workplace}` : ''}. Lulusan angkatan ${alumni.graduation_year}.`
      : `${alumni.name} - Alumni SD Muhammadiyah 3 Samarinda angkatan ${alumni.graduation_year}. ${alumni.current_profession ? `Saat ini bekerja sebagai ${alumni.current_profession}` : ''} ${alumni.workplace ? `di ${alumni.workplace}` : ''}.`

    return pageMetadata({
      title: `${alumni.name} - Alumni ${alumni.graduation_year} | SD Muhammadiyah 3 Samarinda`,
      description: description.substring(0, 160),
      path: `/alumni/${slug}`,
      keywords: [
        alumni.name,
        `alumni ${alumni.graduation_year}`,
        'SD Muhammadiyah 3 Samarinda',
        alumni.current_profession || '',
        alumni.workplace || '',
        'lulusan sekolah',
        'prestasi alumni'
      ].filter(Boolean),
    })
  } catch (error) {
    return pageMetadata({
      title: 'Alumni Tidak Ditemukan - SD Muhammadiyah 3 Samarinda',
      description: 'Data alumni yang Anda cari tidak ditemukan.',
      path: `/alumni/${slug}`,
    })
  }
}

async function getAlumniBySlug(slug: string): Promise<Alumni | null> {
  try {
    const response = await serverGetPublic<Alumni>(`/alumni/${slug}`)
    if (response?.success && response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error('Error fetching alumni:', error)
    return null
  }
}

export default async function AlumniDetailPage({ params }: AlumniDetailPageProps) {
  const { slug } = await params
  const alumni = await getAlumniBySlug(slug)

  if (!alumni) {
    notFound()
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', item: '/' },
          { name: 'Portal Alumni', item: '/alumni' },
          { name: alumni.name, item: `/alumni/${slug}` },
        ]}
      />
      
      <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950">
        <div className="container px-4 mx-auto max-w-4xl">
          {/* Alumni Detail Content */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-(--color-forest-450) to-(--color-teal-400) p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {alumni.photo && (
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={resolveImageUrl(alumni.photo, 'img/alumni')}
                      alt={alumni.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                    {alumni.name}
                  </h1>
                  <p className="text-white/90 text-lg">
                    Angkatan {alumni.graduation_year} • Kelas {alumni.class_name}
                  </p>
                  {alumni.nisn && (
                    <p className="text-white/70 text-sm mt-1">
                      NISN: {alumni.nisn}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Description */}
              {alumni.description && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tentang</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {alumni.description}
                  </p>
                </div>
              )}

              {/* Current Profession */}
              {alumni.current_profession && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profesi Saat Ini</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {alumni.current_profession}
                    {alumni.workplace && ` di ${alumni.workplace}`}
                  </p>
                </div>
              )}

              {/* Achievement */}
              {alumni.achievement && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prestasi</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {alumni.achievement}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              {(alumni.email || alumni.phone) && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontak</h2>
                  <div className="space-y-2">
                    {alumni.email && (
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Email:</span> {alumni.email}
                      </p>
                    )}
                    {alumni.phone && (
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Telepon:</span> {alumni.phone}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Social Media */}
              {alumni.social_media && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Media Sosial</h2>
                  <div className="flex gap-4">
                    {alumni.social_media.linkedin && (
                      <a
                        href={alumni.social_media.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-forest-450) hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {alumni.social_media.instagram && (
                      <a
                        href={alumni.social_media.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-forest-450) hover:underline"
                      >
                        Instagram
                      </a>
                    )}
                    {alumni.social_media.facebook && (
                      <a
                        href={alumni.social_media.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-forest-450) hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <a
              href="/alumni"
              className="inline-flex items-center gap-2 text-(--color-forest-450) hover:text-(--color-forest-600) font-semibold"
            >
              ← Kembali ke Portal Alumni
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export const revalidate = 3600
