import { Home, Search, ArrowLeft, BookOpen, Mail } from "lucide-react"

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#1a4d2e] dark:via-[#2a7a4a] dark:to-[#1f5c3a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Animated 404 */}
        <div className="mb-8 text-center">
          <div className="relative inline-block">
            <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-bold text-white/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 border-4 rounded-full sm:w-32 sm:h-32 bg-white/20 backdrop-blur-sm border-white/40 animate-pulse">
                <Search className="w-12 h-12 text-white sm:w-16 sm:h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="p-6 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl sm:p-8 md:p-10">
          {/* Logo */}
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Text */}
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
              Halaman Tidak Ditemukan
            </h2>
            <p className="mb-2 text-base text-gray-600 sm:text-lg dark:text-gray-400">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>
            <p className="text-sm text-gray-500 sm:text-base dark:text-gray-500">
              Mungkin halaman telah dipindahkan atau URL yang Anda masukkan salah.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#33b962] to-[#2a9d52] hover:from-[#2a9d52] hover:to-[#238b45] text-white font-semibold py-3 sm:py-4 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border-2 border-[#33b962] dark:border-[#2a7a4a] text-[#33b962] dark:text-[#4ade80] font-semibold py-3 sm:py-4 px-6 rounded-full transition-all transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Halaman Sebelumnya</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="mb-4 text-sm font-semibold text-center text-gray-700 dark:text-gray-300">
              Link Cepat:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <a
                href="/"
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-[#33b962] hover:text-white dark:hover:bg-[#2a7a4a] transition-all"
              >
                Beranda
              </a>
              <a
                href="/tentang"
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-[#33b962] hover:text-white dark:hover:bg-[#2a7a4a] transition-all"
              >
                Tentang Kami
              </a>
              <a
                href="/pembayaran"
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-[#33b962] hover:text-white dark:hover:bg-[#2a7a4a] transition-all"
              >
                Pembayaran
              </a>
              <a
                href="/kontak"
                className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-[#33b962] hover:text-white dark:hover:bg-[#2a7a4a] transition-all"
              >
                Kontak
              </a>
            </div>
          </div>

          {/* Contact Info
          <div className="mt-6 text-center">
            <p className="flex items-center justify-center gap-2 text-xs text-gray-500 sm:text-sm dark:text-gray-500">
              <Mail className="w-4 h-4" />
              <span>Butuh bantuan? Hubungi kami di</span>
              <a href="mailto:info@sekolahkreatif.com" className="text-[#33b962] dark:text-[#4ade80] hover:underline font-medium">
                info@sekolahkreatif.com
              </a>
            </p>
          </div> */}
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/80">
            © 2025 SD Muhammadiyah 3 Samarinda. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}