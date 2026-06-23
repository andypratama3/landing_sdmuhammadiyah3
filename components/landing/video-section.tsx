import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"

export function VideoSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <h2 className="text-fluid-h2 font-black leading-tight text-gray-900 dark:text-white text-balance font-outfit tracking-tighter">
            Pendidikan Modern Berbasis Teknologi & Karakter
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/profil#video"
            className="relative block overflow-hidden bg-gray-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] rounded-[2.5rem] aspect-video group"
          >
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-20 h-20 bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-[6px] border-white/20">
                <Play className="w-8 h-8 ml-0.5 fill-white" />
              </div>
            </div>
            <Image
              src="/modern-school-classroom.png"
              alt="Video Profil Sekolah"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover opacity-60"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
