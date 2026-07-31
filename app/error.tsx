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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
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
            className="bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-full px-8 py-6 font-bold shadow-xl"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Coba Lagi
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 font-bold border-2 border-gray-300 dark:border-gray-700"
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
