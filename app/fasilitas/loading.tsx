import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Building, Users, CheckCircle, Ruler } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function FasilitasLoading() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-(--color-paper-50) dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-(--color-forest-450)/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-(--color-sun-500)/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-(--color-teal-400)/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-(--color-cloud-100)/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-(--color-forest-450) via-(--color-forest-450)/80 to-transparent z-0" />
              <Image
                src="/GedungSekolah.jpeg"
                alt="Gedung Harapan SD Muhammadiyah 3"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover opacity-20 z-[-1]"
                priority
              />

              <div className="relative z-10">
                <Skeleton className="w-32 h-8 mb-8 rounded-full bg-white/30" />
                <Skeleton className="w-3/4 h-16 mb-6 bg-white/30" />
                <Skeleton className="w-full h-6 mb-10 bg-white/20" />
                <Skeleton className="w-40 h-12 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl" />
                <Skeleton className="w-32 h-8 mb-2" />
                <Skeleton className="w-40 h-4" />
              </div>

              <div className="bg-(--color-sun-500) dark:bg-(--color-sun-400) rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl bg-white/30" />
                <Skeleton className="w-32 h-8 mb-2 bg-white/30" />
                <Skeleton className="w-40 h-4 bg-white/20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities List Skeleton */}
      <section className="py-16 bg-(--color-cloud-100) dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden border-0 shadow-xl rounded-[2.5rem] dark:bg-gray-900/40"
              >
                <div className="grid gap-12 p-10 md:grid-cols-2 items-center">
                  {/* Images Skeleton */}
                  <div className="space-y-6">
                    <Skeleton className="h-72 sm:h-80 lg:h-96 rounded-[1.75rem]" />
                    <div className="grid grid-cols-2 gap-6">
                      <Skeleton className="h-48 rounded-[1.5rem]" />
                      <Skeleton className="h-48 rounded-[1.5rem]" />
                    </div>
                  </div>

                  {/* Details Skeleton */}
                  <div>
                    <Skeleton className="w-3/4 h-12 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                      <Skeleton className="h-20 rounded-2xl" />
                      <Skeleton className="h-20 rounded-2xl" />
                    </div>
                    <Skeleton className="w-full h-6 mb-2" />
                    <Skeleton className="w-full h-20 mb-10" />
                    <Skeleton className="w-40 h-6 mb-4" />
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="w-24 h-8 rounded-lg" />
                      ))}
                    </div>
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
