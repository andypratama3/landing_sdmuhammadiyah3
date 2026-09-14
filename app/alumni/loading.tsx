export default function AlumniLoading() {
  return (
    <div className="min-h-screen bg-(--color-paper-50) dark:bg-gray-950 overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-(--color-forest-450)/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-60 right-0 w-96 h-96 bg-(--color-sun-500)/6 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero skeleton */}
      <section className="relative pt-28 pb-0">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[420px]">

            {/* Main hero card skeleton */}
            <div className="lg:col-span-7 bg-(--color-forest-450)/20 dark:bg-(--color-forest-900)/40 rounded-[2.5rem] p-8 md:p-12 animate-pulse flex flex-col justify-end">
              <div className="h-5 w-32 bg-white/20 rounded-full mb-6" />
              <div className="h-14 w-3/4 bg-white/20 rounded-2xl mb-3" />
              <div className="h-14 w-1/2 bg-white/20 rounded-2xl mb-6" />
              <div className="h-5 w-full bg-white/10 rounded-lg mb-2" />
              <div className="h-5 w-2/3 bg-white/10 rounded-lg" />
            </div>

            {/* Stats bento skeleton */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 animate-pulse flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                </div>
              </div>
              <div className="bg-(--color-sun-500)/20 rounded-[2rem] p-5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-black/10 mb-4" />
                <div className="h-3 w-16 bg-black/10 rounded mb-2" />
                <div className="h-9 w-12 bg-black/10 rounded-lg" />
              </div>
              <div className="bg-(--color-teal-400)/20 rounded-[2rem] p-5 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-black/10 mb-4" />
                <div className="h-3 w-16 bg-black/10 rounded mb-2" />
                <div className="h-9 w-12 bg-black/10 rounded-lg" />
              </div>
              <div className="col-span-2 bg-gray-900/50 dark:bg-gray-800 rounded-[2rem] p-5 animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-700 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-gray-700 rounded" />
                  <div className="h-7 w-20 bg-gray-700 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight skeleton */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="mb-10 space-y-2">
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
            <div className="h-10 w-52 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-72 bg-gray-100 dark:bg-gray-800" />
                <div className="p-6 space-y-4">
                  <div className="h-5 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                  <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                  <div className="h-16 w-full bg-gray-100 dark:bg-gray-700 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar skeleton */}
      <section className="pb-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="h-14 w-full bg-gray-200 dark:bg-gray-800 rounded-[1.5rem] animate-pulse mb-5" />
          <div className="flex gap-3 mb-10">
            {[80, 120, 80, 80, 80].map((w, i) => (
              <div key={i} className="h-9 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" style={{ width: w }} />
            ))}
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-60 bg-gray-100 dark:bg-gray-800" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                  <div className="h-3 w-1/3 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-lg" />
                  <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700 rounded-lg" />
                  <div className="h-14 w-full bg-gray-100 dark:bg-gray-700 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
