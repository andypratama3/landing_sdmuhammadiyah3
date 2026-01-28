'use client';

import { useState, useEffect, useMemo, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Calendar, MapPin, Search, Loader2, AlertCircle, RefreshCw, Eye } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import { PrestasiSiswa } from "@/types"

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

function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat('id-ID', {
    numeric: 'auto',
  })

  if (seconds < 60) return rtf.format(-seconds, 'second')
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, 'minute')
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return rtf.format(-hours, 'hour')
  const days = Math.floor(hours / 24)
  return rtf.format(-days, 'day')
}

export default function PrestasiSiswaPage() {
  const [searchInput, setSearchInput] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  // Build query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())
    params.set('per_page', '12')
    
    if (selectedLevel !== "all") {
      params.set('tingkat', selectedLevel)
    }
    
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
  }, [currentPage, selectedLevel, selectedCategory, selectedYear, debouncedSearchQuery])

  // Fetch prestasi data
  const { 
    data: prestasiData,
    meta: paginationMeta, 
    loading: prestasiLoading, 
    error: prestasiError,
    refetch: refetchPrestasi
  } = useApi<PrestasiSiswa[]>(`/prestasi/siswa?${queryString}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  // Fetch tingkat counts
  const { 
    data: tingkatData,
    loading: tingkatLoading 
  } = useApi<{tingkat: string, total: number}[]>('/prestasi/siswa/count-by-tingkat', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Fetch category data
  const { 
    data: categoryData,
    loading: categoryLoading 
  } = useApi<{slug: string, name: string}[]>('/prestasi/categories/siswa', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Fetch popular prestasi
  const { 
    data: popularData,
    loading: popularLoading 
  } = useApi<PrestasiSiswa[]>('/prestasi/siswa/popular', {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  // Process levels
  const levels = useMemo(() => {
    const lvls = [{ id: "all", label: "Semua Tingkat", count: 0 }]
    
    if (tingkatData && Array.isArray(tingkatData)) {
      const totalCount = tingkatData.reduce((sum, t) => sum + (t.total || 0), 0)
      lvls[0].count = totalCount

      const levelOrder = ['Internasional', 'Nasional', 'Provinsi', 'Kota', 'Kecamatan', 'Sekolah']
      
      levelOrder.forEach(levelName => {
        const found = tingkatData.find(t => t.tingkat === levelName)
        if (found) {
          lvls.push({
            id: levelName,
            label: levelName,
            count: found.total || 0
          })
        }
      })
    }
    
    return lvls
  }, [tingkatData])

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory, selectedLevel, selectedYear])

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

  const getAwardColor = (award: string | null | undefined) => {
    if (!award) return "bg-[#33b962] text-white"
    const awardStr = String(award).toLowerCase()
    if (awardStr.includes("1") || awardStr.includes("pertama")) return "bg-[#ffd700] text-gray-900"
    if (awardStr.includes("2") || awardStr.includes("kedua")) return "bg-[#c0c0c0] text-gray-900"
    if (awardStr.includes("3") || awardStr.includes("ketiga")) return "bg-[#cd7f32] text-white"
    return "bg-[#33b962] text-white"
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
              Hall of Fame
            </Badge>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Prestasi Siswa</h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90">
              Kebanggaan kami atas pencapaian luar biasa siswa-siswi berprestasi
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
                  placeholder="Cari prestasi siswa..."
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
                    disabled={tingkatLoading || categoryLoading}
                  >
                    {year.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Tingkat Kompetisi</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedLevel === level.id ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                    disabled={tingkatLoading}
                  >
                    {level.label}
                   
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
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Prestasi Grid */}
            <div className="lg:col-span-3">
              {/* Loading State */}
              {isSearching ? (
                <div className="space-y-6">
                  {isTyping && (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-6 h-6 mr-2 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Mencari...</span>
                    </div>
                  )}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-80" />
                      </Card>
                    ))}
                  </div>
                </div>
              ) : prestasiData && prestasiData.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {prestasiData.map((achievement) => (
                    <PrestasiCard 
                      key={achievement.slug}
                      achievement={achievement}
                      formatDate={formatDate}
                      getAwardColor={getAwardColor}
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

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Prestasi */}
              <Card>
                <div className="p-6">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                    <Trophy className="w-5 h-5 text-[#33b962]" />
                    Prestasi Terbaru
                  </h3>
                  {popularLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-3">
                          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="w-full h-4" />
                            <Skeleton className="w-16 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : popularData && popularData.length > 0 ? (
                    <ul className="space-y-4">
                      {popularData.map((item, index) => (
                        <li key={item.slug}>
                          <Link
                            href={`/prestasi-siswa/${item.slug}`}
                            className="flex items-start gap-3 transition-colors group hover:text-primary"
                          >
                            <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold rounded-full bg-[#33b962]/10 text-[#33b962]">
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium transition-colors line-clamp-2 group-hover:text-[#33b962]">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {item.tingkat}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-center text-muted-foreground">
                      Belum ada data
                    </p>
                  )}
                </div>
              </Card>

              {/* Statistics */}
              <Card className="p-6">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                  <Medal className="w-5 h-5 text-[#33b962]" />
                  Statistik
                </h3>
                <div className="space-y-3">
                  {levels.slice(1).map((level) => (
                    <div key={level.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{level.label}</span>
                      <Badge variant="secondary">{level.count}</Badge>
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

function PrestasiCard({ 
  achievement, 
  formatDate,
  getAwardColor
}: { 
  achievement: PrestasiSiswa
  formatDate: (date: string) => string
  getAwardColor: (award: string | null | undefined) => string
}) {
  return (
    <Link href={`/prestasi-siswa/${achievement.slug}`}>
      <Card className="overflow-hidden transition-all duration-300 border-0 shadow-lg cursor-pointer rounded-3xl hover:shadow-2xl hover:-translate-y-2 group">
        <div className="relative overflow-hidden h-80">
          <Image
            src={achievement.foto
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/${achievement.foto}`
              : "/placeholder.svg"}
            alt={achievement.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          {achievement.juara && (
            <div className="absolute top-4 right-4">
              <Badge className={`${getAwardColor(achievement.juara)} border-0 font-bold`}>
                Juara {achievement.juara}
              </Badge>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <Trophy className="w-8 h-8 text-[#ffd700]" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="mb-2 text-lg font-bold line-clamp-2">{achievement.name}</h3>
            
            {achievement.penyelenggara && (
              <p className="mb-3 text-sm text-white/80">{achievement.penyelenggara}</p>
            )}
            
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(achievement.tanggal)}</span>
              </div>
              {achievement.tingkat && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{achievement.tingkat}</span>
                </div>
              )}
            </div>
            
            {achievement.kategori && achievement.kategori.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {achievement.kategori.map((cat) => (
                  <Badge key={cat.slug} variant="secondary" className="text-xs">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}