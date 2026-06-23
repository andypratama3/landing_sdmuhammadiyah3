export default function HomeLoading() {
  return (
    <div className="pt-18">
      {/* Hero Skeleton */}
      <section className="relative min-h-[100dvh] flex items-center bg-gradient-to-br from-[#33b962]/80 via-[#2a9d52]/80 to-[#238b45]/80 overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto pt-24 lg:pt-28">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <div className="mb-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 animate-pulse" />
            <div className="mb-6 w-48 h-6 rounded-full bg-white/15 animate-pulse" />
            <div className="mb-8 w-[500px] max-w-full h-16 sm:h-20 rounded-xl bg-white/15 animate-pulse" />
            <div className="mb-10 w-[400px] max-w-full h-8 rounded-lg bg-white/10 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-52 h-16 rounded-2xl bg-white/20 animate-pulse" />
              <div className="w-52 h-16 rounded-2xl bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="relative -mt-16 z-20 pb-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-20 h-8 mx-auto mb-2 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-24 h-4 mx-auto rounded-md bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Skeleton */}
      <section className="py-24 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-950/80 dark:to-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <div className="w-64 h-10 mx-auto mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-96 max-w-full h-6 mx-auto rounded-md bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className={`p-6 sm:p-8 ${i === 1 || i === 9 ? "lg:col-span-2" : ""}`}>
                <div className="w-12 h-12 mb-5 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-3/4 h-5 mb-3 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-full h-4 rounded-md bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Skeleton */}
      <section className="py-24 bg-[#33b962]/80 dark:bg-[#1a4d2e]/80 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 sm:grid-cols-2 lg:max-w-3xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="text-center">
                <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-white/15 animate-pulse" />
                <div className="w-44 h-7 mx-auto mb-2 rounded-md bg-white/15 animate-pulse" />
                <div className="w-56 h-5 mx-auto rounded-md bg-white/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Skeleton */}
      <section className="py-28 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-[2.5rem] h-[400px] sm:h-[480px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Skeleton */}
      <section className="py-24 bg-gray-50/80 dark:bg-gray-950/50">
        <div className="container px-4 mx-auto">
          <div className="mb-14 text-center">
            <div className="w-48 h-10 mx-auto mb-3 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-72 h-5 mx-auto rounded-md bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[2.5rem] h-[320px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
          <div className="text-center">
            <div className="w-48 h-14 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Video Skeleton */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-14 text-center">
            <div className="w-96 max-w-full h-10 mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-[2.5rem] aspect-video bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Preview Skeleton */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
            <div className="rounded-[2.5rem] h-[320px] sm:h-[420px] lg:h-[500px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div>
              <div className="w-36 h-8 mb-5 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="w-full h-10 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="w-full h-20 mb-8 rounded-lg bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
              <div className="w-40 h-14 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Skeleton */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <div className="w-32 h-8 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-64 h-10 mx-auto mb-3 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-80 h-5 mx-auto rounded-md bg-gray-50 dark:bg-gray-800/50 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[2rem] h-[340px] sm:h-[380px] lg:h-[420px] bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <div className="w-48 h-14 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="w-48 h-14 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Partners Skeleton */}
      <section className="py-20 bg-gray-50/80 dark:bg-gray-950/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container px-4 mx-auto text-center">
          <div className="w-48 h-5 mx-auto mb-12 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Awards Skeleton */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto text-center">
          <div className="w-64 h-10 mx-auto mb-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-24">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center p-8">
                <div className="w-36 h-36 mb-5 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="w-44 h-6 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-28 bg-gradient-to-br from-[#33b962]/80 via-[#2a9d52]/80 to-[#1a4d2e]/80">
        <div className="container px-4 mx-auto text-center">
          <div className="w-96 max-w-full h-12 mx-auto mb-6 rounded-lg bg-white/15 animate-pulse" />
          <div className="w-[400px] max-w-full h-6 mx-auto mb-12 rounded-md bg-white/10 animate-pulse" />
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <div className="w-44 h-16 rounded-full bg-white/20 animate-pulse" />
            <div className="w-44 h-16 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  )
}
