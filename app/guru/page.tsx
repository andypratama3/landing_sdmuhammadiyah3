"use client";

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, GraduationCap, Award, Search, BookOpen, Loader2, X, AlertCircle, Phone, ChevronRight, Star, MapPin, Calendar } from "lucide-react"
import { useState, useMemo, useEffect, useRef } from "react"
import { useApi } from "@/hooks/useApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Guru, Pelajaran, Karyawan } from "@/types"
import Image from "next/image"

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

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .modal-scroll::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      .modal-scroll {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `

    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])




  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  const queryParams = useMemo(() => {
    const params = new URLSearchParams()
    if (debouncedSearchQuery) params.append('search', debouncedSearchQuery)
    if (activeFilter !== 'all') params.append('pelajaran', activeFilter)
    return params.toString()
  }, [debouncedSearchQuery, activeFilter])

  const { data: gurusResponse, loading: gurusLoading, error: gurusError, refetch: refetchGurus } = useApi(
    `/guru${queryParams ? '?' + queryParams : ''}`,
    { cache: true, cacheTTL: 300000, immediate: true }
  )

  const gurus = useMemo<Guru[]>(() => {
    if (!gurusResponse) return []
    const dataArray = (gurusResponse as any)?.data || gurusResponse
    return Array.isArray(dataArray) ? dataArray : []
  }, [gurusResponse])

  const { data: pelajaransResponse, loading: pelajaransLoading } = useApi(
    '/guru/pelajaran',
    { cache: true, cacheTTL: 3600000, immediate: true }
  )

  const pelajarans = useMemo<Pelajaran[]>(() => {
    if (!pelajaransResponse) return []
    const dataArray = (pelajaransResponse as any)?.data || pelajaransResponse
    return Array.isArray(dataArray) ? dataArray : []
  }, [pelajaransResponse])

  const { data: guruDetailResponse, loading: detailLoading } = useApi(
    selectedSlug ? `/guru/${selectedSlug}` : '',
    { cache: true, cacheTTL: 300000, immediate: !!selectedSlug }
  )

  const guruDetail = useMemo<Guru | null>(() => {
    if (!guruDetailResponse) return null
    const data = (guruDetailResponse as any)?.data
    if (Array.isArray(data)) return data.length > 0 ? data[0] : null
    if (data && typeof data === 'object' && Object.keys(data).length > 0) return data
    if (guruDetailResponse && typeof guruDetailResponse === 'object' && Object.keys(guruDetailResponse).length > 0) {
      return guruDetailResponse as Guru
    }
    return null
  }, [guruDetailResponse])

  const filters = useMemo(() => {
    return [
      { id: "all", label: "Semua Guru" },
      ...pelajarans.map((p: any) => ({ id: p.slug, label: p.name })),
    ]
  }, [pelajarans])

  useEffect(() => {
    if (contentRef.current && !gurusLoading) {
      window.scrollTo({ top: contentRef.current.offsetTop - 100, behavior: 'smooth' })
    }
  }, [debouncedSearchQuery, activeFilter])

  const isSearching = isTyping || gurusLoading

  if ((gurusLoading && !gurus.length) || pelajaransLoading) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] py-24 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-4 text-6xl font-bold">Guru Kami</h1>
              <p className="text-xl text-white/80">Tim pengajar profesional yang luar biasa</p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-72 rounded-2xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bg-white rounded-full top-20 right-10 w-80 h-80 blur-3xl"></div>
          <div className="absolute bg-white rounded-full -bottom-20 -left-20 w-96 h-96 blur-3xl"></div>
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30 backdrop-blur-sm">
              Tenaga Pengajar Berpengalaman
            </Badge>
            <h1 className="mb-4 text-6xl font-bold">Guru Kami</h1>
            <p className="text-xl text-white/90">Dedikasi tinggi untuk pendidikan berkualitas</p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section ref={contentRef} className="py-12 bg-white border-b border-gray-100">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 text-[#33b962] animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <Input
                  type="text"
                  placeholder="Cari nama guru..."
                  className="pl-10 pr-4 border-2 border-gray-200 rounded-full focus:border-[#33b962] focus:ring-2 focus:ring-[#33b962]/20 transition-all"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute p-1 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#33b962]/10">
                <span className="font-semibold text-[#33b962]">{gurus.length}</span>
                <span className="text-sm text-gray-600">Guru</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  className={`rounded-full font-medium transition-all ${
                    activeFilter === filter.id
                      ? "bg-[#33b962] text-white shadow-lg hover:bg-[#2a9d52]"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#33b962] hover:text-[#33b962]"
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
        <div className="container px-4 mx-auto mt-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Terjadi kesalahan saat memuat data guru.</span>
              <Button variant="outline" size="sm" onClick={() => refetchGurus?.()} className="ml-4">
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Teachers Grid */}
      <section className="py-20 bg-gray-50/50">
        <div className="container px-4 mx-auto max-w-7xl">
          {isSearching ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {isTyping && (
                <div className="flex items-center justify-center gap-2 py-8 col-span-full">
                  <Loader2 className="w-5 h-5 animate-spin text-[#33b962]" />
                  <span className="text-gray-500">Mencari guru...</span>
                </div>
              )}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-72 rounded-2xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          ) : gurus.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {gurus.map((guru: Guru) => (
                <div
                  key={guru.slug}
                  className="h-full cursor-pointer group"
                  onClick={() => setSelectedSlug(guru.slug)}
                >
                  <div className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                    {/* Image Container with Overlay */}
                    <div className="relative h-80 overflow-hidden bg-linear-to-br from-[#33b962]/10 to-[#ffd166]/10">
                      <Image
                        src={
                          guru?.foto
                            ? guru.foto.startsWith("http")
                              ? guru.foto
                              : `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guru.foto}`
                            : "/placeholder.svg"
                        }
                        alt={guru?.name || "Guru"}
                        fill
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* linear Overlay */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/50 via-black/10 to-transparent group-hover:opacity-100"></div>
                      
                      {/* Badge - Top Right */}
                      <div className="absolute z-10 top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-md text-[#33b962] border-0 shadow-lg font-semibold px-3 py-1 text-xs">
                          {guru.pelajarans && guru.pelajarans.length > 0 
                            ? guru.pelajarans[0].name 
                            : "Guru"}
                        </Badge>
                      </div>

                      {/* Hover Action Button */}
                      <div className="absolute transition-opacity duration-300 opacity-0 bottom-4 right-4 group-hover:opacity-100">
                        <div className="w-12 h-12 bg-[#33b962] rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <ChevronRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-1 p-6">
                      {/* Name & Qualification */}
                      <div className="mb-3">
                        <h3 className="mb-1 text-xl font-bold leading-tight text-gray-900">{guru.name}</h3>
                        {guru.lulusan && (
                          <p className="text-[#33b962] text-sm font-semibold">{guru.lulusan}</p>
                        )}
                      </div>

                      {/* Description */}
                      {guru.description && (
                        <p className="mb-4 text-sm leading-relaxed text-gray-600 grow line-clamp-2">{guru.description}</p>
                      )}

                      {/* Footer Stats */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {guru.pelajarans && guru.pelajarans.length > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-6 h-6 bg-[#33b962]/10 rounded-lg">
                                  <BookOpen className="w-4 h-4 text-[#33b962]" />
                                </div>
                                <span className="text-xs font-semibold text-gray-700">{guru.pelajarans.length} Pelajaran</span>
                              </div>
                            )}
                          </div>
                          <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            <span className="text-xs font-semibold text-[#33b962]">Lihat Detail</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={() => setSelectedSlug(null)}
        >
          <div 
            className="modal-scroll relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSlug(null)}
              className="absolute z-20 p-2 text-gray-400 transition-all bg-white rounded-full top-6 right-6 hover:text-gray-600 hover:bg-gray-100 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {detailLoading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="w-full h-96 rounded-t-3xl" />
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-full h-6" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                </div>
              </div>
            ) : guruDetail ? (
              <div className="">
                {/* Hero Image Section - Enhanced */}
                <div className="relative h-96 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] rounded-t-3xl">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-white/20 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-white/10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  {/* Image with Frame */}
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div className="relative overflow-hidden border-4 shadow-2xl w-80 h-80 rounded-3xl border-white/30 backdrop-blur-sm">
                      <Image
                        src={
                          guruDetail.foto
                            ? guruDetail.foto.startsWith("http")
                              ? guruDetail.foto
                              : `${process.env.NEXT_PUBLIC_STORAGE_URL}/img/guru/${guruDetail.foto}`
                            : "/placeholder.svg"
                        }
                        alt={guruDetail.name}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-8 pt-8 pb-8">
                  {/* Floating Card - Header Info */}
                  <div className="relative z-10 mb-8 -mt-16">
                    <div className="border shadow-xl bg-linear-to-br from-white to-gray-50 rounded-2xl p-7 border-gray-100/50 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-4xl font-bold text-gray-900">{guruDetail.name}</h2>
                            <div className="p-2 bg-[#33b962]/10 rounded-xl">
                              <Star className="w-6 h-6 text-[#33b962] fill-[#33b962]" />
                            </div>
                          </div>
                          {guruDetail.lulusan && (
                            <p className="text-[#33b962] text-base font-bold mb-3">{guruDetail.lulusan}</p>
                          )}
                          {guruDetail.description && (
                            <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{guruDetail.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats/Overview */}
                  {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      <div className="bg-linear-to-br from-[#33b962]/10 to-transparent rounded-xl p-4 border border-[#33b962]/20">
                        <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Pelajaran</p>
                        <p className="text-3xl font-bold text-[#33b962]">{guruDetail.pelajarans.length} Mata Pelajaran</p>
                      </div>
                    </div>
                  )}

                  {/* Subjects - Enhanced */}
                  {guruDetail.pelajarans && Array.isArray(guruDetail.pelajarans) && guruDetail.pelajarans.length > 0 && (
                    <div className="mb-8">
                      <h3 className="flex items-center gap-3 mb-5 text-lg font-bold text-gray-900">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#33b962]/20">
                          <BookOpen className="w-5 h-5 text-[#33b962]" />
                        </div>
                        Mengajar {guruDetail.pelajarans.length} Pelajaran
                      </h3>
                      <div className="grid gap-3">
                        {guruDetail.pelajarans.map((p: Pelajaran) => (
                          <div
                            key={p.slug}
                            className="group flex items-center gap-4 p-4 bg-linear-to-r from-[#33b962]/8 to-transparent rounded-xl border-l-4 border-[#33b962] hover:shadow-lg hover:bg-linear-to-r hover:from-[#33b962]/12 transition-all"
                          >
                            <div className="shrink-0 w-3 h-3 rounded-full bg-[#33b962] group-hover:scale-150 transition-transform"></div>
                            <span className="font-semibold text-gray-800 group-hover:text-[#33b962] transition-colors">{p.name}</span>
                            <ChevronRight className="ml-auto w-4 h-4 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info - Enhanced */}
                  {guruDetail.karyawan && (
                    <div>
                      <h3 className="flex items-center gap-3 mb-5 text-lg font-bold text-gray-900">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#33b962]/20">
                          <Award className="w-5 h-5 text-[#33b962]" />
                        </div>
                        Informasi Kontak
                      </h3>
                      <div className="space-y-3">
                        {guruDetail.karyawan.email && (
                          <a
                            href={`mailto:${guruDetail.karyawan.email}`}
                            className="group flex items-center gap-4 p-5 rounded-xl bg-linear-to-r from-[#33b962]/8 to-transparent border-2 border-[#33b962]/20 hover:border-[#33b962]/50 hover:shadow-lg hover:bg-linear-to-r hover:from-[#33b962]/12 transition-all"
                          >
                            <div className="shrink-0 w-12 h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                              <Mail className="w-6 h-6 text-[#33b962]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Email</p>
                              <p className="text-gray-800 font-semibold truncate group-hover:text-[#33b962] transition-colors">{guruDetail.karyawan.email}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                          </a>
                        )}
                        {guruDetail.karyawan.phone && (
                          <a
                            href={`tel:${guruDetail.karyawan.phone}`}
                            className="group flex items-center gap-4 p-5 rounded-xl bg-linear-to-r from-[#33b962]/8 to-transparent border-2 border-[#33b962]/20 hover:border-[#33b962]/50 hover:shadow-lg hover:bg-linear-to-r hover:from-[#33b962]/12 transition-all"
                          >
                            <div className="shrink-0 w-12 h-12 bg-[#33b962]/10 rounded-xl flex items-center justify-center group-hover:bg-[#33b962]/20 transition-colors">
                              <Phone className="w-6 h-6 text-[#33b962]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Telepon</p>
                              <p className="text-gray-800 font-semibold group-hover:text-[#33b962] transition-colors">{guruDetail.karyawan.phone}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#33b962] transition-colors" />
                          </a>
                        )}
                        {guruDetail.karyawan.name && (
                          <div className="flex items-center gap-4 p-5 border-2 rounded-xl bg-linear-to-r from-blue-500/8 to-transparent border-blue-500/20">
                            <div className="flex items-center justify-center w-12 h-12 shrink-0 bg-blue-500/10 rounded-xl">
                              <GraduationCap className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Nama Guru</p>
                              <p className="font-semibold text-gray-800">{guruDetail.karyawan.name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
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