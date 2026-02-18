/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,

  images: {
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

  

  experimental: {
    optimizeCss: true,
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
      }
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: blob: https://dashboard.sdmuhammadiyah3smd.com https://www.google-analytics.com",
              "connect-src 'self' https://dashboard.sdmuhammadiyah3smd.com https://www.google-analytics.com https://region1.google-analytics.com",
              "frame-src 'self' https://www.youtube.com",
              "object-src 'none'"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

export default nextConfig