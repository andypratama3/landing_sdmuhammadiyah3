import { Metadata } from 'next'
import { serverGetPublic } from '@/lib/server-api'
import type { AlumniResponse, Alumni } from '@/types/alumni.types'
import AlumniContent from '@/components/alumni/AlumniContent'

export const metadata: Metadata = {
  title: 'Portal Alumni - SD Muhammadiyah 3 Samarinda',
  description:
    'Portal alumni SD Muhammadiyah 3 Samarinda — Jejak prestasi dan kisah sukses lulusan sekolah Islam terbaik di Samarinda.',
  keywords: ['alumni SD Muhammadiyah 3 Samarinda', 'portal alumni', 'lulusan sekolah', 'prestasi alumni'],
}

export const revalidate = 3600

async function getAlumniData(): Promise<Alumni[]> {
  try {
    const response = await serverGetPublic<AlumniResponse>('/list/alumni')
    if (response.success && response.data) {
      return Array.isArray(response.data) ? response.data : []
    }
    return []
  } catch (error) {
    console.error('Error fetching alumni:', error)
    return []
  }
}

export default async function AlumniPage() {
  const alumni = await getAlumniData()

  return <AlumniContent initialAlumni={alumni} />
}
