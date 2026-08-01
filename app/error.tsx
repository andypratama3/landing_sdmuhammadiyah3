"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="text-center max-w-md relative z-10">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 font-outfit">
          Terjadi Kesalahan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 font-quicksand">
          Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi atau kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-full px-8 py-6 font-bold shadow-xl hover:scale-105 transition-all"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Coba Lagi
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 font-bold border-2 border-gray-300 dark:border-gray-700 hover:scale-105 transition-all"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
