"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, Phone, GraduationCap, Award, Search, BookOpen } from "lucide-react"
import { useState } from "react"

export default function GuruPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const teachers = [
    {
      name: "Siti Nurhaliza, S.Pd",
      subject: "Matematika",
      grade: "Kelas 4-6",
      education: "S1 Pendidikan Matematika",
      experience: "12 Tahun",
      email: "siti.nurhaliza@sdm3smd.com",
      phone: "0812-3456-7890",
      image: "/female-teacher-mathematics.jpg",
      category: "matematika",
    },
    {
      name: "Budi Santoso, M.Pd",
      subject: "Bahasa Indonesia",
      grade: "Kelas 1-3",
      education: "S2 Pendidikan Bahasa",
      experience: "15 Tahun",
      email: "budi.santoso@sdm3smd.com",
      phone: "0812-3456-7891",
      image: "/male-teacher-indonesian.jpg",
      category: "bahasa",
    },
    {
      name: "Rina Kusuma, S.Pd",
      subject: "IPA",
      grade: "Kelas 4-6",
      education: "S1 Pendidikan IPA",
      experience: "10 Tahun",
      email: "rina.kusuma@sdm3smd.com",
      phone: "0812-3456-7892",
      image: "/female-teacher-science.jpg",
      category: "ipa",
    },
    {
      name: "Ahmad Fauzi, S.Pd.I",
      subject: "Pendidikan Agama Islam",
      grade: "Kelas 1-6",
      education: "S1 Pendidikan Agama Islam",
      experience: "14 Tahun",
      email: "ahmad.fauzi@sdm3smd.com",
      phone: "0812-3456-7893",
      image: "/male-teacher-islamic-studies.jpg",
      category: "agama",
    },
    {
      name: "Dewi Lestari, S.Pd",
      subject: "Bahasa Inggris",
      grade: "Kelas 3-6",
      education: "S1 Pendidikan Bahasa Inggris",
      experience: "8 Tahun",
      email: "dewi.lestari@sdm3smd.com",
      phone: "0812-3456-7894",
      image: "/female-teacher-english.jpg",
      category: "bahasa",
    },
    {
      name: "Hendra Wijaya, S.Pd",
      subject: "PJOK",
      grade: "Kelas 1-6",
      education: "S1 Pendidikan Jasmani",
      experience: "11 Tahun",
      email: "hendra.wijaya@sdm3smd.com",
      phone: "0812-3456-7895",
      image: "/male-teacher-physical-education.jpg",
      category: "pjok",
    },
    {
      name: "Sari Indah, S.Sn",
      subject: "Seni Budaya",
      grade: "Kelas 1-6",
      education: "S1 Pendidikan Seni",
      experience: "9 Tahun",
      email: "sari.indah@sdm3smd.com",
      phone: "0812-3456-7896",
      image: "/female-teacher-arts.jpg",
      category: "seni",
    },
    {
      name: "Rudi Hartono, S.Pd",
      subject: "IPS",
      grade: "Kelas 4-6",
      education: "S1 Pendidikan IPS",
      experience: "13 Tahun",
      email: "rudi.hartono@sdm3smd.com",
      phone: "0812-3456-7897",
      image: "/male-teacher-social-studies.jpg",
      category: "ips",
    },
  ]

  const filters = [
    { id: "all", label: "Semua Guru" },
    { id: "matematika", label: "Matematika" },
    { id: "bahasa", label: "Bahasa" },
    { id: "ipa", label: "IPA" },
    { id: "ips", label: "IPS" },
    { id: "agama", label: "Agama" },
    { id: "pjok", label: "PJOK" },
    { id: "seni", label: "Seni" },
  ]

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesFilter = activeFilter === "all" || teacher.category === activeFilter
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Guru" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Tenaga Pengajar</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Guru Kami</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Tim pengajar profesional, berpengalaman, dan berdedikasi tinggi
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari nama guru..."
                  className="pl-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                Total: {filteredTeachers.length} Guru
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
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredTeachers.map((teacher, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10">
                  <img
                    src={teacher.image || "/placeholder.svg"}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-[#33b962] border-0">{teacher.subject}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{teacher.name}</h3>
                  <p className="text-[#33b962] text-sm font-medium mb-4">{teacher.grade}</p>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-[#33b962] flex-shrink-0 mt-0.5" />
                      <span>{teacher.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#33b962] flex-shrink-0" />
                      <span>{teacher.experience}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{teacher.email}</span>
                    </a>
                    <a
                      href={`tel:${teacher.phone}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{teacher.phone}</span>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada guru yang ditemukan</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
