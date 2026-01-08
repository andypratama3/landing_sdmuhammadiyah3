"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, Phone, Briefcase, Search, Users, AlertCircle, RefreshCw } from "lucide-react"
import { useState, useMemo } from "react"
import { useApi } from "@/hooks/useApi"
import Image from "next/image"
import { TenagaPendidikan } from "@/types/tenagaPendidikan.types"

export default function TenagaPendidikanPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

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
    }))
  }, [apiStaff])


  // Use API data if available, otherwise use static data
  const staff = processedApiStaff.length > 0 ? processedApiStaff : []

  // const filters = [
  //   { id: "all", label: "Semua" },
  //   { id: "administrasi", label: "Administrasi" },
  //   { id: "perpustakaan", label: "Perpustakaan" },
  //   { id: "it", label: "IT" },
  //   { id: "kesehatan", label: "Kesehatan" },
  //   { id: "keamanan", label: "Keamanan" },
  // ]

  const filteredStaff = staff.filter((person) => {
    const matchesFilter = activeFilter === "all" || person.position === activeFilter
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Tenaga Pendidikan" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Tim Pendukung</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Tenaga Pendidikan</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Tim profesional yang mendukung operasional sekolah
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
              <div className="relative w-full md:w-96">
                <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <Input
                  type="text"
                  placeholder="Cari nama staf..."
                  className="pl-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                Total: {staff.length} Tenaga Pendidikan
              </Badge>
            </div>
            {/* <div className="flex flex-wrap gap-2">
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
            </div> */}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          {loading ? (
            // Loading State
            <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 rounded-3xl">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-2/3 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            // Error State
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Terjadi kesalahan saat memuat data tenaga pendidikan.</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetch?.()}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </Button>
              </AlertDescription>
            </Alert>
          ) : filteredStaff.length === 0 ? (
            // Empty State
            <div className="py-20 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500">
                {searchQuery 
                  ? `Tidak ditemukan staf dengan nama "${searchQuery}"`
                  : 'Tidak ada staf yang ditemukan'}
              </p>
            </div>
          ) : (
            // Data Loaded
            <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
              {filteredStaff.map((person, index) => (
                <Card
                  key={person.slug || index}
                  className="py-0 overflow-hidden transition-all duration-300 border-0 shadow-lg rounded-3xl hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-[#33b962] border-0 capitalize">{person.position}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{person.name}</h3>
                    <p className="text-[#33b962] text-sm font-medium mb-4">{person.position}</p>
                    {/* <div className="space-y-3 text-sm text-gray-600">
                      {person.education && person.education !== "-" && (
                        <div className="flex items-start gap-2">
                          <Briefcase className="w-4 h-4 text-[#33b962] flex-shrink-0 mt-0.5" />
                          <span>{person.education}</span>
                        </div>
                      )}
                      {person.experience && person.experience !== "-" && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#33b962] flex-shrink-0" />
                          <span>{person.experience}</span>
                        </div>
                      )}
                    </div>
                    {(person.email !== "-" || person.phone !== "-") && (
                      <div className="pt-4 mt-4 space-y-2 transition-opacity duration-300 border-t opacity-0 group-hover:opacity-100">
                        {person.email && person.email !== "-" && (
                          <a
                            href={`mailto:${person.email}`}
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{person.email}</span>
                          </a>
                        )}
                        {person.phone && person.phone !== "-" && (
                          <a
                            href={`tel:${person.phone}`}
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{person.phone}</span>
                          </a>
                        )}
                      </div>
                    )} */}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}