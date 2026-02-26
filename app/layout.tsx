import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Poppins, Outfit, Plus_Jakarta_Sans } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import BackToTop from "@/components/back-to-top"
import ApiInitializer, { ApiInitializerStatus } from "@/components/api-initializer"
import { ThemeProvider } from "@/components/theme-provider"
import VisitorTracker from '@/components/visitor-tracker'
import CookieConsent from "@/components/cookie"
import GoogleAnalytics, { GTMNoScript } from "@/components/google-analytics"
import StructuredData from "@/components/structured-data"
import Preloader from "@/components/Preloader"

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sdmuhammadiyah3smd.com'),

  title: {
    default: "SD Muhammadiyah 3 Samarinda - Sekolah Kreatif",
    template: "%s | SD Muhammadiyah 3 Samarinda"
  },

  description: "Sekolah Dasar Islam terdepan yang menghasilkan generasi kreatif, berakhlak mulia, cerdas, dan berprestasi dengan dilandasi nilai-nilai Islami.",

  keywords: [
    "SD Muhammadiyah 3 Samarinda",
    "Sekolah Kreatif Muhammadiyah 3 Samarinda",
    "SD Muhammadiyah Samarinda",
    "Sekolah Dasar Islam Samarinda",
    "SD Unggulan Kalimantan Timur",
    "Sekolah Penggerak Samarinda",
    "Sekolah Terbaik Di Samarinda Kalimantan Timur",
    "Sekolah Dasar Islam Terbaik Di Samarinda",
    "Pembelajaran Inovatif",
    "Pendidikan Berkarakter",
    "Sekolah Kreatif Kalimantan Timur",
    "Sekolah Dasar Samarinda Seberang",
    "SD Islam Terbaik Samarinda",
    "Pendaftaran SD Muhammadiyah",
    "SPMB SD Muhammadiyah 3",
    "Tahfidz Al-Qur'an Samarinda",
    "Akreditasi A Samarinda",
  ],

  authors: [
    {
      name: "SD Muhammadiyah 3 Samarinda",
      url: "https://sdmuhammadiyah3smd.com"
    }
  ],

  creator: "SD Muhammadiyah 3 Samarinda",
  publisher: "SD Muhammadiyah 3 Samarinda",

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
    type: "website",
    locale: "id_ID",
    url: "https://sdmuhammadiyah3smd.com",
    title: "SD Muhammadiyah 3 Samarinda - Sekolah Kreatif Unggulan",
    description: "Sekolah Dasar Islam terdepan dengan pembelajaran inovatif dan pengembangan karakter. Akreditasi A, Sekolah Penggerak, Tahfidz Al-Qur'an.",
    siteName: "SD Muhammadiyah 3 Samarinda",
    images: [
      {
        url: "/SD3_logo1.png",
        width: 1200,
        height: 630,
        alt: "SD Muhammadiyah 3 Samarinda Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SD Muhammadiyah 3 Samarinda - Sekolah Kreatif",
    description: "Sekolah Dasar Islam unggulan di Samarinda dengan pembelajaran inovatif",
    images: ["/SD3_logo1.png"],
  },

  verification: {
    google: "your-google-verification-code",
  },

  alternates: {
    canonical: "https://sdmuhammadiyah3smd.com",
  },

  icons: {
    icon: [
      {
        url: "/SD3_logo1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/SD3_logo1.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/SD3_logo1.png",
    shortcut: "/SD3_logo1.png",
  },

  manifest: "/manifest.json",
  category: "education",
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
      </head>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${poppins.variable} ${quicksand.variable} font-outfit antialiased`}>
        {/* GTM NoScript - must be immediately after opening body tag */}
        <GTMNoScript />

        {/* Google Analytics & GTM Scripts with Nonce */}
        <GoogleAnalytics nonce={nonce} />

        {/* Structured Data for SEO with Nonce */}
        <StructuredData nonce={nonce} />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <ApiInitializer />
          <ApiInitializerStatus />
          <VisitorTracker />

          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />

          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}