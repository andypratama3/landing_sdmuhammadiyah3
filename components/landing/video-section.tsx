export function VideoSection() {
  return (
    <section className="gsap-video py-24 bg-(--color-paper-50) dark:bg-(--color-forest-950)">
      <div className="container mx-auto px-4">
        <h2 className="max-w-xl text-balance font-outfit text-3xl font-extrabold tracking-tight text-(--color-forest-900) sm:text-4xl dark:text-white">
          Sekolah yang bisa dilihat, bukan hanya dijanjikan
        </h2>
        <div className="video-container relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-[1.75rem] bg-(--color-forest-900)">
          <iframe
            src="https://www.youtube.com/embed/lb14Dy0uwI4"
            title="Profil SD Muhammadiyah 3 Samarinda"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full"
          />
        </div>
      </div>
    </section>
  )
}
