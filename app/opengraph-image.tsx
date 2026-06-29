import { ImageResponse } from 'next/og'
import { SCHOOL } from '@/lib/school-info'

export const runtime = 'edge'
export const alt = SCHOOL.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          background: 'linear-gradient(135deg, #1a5a32 0%, #33b962 50%, #2a9d52 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.9, marginBottom: 16 }}>
          Sekolah Kreatif Islam
        </div>
        <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, maxWidth: 900 }}>
          {SCHOOL.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.95, maxWidth: 800 }}>
          {SCHOOL.tagline}
        </div>
        <div style={{ fontSize: 22, marginTop: 40, opacity: 0.8 }}>
          Akreditasi A • Tahfidz • Prestasi Juara • SPMB 2025/2026
        </div>
      </div>
    ),
    { ...size }
  )
}
