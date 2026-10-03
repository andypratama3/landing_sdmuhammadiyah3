import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { SCHOOL } from '@/lib/school-info'
import AutoRefresh from './auto-refresh'

export const metadata: Metadata = {
  title: 'Sedang Dalam Perawatan',
  description: `Laman ${SCHOOL.name} sedang dalam pemeliharaan. Silakan kembali beberapa saat lagi.`,
  robots: { index: false, follow: false },
}

const CONTACTS = [
  { icon: Phone, label: SCHOOL.phone, href: `tel:${SCHOOL.phoneTel}` },
  { icon: MessageCircle, label: `WhatsApp ${SCHOOL.whatsapp}`, href: `https://wa.me/${SCHOOL.whatsapp}`, external: true },
  { icon: Mail, label: SCHOOL.email, href: `mailto:${SCHOOL.email}` },
]

export default function MaintenancePage() {
  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto overscroll-none bg-linear-to-br from-(--color-forest-950) via-(--color-forest-900) to-(--color-forest-800)">
      {/* Ambient background */}
      <div className="pointer-events-none fixed top-1/4 -left-10 w-72 h-72 bg-(--color-forest-500)/20 rounded-full blur-[120px] animate-blob" />
      <div className="pointer-events-none fixed -bottom-10 right-0 w-80 h-80 bg-(--color-sun-500)/10 rounded-full blur-[130px] animate-blob" />

      <AutoRefresh />

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center px-5 py-10 text-center">
        <div className="w-full animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-xl">
              <Image
                src="/SD3_logo1.png"
                alt={`Logo ${SCHOOL.name}`}
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-(--color-sun-400) opacity-75 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-(--color-sun-400)" />
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-(--color-sun-300)">
              Pemeliharaan Terjadwal
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 font-outfit leading-tight tracking-tight">
            Sedang Dalam Perawatan
          </h1>

          <p className="text-(--color-forest-300)/90 text-sm sm:text-base mb-8 font-quicksand leading-relaxed max-w-sm mx-auto">
            Laman {SCHOOL.name} sedang kami perbaiki agar dapat melayani Anda dengan lebih baik.
            Mohon maaf atas ketidaknyamanannya.
          </p>

          {/* Loader */}
          <div
            className="relative w-20 h-20 mx-auto mb-6"
            role="status"
            aria-live="polite"
            aria-label="Memuat"
          >
            <div className="absolute inset-1.5 rounded-full bg-(--color-sun-500)/20 blur-lg animate-pulse motion-reduce:animate-none" />

            <svg
              viewBox="0 0 64 64"
              className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_2s_linear_infinite] motion-reduce:animate-none"
            >
              <defs>
                <linearGradient id="mnt-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4C873" />
                  <stop offset="55%" stopColor="#E8A33D" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="27" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3" />
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke="url(#mnt-ring)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="44 170"
              />
            </svg>

            <svg
              viewBox="0 0 64 64"
              className="absolute inset-0 w-full h-full animate-[spin_3.5s_linear_infinite_reverse] motion-reduce:animate-none"
            >
              <circle
                cx="32"
                cy="32"
                r="21"
                fill="none"
                stroke="#86efac"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="13 132"
              />
            </svg>

            <span className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-(--color-sun-400) animate-pulse motion-reduce:animate-none" />
            </span>
          </div>

          {/* Shimmer bar */}
          <div className="mx-auto w-full max-w-[13rem] h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-full rounded-full bg-linear-to-r from-(--color-forest-800) via-(--color-sun-400) to-(--color-forest-800) animate-shimmer motion-reduce:animate-none" />
          </div>

          {/* Contact fallback */}
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-left">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-(--color-forest-300)/70 mb-2.5">
              Butuh informasi segera?
            </p>
            <ul className="space-y-0.5">
              {CONTACTS.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-3 py-1 text-[0.8125rem] text-white/90 hover:text-(--color-sun-300) transition-colors"
                  >
                    <span className="w-7 h-7 shrink-0 rounded-lg bg-white/5 group-hover:bg-(--color-sun-500)/15 flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5 text-(--color-forest-300)" />
                    </span>
                    <span className="break-all">{label}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 mt-1.5 pt-2.5 border-t border-white/10 text-xs text-(--color-forest-300)/70 leading-relaxed">
                <span className="w-7 h-7 shrink-0 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-(--color-forest-300)" />
                </span>
                <span className="pt-1.5">{SCHOOL.address.full}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}