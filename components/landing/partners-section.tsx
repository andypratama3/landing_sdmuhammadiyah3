import Image from "next/image"
import { resolveImageUrl } from "@/lib/image-url"
import type { Dukungan } from "@/types/dukungan.types"

interface PartnersSectionProps {
  partners: Dukungan[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  if (!partners?.length) return null

  return (
    <section className="gsap-partners border-t border-(--color-forest-700)/10 py-16 dark:border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="font-outfit text-xl font-bold text-(--color-forest-900) dark:text-white">
          Dukungan dan kerja sama
        </h2>
        <ul className="mt-8 flex flex-wrap items-center gap-8 sm:gap-12">
          {partners.map((partner) => (
            <li key={partner.name} className="partner-logo">
              <Image
                src={resolveImageUrl(partner.foto, "img/kerjasama")}
                alt={partner.name}
                width={140}
                height={80}
                className="h-16 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
