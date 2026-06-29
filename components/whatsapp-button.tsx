"use client"

import { MessageCircle } from "lucide-react"
import { SCHOOL } from "@/lib/school-info"
import { useGoogleAnalytics } from "@/components/google-analytics"

export default function WhatsAppButton() {
  const { trackEvent } = useGoogleAnalytics()
  const waUrl = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(SCHOOL.whatsappMessage)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("contact_whatsapp", {
          event_category: "engagement",
          event_label: "floating_button",
        })
      }
      className="fixed bottom-24 right-6 w-12 h-12 min-w-[48px] min-h-[48px] bg-[#25D366] rounded-2xl flex items-center justify-center text-white shadow-[0_20px_40px_rgba(37,211,102,0.3)] hover:scale-110 hover:-translate-y-1 transition-all z-40 group"
      aria-label="Chat WhatsApp SD Muhammadiyah 3 Samarinda"
    >
      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse opacity-60 group-hover:opacity-100 transition-opacity" />
      <MessageCircle className="w-6 h-6 relative z-10" />
    </a>
  )
}
