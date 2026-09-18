import { Skeleton } from "@/components/ui/skeleton"
import PageAnimations from "@/components/PageAnimations"

export default function Loading() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      <PageAnimations />
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Dynamic Activity Bento Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-(--color-cloud-100)/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800 z-10 relative pointer-events-auto">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Energetic Text Banner (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <Skeleton className="w-32 h-8 mb-8 rounded-full bg-white/30" />
                <Skeleton className="w-3/4 h-16 mb-6 bg-white/30" />
                <Skeleton className="w-full h-6 bg-white/20" />
              </div>
            </div>

            {/* Quick Icons/Visual Hooks (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-(--color-sun-500) dark:bg-(--color-sun-400) border-0 rounded-[2.5rem] p-8 shadow-sm flex flex-row items-center justify-between flex-1">
                <div className="absolute top-[-50%] right-[-20%] w-48 h-48 bg-white/20 rounded-full blur-[40px] pointer-events-none" />
                <div className="z-10">
                  <Skeleton className="w-32 h-12 bg-white/30" />
                </div>
                <Skeleton className="w-16 h-16 bg-white/30 rounded-2xl" />
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-row items-center justify-between flex-1">
                <div className="absolute bottom-[-50%] right-[-20%] w-48 h-48 bg-(--color-forest-450)/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="z-10">
                  <Skeleton className="w-32 h-12" />
                </div>
                <Skeleton className="w-16 h-16 bg-(--color-forest-450)/30 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="relative py-24 sm:py-32 bg-(--color-cloud-100) dark:bg-gray-950 overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-10 text-center border-0 rounded-[2.5rem] bg-white dark:bg-gray-900/40">
                <Skeleton className="w-20 h-20 mx-auto mb-8 rounded-3xl" />
                <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section Skeleton */}
      <section className="relative py-24 bg-(--color-paper-50) dark:bg-gray-900 overflow-hidden transition-colors duration-500">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-(--color-teal-400)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="space-y-6">
            <div className="grid max-w-4xl grid-cols-2 gap-2 mx-auto sm:grid-cols-3 md:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-full border-0 rounded-[2.5rem] bg-white dark:bg-gray-900/40 overflow-hidden">
                  <Skeleton className="w-full h-72" />
                  <div className="p-8 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
