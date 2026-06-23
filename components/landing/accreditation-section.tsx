import { Star, Award } from "lucide-react"

export function AccreditationSection() {
  return (
    <section className="py-24 bg-[#33b962] dark:bg-[#1a4d2e] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid gap-12 sm:grid-cols-2 lg:max-w-3xl mx-auto">
          <div className="text-center group">
            <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 bg-white/15 blur-[50px] rounded-full scale-150" />
              <div className="relative z-10 w-28 h-28 animate-gentle-float">
                <Star className="w-full h-full text-[#ffd166] fill-[#ffd166] drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
            <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white font-outfit tracking-tight">Sekolah Penggerak</h3>
            <p className="text-white/70 text-sm font-medium tracking-wide font-quicksand">Program Unggulan Kemendikbudristek</p>
          </div>
          <div className="text-center group">
            <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 bg-white/15 blur-[50px] rounded-full scale-150" />
              <div className="relative z-10 w-28 h-28 animate-gentle-float animation-delay-2000">
                <Award className="w-full h-full text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
            <h3 className="mb-2 text-2xl sm:text-3xl font-black text-white font-outfit tracking-tight">Akreditasi A</h3>
            <p className="text-white/70 text-sm font-medium tracking-wide font-quicksand">Predikat Unggul (BAN-S/M)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
