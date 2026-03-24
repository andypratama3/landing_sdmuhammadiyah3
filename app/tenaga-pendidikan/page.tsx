"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Users, AlertCircle, Loader2, X, Network } from "lucide-react"
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
      {/* Premium Structural Hero Section */}
      <section className="relative w-full py-16 lg:py-24 bg-[#0f172a] overflow-hidden rounded-b-[3rem] lg:rounded-b-[4rem] border-b-8 border-[#ffd166] shadow-2xl z-10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#33b962]/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left max-w-2xl">
              <Badge className="bg-[#33b962]/20 text-[#33b962] border border-[#33b962]/30 px-5 py-2 mb-8 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-lg inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#33b962] animate-pulse"></span>
                Tim Operasional Profesional
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tighter drop-shadow-lg">
                Tenaga <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd166] to-[#ffb800]">Kependidikan</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed drop-shadow-md max-w-xl">
                Dedikasi tinggi dan pelayanan sepenuh hati untuk mendukung kelancaran seluruh operasional dan administrasi Sekolah Dasar Muhammadiyah 3.
              </p>
            </div>

            <div className="hidden md:flex gap-4">
              <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center p-4">
                <Network className="w-10 h-10 text-[#33b962] mb-2" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest text-center">Struktur Jelas</span>
              </div>
              <div className="w-32 h-32 bg-[#33b962]/10 border border-[#33b962]/20 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center p-4 mt-8">
                <Users className="w-10 h-10 text-[#ffd166] mb-2" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest text-center">Staff Ahli</span>
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