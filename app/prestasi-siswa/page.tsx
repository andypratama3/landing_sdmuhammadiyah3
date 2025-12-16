"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Trophy, Medal, Calendar, MapPin } from "lucide-react"
import { useState } from "react"

export default function PrestasiSiswaPage() {
  const [selectedYear, setSelectedYear] = useState("2025")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const achievements = [
    {
      student: "Alivna Hilya Zia",
      grade: "Kelas 5A",
      title: "Juara 2 Panahan",
      competition: "Kejuaraan Panahan Pelajar Kota Samarinda",
      date: "15 Januari 2025",
      level: "kota",
      category: "sports",
      award: "Juara 2",
      image: "/student-achievement-archery.jpg",
    },
    {
      student: "Salsabil Raihanah",
      grade: "Kelas 6B",
      title: "Juara 1 O2SN Karate",
      competition: "Olimpiade Olahraga Siswa Nasional",
      date: "10 Januari 2025",
      level: "provinsi",
      category: "sports",
      award: "Juara 1",
      image: "/student-achievement-karate.jpg",
    },
    {
      student: "Maryam Azzahra",
      grade: "Kelas 4C",
      title: "Juara Harapan III Tahfidz",
      competition: "Musabaqah Hifdzil Qur'an Tingkat Kota",
      date: "8 Januari 2025",
      level: "kota",
      category: "islamic",
      award: "Harapan 3",
      image: "/student-achievement-quran.jpg",
    },
    {
      student: "Naura Jasmine",
      grade: "Kelas 5B",
      title: "Juara 1 FLS3N Mendongeng",
      competition: "Festival Literasi dan Seni Siswa Nasional",
      date: "5 Januari 2025",
      level: "provinsi",
      category: "arts",
      award: "Juara 1",
      image: "/student-achievement-storytelling.jpg",
    },
    {
      student: "Ahmad Farhan",
      grade: "Kelas 6A",
      title: "Juara 1 Olimpiade Matematika",
      competition: "Olimpiade Matematika Tingkat Kota",
      date: "20 Desember 2024",
      level: "kota",
      category: "academic",
      award: "Juara 1",
      image: "/student-achievement-math.jpg",
    },
    {
      student: "Zahra Amelia",
      grade: "Kelas 5C",
      title: "Juara 2 Lomba Sains",
      competition: "Kompetisi Sains Nasional",
      date: "15 Desember 2024",
      level: "nasional",
      category: "academic",
      award: "Juara 2",
      image: "/student-achievement-science.jpg",
    },
  ]

  const years = ["2025", "2024", "2023"]
  const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "academic", label: "Akademik" },
    { id: "sports", label: "Olahraga" },
    { id: "arts", label: "Seni" },
    { id: "islamic", label: "Islami" },
  ]
  const levels = [
    { id: "all", label: "Semua Tingkat" },
    { id: "kecamatan", label: "Kecamatan" },
    { id: "kota", label: "Kota" },
    { id: "provinsi", label: "Provinsi" },
    { id: "nasional", label: "Nasional" },
    { id: "internasional", label: "Internasional" },
  ]

  const filteredAchievements = achievements.filter((achievement) => {
    const matchesCategory = selectedCategory === "all" || achievement.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || achievement.level === selectedLevel
    return matchesCategory && matchesLevel
  })

  const getAwardColor = (award: string) => {
    if (award.includes("1")) return "bg-[#ffd700] text-gray-900"
    if (award.includes("2")) return "bg-[#c0c0c0] text-gray-900"
    if (award.includes("3")) return "bg-[#cd7f32] text-white"
    return "bg-[#33b962] text-white"
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Prestasi Siswa" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Hall of Fame</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Prestasi Siswa</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Kebanggaan kami atas pencapaian luar biasa siswa-siswi berprestasi
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Year Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Tahun Ajaran</label>
              <div className="flex gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedYear === year ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"
                    }`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedCategory === category.id ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Tingkat Kompetisi</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedLevel === level.id ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>

            <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
              Total: {filteredAchievements.length} Prestasi
            </Badge>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredAchievements.map((achievement, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.student}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getAwardColor(achievement.award)} border-0 font-bold`}>
                      {achievement.award}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Trophy className="w-8 h-8 text-[#ffd700]" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl mb-1">{achievement.student}</h3>
                    <p className="text-white/80 text-sm mb-3">{achievement.grade}</p>
                    <h4 className="font-semibold text-lg mb-2">{achievement.title}</h4>
                    <p className="text-white/70 text-sm mb-4">{achievement.competition}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{achievement.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="capitalize">{achievement.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-20">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada prestasi yang ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Statistik Prestasi {selectedYear}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="p-6 rounded-3xl border-2">
                <Medal className="w-12 h-12 text-[#ffd700] mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Akademik</p>
              </Card>
              <Card className="p-6 rounded-3xl border-2">
                <Medal className="w-12 h-12 text-[#33b962] mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Olahraga</p>
              </Card>
              <Card className="p-6 rounded-3xl border-2">
                <Medal className="w-12 h-12 text-[#ff6b35] mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Seni</p>
              </Card>
              <Card className="p-6 rounded-3xl border-2">
                <Medal className="w-12 h-12 text-[#06d6a0] mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-600">Islami</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
