"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Calendar, ImageIcon, Grid, List } from "lucide-react"
import { useState } from "react"

export default function GaleriPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const galleries = [
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
    {
      title: "Kunjungan ke Museum",
      date: "20 Desember 2024",
      category: "events",
      image: "/gallery-museum-visit.jpg",
      description: "Field trip edukatif ke museum kota",
    },
    {
      title: "Praktek Sains",
      date: "18 Desember 2024",
      category: "academic",
      image: "/gallery-science-experiment.jpg",
      description: "Eksperimen sains di laboratorium",
    },
    {
      title: "Pertandingan Futsal",
      date: "15 Desember 2024",
      category: "sports",
      image: "/gallery-futsal-match.jpg",
      description: "Pertandingan futsal antar kelas",
    },
    {
      title: "Workshop Seni Lukis",
      date: "12 Desember 2024",
      category: "arts",
      image: "/gallery-painting-workshop.jpg",
      description: "Kegiatan melukis untuk mengembangkan kreativitas",
    },
    {
      title: "Peringatan Hari Besar Islam",
      date: "10 Desember 2024",
      category: "islamic",
      image: "/gallery-islamic-celebration.jpg",
      description: "Perayaan hari besar Islam bersama",
    },
    {
      title: "Pramuka di Alam",
      date: "8 Desember 2024",
      category: "events",
      image: "/gallery-scouts-outdoor.jpg",
      description: "Kegiatan pramuka penggalang di alam terbuka",
    },
  ]

  const filters = [
    { id: "all", label: "Semua", color: "bg-gray-500" },
    { id: "academic", label: "Akademik", color: "bg-blue-500" },
    { id: "sports", label: "Olahraga", color: "bg-green-500" },
    { id: "arts", label: "Seni", color: "bg-purple-500" },
    { id: "islamic", label: "Islami", color: "bg-[#33b962]" },
    { id: "events", label: "Events", color: "bg-orange-500" },
  ]

  const filteredGalleries = galleries.filter((item) => activeFilter === "all" || item.category === activeFilter)

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Gallery Aktivitas" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Gallery</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Gallery Aktivitas</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Dokumentasi kegiatan dan prestasi siswa SD Muhammadiyah 3 Samarinda
            </p>
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "grid" ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  className={`rounded-full ${
                    viewMode === "list" ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"
                  }`}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                {filteredGalleries.length} Foto
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
                  {filter.id !== "all" && <span className={`w-2 h-2 rounded-full ${filter.color} mr-2`} />}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid/List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-6">
              {filteredGalleries.map((item, index) => (
                <Card
                  key={index}
                  className="break-inside-avoid overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${filters.find((f) => f.id === item.category)?.color} text-white border-0 capitalize`}
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-4">
              {filteredGalleries.map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="relative w-full md:w-64 h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>
                        <Badge
                          className={`${filters.find((f) => f.id === item.category)?.color} text-white border-0 capitalize`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredGalleries.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada foto yang ditemukan</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
