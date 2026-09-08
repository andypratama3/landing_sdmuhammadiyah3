import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function TentangLoading() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-gray-50/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <Skeleton className="w-40 h-8 mb-8 rounded-full bg-white/30" />
                <Skeleton className="w-3/4 h-16 mb-6 bg-white/30" />
                <Skeleton className="w-full h-6 mb-10 bg-white/20" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="w-32 h-12 rounded-full bg-white/30" />
                  <Skeleton className="w-32 h-12 rounded-full bg-white/20" />
                </div>
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl" />
                <Skeleton className="w-24 h-8 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>
              
              <div className="bg-(--color-sun-500) dark:bg-(--color-sun-600) rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl bg-white/30" />
                <Skeleton className="w-24 h-8 mb-2 bg-white/30" />
                <Skeleton className="w-full h-4 bg-white/20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Skeleton */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="w-32 h-8 mb-4 rounded-full mx-auto" />
            <Skeleton className="w-64 h-12 mb-4 mx-auto" />
            <Skeleton className="w-96 h-6 mx-auto" />
          </div>
          <div className="grid max-w-7xl gap-8 mx-auto lg:grid-cols-2">
            <Card className="p-12 dark:bg-gray-900/40 border-0">
              <Skeleton className="w-24 h-24 mb-8 rounded-[1.25rem]" />
              <Skeleton className="w-48 h-12 mb-6" />
              <Skeleton className="w-full h-24" />
            </Card>

            <Card className="p-12 dark:bg-gray-900/40 border-0">
              <Skeleton className="w-24 h-24 mb-8 rounded-[1.25rem]" />
              <Skeleton className="w-56 h-12 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                    <Skeleton className="flex-1 h-6" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Skeleton */}
      <section className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="w-24 h-8 mb-4 rounded-full mx-auto" />
            <Skeleton className="w-56 h-12 mb-4 mx-auto" />
            <Skeleton className="w-80 h-6 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative flex gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-20 h-20 rounded-[1.5rem] shrink-0" />
                  {i < 5 && <Skeleton className="w-1 h-full mt-4" />}
                </div>
                <div className="flex-1 pb-12">
                  <Card className="p-8 dark:bg-gray-900/40 border-0 shadow-lg">
                    <Skeleton className="w-full h-6" />
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Skeleton */}
      <section className="relative py-24 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="w-28 h-8 mb-4 rounded-full mx-auto" />
            <Skeleton className="w-64 h-12 mb-4 mx-auto" />
            <Skeleton className="w-96 h-6 mx-auto" />
          </div>
          <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-10 dark:bg-gray-900/40 border-0">
                <Skeleton className="w-20 h-20 mb-8 rounded-[1.5rem]" />
                <Skeleton className="w-48 h-10 mb-4" />
                <Skeleton className="w-full h-16" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Skeleton */}
      <section className="relative py-24 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-500">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-16 text-center">
            <Skeleton className="w-28 h-8 mb-4 rounded-full mx-auto" />
            <Skeleton className="w-56 h-12 mb-4 mx-auto" />
            <Skeleton className="w-80 h-6 mx-auto" />
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
