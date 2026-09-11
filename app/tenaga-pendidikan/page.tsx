export const revalidate = 3600

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Users, AlertCircle, Loader2, X, Network, Briefcase, Award, Shield, Heart } from "lucide-react"
import { serverGetPublic } from "@/lib/server-api"
import { Staff, StrukturNode, TenagaPendidikanResponse, TenagaPendidikan } from "@/types/tenagaPendidikan.types"
import { OrgTreeNode } from "@/components/tenaga-pendidikan/OrgTreeNode"
import { GridStaffCard } from "@/components/tenaga-pendidikan/GridStaffCard"
import PageAnimations from "@/components/PageAnimations"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

interface TenagaPendidikanPageProps {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}

async function TenagaPendidikanContent({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const searchQuery = searchParams.search || ""
  const viewMode = searchParams.view || "hierarchy"

  const tenagaPendidikanResponse = await serverGetPublic<TenagaPendidikan>('/tenaga-kependidikan')

  // Extract hierarchical data from API response
  const hierarchyData = (() => {
    if (!tenagaPendidikanResponse?.data) return []
    const dataArray = (tenagaPendidikanResponse as any)?.data || tenagaPendidikanResponse
    return Array.isArray(dataArray) ? dataArray : []
  })()

  // Process hierarchy data to include full image URLs & filter out categories with 0 staff
  const processedHierarchyData = (() => {
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || ''

    const processNode = (node: any): StrukturNode | null => {
      const processedChildren = (node.children || [])
        .map(processNode)
        .filter((child: StrukturNode | null): child is StrukturNode => child !== null)

      const staffList = (node.staff || []).map((staff: any) => ({
        id: staff.id || staff.slug,
        name: staff.name,
        position: staff.jabatan || staff.position || node.name,
        image: staff.foto || staff.image
          ? ((staff.foto || staff.image).startsWith("http") ? (staff.foto || staff.image)
            : (staff.foto || staff.image).includes("/") ? `${storageUrl}/${staff.foto || staff.image}`
            : `${storageUrl}/img/tenagapendidikan/${staff.foto || staff.image}`)
          : "/placeholder.svg",
        category: staff.jabatan || staff.category || node.name,
        slug: staff.slug,
        description: staff.description || "",
      }))

      // Hide category node if it has 0 staff and no children with staff
      if (staffList.length === 0 && processedChildren.length === 0) {
        return null
      }

      return {
        id: node.id || node.slug,
        name: node.name,
        slug: node.slug,
        staff: staffList,
        children: processedChildren
      }
    }

    return hierarchyData
      .map(processNode)
      .filter((node): node is StrukturNode => node !== null)
  })()

  // Flatten all staff from hierarchy for grid view
  const allStaff = (() => {
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
  })()

  const filteredStaff = allStaff.filter((person) => {
    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="pt-24 pb-16 bg-background">
      <PageAnimations />
      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-gray-50/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <Badge className="page-hero-badge bg-white text-(--color-forest-600) hover:bg-white border-0 px-4 py-1.5 mb-8 text-xs sm:text-sm font-black uppercase tracking-widest shadow-md inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  Professional Support Team
                </Badge>
                <h1 className="page-hero-title text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm uppercase">
                  Tenaga <br /> <span className="text-(--color-sun-200)">Kependidikan</span>
                </h1>
                <p className="page-hero-description text-white/95 text-xl font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-sm">
                  Dedikasi tinggi dan pelayanan sepenuh hati untuk mendukung kelancaran seluruh operasional dan administrasi Sekolah Dasar Muhammadiyah 3.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="page-button bg-white text-(--color-forest-450) hover:bg-white/90 rounded-full px-8 h-12 font-black uppercase tracking-widest text-xs shadow-xl">
                    <Link href="#daftar-staf">Lihat Seluruh Tim</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="page-card page-tilt-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1 transition-colors relative overflow-hidden group hover:border-(--color-forest-450)">
                 <div className="w-14 h-14 bg-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 rounded-2xl flex items-center justify-center mb-6 text-(--color-forest-450) group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8" />
                  </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Pelayanan</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Ramah, Cepat & Akurat</p>
              </div>

              <div className="page-card bg-(--color-sun-500) dark:bg-(--color-sun-600) rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1 transition-transform relative overflow-hidden group hover:scale-[1.02]">
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
                  asChild
                  variant={viewMode === "hierarchy" ? "default" : "outline"}
                  className={viewMode === "hierarchy" ? "bg-(--color-forest-450) hover:bg-(--color-forest-500)" : ""}
                >
                  <Link href="?view=hierarchy">
                    <Network className="w-4 h-4 mr-2" />
                    Struktur Organisasi
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className={viewMode === "grid" ? "bg-(--color-forest-450) hover:bg-(--color-forest-500)" : ""}
                >
                  <Link href="?view=grid">
                    <Users className="w-4 h-4 mr-2" />
                    Tampilan Grid
                  </Link>
                </Button>
              </div>

              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari nama staf..."
                  className="pl-10 pr-10 border-2 border-border rounded-full focus:border-(--color-forest-450) focus:ring-2 focus:ring-(--color-forest-450)/20 transition-all bg-background"
                  defaultValue={searchQuery}
                />
                {searchQuery && (
                  <Link
                    href="?"
                    aria-label="Hapus pencarian"
                    className="absolute min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors -translate-y-1/2 rounded-full right-1 top-1/2 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-(--color-forest-450)/10">
                <span className="font-semibold text-(--color-forest-450)">{allStaff.length}</span>
                <span className="text-sm text-muted-foreground">Tenaga Pendidikan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-muted/20" id="daftar-staf">
        <div className="container px-4 mx-auto max-w-7xl">
          <>
            {/* Hierarchy View */}
            {viewMode === "hierarchy" && !searchQuery && (
              <div className="w-full overflow-x-auto">
                <div className="min-w-max">
                  {processedHierarchyData.length > 0 ? (
                    processedHierarchyData.map((rootNode, index) => (
                      <div key={rootNode.id ?? rootNode.slug ?? index} className={index > 0 ? 'mt-16' : ''}>
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
            {(viewMode === "grid" || searchQuery) && (
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
                      {searchQuery
                        ? `Tidak ditemukan staf dengan nama "${searchQuery}"`
                        : 'Tidak ada staf yang ditemukan'}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </section>
    </div>
  )
}

export default async function TenagaPendidikanPage({ searchParams }: TenagaPendidikanPageProps) {
  const params = await searchParams || {}
  return (
    <Suspense fallback={<TenagaPendidikanLoading />}>
      <TenagaPendidikanContent searchParams={params} />
    </Suspense>
  )
}

function TenagaPendidikanLoading() {
  return (
    <div className="pt-24 pb-16 bg-background">
      <PageAnimations />
      {/* Editorial Bento Grid Hero Section */}
      <section className="w-full py-12 lg:py-20 bg-gray-50/50 dark:bg-gray-950/50 mt-4 border-b border-gray-200 dark:border-gray-800">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Main Typographic Card (Spans 8 cols) */}
            <div className="lg:col-span-8 bg-(--color-forest-450) dark:bg-(--color-forest-900) rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <Skeleton className="w-40 h-8 mb-8 rounded-full bg-white/30" />
                <Skeleton className="w-3/4 h-16 mb-6 bg-white/30" />
                <Skeleton className="w-full h-6 mb-10 bg-white/20" />
                <Skeleton className="w-32 h-12 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Side Highlights (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl" />
                <Skeleton className="w-24 h-8 mb-2" />
                <Skeleton className="w-full h-4" />
              </div>

              <div className="bg-(--color-sun-500) dark:bg-(--color-sun-600) rounded-[2.5rem] p-8 shadow-md flex flex-col justify-center flex-1">
                <Skeleton className="w-14 h-14 mb-6 rounded-2xl bg-white/30" />
                <Skeleton className="w-24 h-8 mb-2 bg-white/30" />
                <Skeleton className="w-full h-4 bg-white/20" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Filter & Search Skeleton */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex gap-2">
                <Skeleton className="w-40 h-10 rounded-full" />
                <Skeleton className="w-32 h-10 rounded-full" />
              </div>
              <Skeleton className="w-full md:w-96 h-10 rounded-full" />
              <Skeleton className="w-32 h-8 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
