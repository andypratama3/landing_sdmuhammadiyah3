'use client'

import { useEffect } from 'react'
import { GraduationCap, RefreshCw } from 'lucide-react'

export default function AlumniError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Alumni page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Terjadi Kesalahan
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Maaf, tidak dapat memuat data alumni. Silakan coba lagi nanti.
          </p>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors min-h-[44px]"
          >
            <RefreshCw className="w-5 h-5" />
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  )
}