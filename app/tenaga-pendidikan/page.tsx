"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Mail, Phone, Briefcase, Search, Users } from "lucide-react"
import { useState } from "react"

export default function TenagaPendidikanPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const staff = [
    {
      name: "Nurul Hidayah, S.Kom",
      position: "Kepala Tata Usaha",
      education: "S1 Sistem Informasi",
      experience: "10 Tahun",
      email: "nurul.hidayah@sdm3smd.com",
      phone: "0812-3456-8001",
      image: "/female-staff-administration.jpg",
      category: "administrasi",
    },
    {
      name: "Doni Prasetyo, A.Md",
      position: "Staf Administrasi",
      education: "D3 Administrasi",
      experience: "6 Tahun",
      email: "doni.prasetyo@sdm3smd.com",
      phone: "0812-3456-8002",
      image: "/male-staff-administration.jpg",
      category: "administrasi",
    },
    {
      name: "Fitri Rahmawati, S.IP",
      position: "Pustakawan",
      education: "S1 Ilmu Perpustakaan",
      experience: "7 Tahun",
      email: "fitri.rahmawati@sdm3smd.com",
      phone: "0812-3456-8003",
      image: "/female-librarian.jpg",
      category: "perpustakaan",
    },
    {
      name: "Eko Purnomo, S.Kom",
      position: "Teknisi IT",
      education: "S1 Teknik Informatika",
      experience: "5 Tahun",
      email: "eko.purnomo@sdm3smd.com",
      phone: "0812-3456-8004",
      image: "/male-it-technician.jpg",
      category: "it",
    },
    {
      name: "dr. Siska Melinda",
      position: "Dokter UKS",
      education: "S1 Kedokteran",
      experience: "8 Tahun",
      email: "siska.melinda@sdm3smd.com",
      phone: "0812-3456-8005",
      image: "/female-school-doctor.jpg",
      category: "kesehatan",
    },
    {
      name: "Agus Supriyanto",
      position: "Koordinator Keamanan",
      education: "SMA",
      experience: "12 Tahun",
      email: "agus.supriyanto@sdm3smd.com",
      phone: "0812-3456-8006",
      image: "/male-security-staff.jpg",
      category: "keamanan",
    },
  ]

  const filters = [
    { id: "all", label: "Semua" },
    { id: "administrasi", label: "Administrasi" },
    { id: "perpustakaan", label: "Perpustakaan" },
    { id: "it", label: "IT" },
    { id: "kesehatan", label: "Kesehatan" },
    { id: "keamanan", label: "Keamanan" },
  ]

  const filteredStaff = staff.filter((person) => {
    const matchesFilter = activeFilter === "all" || person.category === activeFilter
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Tenaga Pendidikan" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Tim Pendukung</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Tenaga Pendidikan</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Tim profesional yang mendukung operasional sekolah
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
                  placeholder="Cari nama staf..."
                  className="pl-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
                Total: {filteredStaff.length} Staf
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

      {/* Staff Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredStaff.map((person, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 duration-300 group"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10">
                  <img
                    src={person.image || "/placeholder.svg"}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-[#33b962] border-0 capitalize">{person.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-[#33b962] text-sm font-medium mb-4">{person.position}</p>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-[#33b962] flex-shrink-0 mt-0.5" />
                      <span>{person.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#33b962] flex-shrink-0" />
                      <span>{person.experience}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{person.email}</span>
                    </a>
                    <a
                      href={`tel:${person.phone}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#33b962] transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{person.phone}</span>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada staf yang ditemukan</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
