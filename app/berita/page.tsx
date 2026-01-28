'use client';

import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, Search, ArrowRight, TrendingUp, AlertCircle, RefreshCw, Loader2 , Eye} from "lucide-react"
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

      <div className="min-h-screen mt-20">
        {/* Header Section */}
        <section className="relative py-20 text-white bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 text-white bg-white/20 border-white/30">
                Berita & Pengumuman
              </Badge>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Berita Terkini</h1>
              <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90">
                Informasi terbaru tentang kegiatan, prestasi, dan pengumuman penting
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
                    placeholder="Cari berita atau pengumuman..."
                    className="py-6 pl-12 pr-4 text-lg bg-white text-foreground"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute p-1 transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 hover:bg-gray-200"
                      aria-label="Clear search"
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
          <section className="py-16 bg-background">
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
          <section className="py-16 bg-background">
            <div className="container px-4 mx-auto">
              <Card className="overflow-hidden transition-all hover:shadow-xl">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredNews.foto ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${featuredNews.foto}` : "/placeholder.svg"}
                      alt={featuredNews.judul}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <Badge className="mb-4 w-fit">
                      {featuredNews.category}
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold">
                      {featuredNews.judul}
                    </h2>
                    <p className="mb-6 text-lg text-muted-foreground">
                      {stripHtml(featuredNews.desc)}
                    </p>
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredNews.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{timeAgo(featuredNews.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>SD Muhammadiyah 3</span>
                      </div>
                    </div>
                    <Link href={`/berita/${featuredNews.slug}`}>
                      <Button size="lg" className="w-fit">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        ) : null}

        {/* Main Content - ✅ Tambahkan ref di sini untuk scroll target */}
        <section ref={contentRef} className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* News List */}
              <div className="lg:col-span-2">
                <Tabs 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                  className="w-full"
                >
                  <TabsList className="grid w-full mb-8" style={{
                    gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, minmax(0, 1fr))`
                  }}>
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.value} 
                        value={category.value}
                        disabled={categoryLoading}
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
                              className={`flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-muted group w-full text-left ${
                                selectedCategory === category.value ? 'bg-muted' : ''
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
  <Card className="overflow-hidden transition-all cursor-pointer hover:shadow-lg group">
    <div className="grid gap-0 md:grid-cols-3">
      <div className="relative h-48 p-4 mx-5 ml-1 md:h-auto">
        <Image
          src={
            news.foto
              ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/berita/${news.foto}`
              : "/placeholder.svg"
          }
          alt={news.judul}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 rounded-2xl group-hover:scale-110"
        />
      </div>

      <div className="p-6 md:col-span-2">
        <Badge className="mb-3">{news.category}</Badge>

        <h3 className="mb-2 text-xl font-bold line-clamp-2 group-hover:text-primary">
          {news.judul}
        </h3>

        <p className="mb-4 text-muted-foreground line-clamp-2">
          {stripHtml(news.desc)}
        </p>

        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span> {formatDate(news.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span> {timeAgo(news.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span> {news.views} Views</span>
          </div>
        </div>

        <Button variant="outline" size="sm" tabIndex={-1}>
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  </Card>
</Link>

  )
}