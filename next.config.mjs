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
        source: '/profile-sekolah',
        destination: '/profil',
        permanent: true,
      },
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
          }
        ]
      }
    ]
  }
}

export default nextConfig