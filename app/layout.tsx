import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import BackToTop from "@/components/back-to-top"

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-sans" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "SD Muhammadiyah 3 Samarinda - Sekolah Kreatif",
  description:
    "Sekolah Dasar Islam terdepan yang menghasilkan generasi kreatif, berakhlak mulia, cerdas, dan berprestasi dengan dilandasi nilai-nilai Islami.",
  keywords: ["SD Muhammadiyah", "Sekolah Kreatif", "Samarinda", "Pendidikan Islam", "Sekolah Dasar"],
  authors: [{ name: "SD Muhammadiyah 3 Samarinda" }],
  openGraph: {
    title: "SD Muhammadiyah 3 Samarinda - Sekolah Kreatif",
    description: "Mengembangkan potensi anak melalui pendidikan kreatif dan inovatif",
    type: "website",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: "#33b962",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.className} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
