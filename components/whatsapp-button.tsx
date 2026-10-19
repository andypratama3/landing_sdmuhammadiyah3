"use client"

import { SCHOOL } from "@/lib/school-info"
import { useGoogleAnalytics } from "@/components/google-analytics"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
export default function WhatsAppButton() {
  const { trackEvent } = useGoogleAnalytics()

  if (!SCHOOL.whatsapp) {
    return null
  }

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
      className="fixed bottom-24 right-6 w-14 h-14 min-w-[56px] min-h-[56px] bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all z-40 group"
      aria-label="Chat WhatsApp SD Muhammadiyah 3 Samarinda"
    >
      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      <WhatsAppIcon className="w-8 h-8 relative z-10 fill-white" />
    </a>
  )
}
