import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-28 h-28 bg-(--color-forest-700)/10 dark:bg-(--color-forest-700)/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
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
