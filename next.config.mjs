/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    remotePatterns: [
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
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },


  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/profil-sekolah',
        destination: '/profil',
        permanent: true,
      },
      {
        source: '/spmb',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tenagapendidikan',
        destination: '/tenaga-pendidikan',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/galeri',
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
      // Cache Next.js static assets forever
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
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
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://fonts.googleapis.com https://static.cloudflareinsights.com https://www.tiktok.com https://www.youtube.com https://www.youtube-nocookie.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: https: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://*.tiktok.com https://i.ytimg.com https://yt3.ggpht.com https://dashboard.sdmuhammadiyah3smd.com",
              "connect-src 'self' https://dashboard.sdmuhammadiyah3smd.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://stats.g.doubleclick.net https://www.tiktok.com",
              "frame-src 'self' https://www.google.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://www.tiktok.com https://tiktok.com https://dashboard.sdmuhammadiyah3smd.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "media-src 'self' https: blob:"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig
