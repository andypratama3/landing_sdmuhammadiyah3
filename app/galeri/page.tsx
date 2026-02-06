"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Grid, List, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import { useApi } from "@/hooks/useApi"
import { Gallery, GalleryKategori } from '@/types/gallery.types'
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function GaleriPage() {
  const [activeFilter, setActiveFilter] = useState("semua")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Ref untuk scroll target
  const contentRef = useRef<HTMLDivElement>(null)

  // Build query string with filter
  const queryString = useMemo(() => {
    const params = new URLSearchParams()

    if (activeFilter !== "semua") {
      params.set('category', activeFilter)
    }

    return params.toString()
  }, [activeFilter])

  // Fetch galleries with filter
  const {
    data: galleriesData,
    loading: galleriesLoading,
    error: galleriesError,
    refetch: refetchGalleries
  } = useApi<Gallery[]>(`/gallery${queryString ? `?${queryString}` : ''}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  // Fetch category counts
  const {
    data: categoryData,
    loading: categoryLoading
  } = useApi<GalleryKategori[]>('/kategori-gallery', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Process galleries data
  const galleries = useMemo(() => {
    if (!galleriesData || !Array.isArray(galleriesData)) return []
    return galleriesData
  }, [galleriesData])

  // Process categories
  const categories = useMemo(() => {
    const cats = [{ name: "Semua", value: "semua" }]

    if (categoryData && Array.isArray(categoryData)) {
      categoryData.forEach(cat => {
        cats.push({
          name: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
          value: cat.name.toLowerCase()
        })
      })
    }

    return cats
  }, [categoryData])

  // Reset filter when changing category
  useEffect(() => {
    if (contentRef.current && activeFilter !== "semua") {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [activeFilter])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Improved image handling dengan path yang sesuai
  const getMainImage = (gallery: Gallery) => {
    const firstFoto = gallery.foto?.split(",")?.[0]?.trim() || null

    if (gallery.cover) {
      return `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/cover/${gallery.cover}`
    } else if (firstFoto) {
      return `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/gallery/${firstFoto}`
    } else {
      return "/placeholder.svg"
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto mt-8">
          <div className="max-w-4xl mx-auto text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
              Gallery Aktivitas Sekolah Kreatif
            </Badge>
            <h1 className="mb-8 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance uppercase tracking-tight">
              Momen Kreatif Kami
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed font-outfit">
              Dokumentasi perjalanan inspiratif, kegiatan seru, dan prestasi membanggakan seluruh civitas akademika SD Muhammadiyah 3 Samarinda.
            </p>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {galleriesError && (
        <div className="container px-4 mx-auto mt-8">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Terjadi kesalahan saat memuat data gallery.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchGalleries()}
                className="ml-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Filter & View Toggle */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 relative z-20 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-8 mb-12 md:flex-row">
              <div className="flex bg-gray-100 dark:bg-gray-900/50 p-2 rounded-[1.25rem] gap-1 backdrop-blur-xl border border-gray-200 dark:border-white/5">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  className={`rounded-xl px-5 py-2 h-11 transition-all duration-500 ${viewMode === "grid"
                    ? "bg-white dark:bg-gray-800 shadow-xl text-[#33b962] scale-105"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Grid className="w-5 h-5 mr-2" />
                  <span className="font-black text-[10px] uppercase tracking-widest">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  className={`rounded-xl px-5 py-2 h-11 transition-all duration-500 ${viewMode === "list"
                    ? "bg-white dark:bg-gray-800 shadow-xl text-[#33b962] scale-105"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="w-5 h-5 mr-2" />
                  <span className="font-black text-[10px] uppercase tracking-widest">List</span>
                </Button>
              </div>

              <div className="flex items-center gap-4 px-8 py-3 bg-[#33b962]/5 dark:bg-[#33b962]/10 rounded-full border border-emerald-500/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#33b962] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#33b962] whitespace-nowrap">
                  {galleriesLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    `${galleries.length} MOMEN TEREKAM`
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {categoryLoading ? (
                <div className="flex gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-28 h-12 rounded-full" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={activeFilter === category.value ? "default" : "outline"}
                    className={`rounded-full px-8 py-2 h-12 font-black uppercase tracking-widest text-[10px] transition-all duration-500 group ${activeFilter === category.value
                      ? "bg-[#33b962] text-white shadow-2xl shadow-emerald-500/30 border-0 scale-105"
                      : "bg-white dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 border-2 border-gray-100 dark:border-white/5 hover:border-[#33b962] hover:text-[#33b962] dark:hover:bg-gray-800"
                      }`}
                    onClick={() => setActiveFilter(category.value)}
                  >
                    {category.name}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={contentRef} className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
        <div className="container px-4 mx-auto">
          {/* LOADING */}
          {galleriesLoading && (
            <div className={viewMode === "grid"
              ? "gap-6 mx-auto space-y-6 columns-1 md:columns-2 lg:columns-3 max-w-7xl"
              : "max-w-5xl mx-auto space-y-4"
            }>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={viewMode === "grid"
                    ? "bg-gray-200 h-96 rounded-3xl break-inside-avoid"
                    : "bg-gray-200 h-64 rounded-3xl"
                  }
                />
              ))}
            </div>
          )}

          {/* ERROR */}
          {!galleriesLoading && galleriesError && galleries.length === 0 && (
            <div className="py-20 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-300" />
              <p className="text-lg text-red-500">
                Gagal memuat gallery
              </p>
            </div>
          )}

          {/* DATA */}
          {!galleriesLoading && !galleriesError && (
            <>
              {viewMode === "grid" ? (
                // GRID VIEW
                <div className="gap-6 mx-auto space-y-6 columns-1 md:columns-2 lg:columns-3 max-w-7xl">
                  {galleries.map((item) => {
                    const mainImage = getMainImage(item)

                    return (
                      <Card
                        key={item.id}
                        className="py-0 overflow-hidden transition-all duration-500 border-0 shadow-xl break-inside-avoid rounded-[2rem] hover:shadow-2xl hover:-translate-y-2 group glass dark:bg-gray-900/40"
                      >
                        <div className="relative w-full h-[300px] overflow-hidden">
                          <Image
                            src={mainImage}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg"
                            }}
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <Button
                              asChild
                              size="sm"
                              className="w-full bg-[#33b962] hover:bg-[#2a9d52] rounded-xl font-black uppercase tracking-widest text-[10px] h-10 shadow-2xl"
                            >
                              <Link href={`/galeri/${item.slug}`}>
                                Lihat Selengkapnya
                              </Link>
                            </Button>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="mb-3 text-lg font-black text-gray-900 dark:text-white line-clamp-2 uppercase tracking-tight group-hover:text-[#33b962] transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                            <Calendar className="w-3.5 h-3.5 text-[#33b962] brightness-125" />
                            {formatDate(item.created_at)}
                          </div>

                          {/* Categories badges */}
                          {item.gallery_kategori && item.gallery_kategori.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.gallery_kategori.slice(0, 3).map((cat: any) => (
                                <Badge
                                  key={cat.id}
                                  className="bg-emerald-50 dark:bg-emerald-900/20 text-[#33b962] border-emerald-500/10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md"
                                >
                                  {cat.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                // LIST VIEW
                <div className="max-w-5xl mx-auto space-y-8">
                  {galleries.map((item) => {
                    const mainImage = getMainImage(item)

                    return (
                      <Card
                        key={item.id}
                        className="overflow-hidden transition-all duration-500 border-0 shadow-xl rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 dark:bg-gray-900/40 card-premium glass"
                      >
                        <div className="flex flex-col gap-8 p-8 md:flex-row items-center">
                          <div className="flex-shrink-0 w-full h-72 overflow-hidden md:w-80 md:h-80 rounded-[2rem] group/img relative shadow-2xl">
                            <Image
                              src={mainImage}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg"
                              }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                          </div>

                          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                            <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight group-hover:text-[#33b962] transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                              <Calendar className="w-4 h-4 text-[#33b962]" />
                              {formatDate(item.created_at)}
                            </div>

                            {/* Categories badges */}
                            {item.gallery_kategori && item.gallery_kategori.length > 0 && (
                              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
                                {item.gallery_kategori.map((cat) => (
                                  <Badge
                                    key={cat.id}
                                    className="bg-[#33b962]/10 text-[#33b962] border-emerald-500/10 px-4 py-1.5 font-black uppercase tracking-widest text-[9px] rounded-lg"
                                  >
                                    {cat.name}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <Button
                              asChild
                              size="lg"
                              className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-2xl px-10 py-7 font-black uppercase tracking-widest text-[11px] shadow-xl hover:scale-105 transition-all w-fit mx-auto md:mx-0"
                            >
                              <Link href={`/galeri/${item.slug}`}>
                                LIHAT DETAIL MOMEN
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              )}

              {/* Empty State */}
              {galleries.length === 0 && !galleriesLoading && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-500">
                    {activeFilter !== "semua"
                      ? `Tidak ada gallery untuk kategori "${activeFilter}"`
                      : "Belum ada gallery yang tersedia"
                    }
                  </p>
                  {activeFilter !== "semua" && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setActiveFilter("semua")}
                    >
                      Lihat Semua Gallery
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}