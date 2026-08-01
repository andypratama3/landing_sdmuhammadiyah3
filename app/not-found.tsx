import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="text-center max-w-md relative z-10">
        <div className="w-28 h-28 bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/20 rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Search className="w-14 h-14 text-(--color-forest-700)" />
        </div>
        <h1 className="text-7xl font-black text-(--color-forest-700) mb-4 font-outfit">404</h1>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 font-outfit">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-quicksand">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Button
          asChild
          className="bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-full px-10 py-6 font-bold shadow-xl hover:scale-105 transition-all"
        >
          <Link href="/">
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  )
}
