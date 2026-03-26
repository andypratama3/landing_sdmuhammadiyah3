'use client';

import { useState, useEffect, useMemo, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Award, Star, Shield, Calendar, CheckCircle, Search, Loader2, AlertCircle, RefreshCw, Eye, X } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import { PrestasiSekolah } from "@/types"

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function PrestasiSekolahPage() {
  const [searchInput, setSearchInput] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const contentRef = useRef<HTMLDivElement>(null)
  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    params.set('per_page', '9')

    if (selectedCategory !== "all") {
      params.set('kategori_slug', selectedCategory)
    }

    if (selectedYear !== "all") {
      params.set('tahun', selectedYear)
    }

    if (debouncedSearchQuery.trim()) {
      params.set('search', debouncedSearchQuery.trim())
    }

    return params.toString()
  }, [currentPage, selectedCategory, selectedYear, debouncedSearchQuery])

  // Fetch prestasi data
  const {
    data: prestasiData,
    meta: paginationMeta,
    loading: prestasiLoading,
    error: prestasiError,
    refetch: refetchPrestasi
  } = useApi<PrestasiSekolah[]>(`/prestasi/sekolah?${queryString}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  // Fetch category data
  const {
    data: categoryData,
    loading: categoryLoading
  } = useApi<{ slug: string, name: string }[]>('/prestasi/categories/sekolah', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Process categories
  const categories = useMemo(() => {
    const cats = [{ slug: "all", name: "Semua Kategori" }]

    if (categoryData && Array.isArray(categoryData)) {
      categoryData.forEach(cat => {
        cats.push({
          slug: cat.slug,
          name: cat.name
        })
      })
    }

    return cats
  }, [categoryData])

  // Years
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return [
      { id: "all", label: "Semua Tahun" },
      ...Array.from({ length: 5 }, (_, i) => ({
        id: String(currentYear - i),
        label: String(currentYear - i)
      }))
    ]
  }, [])

  // Category icons mapping
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase()
    if (name.includes('akreditasi')) return Award
    if (name.includes('penghargaan') || name.includes('award')) return Star
    if (name.includes('sertifikat') || name.includes('ramah')) return Shield
    return CheckCircle
  }

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory, selectedYear])

  // Auto scroll on page change
  useEffect(() => {
    if (contentRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [currentPage])

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    if (!paginationMeta) return []

    const pages: (number | string)[] = []
    const maxVisible = 5
    let startPage = Math.max(1, paginationMeta.current_page - 2)
    let endPage = Math.min(paginationMeta.last_page, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) pages.push('...')
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < paginationMeta.last_page) {
      if (endPage < paginationMeta.last_page - 1) pages.push('...')
      pages.push(paginationMeta.last_page)
    }

    return pages
  }, [paginationMeta])

  const isSearching = isTyping || prestasiLoading

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-gray-50/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-[#33b962] dark:bg-[#1a5a32] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <Badge className="bg-white text-[#33b962] hover:bg-white border-0 px-4 py-1.5 mb-8 text-xs sm:text-sm font-black uppercase tracking-widest shadow-md inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  Achievements & Milestones
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm uppercase">
                  Prestasi <br /> <span className="text-[#ffd166]">Institusi</span>
                </h1>
                <p className="text-white/95 text-lg font-medium max-w-xl mb-10 leading-relaxed drop-shadow-sm">
                  Pengakuan dan penghargaan atas dedikasi dalam memberikan pendidikan berkualitas bagi generasi masa depan.
                </p>
                
                {/* Search Bar Integration */}
                <div className="relative w-full max-w-xl">
                  <div className="flex items-center bg-white/95 dark:bg-gray-900 border border-white/20 shadow-2xl rounded-2xl p-2 focus-within:ring-4 focus-within:ring-white/30 transition-all">
                    <div className="pl-4 pr-3 text-gray-400">
                      {isTyping ? <Loader2 className="w-6 h-6 animate-spin text-[#33b962]" /> : <Search className="w-6 h-6" />}
                    </div>
                    <Input
                      type="text"
                      placeholder="Cari prestasi sekolah..."
                      className="flex-1 bg-transparent border-none shadow-none text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:ring-0 px-2 h-14 outline-none"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                      <button onClick={() => setSearchInput("")} className="px-3 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-4" />
                      </button>
                    )}
                    <Button className="bg-[#ffd166] hover:bg-[#ffb703] text-gray-900 rounded-xl px-6 sm:px-8 h-12 font-black uppercase tracking-widest text-sm shadow-md transition-transform hover:scale-105 hidden sm:flex">
                      Cari
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-[#33b962]">
                 <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center mb-6 text-[#33b962] group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Akreditasi</h3>
                <p className="text-sm font-medium text-gray-500 mt-2">Peringkat UNGGUL (A) Nasional</p>
              </div>
              
              <div className="bg-[#ffd166] dark:bg-[#e0b445] rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1 transition-transform relative overflow-hidden group hover:scale-[1.02]">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-gray-900 group-hover:rotate-12 transition-transform">
                    <Star className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Kualitas</h3>
                <p className="text-sm font-medium text-gray-800 mt-2">Sekolah Penggerak & Berprestasi</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Error Alert */}
      {prestasiError && (
        <div className="container px-4 mx-auto mt-8">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Terjadi kesalahan saat memuat data.</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchPrestasi()}
                className="ml-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Filters */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b dark:border-gray-800 relative z-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-end">
              {/* Year Filter */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#33b962] mb-2 block">Filter Berdasarkan Tahun</label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <Button
                      key={year.id}
                      variant={selectedYear === year.id ? "default" : "outline"}
                      className={`rounded-xl px-6 h-11 font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${selectedYear === year.id
                        ? "bg-[#33b962] text-white shadow-lg shadow-emerald-500/20 border-0"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-[#33b962] hover:text-[#33b962]"
                        }`}
                      onClick={() => setSelectedYear(year.id)}
                      disabled={categoryLoading}
                    >
                      {year.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#33b962] mb-2 block">Kategori Prestasi</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.slug}
                      variant={selectedCategory === category.slug ? "default" : "outline"}
                      className={`rounded-xl px-6 h-11 font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${selectedCategory === category.slug
                        ? "bg-[#33b962] text-white shadow-lg shadow-emerald-500/20 border-0"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-[#33b962] hover:text-[#33b962]"
                        }`}
                      onClick={() => setSelectedCategory(category.slug)}
                      disabled={categoryLoading}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {!isSearching && paginationMeta && (
              <div className="flex items-center gap-3 px-6 py-2 bg-[#33b962]/5 rounded-full border border-emerald-500/10 w-fit">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#33b962]">
                  Ditemukan {paginationMeta.total} Prestasi Luar Biasa
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl gap-2 mx-auto">
            {/* Loading State */}
            {isSearching ? (
              <div className="space-y-8">
                {isTyping && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 mr-2 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Mencari...</span>
                  </div>
                )}
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="grid gap-6 md:grid-cols-5">
                      <Skeleton className="md:col-span-2 h-80" />
                      <div className="p-8 space-y-4 md:col-span-3">
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-full h-8" />
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-full h-4" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : prestasiData && prestasiData.length > 0 ? (
              <div className="space-y-8 ">
                {prestasiData.map((achievement) => (
                  <PrestasiSekolahCard
                    key={achievement.slug}
                    achievement={achievement}
                    formatDate={formatDate}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Tidak ada prestasi</h3>
                <p className="text-muted-foreground">
                  {debouncedSearchQuery
                    ? `Tidak ditemukan prestasi dengan kata kunci "${debouncedSearchQuery}"`
                    : 'Belum ada prestasi untuk filter ini'}
                </p>
              </Card>
            )}

            {/* Pagination */}
            {!isSearching && prestasiData && prestasiData.length > 0 && paginationMeta && paginationMeta.last_page > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(paginationMeta.current_page - 1)}
                  disabled={paginationMeta.current_page === 1}
                >
                  Previous
                </Button>

                {pageNumbers.map((page, idx) => (
                  page === '...' ? (
                    <span key={`dots-${idx}`} className="px-2 py-2">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page as number)}
                      disabled={currentPage === page}
                      className={currentPage === page ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""}
                    >
                      {page}
                    </Button>
                  )
                ))}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(paginationMeta.current_page + 1)}
                  disabled={paginationMeta.current_page === paginationMeta.last_page}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            {!isSearching && paginationMeta && paginationMeta.total > 0 && (
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Menampilkan {paginationMeta.from} - {paginationMeta.to} dari {paginationMeta.total} prestasi
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Badges Display */}
      <section className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-fluid-h2 font-black text-gray-900 dark:text-white mb-4">Lencana & Sertifikat</h2>
            <p className="mb-16 text-lg font-medium text-gray-500 dark:text-gray-400">Pengakuan resmi atas kualitas pendidikan tinggi kami</p>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <div className="flex flex-col items-center group">
                <div className="w-40 h-40 bg-linear-to-br from-[#33b962] to-[#2a9d52] rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Award className="w-20 h-20 text-white brightness-125" />
                </div>
                <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">Akreditasi UNGGUL</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-40 h-40 bg-linear-to-br from-[#ffd166] to-[#ffca3a] rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Star className="w-20 h-20 text-white brightness-125" />
                </div>
                <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">Sekolah Penggerak</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-40 h-40 bg-linear-to-br from-[#06d6a0] to-[#05b88c] rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Shield className="w-20 h-20 text-white brightness-125" />
                </div>
                <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">Sekolah Ramah Anak</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="w-40 h-40 bg-linear-to-br from-[#ff6b35] to-[#f05423] rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <CheckCircle className="w-20 h-20 text-white brightness-125" />
                </div>
                <p className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">Adiwiyata</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PrestasiSekolahCard({
  achievement,
  formatDate,
  getCategoryIcon
}: {
  achievement: PrestasiSekolah
  formatDate: (date: string) => string
  getCategoryIcon: (name: string) => any
}) {
  const IconComponent = achievement.kategori && achievement.kategori.length > 0
    ? getCategoryIcon(achievement.kategori[0].name)
    : Award

  return (
    <Link href={`/prestasi-sekolah/${achievement.slug}`}>
      <Card className="mt-8 overflow-hidden transition-all duration-500 border-0 shadow-xl cursor-pointer rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 group dark:bg-gray-900/40 glass">
        <div className="grid gap-0 md:grid-cols-5">
          <div className="relative md:col-span-2 h-72 sm:h-80 md:h-auto overflow-hidden">
            <Image
              src={achievement.foto || "/placeholder.svg"}
              alt={achievement.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#33b962] rounded-2xl flex items-center justify-center shadow-xl brightness-110">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 font-black uppercase tracking-widest text-[10px] px-3 py-1.5 h-auto">
                {new Date(achievement.tanggal).getFullYear()}
              </Badge>
            </div>
          </div>
          <div className="p-10 md:col-span-3 flex flex-col">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex flex-wrap gap-2">
                {achievement.kategori && achievement.kategori.length > 0 && achievement.kategori.map((kat) => (
                  <Badge key={kat.slug} className="bg-[#33b962]/10 text-[#33b962] border-emerald-500/10 font-black uppercase tracking-widest text-[9px] px-3 py-1.5 dark:bg-emerald-900/30">
                    {kat.name}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-[#33b962] brightness-125" />
                <span>{formatDate(achievement.tanggal)}</span>
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-black text-gray-900 dark:text-white transition-colors group-hover:text-[#33b962] uppercase tracking-tight leading-tight">
              {achievement.name}
            </h2>
            {achievement.description && (
              <p className="leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3 font-medium text-lg mb-6">
                {achievement.description.replace(/<[^>]*>/g, '')}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5">
              {achievement.views !== undefined && (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Eye className="w-4 h-4 text-blue-500" />
                  </div>
                  <span>{achievement.views} DILIHAT</span>
                </div>
              )}
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#33b962] hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl px-6">
                LIHAT SELENGKAPNYA
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}