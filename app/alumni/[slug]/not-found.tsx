import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function AlumniNotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950 flex items-center justify-center">
      <div className="container px-4 mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-(--color-forest-450)/10 rounded-full">
          <GraduationCap className="w-12 h-12 text-(--color-forest-450)" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
          Alumni Tidak Ditemukan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Data alumni yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Link
          href="/alumni"
          className="inline-flex items-center gap-2 px-6 py-3 bg-(--color-forest-450) text-white rounded-full font-semibold hover:bg-(--color-forest-500) transition-colors"
        >
          Kembali ke Portal Alumni
        </Link>
      </div>
    </div>
  )
}
