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
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">
              Gallery
            </Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">
              Gallery Aktivitas
            </h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Dokumentasi kegiatan dan prestasi siswa SD Muhammadiyah 3 Samarinda
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
      <section className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "grid"
                      ? "bg-[#33b962] hover:bg-[#2a9d52]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "list"
                      ? "bg-[#33b962] hover:bg-[#2a9d52]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                {galleriesLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `${galleries.length} Aktivitas`
                )}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryLoading ? (
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-24 h-10 rounded-full" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={activeFilter === category.value ? "default" : "outline"}
                    className={`rounded-full ${
                      activeFilter === category.value
                        ? "bg-[#33b962] hover:bg-[#2a9d52] text-white"
                        : "bg-transparent hover:bg-[#33b962]/5"
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
      <section ref={contentRef} className="py-16 bg-gray-50">
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
                        className="py-0 overflow-hidden transition-all border-0 shadow-lg break-inside-avoid rounded-3xl hover:shadow-2xl group"
                      >
                        <div className="relative w-full h-auto overflow-hidden">
                          <img
                            src={mainImage}
                            alt={item.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg"
                            }}
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="mb-2 font-bold text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.created_at)}
                          </div>

                          {/* Categories badges */}
                          {item.gallery_kategori && item.gallery_kategori.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.gallery_kategori.slice(0, 2).map((cat) => (
                                <Badge 
                                  key={cat.id} 
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {cat.name}
                                </Badge>
                              ))}
                              {item.gallery_kategori.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.gallery_kategori.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}

                          <Button 
                            asChild 
                            size="sm" 
                            className="w-full bg-[#33b962] hover:bg-[#2a9d52]"
                          >
                            <Link href={`/galeri/${item.slug}`}>
                              Lihat Detail
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                // LIST VIEW
                <div className="max-w-5xl mx-auto space-y-4">
                  {galleries.map((item) => {
                    const mainImage = getMainImage(item)
                    
                    return (
                      <Card
                        key={item.id}
                        className="overflow-hidden transition-all border-0 shadow-lg rounded-3xl hover:shadow-xl"
                      >
                        <div className="flex flex-col gap-6 p-6 md:flex-row">
                          <div className="flex-shrink-0 w-full h-64 overflow-hidden md:w-64 md:h-64 rounded-2xl">
                            <img
                              src={mainImage}
                              alt={item.name}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg"
                              }}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {formatDate(item.created_at)}
                            </div>

                            {/* Categories badges */}
                            {item.gallery_kategori && item.gallery_kategori.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {item.gallery_kategori.map((cat) => (
                                  <Badge 
                                    key={cat.id} 
                                    variant="secondary"
                                  >
                                    {cat.name}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <Button 
                              asChild 
                              size="sm"
                              className="bg-[#33b962] hover:bg-[#2a9d52]"
                            >
                              <Link href={`/galeri/${item.slug}`}>
                                Lihat Detail
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