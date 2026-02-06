'use client';

import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Search, ArrowRight, TrendingUp, AlertCircle, RefreshCw, Loader2, Eye, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Head from "next/head"
import {
  Berita,
  CategoryCountResponse,
  PopularBeritaResponse,
} from "@/types";

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

  if (seconds < 60) {
    return rtf.format(-seconds, 'second')
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return rtf.format(-minutes, 'minute')
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return rtf.format(-hours, 'hour')
  }

  const days = Math.floor(hours / 24)
  return rtf.format(-days, 'day')
}

type CategoryCount = {
  category: string
  total: number
}

export default function BeritaPage() {
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("semua")
  const [currentPage, setCurrentPage] = useState(1)

  // Ref untuk scroll target
  const contentRef = useRef<HTMLDivElement>(null)

  // Debounce search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchInput, 500)

  // Track if user is typing
  const isTyping = searchInput !== debouncedSearchQuery

  // Build query string with pagination, category, and search
  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    params.set('page', currentPage.toString())

    if (selectedCategory !== "semua") {
      params.set('category', selectedCategory)
    }

    if (debouncedSearchQuery.trim()) {
      params.set('search', debouncedSearchQuery.trim())
    }

    return params.toString()
  }, [currentPage, selectedCategory, debouncedSearchQuery])

  const {
    data: newsData,
    meta: paginationMeta,
    links: paginationLinks,
    loading: newsLoading,
    error: newsError,
    refetch: refetchNews,
    response: newsResponse
  } = useApi<Berita[]>(`/berita?${queryString}`, {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  // Fetch category counts
  const {
    data: categoryData,
    loading: categoryLoading
  } = useApi<CategoryCount[]>('/berita-count-data', {
    cache: true,
    cacheTTL: 600000,
    immediate: true
  })

  // Process categories
  const categories = useMemo(() => {
    const cats = [{ name: "Semua", count: 0, value: "semua" }]

    if (categoryData && Array.isArray(categoryData)) {
      const totalCount = categoryData.reduce((sum, cat) => sum + (cat.total || 0), 0)
      cats[0].count = totalCount

      categoryData.forEach(cat => {
        cats.push({
          name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
          count: cat.total || 0,
          value: cat.category.toLowerCase()
        })
      })
    }

    return cats
  }, [categoryData])

  // Get popular posts
  const {
    data: popularData,
    loading: popularPostsLoading
  } = useApi<Berita[]>(`/berita-popular`, {
    cache: true,
    cacheTTL: 300000,
    immediate: true
  })

  const popularPosts = useMemo<Berita[]>(() => {
    if (!popularData) return []
    return Array.isArray(popularData) ? popularData.slice(0, 10) : []
  }, [popularData])

  // Featured news - ALWAYS from original data (first page, no filter only)
  const featuredNews = useMemo(() => {
    if (!newsData || newsData.length === 0) return null
    return newsData[0]
  }, [newsData])

  // Regular news for list (skip featured only on page 1, no filters)
  const regularNews = useMemo(() => {
    if (!newsData || newsData.length === 0) return []

    // Only skip featured on first page when no filter
    if (currentPage === 1 && selectedCategory === "semua" && !debouncedSearchQuery.trim()) {
      return newsData.slice(1)
    }

    return newsData
  }, [newsData, currentPage, selectedCategory, debouncedSearchQuery])

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory])

  // ✅ AUTO SCROLL saat currentPage berubah
  useEffect(() => {
    if (contentRef.current) {
      // Alternative: scroll ke top page
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

  const stripHtml = (html: string, maxLength = 150) => {
    if (!html) return ""
    const text = html.replace(/<[^>]*>/g, '')
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  // ✅ Handler untuk pagination dengan scroll
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Generate page numbers array
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
      if (startPage > 2) {
        pages.push('...')
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < paginationMeta.last_page) {
      if (endPage < paginationMeta.last_page - 1) {
        pages.push('...')
      }
      pages.push(paginationMeta.last_page)
    }

    return pages
  }, [paginationMeta])

  const pageTitle = "Berita & Pengumuman - SD Muhammadiyah 3 Samarinda | Sekolah Kreatif Islami"
  const pageDescription = "Informasi terbaru seputar kegiatan, prestasi, dan pengumuman penting SD Muhammadiyah 3 Samarinda"

  // Show loading when typing or fetching
  const isSearching = isTyping || newsLoading

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={featuredNews?.foto || "/og-image.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

        {/* Header Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
          <div className="container relative z-10 px-4 mx-auto mt-8">
            <div className="max-w-4xl mx-auto text-center text-fade-in-up">
              <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
                Berita & Pengumuman
              </Badge>
              <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
                Berita Terkini SD Muhammadiyah 3 Samarinda
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed mb-10">
                Informasi terbaru tentang kegiatan, prestasi, dan pengumuman penting di Sekolah Kreatif.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    {isTyping ? (
                      <Loader2 className="w-6 h-6 text-[#33b962] animate-spin" />
                    ) : (
                      <Search className="w-6 h-6 text-gray-400 group-focus-within:text-[#33b962] transition-colors" />
                    )}
                  </div>
                  <Input
                    type="text"
                    placeholder="Cari berita atau pengumuman..."
                    className="pl-16 pr-14 text-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-foreground dark:text-white border-white/30 dark:border-gray-800 rounded-full h-18 shadow-2xl focus-visible:ring-2 focus-visible:ring-[#ffd166] transition-all font-bold"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute p-2 transition-colors -translate-y-1/2 rounded-full right-5 top-1/2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Alert */}
        {newsError && (
          <div className="container px-4 mx-auto mt-8">
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Terjadi kesalahan saat memuat data.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchNews()}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Featured News */}
        {newsLoading && currentPage === 1 && selectedCategory === "semua" && !debouncedSearchQuery.trim() ? (
          <section className="py-16 bg-background dark:bg-gray-950">
            <div className="container px-4 mx-auto">
              <Card className="overflow-hidden">
                <div className="grid gap-0 md:grid-cols-2">
                  <Skeleton className="h-64 md:h-auto" />
                  <div className="p-8 space-y-4">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="w-full h-8" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-32 h-10" />
                  </div>
                </div>
              </Card>
            </div>
          </section>
        ) : (currentPage === 1 && selectedCategory === "semua" && !debouncedSearchQuery.trim()) && featuredNews ? (
          <section className="py-16 bg-background dark:bg-gray-950 overflow-hidden relative">
            <div className="container relative z-10 px-4 mx-auto">
              <Card className="overflow-hidden card-premium dark:bg-gray-900/40 dark:backdrop-blur-xl border-0 shadow-2xl rounded-[2.5rem] group">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <Image
                      src={featuredNews.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${featuredNews.foto}` : "/placeholder.svg"}
                      alt={featuredNews.judul}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-10 md:p-16">
                    <Badge className="mb-6 w-fit bg-emerald-500 text-white border-0 px-4 py-1 font-black uppercase tracking-widest text-[10px]">
                      {featuredNews.category}
                    </Badge>
                    <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#33b962] transition-colors uppercase tracking-tight">
                      {featuredNews.judul}
                    </h3>
                    <p className="mb-8 text-lg font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                      {stripHtml(featuredNews.desc, 200)}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 mb-10 text-xs font-bold uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#33b962]" />
                        <span>{formatDate(featuredNews.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#33b962]" />
                        <span>Admin SDMuh3</span>
                      </div>
                    </div>
                    <Link href={`/berita/${featuredNews.slug}`}>
                      <Button size="lg" className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-10 py-7 text-lg font-black shadow-xl hover:scale-105 transition-all group">
                        Baca Selengkapnya
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        ) : null}

        {/* Main Content - ✅ Tambahkan ref di sini untuk scroll target */}
        <section ref={contentRef} className="py-24 bg-muted/30 dark:bg-black/20 transition-colors duration-500 relative">
          <div className="container relative z-10 px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* News List */}
              <div className="lg:col-span-2">
                <Tabs
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="w-full"
                >
                  <TabsList className="grid w-full h-auto p-2 mb-8 bg-white dark:bg-gray-950/40 dark:backdrop-blur-xl dark:border-white/10 rounded-2xl" style={{
                    gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, minmax(0, 1fr))`
                  }}>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.value}
                        value={category.value}
                        disabled={categoryLoading}
                        className="rounded-xl data-[state=active]:bg-[#33b962] data-[state=active]:text-white dark:data-[state=active]:bg-[#33b962]"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value={selectedCategory} className="space-y-6">
                    {/* Loading State */}
                    {isSearching ? (
                      <div className="space-y-6">
                        {isTyping && (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-6 h-6 mr-2 animate-spin text-primary" />
                            <span className="text-sm text-muted-foreground">Mencari...</span>
                          </div>
                        )}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Card key={i} className="overflow-hidden">
                            <div className="grid gap-0 md:grid-cols-3">
                              <Skeleton className="h-48 md:h-auto" />
                              <div className="p-6 space-y-4 md:col-span-2">
                                <Skeleton className="w-20 h-6" />
                                <Skeleton className="w-full h-6" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-32 h-8" />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : regularNews.length > 0 ? (
                      regularNews.map((item) => (
                        <NewsCard
                          key={item.slug}
                          news={item}
                          formatDate={formatDate}
                          stripHtml={stripHtml}
                        />
                      ))
                    ) : (
                      <Card className="p-12 text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-semibold">Tidak ada berita</h3>
                        <p className="text-muted-foreground">
                          {debouncedSearchQuery
                            ? `Tidak ditemukan berita dengan kata kunci "${debouncedSearchQuery}"`
                            : 'Belum ada berita untuk kategori ini'}
                        </p>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>


                {!isSearching && regularNews.length > 0 && paginationMeta && paginationMeta.last_page > 1 && (
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
                    Menampilkan {paginationMeta.from} - {paginationMeta.to} dari {paginationMeta.total} berita
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Popular Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Berita Populer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {popularPostsLoading ? (
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
                    ) : popularPosts.length > 0 ? (
                      <ul className="space-y-4">
                        {popularPosts.map((post, index) => (
                          <li key={post.slug}>
                            <Link
                              href={`/berita/${post.slug}`}
                              className="flex items-start gap-3 transition-colors group hover:text-primary"
                            >
                              <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold rounded-full bg-primary/10 text-primary">
                                {index + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium transition-colors group-hover:text-primary line-clamp-2">
                                  {post.judul}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {post.views || 0} views
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-center text-muted-foreground">
                        Belum ada berita populer
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kategori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {categoryLoading ? (
                      <div className="space-y-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton key={i} className="w-full h-10" />
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li key={category.value}>
                            <button
                              onClick={() => {
                                setSelectedCategory(category.value);

                              }}
                              className={`flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-muted group w-full text-left ${selectedCategory === category.value ? 'bg-muted' : ''
                                }`}
                            >
                              <span className="text-sm font-medium transition-colors group-hover:text-primary">
                                {category.name}
                              </span>
                              <Badge variant="secondary">{category.count}</Badge>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function NewsCard({
  news,
  formatDate,
  stripHtml
}: {
  news: Berita
  formatDate: (date: string) => string
  stripHtml: (html: string, maxLength?: number) => string
}) {
  return (
    <Link href={`/berita/${news.slug}`} className="block">
      <Card className="overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-2 group dark:bg-gray-900/40 border-0 shadow-lg rounded-[2rem] card-premium glass">
        <div className="grid gap-0 md:grid-cols-3">
          <div className="relative h-64 md:h-auto overflow-hidden p-0">
            <Image
              src={
                news.foto
                  ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${news.foto}`
                  : "/placeholder.svg"
              }
              alt={news.judul}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
            <Badge className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white border-white/30 font-black uppercase tracking-widest text-[9px]">
              {news.category}
            </Badge>
          </div>

          <div className="p-8 md:col-span-2">
            <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-[#33b962] transition-colors uppercase tracking-tight">
              {news.judul}
            </h3>

            <p className="mb-6 text-gray-600 dark:text-gray-400 font-medium line-clamp-2 leading-relaxed">
              {stripHtml(news.desc, 180)}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#33b962] brightness-125" />
                <span>{formatDate(news.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[#33b962] brightness-125" />
                <span>{news.views} VIEWS</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="rounded-full font-black uppercase tracking-widest text-[10px] px-6 py-5 border-2 border-emerald-500/10 hover:bg-[#33b962] hover:text-white transition-all h-auto">
              BACA SELENGKAPNYA
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>

  )
}