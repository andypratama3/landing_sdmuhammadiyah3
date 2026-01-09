"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, Phone, Briefcase, Search, Users, AlertCircle, RefreshCw, ChevronRight, Loader2, X } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { useApi } from "@/hooks/useApi"
import Image from "next/image"
import { TenagaPendidikan } from "@/types/tenagaPendidikan.types"

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

export default function TenagaPendidikanPage() {
  const [searchInput, setSearchInput] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  // Fetch tenaga pendidikan data from API
  const { 
    data: tenagaPendidikanResponse, 
    loading, 
    error,
    refetch 
  } = useApi<TenagaPendidikan[]>('/tenaga-kependidikan', {
    cache: true,
    cacheTTL: 300000,
    immediate: true,
  })

  // Extract data from API response
  const apiStaff = useMemo(() => {
    if (!tenagaPendidikanResponse) return []
    
    const dataArray = (tenagaPendidikanResponse as any)?.data || tenagaPendidikanResponse
    return Array.isArray(dataArray) ? dataArray : []
  }, [tenagaPendidikanResponse])

  // Process API data to match component structure
  const processedApiStaff = useMemo(() => {
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ''
    
    return apiStaff.map(item => ({
      name: item.name,
      position: item.jabatan,
      image: item.foto ? `${storageUrl}/img/tenagapendidikan/${item.foto}` : "/placeholder.svg",
      category: item.jabatan, 
      slug: item.slug,
      description: item.description || "",
    }))
  }, [apiStaff])

  const staff = processedApiStaff.length > 0 ? processedApiStaff : []

  const filteredStaff = staff.filter((person) => {
    const matchesFilter = activeFilter === "all" || person.position === activeFilter
    const matchesSearch = person.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const isSearching = isTyping || loading

  if (loading && staff.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] py-24 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="mb-4 text-6xl font-bold">Tenaga Pendidikan</h1>
              <p className="text-xl text-white/80">Tim profesional yang luar biasa</p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#1a6d3b] py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bg-white rounded-full top-20 right-10 w-80 h-80 blur-3xl"></div>
          <div className="absolute bg-white rounded-full -bottom-20 -left-20 w-96 h-96 blur-3xl"></div>
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30 backdrop-blur-sm">
              Tim Pendukung Profesional
            </Badge>
            <h1 className="mb-4 text-6xl font-bold">Tenaga Pendidikan</h1>
            <p className="text-xl text-white/90">Dedikasi tinggi untuk mendukung operasional sekolah</p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-white border-b border-gray-100">
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
                  placeholder="Cari nama staf..."
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
                <span className="font-semibold text-[#33b962]">{staff.length}</span>
                <span className="text-sm text-gray-600">Tenaga Pendidikan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {error && staff.length === 0 && (
        <div className="container px-4 mx-auto mt-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Terjadi kesalahan saat memuat data tenaga pendidikan.</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetch?.()}
                className="ml-4"
              >
                Coba Lagi
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Staff Grid */}
      <section className="py-20 bg-gray-50/50">
        <div className="container px-4 mx-auto max-w-7xl">
          {isSearching ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isTyping && (
                <div className="flex items-center justify-center gap-2 py-8 col-span-full">
                  <Loader2 className="w-5 h-5 animate-spin text-[#33b962]" />
                  <span className="text-gray-500">Mencari Tenaga Pendidikan...</span>
                </div>
              )}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-72 rounded-2xl" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-full h-4" />
                </div>
              ))}
            </div>
          ) : filteredStaff.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredStaff.map((person, index) => (
                <div
                  key={person.slug || index}
                  className="h-full cursor-pointer group"
                >
                  <div className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                    {/* Image Container with Overlay */}
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:opacity-100"></div>
                      
                      {/* Badge - Top Right */}
                      <div className="absolute z-10 top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-md text-[#33b962] border-0 shadow-lg font-semibold px-3 py-1 text-xs capitalize">
                          {person.position}
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
                      {/* Name & Position */}
                      <div className="mb-3">
                        <h3 className="mb-1 text-xl font-bold leading-tight text-gray-900">{person.name}</h3>
                        <p className="text-[#33b962] text-sm font-semibold capitalize">{person.position}</p>
                      </div>

                      {/* Description */}
                      {person.description && (
                        <p className="flex-grow mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">{person.description}</p>
                      )}                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500">
                {debouncedSearchQuery 
                  ? `Tidak ditemukan staf dengan nama "${debouncedSearchQuery}"`
                  : 'Tidak ada staf yang ditemukan'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}