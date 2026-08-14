export function VideoSection() {
  return (
    <section className="py-24 bg-(--color-paper-50) dark:bg-gray-900 overflow-hidden relative">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <h2 className="text-fluid-h2 font-black leading-tight text-gray-900 dark:text-white text-balance font-outfit tracking-tighter">
            Pendidikan Modern Berbasis Teknologi & Karakter
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gray-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] rounded-[2.5rem] aspect-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/lb14Dy0uwI4?si=a0KsgpTUgzBOxyD_"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
