"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, GraduationCap, Award, Search, BookOpen, Loader2, X, AlertCircle } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default function GuruPage() {
  const [searchInput, setSearchInput] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Debounce search
  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  // Build query string
  const queryParams = useMemo(() => {
    const params = new URLSearchParams()
    if (debouncedSearchQuery) params.append('search', debouncedSearchQuery)
    if (activeFilter !== 'all') params.append('pelajaran', activeFilter)
    return params.toString()
  }, [debouncedSearchQuery, activeFilter])

  // Fetch list guru dengan filter dari backend
  const { data: gurusResponse, loading: gurusLoading, error: gurusError, refetch: refetchGurus } = useApi(
    `/guru${queryParams ? '?' + queryParams : ''}`,
    {
      cache: true,
      cacheTTL: 300000,
      immediate: true,
    }
  )

  // Extract gurus data from API response
  const gurus = useMemo(() => {
    if (!gurusResponse) return []
    
    // Check if response has 'data' property (wrapped response)
    const dataArray = (gurusResponse as any)?.data || gurusResponse
    
    // Ensure it's an array
    return Array.isArray(dataArray) ? dataArray : []
  }, [gurusResponse])

  // Fetch pelajaran untuk filter buttons
  const { data: pelajaransResponse, loading: pelajaransLoading } = useApi(
    '/guru/pelajaran',
    {
      cache: true,
      cacheTTL: 3600000,
      immediate: true,
    }
  )

  // Extract pelajarans data from API response
  const pelajarans = useMemo(() => {
    if (!pelajaransResponse) return []
    
    const dataArray = (pelajaransResponse as any)?.data || pelajaransResponse
    return Array.isArray(dataArray) ? dataArray : []
  }, [pelajaransResponse])

  // Fetch detail guru ketika ada yang dipilih
  const { data: guruDetailResponse, loading: detailLoading } = useApi(
    selectedSlug ? `/guru/${selectedSlug}` : '',
    {
      cache: true,
      cacheTTL: 300000,
      immediate: !!selectedSlug,
    }
  )

  // Extract guru detail from API response
  const guruDetail = useMemo(() => {
    if (!guruDetailResponse) return null
    
    // Check if response has 'data' property
    const data = (guruDetailResponse as any)?.data
    
    // If data exists and is not an empty array, return it
    if (data && (!Array.isArray(data) || data.length > 0)) {
      return data
    }
    
    // Otherwise return the response itself if it has properties
    if (guruDetailResponse && typeof guruDetailResponse === 'object' && Object.keys(guruDetailResponse).length > 0) {
      return guruDetailResponse
    }
    
    return null
  }, [guruDetailResponse])

  // Create filter buttons dari pelajaran yang ada
  const filters = useMemo(() => {
    return [
      { id: "all", label: "Semua Guru" },
      ...pelajarans.map((p: any) => ({
        id: p.slug,
        label: p.name,
      })),
    ]
  }, [pelajarans])

  // Auto scroll saat filter/search berubah
  useEffect(() => {
    if (contentRef.current && !gurusLoading) {
      window.scrollTo({
        top: contentRef.current.offsetTop - 100,
        behavior: 'smooth'
      })
    }
  }, [debouncedSearchQuery, activeFilter])

  const isSearching = isTyping || gurusLoading

  // Loading state
  if ((gurusLoading && !gurus.length) || pelajaransLoading) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
          <div className="container px-4 mx-auto">
            <Breadcrumb items={[{ label: "Guru" }]} />
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Tenaga Pengajar</Badge>
              <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Guru Kami</h1>
              <p className="text-xl leading-relaxed text-white/90 text-balance">
                Tim pengajar profesional, berpengalaman, dan berdedikasi tinggi
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 rounded-3xl">
                  <Skeleton className="w-full h-64 rounded-t-3xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-4" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Guru" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Tenaga Pengajar</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Guru Kami</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Tim pengajar profesional, berpengalaman, dan berdedikasi tinggi
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section ref={contentRef} className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
              <div className="relative w-full md:w-96">
                {isTyping ? (
                  <Loader2 className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2 animate-spin" />
                ) : (
                  <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                )}
                <Input
                  type="text"
                  placeholder="Cari nama guru..."
                  className="pl-10 rounded-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute p-1 transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                Total: {gurus.length} Guru
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  className={`rounded-full ${
                    activeFilter === filter.id
                      ? "bg-[#33b962] hover:bg-[#2a9d52] text-white"
                      : "bg-transparent hover:bg-[#33b962]/5"
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {gurusError && gurus.length === 0 && (
        <div className="container px-4 mx-auto mt-8">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Terjadi kesalahan saat memuat data guru.</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetchGurus?.()}
                className="ml-4"
              >
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Teachers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          {isSearching ? (
            <div className="grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {isTyping && (
                <div className="flex items-center justify-center py-8 col-span-full">
                  <Loader2 className="w-6 h-6 mr-2 animate-spin text-[#33b962]" />
                  <span className="text-sm text-gray-500">Mencari...</span>
                </div>
              )}
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 rounded-3xl">
                  <Skeleton className="w-full h-64 rounded-t-3xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : gurus.length > 0 ? (
            <div className="grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
              {gurus.map((guru: any) => (
                <Card
                  key={guru.slug}
                  className="overflow-hidden transition-all duration-300 border-0 shadow-lg cursor-pointer rounded-3xl hover:shadow-2xl hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10">
                    <img
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guru.foto}` || guru.foto || "/placeholder.svg"}
                      alt={guru.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-[#33b962] border-0">
                        {guru.pelajarans && guru.pelajarans.length > 0 
                          ? guru.pelajarans[0].name 
                          : "Guru"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{guru.name}</h3>
                    <p className="text-[#33b962] text-sm font-medium mb-4">{guru.lulusan}</p>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-[#33b962] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{guru.description}</span>
                      </div>
                      {guru.pelajarans && guru.pelajarans.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#33b962] flex-shrink-0" />
                          <span className="text-xs line-clamp-1">
                            {guru.pelajarans.map((p: any) => p.name).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pt-4 mt-4 space-y-2 transition-opacity duration-300 border-t opacity-0 group-hover:opacity-100">
                      <Button
                        onClick={() => setSelectedSlug(guru.slug)}
                        className="w-full text-center bg-[#33b962] text-white rounded-lg text-sm font-medium hover:bg-[#2a9d52] transition-colors"
                      >
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500">
                {debouncedSearchQuery 
                  ? `Tidak ditemukan guru dengan nama "${debouncedSearchQuery}"`
                  : 'Tidak ada guru yang ditemukan'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail Guru */}
      {selectedSlug && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedSlug(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSlug(null)}
              className="sticky z-10 float-right p-2 text-gray-400 transition-colors rounded-full top-4 right-4 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>

            {detailLoading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="w-full h-80 rounded-3xl" />
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-full h-6" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>
            ) : guruDetail ? (
              <div className="p-8">
                {/* Photo */}
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={(`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${(guruDetail as any).foto}` || guruDetail as any).foto || "/placeholder.svg"}
                    alt={(guruDetail as any).name}
                    className="object-cover w-full h-80"
                  />
                </div>

                {/* Info */}
                <div className="mb-6">
                  <h2 className="mb-2 text-4xl font-bold text-gray-900">{(guruDetail as any).name}</h2>
                  <p className="text-[#33b962] text-lg font-medium">{(guruDetail as any).lulusan}</p>
                </div>

                {/* Description */}
                <div className="pb-6 mb-6 border-b">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Tentang</h3>
                  <p className="leading-relaxed text-gray-600">{(guruDetail as any).description}</p>
                </div>

                {/* Subjects */}
                {(guruDetail as any).pelajarans && (guruDetail as any).pelajarans.length > 0 && (
                  <div className="pb-6 mb-6 border-b">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Mengajar Pelajaran</h3>
                    <div className="flex flex-wrap gap-2">
                      {(guruDetail as any).pelajarans.map((p: any) => (
                        <Badge
                          key={p.slug}
                          className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2"
                        >
                          {p.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Employee Info */}
                {(guruDetail as any).karyawan && (
                  <div className="pb-6 border-b">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Informasi Kontak</h3>
                    <div className="space-y-3">
                      {(guruDetail as any).karyawan.email && (
                        <a
                          href={`mailto:${(guruDetail as any).karyawan.email}`}
                          className="flex items-center gap-3 text-gray-600 hover:text-[#33b962] transition-colors"
                        >
                          <Mail className="flex-shrink-0 w-5 h-5" />
                          <span>{(guruDetail as any).karyawan.email}</span>
                        </a>
                      )}
                      {(guruDetail as any).karyawan.name && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Award className="w-5 h-5 flex-shrink-0 text-[#33b962]" />
                          <span>{(guruDetail as any).karyawan.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">Guru tidak ditemukan</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}