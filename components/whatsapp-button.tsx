"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6285123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:scale-110 hover:-translate-y-1 transition-all z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
      <MessageCircle className="w-6 h-6 relative z-10" />
    </a>
  )
}
