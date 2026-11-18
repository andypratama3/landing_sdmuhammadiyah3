"use client"

import Image from "next/image"
import { useReveal } from "./use-reveal"


const steps = [
  {
    n: "1",
    fill: "var(--tpl-green)",
    text: "#191717",
    src: "/assets/img/image_283.webp",
    alt: "Anak berpikir dan menyusun pertanyaan",
    title: "DAFTAR ONLINE",
    line: "Isi formulir SPMB daring atau daftar langsung di kantor tata usaha, Senin-Sabtu 07.00-15.00 WIB.",
    imageSide: "right" as const,
  },
  {
    n: "2",
    fill: "var(--tpl-purple)",
    text: "#FFFFFF",
    src: "/assets/img/image_334-boy.webp",
    alt: "Anak laki-laki menyusun balok warna-warni",
    title: "OBSERVASI & TES KESIAPAN",
    line: "Tes dasar membaca, menulis, berhitung, dan wawancara kesiapan anak.",
    imageSide: "left" as const,
  },
  {
    n: "3",
    fill: "var(--tpl-terracotta)",
    text: "#191717",
    src: "/assets/img/image_335.webp",
    alt: "Anak memanjat balok menuju bintang",
    title: "MULAI BELAJAR",
    line: "Anak masuk kelas dengan ritme harian tahfidz, adab, dan edutainment.",
    imageSide: "bottom" as const,
  },
]

function StepCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const { ref, revealed } = useReveal<HTMLDivElement>()
  const narrow = index === 2

  return (
    <div
      ref={ref}
      style={{ background: step.fill }}
      className={`relative flex min-h-[300px] w-full flex-col overflow-hidden rounded-[40px] border-2 border-[#191717] shadow-[5px_6px_0_0_#191717] transition-[opacity,translate] duration-500 ease-out sm:flex-row sm:items-center ${
        narrow ? "lg:w-[31%] lg:shrink-0" : "lg:min-w-0 lg:flex-1"
      } ${revealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
    >
      {/* Mobile: ilustrasi jadi pita atas (dalam alur). sm+: kembali mengambang di sisi. */}
      {step.imageSide === "right" ? (
        <div className="pointer-events-none relative z-10 flex h-[150px] w-full shrink-0 items-end justify-center sm:absolute sm:bottom-0 sm:right-0 sm:h-full sm:w-1/2 sm:items-end sm:justify-end sm:p-0">
          <Image
            src={step.src}
            alt={step.alt}
            width={519}
            height={486}
            className="h-full w-full object-contain object-bottom sm:h-full sm:w-auto sm:object-right-bottom"
          />
        </div>
      ) : null}

      {step.imageSide === "left" ? (
        <div className="pointer-events-none relative z-10 flex h-[150px] w-full shrink-0 items-end justify-center sm:absolute sm:bottom-0 sm:left-6 sm:h-[90%] sm:w-1/2 sm:justify-start">
          <Image src={step.src} alt={step.alt} width={360} height={462} className="h-full w-auto object-contain object-bottom" />
        </div>
      ) : null}

      {step.imageSide === "bottom" ? (
        <div className="pointer-events-none relative z-10 flex h-[150px] w-full shrink-0 items-end justify-center sm:absolute sm:inset-x-0 sm:bottom-0 sm:h-[78%] sm:items-end">
          <Image src={step.src} alt={step.alt} width={513} height={411} className="h-full w-full object-contain object-bottom" />
        </div>
      ) : null}

      <div
        className={`relative z-20 flex flex-col gap-3 p-6 sm:p-8 ${
          narrow ? "justify-start" : step.imageSide === "right" ? "my-auto sm:max-w-[52%]" : "my-auto text-left sm:ml-auto sm:max-w-[46%] sm:text-right"
        }`}
        style={{ color: step.text }}
      >
        <span
          className="flex size-9 items-center justify-center rounded-full border-2 border-[#191717] bg-(--tpl-paper) font-baloo2 text-base text-[#191717]"
          aria-hidden="true"
        >
          {step.n}
        </span>
        <h3
          className="font-baloo2 uppercase"
          style={{ fontSize: "clamp(24px, 3.6vw, 60px)", lineHeight: 1.08 }}
        >
          {step.title}
        </h3>
        {narrow ? (
          <p className="mt-auto font-quicksand text-sm font-medium leading-snug sm:text-base" style={{ color: step.text }}>
            {step.line}
          </p>
        ) : (
          <p className="font-quicksand text-sm font-medium leading-snug sm:text-base">{step.line}</p>
        )}
      </div>
    </div>
  )
}

export function StepsSection() {


  const giant = (word: string) => (
    <p
      aria-hidden="true"
      className="w-full max-w-[1110px] select-none text-center font-baloo2 font-normal uppercase"
      style={{
        color: "var(--tpl-paper)",
        fontSize: "clamp(56px, 18vw, 250px)",
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        textShadow: "4px 5px 0 #191717",
      }}
    >
      {word}
    </p>
  )

  return (
    <section
      id="cara-daftar"
      aria-labelledby="cara-daftar-heading"
      className="relative isolate flex w-full flex-col items-center overflow-hidden bg-(--tpl-pink) px-4 py-16 md:py-20"
    >
      <Image
        src="/assets/img/image_281.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <h2 id="cara-daftar-heading" className="sr-only">
        Cara daftar dalam 3 langkah
      </h2>

      <div className="mx-auto flex w-full max-w-[1110px] flex-col items-center">
        {giant("MUDAH")}

        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-0">
          <div
            aria-hidden="true"
            className="flex min-h-[300px] w-full items-center justify-center rounded-[40px] border-2 border-[#191717] bg-(--tpl-paper) px-8 py-8 shadow-[5px_6px_0_0_#191717] lg:w-[31%] lg:shrink-0"
          >
            <span
              className="select-none text-center font-baloo2 uppercase"
              style={{ color: "var(--tpl-terracotta)", fontSize: "clamp(120px, 24vw, 300px)", lineHeight: 1 }}
            >
              3
            </span>
          </div>
          <StepCard step={steps[0]} index={0} />
        </div>

        {giant("LANGKAH")}

        <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-start lg:gap-5">
          <StepCard step={steps[1]} index={1} />
          <StepCard step={steps[2]} index={2} />
        </div>

      </div>
    </section>
  )
}
