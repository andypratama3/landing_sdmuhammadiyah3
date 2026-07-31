import Image from "next/image"
import type { Dukungan } from "@/types/dukungan.types"

interface PartnersSectionProps {
  partners: Dukungan[]
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-(--color-cloud-100)/80 border-t border-gray-100 dark:bg-gray-950/50 dark:border-gray-800">
      <div className="container relative z-10 px-4 mx-auto text-center">
        <p className="mb-12 text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.22em] font-outfit">
          Dukungan & Kerja Sama
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {partners?.map((partner, index) => (
            <div key={index} className="group relative flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/cooperation/${partner.foto}`}
                  alt={partner.name}
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] font-quicksand">{partner.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
