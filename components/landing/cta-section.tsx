import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

const PPDB_URL = "https://ppdb.sdmuh3smd.com"

export function CTASection() {
  return (
    <section className="gsap-cta px-4 py-16 sm:py-24">
      <div className="container mx-auto overflow-hidden rounded-[2rem] bg-(--color-forest-900) text-(--color-paper-50)">
        <div className="cta-content grid items-center lg:grid-cols-2">
          <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <h2 className="text-balance font-outfit text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Amankan kursi tahun ajaran baru
            </h2>
            <p className="mt-4 max-w-[40ch] text-pretty text-base leading-relaxed text-white/80 font-quicksand">
              Kuota SPMB terbatas. Daftar daring, atau tanya langsung ke tata usaha sekolah.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-(--color-paper-50) px-7 font-bold text-(--color-forest-900) hover:bg-white"
              >
                <Link href={PPDB_URL} className="inline-flex items-center gap-2">
                  Daftar online
                  <span className="flex size-8 items-center justify-center rounded-full bg-(--color-forest-900)/10">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-on-dark"
                className="h-12 rounded-full px-7 font-semibold"
              >
                <Link href="/kontak">Hubungi kami</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[16rem] lg:min-h-[22rem]">
            <Image
              src="/foto_sekolah.jpeg"
              alt="Halaman sekolah saat sore"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
