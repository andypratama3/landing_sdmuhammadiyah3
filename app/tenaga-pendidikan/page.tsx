"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Users, AlertCircle, Loader2, X, Network, Briefcase, Award } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { Staff, StrukturNode, TenagaPendidikanResponse, TenagaPendidikan } from "@/types/tenagaPendidikan.types"
import { OrgTreeNode } from "@/components/tenaga-pendidikan/OrgTreeNode"
import { GridStaffCard } from "@/components/tenaga-pendidikan/GridStaffCard"
import { useDebounce } from "@/hooks/useDebounce"

export default function TenagaPendidikanPage() {
  const [searchInput, setSearchInput] = useState("")
  const [viewMode, setViewMode] = useState<"hierarchy" | "grid">("hierarchy")

  const debouncedSearchQuery = useDebounce(searchInput, 500)
  const isTyping = searchInput !== debouncedSearchQuery

  const {
    data: tenagaPendidikanResponse,
    loading,
    error,
    refetch
  } = useApi<TenagaPendidikan>('/tenaga-kependidikan', {
    cache: true,
    cacheTTL: 300000,
    immediate: true,
  })

  // Extract hierarchical data from API response
  const hierarchyData = useMemo(() => {
    if (!tenagaPendidikanResponse) return []

    const dataArray = tenagaPendidikanResponse || tenagaPendidikanResponse
    return Array.isArray(dataArray) ? dataArray : []
  }, [tenagaPendidikanResponse])

  // Process hierarchy data to include full image URLs
  const processedHierarchyData = useMemo(() => {
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ''

    const processNode = (node: any): StrukturNode => {
      return {
        id: node.id,
        name: node.name,
        slug: node.slug,
        staff: (node.staff || []).map((staff: any) => ({
          id: staff.id,
          name: staff.name,
          position: staff.jabatan,
          image: staff.foto ? `${storageUrl}/img/tenagapendidikan/${staff.foto}` : "/placeholder.svg",
          category: staff.jabatan,
          slug: staff.slug,
          description: staff.description || "",
        })),
        children: (node.children || []).map(processNode)
      }
    }

    return hierarchyData.map(processNode)
  }, [hierarchyData])

  // Flatten all staff from hierarchy for grid view
  const allStaff = useMemo(() => {
    const flattenStaff = (nodes: StrukturNode[]): Staff[] => {
      let result: Staff[] = []

      nodes.forEach(node => {
        result = [...result, ...node.staff]
        if (node.children && node.children.length > 0) {
          result = [...result, ...flattenStaff(node.children)]
        }
      })

      return result
    }

    return flattenStaff(processedHierarchyData)
  }, [processedHierarchyData])

  const filteredStaff = useMemo(() => {
    return allStaff.filter((person) => {
      return person.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    })
  }, [allStaff, debouncedSearchQuery])

  const isSearching = isTyping || loading

  if (loading && allStaff.length === 0) {
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
        <section className="py-16 bg-gray-50 dark:bg-muted/20">
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
    <div className="pt-24 pb-16 bg-background">
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
                  Professional Support Team
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm uppercase">
                  Tenaga <br /> <span className="text-[#ffd166]">Kependidikan</span>
                </h1>
                <p className="text-white/95 text-xl font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                  Dedikasi tinggi dan pelayanan sepenuh hati untuk mendukung kelancaran seluruh operasional dan administrasi Sekolah Dasar Muhammadiyah 3.
                </p>
                
                <div className="relative w-full max-w-xl">
                  <div className="flex items-center bg-white/95 dark:bg-gray-900 border border-white/20 shadow-2xl rounded-2xl p-2 focus-within:ring-4 focus-within:ring-white/30 transition-all">
                    <div className="pl-4 pr-3 text-gray-400">
                      {isTyping ? <Loader2 className="w-6 h-6 animate-spin text-[#33b962]" /> : <Search className="w-6 h-6" />}
                    </div>
                    <Input
                      type="text"
                      placeholder="Cari nama staff..."
                      className="flex-1 bg-transparent border-none shadow-none text-lg font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:ring-0 px-2 h-14 outline-none"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && (
                      <button onClick={() => setSearchInput("")} className="px-3 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-[#33b962]">
                 <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center mb-6 text-[#33b962] group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Pelayanan</h3>
                <p className="text-sm font-medium text-gray-500 mt-2">Ramah, Cepat & Akurat</p>
              </div>
              
              <div className="bg-[#ffd166] dark:bg-[#e0b445] rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1 transition-transform relative overflow-hidden group hover:scale-[1.02]">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-gray-900 group-hover:rotate-12 transition-transform">
                    <Award className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">Dedikasi</h3>
                <p className="text-sm font-medium text-gray-800 mt-2">Mendukung Visi Sekolah Kreatif</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode("hierarchy")}
                  variant={viewMode === "hierarchy" ? "default" : "outline"}
                  className={viewMode === "hierarchy" ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""}
                >
                  <Network className="w-4 h-4 mr-2" />
                  Struktur Organisasi
                </Button>
                <Button
                  onClick={() => setViewMode("grid")}
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className={viewMode === "grid" ? "bg-[#33b962] hover:bg-[#2a9d52]" : ""}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Tampilan Grid
                </Button>
              </div>

              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 text-[#33b962] animate-spin" />
                  ) : (
                    <Search className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <Input
                  type="text"
                  placeholder="Cari nama staf..."
                  className="pl-10 pr-10 border-2 border-border rounded-full focus:border-[#33b962] focus:ring-2 focus:ring-[#33b962]/20 transition-all bg-background"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {searchInput && (
                  <button
                    onClick={() => setSearchInput("")}
                    className="absolute p-1 transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#33b962]/10">
                <span className="font-semibold text-[#33b962]">{allStaff.length}</span>
                <span className="text-sm text-muted-foreground">Tenaga Pendidikan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {error && allStaff.length === 0 && (
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

      {/* Content Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4 mx-auto max-w-7xl">
          {isSearching ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isTyping && (
                <div className="flex items-center justify-center gap-2 py-8 col-span-full">
                  <Loader2 className="w-5 h-5 animate-spin text-[#33b962]" />
                  <span className="text-muted-foreground">Mencari Tenaga Pendidikan...</span>
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
          ) : (
            <>
              {/* Hierarchy View */}
              {viewMode === "hierarchy" && !debouncedSearchQuery && (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-max">
                    {processedHierarchyData.length > 0 ? (
                      processedHierarchyData.map((rootNode, index) => (
                        <div key={rootNode.id} className={index > 0 ? 'mt-16' : ''}>
                          <OrgTreeNode node={rootNode} level={0} isRoot={true} />
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center">
                        <Network className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                        <p className="text-lg text-muted-foreground">Tidak ada struktur organisasi yang tersedia</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Grid View */}
              {(viewMode === "grid" || debouncedSearchQuery) && (
                <>
                  {filteredStaff.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {filteredStaff.map((person) => (
                        <GridStaffCard key={person.id} person={person} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-lg text-muted-foreground">
                        {debouncedSearchQuery
                          ? `Tidak ditemukan staf dengan nama "${debouncedSearchQuery}"`
                          : 'Tidak ada staf yang ditemukan'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}