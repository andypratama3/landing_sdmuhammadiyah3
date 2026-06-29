import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-28 bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#1a4d2e] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto text-center">
        <h2 className="mb-6 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-balance leading-tight font-outfit">
          Mulai Perjalanan Kreatif Anak Anda!
        </h2>
        <p className="max-w-xl mx-auto mb-12 text-base sm:text-lg leading-relaxed text-white/80 font-medium font-quicksand">
          Pendaftaran peserta didik baru telah dibuka. Kuota terbatas, amankan kursi putra-putri Anda segera.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#33b962] hover:bg-gray-100 rounded-full px-12 py-7 text-xl shadow-xl hover:scale-[1.03] transition-all font-black"
          >
            <Link href="https://ppdb.sdmuh3smd.com">
              Daftar Online
              <ChevronRight className="w-6 h-6 ml-1.5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline-on-dark"
            className="px-12 py-7 text-xl font-bold rounded-full backdrop-blur-md transition-all"
          >
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
