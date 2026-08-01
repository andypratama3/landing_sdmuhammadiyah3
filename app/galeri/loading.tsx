import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-(--color-cloud-100)/50 dark:bg-black/50 mt-4 border-b border-gray-200 dark:border-gray-800 relative z-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Typographic Card */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[1.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <Skeleton className="w-32 h-8 bg-white/20 rounded-full" />
                <Skeleton className="w-3/4 h-16 bg-white/20" />
                <Skeleton className="w-full h-6 bg-white/20" />
                <Skeleton className="w-2/3 h-6 bg-white/20" />
              </div>
            </div>

            {/* Side Highlights */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[1.5rem] p-8 shadow-sm flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
                <Skeleton className="w-32 h-8 mb-2" />
                <Skeleton className="w-24 h-4" />
              </div>

              <div className="bg-(--color-sun-500) dark:bg-(--color-sun-400) rounded-[1.5rem] p-8 shadow-md flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 rounded-2xl mb-6 bg-white/20" />
                <Skeleton className="w-32 h-8 mb-2 bg-white/20" />
                <Skeleton className="w-24 h-4 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="py-12 bg-(--color-paper-50) dark:bg-gray-950 border-b border-gray-200 dark:border-white/5 relative z-20 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-8 mb-12 md:flex-row">
              <div className="flex bg-(--color-cloud-100) dark:bg-gray-900/50 p-2 rounded-[1.25rem] gap-1 backdrop-blur-xl border border-gray-200 dark:border-white/5">
                <Skeleton className="w-24 h-11 rounded-xl" />
                <Skeleton className="w-24 h-11 rounded-xl" />
              </div>

              <div className="flex items-center gap-4 px-8 py-3 bg-(--color-forest-450)/5 dark:bg-(--color-forest-450)/10 rounded-full border border-(--color-forest-450)/10 backdrop-blur-md">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="w-32 h-4" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-28 h-12 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-(--color-cloud-100) dark:bg-gray-950 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          <div className="gap-6 mx-auto space-y-6 columns-1 md:columns-2 lg:columns-3 max-w-7xl">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="py-0 overflow-hidden border-0 shadow-xl break-inside-avoid rounded-[1.25rem]">
                <Skeleton className="w-full h-[300px]" />
                <div className="p-6 space-y-4">
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-24 h-4" />
                  <div className="flex gap-2">
                    <Skeleton className="w-16 h-6 rounded-md" />
                    <Skeleton className="w-16 h-6 rounded-md" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
