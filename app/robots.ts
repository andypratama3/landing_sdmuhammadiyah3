import { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sdmuhammadiyah3smd.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/_next/',
          '/pengisian-formulir/', // Block thin content pages
          '/whatsapp/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/_next/',
          '/pengisian-formulir/', // Block thin content pages
          '/whatsapp/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/_next/',
          '/pengisian-formulir/', // Block thin content pages
          '/whatsapp/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
