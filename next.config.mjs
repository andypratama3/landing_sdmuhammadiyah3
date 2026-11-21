/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    minimumCacheTTL: 2592000,
    deviceSizes: [375, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.sdmuhammadiyah3smd.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.sdmuhammadiyah3smd.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Fallback foto ekstrakurikuler dari API (placehold.co)
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        // Thumbnail facade YouTube (components/landing/video-section.tsx)
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },


  // Next menebak workspace root dari lockfile terdekat; ada stub kosong
  // di /Users/andypratama3/package-lock.json sehingga root jadi salah dan
  // memicu peringatan tiap build. Pin eksplisit ke direktori project.
  turbopack: {
    root: import.meta.dirname,
  },

  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v2'}/:path*`,
      },
    ]
  },

  async redirects() {
    return [
       // Matikan /spmb dan seluruh turunannya
      // /spmb sengaja dimatikan (dipakai PPDB eksternal). Harus :path* — path
      // telanjang hanya mencocokkan /spmb persis dan menyisakan /spmb/<x> 404
      // padahal Google sudah mengindeksnya.
      {
        source: '/spmb/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/profil-sekolah',
        destination: '/profil',
        permanent: true,
      },
      {
        source: '/tenagapendidikan',
        destination: '/tenaga-pendidikan',
        permanent: true,
      },
      // Sama: /gallery/<slug> sudah terindeks (5 klik) dan dulu 404 karena
      // redirect lama hanya mencocokkan /gallery persis.
      {
        source: '/gallery/:path*',
        destination: '/galeri/:path*',
        permanent: true,
      },
      // Route /jadwal hanya punya page.tsx tunggal, tanpa [slug] — jadi
      // /jadwal/Kelas 6 selalu 404 padahal sudah terindeks (41 tayangan).
      // Pakai :path+ (bukan :path*) supaya /jadwal itu sendiri TIDAK ikut
      // tertangkap — :path* menangkap 0 segmen dan membuat /jadwal
      // me-redirect ke dirinya sendiri (loop 308).
      {
        source: '/jadwal/:path+',
        destination: '/jadwal',
        permanent: true,
      },
      {
        source: '/sitemap-index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      }
    ]
  },

  async headers() {
    return [

      // Cache images and fonts
      {
        source: '/(.*)\.(jpg|jpeg|png|gif|ico|svg|webp|avif|woff|woff2)$',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' }
        ]
      },
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },

          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          },
          // Isolasi origin (temuan Lighthouse Praktik Terbaik: COOP)
          // Aman dengan iframe youtube-nocookie & GTM/GA.
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },

        ]
      }
    ]
  }
}

export default nextConfig
