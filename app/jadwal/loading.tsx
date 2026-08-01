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

      {/* Content */}
      <section className="py-24 bg-(--color-cloud-100) dark:bg-gray-950 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl rounded-[1.5rem] p-8 md:p-12">
              <div className="space-y-6">
                <Skeleton className="w-32 h-8" />
                <div className="grid gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <Skeleton className="w-16 h-16 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="w-3/4 h-6" />
                        <Skeleton className="w-1/2 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
