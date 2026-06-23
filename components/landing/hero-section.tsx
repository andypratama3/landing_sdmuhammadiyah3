import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      <div className="container relative z-10 px-4 mx-auto pt-24 lg:pt-28">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8 inline-block relative text-center">
            <div className="absolute inset-0 bg-white/40 blur-[80px] rounded-full scale-150" />
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <Image
                src="/SD3_logo1.png"
                alt="Logo SD Muhammadiyah 3 Samarinda"
                width={130}
                height={130}
                priority
                className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          <Badge className="px-5 py-2 mb-6 text-white bg-white/15 border-white/25 backdrop-blur-md font-black uppercase tracking-[0.18em] text-[10.5px]">
            Eksplorasi Bakat & Kreativitas
          </Badge>

          <h1 className="font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance font-outfit tracking-tighter">
            SD MUHAMMADIYAH 3 SAMARINDA
          </h1>

          <p className="max-w-2xl mx-auto mt-6 mb-10 text-base sm:text-lg md:text-xl leading-relaxed text-white/90 text-balance font-quicksand">
            Sekolah Kreatif yang membentuk karakter Islami, inovatif, dan berprestasi menuju masa depan gemilang.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-[#ffd166] hover:bg-[#ffca3a] text-gray-900 rounded-2xl px-10 py-7 text-lg shadow-[0_20px_50px_rgba(255,209,102,0.3)] hover:scale-[1.03] transition-all font-black group"
            >
              <Link href="https://ppdb.sdmuh3smd.com" className="flex items-center justify-center gap-3">
                DAFTAR SEKARANG
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 py-7 text-lg font-black text-white bg-white/10 border-2 border-white/25 rounded-2xl hover:bg-white/20 backdrop-blur-md transition-all uppercase tracking-widest"
            >
              <Link href="/profil#video" className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-lg">
                  <Play className="w-4 h-4 text-[#33b962] fill-[#33b962]" />
                </div>
                VIDEO PROFIL
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
