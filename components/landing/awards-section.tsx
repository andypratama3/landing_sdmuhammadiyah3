export function AwardsSection() {
  return (
    <section className="py-20 bg-(--color-cloud-100) dark:bg-(--color-forest-900)">
      <div className="container mx-auto px-4">
        <h2 className="font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) dark:text-white">
          Penghargaan nasional
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <p className="max-w-sm font-outfit text-2xl font-bold text-(--color-forest-800) dark:text-white">
            Sekolah Ramah Anak
          </p>
          <p className="max-w-sm font-outfit text-2xl font-bold text-(--color-forest-800) dark:text-white">
            Sekolah Adiwiyata
          </p>
        </div>
      </div>
    </section>
  )
}
