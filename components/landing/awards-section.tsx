import { CheckCircle, Sparkles } from "lucide-react"

export function AwardsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-gray-900">
      <div className="container relative z-10 px-4 mx-auto text-center">
        <h2 className="mb-10 text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight font-outfit">
          Penghargaan Nasional
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="clay group flex flex-col items-center p-8">
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              <div className="absolute inset-0 bg-[#33b962]/15 blur-[40px] rounded-full scale-125" />
              <CheckCircle className="relative z-10 w-20 h-20 text-[#33b962]" />
            </div>
            <p className="font-black text-lg text-gray-900 dark:text-white uppercase tracking-tight font-outfit">Sekolah Ramah Anak</p>
          </div>
          <div className="clay group flex flex-col items-center p-8">
            <div className="relative w-36 h-36 flex items-center justify-center mb-5">
              <div className="absolute inset-0 bg-[#ffd166]/15 blur-[40px] rounded-full scale-125" />
              <Sparkles className="relative z-10 w-20 h-20 text-[#ffd166]" />
            </div>
            <p className="font-black text-lg text-gray-900 dark:text-white uppercase tracking-tight font-outfit">Sekolah Adiwiyata</p>
          </div>
        </div>
      </div>
    </section>
  )
}
