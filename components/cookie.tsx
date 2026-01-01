"use client"

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Cek apakah user sudah accept cookie
    const consent = localStorage.getItem('sdmuh3-cookie-consent')
    if (!consent) {
      // Delay sedikit untuk animasi yang lebih smooth
      setTimeout(() => {
        setShowConsent(true)
        setTimeout(() => setIsVisible(true), 100)
      }, 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('sdmuh3-cookie-consent', 'accepted')
    setIsVisible(false)
    setTimeout(() => setShowConsent(false), 300)
  }

  const declineCookies = () => {
    localStorage.setItem('sdmuh3-cookie-consent', 'declined')
    setIsVisible(false)
    setTimeout(() => setShowConsent(false), 300)
  }

  if (!showConsent) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="border-t-4 border-green-500 shadow-2xl bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            {/* Icon & Text */}
            <div className="flex items-start flex-1 gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-500 rounded-full">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  🍪 Kami Menggunakan Cookie
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Website SD Muhammadiyah 3 Samarinda menggunakan cookie untuk meningkatkan pengalaman Anda, 
                  menganalisis traffic website, dan memahami preferensi Anda. Cookie membantu kami menyediakan 
                  layanan yang lebih baik dan relevan untuk Anda.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Dengan mengklik "Terima Semua", Anda menyetujui penyimpanan cookie pada perangkat Anda 
                  sesuai dengan{' '}
                  <a 
                    href="/privacy-policy" 
                    className="font-semibold text-green-600 underline hover:text-green-700"
                  >
                    Kebijakan Privasi
                  </a>
                  {' '}kami.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center w-full gap-3 sm:w-auto">
              <button
                onClick={declineCookies}
                className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Tolak
              </button>
              <button
                onClick={acceptCookies}
                className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Terima Semua
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}