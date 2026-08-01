import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-700)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Page Header Skeleton */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <Skeleton className="w-40 h-6 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full" />
            <Skeleton className="h-12 mx-auto w-96 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="w-full h-6 max-w-2xl mx-auto bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Article Content Skeleton */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-gray-900/40 rounded-[1.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/5">
                <div className="mb-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-24 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-20 h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <Skeleton className="w-full h-16 bg-gray-200 dark:bg-gray-800" />
                  <div className="flex flex-wrap gap-4">
                    <Skeleton className="w-32 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-28 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-32 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>

                <Skeleton className="w-full h-[400px] rounded-[1.5rem] mb-12" />

                <div className="space-y-4">
                  <Skeleton className="w-full h-6 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="w-full h-6 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="w-3/4 h-6 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="w-full h-6 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="w-2/3 h-6 bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                  <Skeleton className="w-32 h-6 mb-4 bg-gray-200 dark:bg-gray-800" />
                  <div className="flex gap-2">
                    <Skeleton className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <Card className="border-0 shadow-2xl rounded-[1.5rem] bg-white dark:bg-gray-900/40 overflow-hidden">
                <div className="bg-(--color-forest-700) p-8">
                  <Skeleton className="w-32 h-8 bg-white/20" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-800" />
                    <div className="space-y-2">
                      <Skeleton className="w-48 h-6 bg-gray-200 dark:bg-gray-800" />
                      <Skeleton className="w-32 h-4 bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-2xl rounded-[1.5rem] bg-white dark:bg-gray-900/40 overflow-hidden">
                <div className="bg-(--color-sun-500) p-8">
                  <Skeleton className="w-32 h-8 bg-white/20" />
                </div>
                <div className="p-8 space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                      <Skeleton className="w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-800" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="w-20 h-6 rounded-md bg-gray-200 dark:bg-gray-800" />
                        <Skeleton className="w-full h-4 bg-gray-200 dark:bg-gray-800" />
                        <Skeleton className="w-24 h-4 bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}