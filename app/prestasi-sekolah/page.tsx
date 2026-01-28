'use client';

import { useState, useEffect, useMemo, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Award, Star, Shield, Calendar, CheckCircle, Search, Loader2, AlertCircle, RefreshCw, Eye } from "lucide-react"
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
  } = useApi<{slug: string, name: string}[]>('/prestasi/categories/sekolah', {
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
    <div className="min-h-screen mt-20">
      {/* Hero */}
      <section className="relative py-20 text-white bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45]">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 text-white bg-white/20 border-white/30">
              Achievements
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Prestasi Sekolah</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90">
              Pengakuan dan penghargaan atas dedikasi dalam memberikan pendidikan berkualitas
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                {isTyping ? (
                  <Loader2 className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-muted-foreground animate-spin" />
                ) : (
                  <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />
                )}
                <Input
                  type="text"
                  placeholder="Cari prestasi sekolah..."
                  className="py-6 pl-12 pr-4 text-lg bg-white text-foreground"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute p-1 transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 hover:bg-gray-200"
                  >
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
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
      <section className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Year Filter */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Tahun</label>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <Button
                    key={year.id}
                    variant={selectedYear === year.id ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedYear === year.id ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""
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
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedCategory === category.slug ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.slug)}
                    disabled={categoryLoading}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {!isSearching && paginationMeta && (
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                Total: {paginationMeta.total} Prestasi
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 bg-gray-50">
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
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Lencana & Sertifikat</h2>
            <p className="mb-12 text-lg text-gray-600">Pengakuan resmi atas kualitas pendidikan kami</p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Akreditasi UNGGUL</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ffd166] to-[#ffca3a] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Star className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Sekolah Penggerak</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#06d6a0] to-[#05b88c] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Sekolah Ramah Anak</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ff6b35] to-[#f05423] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Adiwiyata</p>
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
      <Card className="mt-4 overflow-hidden transition-all border-0 shadow-lg cursor-pointer rounded-3xl hover:shadow-2xl group">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="relative md:col-span-2 h-80 md:h-auto">
            <Image
              src={achievement.foto || "/placeholder.svg"}
              alt={achievement.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#33b962]/80 to-transparent flex items-end p-6">
              <IconComponent className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="p-8 md:col-span-3">
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {achievement.kategori && achievement.kategori.length > 0 && achievement.kategori.map((kat) => (
                  <Badge key={kat.slug} className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20">
                    {kat.name}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(achievement.tanggal)}</span>
              </div>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-gray-900 transition-colors group-hover:text-[#33b962]">
              {achievement.name}
            </h2>
            {achievement.description && (
              <p className="leading-relaxed text-gray-600 line-clamp-3">
                {achievement.description.replace(/<[^>]*>/g, '')}
              </p>
            )}
            {achievement.views !== undefined && (
              <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{achievement.views} views</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}