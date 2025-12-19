/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdmuhammadiyah3smd.com',
        pathname: '/storage/**',
      },
    ],
  },
}

export default nextConfig
