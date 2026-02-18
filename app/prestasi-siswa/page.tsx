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
  } = useApi<{ tingkat: string, total: number }[]>('/prestasi/siswa/count-by-tingkat', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Fetch category data
  const {
    data: categoryData,
    loading: categoryLoading
  } = useApi<{ slug: string, name: string }[]>('/prestasi/categories/siswa', {
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
              Hall of Fame & Achievements
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
              Prestasi Siswa SDMuh3
            </h1>
            <p className="max-w-2xl mx-auto mb-12 text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Merayakan setiap langkah kecil menuju kesuksesan besar. Kebanggaan kami atas pencapaian luar biasa siswa-siswi.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-white/20 to-white/10 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  {isTyping ? (
                    <Loader2 className="absolute w-6 h-6 transform -translate-y-1/2 left-5 top-1/2 text-white/50 animate-spin" />
                  ) : (
                    <Search className="absolute w-6 h-6 transform -translate-y-1/2 left-5 top-1/2 text-white/70 group-hover:text-white transition-colors" />
                  )}
                  <Input
                    type="text"
                    placeholder="Cari prestasi siswa..."
                    className="h-16 pl-14 pr-12 text-lg bg-white/10 backdrop-blur-xl dark:bg-black/20 text-white placeholder:text-white/60 border-white/20 focus:border-white/40 focus:ring-white/20 rounded-2xl w-full transition-all duration-300"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute p-2 transition-all transform -translate-y-1/2 rounded-xl right-3 top-1/2 hover:bg-white/10 text-white/70 hover:text-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
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
            <div className="grid md:grid-cols-3 gap-8 items-end">
              {/* Year Filter */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#33b962] mb-2 block">Tahun</label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <Button
                      key={year.id}
                      variant={selectedYear === year.id ? "default" : "outline"}
                      className={`rounded-xl px-4 h-10 font-black uppercase tracking-widest text-[9px] transition-all duration-300 ${selectedYear === year.id
                          ? "bg-[#33b962] text-white shadow-lg shadow-emerald-500/20 border-0"
                          : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-[#33b962] hover:text-[#33b962]"
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
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#33b962] mb-2 block">Tingkat Kompetisi</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button
                      key={level.id}
                      variant={selectedLevel === level.id ? "default" : "outline"}
                      className={`rounded-xl px-4 h-10 font-black uppercase tracking-widest text-[9px] transition-all duration-300 ${selectedLevel === level.id
                          ? "bg-[#33b962] text-white shadow-lg shadow-emerald-500/20 border-0"
                          : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-800 hover:border-[#33b962] hover:text-[#33b962]"
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
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#33b962] mb-2 block">Kategori Prestasi</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.slug}
                      variant={selectedCategory === category.slug ? "default" : "outline"}
                      className={`rounded-xl px-4 h-10 font-black uppercase tracking-widest text-[9px] transition-all duration-300 ${selectedCategory === category.slug
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
              <div className="flex items-center gap-3 px-6 py-2 bg-[#33b962]/5 rounded-full border border-emerald-500/10 w-fit transition-transform hover:scale-105">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#33b962]">
                  Ditemukan {paginationMeta.total} Prestasi Siswa Luar Biasa
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16 bg-gray-50 dark:bg-gray-900">
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
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6">
                  <h3 className="flex items-center gap-2 mb-4 text-lg font-bold dark:text-white">
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
              <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-bold dark:text-white">
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
      <Card className="overflow-hidden transition-all duration-500 border-0 shadow-lg cursor-pointer rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 group dark:bg-gray-900/40 glass h-full flex flex-col">
        <div className="relative overflow-hidden h-72 sm:h-80 md:h-96">
          <Image
            src={achievement.foto
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/prestasi/${achievement.foto}`
              : "/placeholder.svg"}
            alt={achievement.name}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

          {achievement.juara && (
            <div className="absolute top-6 right-6 z-20">
              <Badge className={`${getAwardColor(achievement.juara)} border-0 font-black px-4 py-2 rounded-xl shadow-2xl brightness-110 tracking-widest text-[9px] uppercase backdrop-blur-md`}>
                Juara {achievement.juara}
              </Badge>
            </div>
          )}

          <div className="absolute top-6 left-6 z-20">
            <div className="relative group/trophy">
              <div className="absolute -inset-4 bg-yellow-500/20 rounded-full blur-xl opacity-0 group-hover/trophy:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:rotate-12">
                <Trophy className="w-8 h-8 text-[#ffd700] brightness-125 drop-shadow-[0_4px_10px_rgba(255,215,0,0.5)]" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6 z-20">
            <Badge className="bg-[#33b962] text-white border-0 font-black uppercase tracking-widest text-[9px] px-3 py-1 mb-2">
              {achievement.tingkat}
            </Badge>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <div className="d-flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#33b962]">
              <Calendar className="w-3.5 h-3.5 brightness-110" />
              <span>{formatDate(achievement.tanggal)}</span>
            </div>
            {achievement.penyelenggara && (
              <div className="flex mt-2 items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[150px]">{achievement.penyelenggara}</span>
              </div>
            )}
          </div>

          <h3 className="mb-3 text-lg font-black text-gray-900 dark:text-white line-clamp-2 uppercase tracking-tight group-hover:text-[#33b962] transition-colors leading-tight">
            {achievement.name}
          </h3>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {achievement.kategori && achievement.kategori.length > 0 && achievement.kategori.slice(0, 2).map((cat) => (
                <Badge key={cat.slug} className="bg-emerald-50 dark:bg-emerald-900/20 text-[#33b962] border-emerald-500/10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
            <Button variant="default" className="text-[9px] font-black uppercase tracking-widest text-[#33b962] p-2 mt-4 hover:translate-x-1 text-white transition-transform">
              Lihat 
            </Button>
        </div>
      </Card>
    </Link>
  )
}