"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Calendar, ImageIcon, Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function GaleriPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [galleries, setGalleries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(false)

        await new Promise((r) => setTimeout(r, 1200))

        setGalleries([
          {
            title: "Upacara Bendera Senin",
            date: "15 Januari 2025",
            category: "events",
            image: "/gallery-flag-ceremony.jpg",
            description: "Upacara bendera rutin setiap hari Senin dengan khidmat",
          },
          {
            title: "Pembelajaran Outdoor",
            date: "12 Januari 2025",
            category: "academic",
            image: "/gallery-outdoor-learning.jpg",
            description: "Kegiatan belajar di luar kelas untuk memahami alam",
          },
          {
            title: "Lomba Matematika Tingkat Kota",
            date: "10 Januari 2025",
            category: "academic",
            image: "/gallery-math-competition.jpg",
            description: "Siswa mengikuti kompetisi matematika dan meraih juara",
          },
          {
            title: "Latihan Panahan",
            date: "8 Januari 2025",
            category: "sports",
            image: "/gallery-archery-practice.jpg",
            description: "Latihan rutin ekstrakurikuler panahan",
          },
          {
            title: "Festival Seni Budaya",
            date: "5 Januari 2025",
            category: "arts",
            image: "/gallery-cultural-festival.jpg",
            description: "Penampilan tari tradisional dalam festival seni",
          },
          {
            title: "Tahfidz Al-Qur'an",
            date: "3 Januari 2025",
            category: "islamic",
            image: "/gallery-quran-memorization.jpg",
            description: "Program hafalan Al-Qur'an dengan metode tilawati",
          },
        ])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filters = [
    { id: "all", label: "Semua", color: "bg-gray-500" },
    { id: "academic", label: "Akademik", color: "bg-blue-500" },
    { id: "sports", label: "Olahraga", color: "bg-green-500" },
    { id: "arts", label: "Seni", color: "bg-purple-500" },
    { id: "islamic", label: "Islami", color: "bg-[#33b962]" },
    { id: "events", label: "Events", color: "bg-orange-500" },
  ]

  const filteredGalleries = galleries.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  )

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">
              Gallery
            </Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">
              Gallery Aktivitas
            </h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Dokumentasi kegiatan dan prestasi siswa SD Muhammadiyah 3 Samarinda
            </p>
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "grid"
                      ? "bg-[#33b962] hover:bg-[#2a9d52]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "list"
                      ? "bg-[#33b962] hover:bg-[#2a9d52]"
                      : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                {filteredGalleries.length} Aktivitas
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
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
                  {filter.id !== "all" && (
                    <span
                      className={`w-2 h-2 rounded-full ${filter.color} mr-2`}
                    />
                  )}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-72 rounded-3xl animate-pulse"
                />
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="py-20 text-center">
              <p className="mb-4 text-lg text-red-500">
                Gagal memuat galeri
              </p>
              <Button onClick={() => location.reload()}>
                Coba Lagi
              </Button>
            </div>
          )}

          {/* DATA */}
          {!loading && !error && (
            <>
              {viewMode === "grid" ? (
                <div className="gap-6 mx-auto space-y-6 columns-1 md:columns-2 lg:columns-3 max-w-7xl">
                  {filteredGalleries.map((item, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden transition-all border-0 shadow-lg break-inside-avoid rounded-3xl hover:shadow-2xl group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </div>

                        <Button asChild size="sm" className="w-full mt-4">
                          <Link href={`/galeri/${item.title}`}>
                            Lihat
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="max-w-5xl mx-auto space-y-4">
                  {filteredGalleries.map((item, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden transition-all border-0 shadow-lg rounded-3xl"
                    >
                      <div className="flex flex-col gap-6 p-6 md:flex-row">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-48 md:w-64 rounded-2xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mb-4 text-gray-600">
                            {item.description}
                          </p>
                          <Button asChild size="sm">
                            <Link href={`/galeri/${item.title}`}>
                              Lihat
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {filteredGalleries.length === 0 && (
                <div className="py-20 text-center">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg text-gray-500">
                    Tidak ada foto yang ditemukan
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
