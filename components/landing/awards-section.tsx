export function AwardsSection() {
  return (
    <section
      id="penghargaan"
      aria-labelledby="penghargaan-heading"
      className="bg-(--tpl-cyan) py-20"
    >
      <div className="container mx-auto px-4">
        <h2
          id="penghargaan-heading"
          className="font-baloo2 text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium uppercase tracking-tight text-(--tpl-green-text)"
        >
          Penghargaan nasional
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <article className="ribbon-badge tpl-sticker flex h-full flex-col justify-center gap-2 rounded-[24px] bg-(--tpl-paper) p-6 sm:p-8">
            <p className="font-baloo2 text-2xl uppercase leading-tight tracking-tight text-(--tpl-ink)">
              Sekolah Ramah Anak
            </p>
          </article>
          <article className="ribbon-badge tpl-sticker flex h-full flex-col justify-center gap-2 rounded-[24px] bg-(--tpl-mint) p-6 sm:p-8">
            <p className="font-baloo2 text-2xl uppercase leading-tight tracking-tight text-(--tpl-ink)">
              Sekolah Adiwiyata
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
