/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dashboard.sdmuhammadiyah3smd.com',
        pathname: '/storage/**',
      },
    ],
  },

  experimental: {
    optimizeCss: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
