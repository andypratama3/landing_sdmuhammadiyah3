import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Outfit, Baloo_2 } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ApiInitializer from "@/components/api-initializer"
import GoogleAnalytics, { GTMNoScript } from "@/components/google-analytics"
import StructuredData from "@/components/structured-data"
import InteractiveUI from "@/components/interactive-ui"
import { WebVitalsReporter } from "@/components/web-vitals-reporter"
import { BASE_URL, SCHOOL, SEO_KEYWORDS } from "@/lib/school-info"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const quicksand = Quicksand({ 
  subsets: ["latin"], 
  variable: "--font-quicksand",
  display: 'swap',
})

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo2",
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: `${SCHOOL.name} - ${SCHOOL.tagline}`,
    template: `%s | ${SCHOOL.name}`,
  },

  description:
    'SD Muhammadiyah 3 Samarinda — SD Islam terbaik di Samarinda Seberang. Sekolah kreatif Islam berakreditasi A, program tahfidz, prestasi siswa juara. SD terbaik di Samarinda untuk pendidikan berkualitas. Daftar SPMB 2025/2026.',

  keywords: [...SEO_KEYWORDS],

  authors: [{ name: SCHOOL.name, url: BASE_URL }],
  creator: SCHOOL.name,
  publisher: SCHOOL.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    title: `${SCHOOL.name} | ${SCHOOL.tagline}`,
    description:
      'SD swasta terbaik di Samarinda dengan kurikulum kreatif Islam, akreditasi A, dan prestasi siswa tingkat kota-provinsi.',
    siteName: SCHOOL.name,
    images: [
      {
        url: '/SD3_logo1.png',
        width: 1200,
        height: 630,
        alt: `${SCHOOL.name} - Sekolah Kreatif`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SCHOOL.name} - Sekolah Kreatif`,
    description:
      'SD Islam terbaik di Samarinda — pendaftaran SPMB, tahfidz, akreditasi A.',
    images: ['/SD3_logo1.png'],
  },

  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: [
      { url: '/SD3_logo1.png', media: '(prefers-color-scheme: light)' },
      { url: '/SD3_logo1.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/SD3_logo1.png',
    shortcut: '/SD3_logo1.png',
  },

  manifest: '/manifest.json',
  category: 'education',
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#33b962" },
    { media: "(prefers-color-scheme: dark)", color: "#1a4d2e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get nonce from headers - FIX: await the promise and use get()
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=localStorage.getItem("theme");if(e==="dark"||((!e||e==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${quicksand.variable} ${baloo2.variable} font-quicksand antialiased`}>
        {/* GTM NoScript - must be immediately after opening body tag */}
        <GTMNoScript />

        {/* Google Analytics & GTM Scripts with Nonce */}
        <GoogleAnalytics nonce={nonce} />

        {/* Structured Data for SEO with Nonce */}
        <StructuredData nonce={nonce} />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ApiInitializer />

          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />

          {/* Deferred Interactive Modals */}
          <InteractiveUI />
          <WebVitalsReporter />
        </ThemeProvider>
      </body>
    </html>
  )
}