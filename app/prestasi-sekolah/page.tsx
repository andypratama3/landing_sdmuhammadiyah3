"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Award, Star, Shield, Calendar, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function PrestasiSekolahPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const achievements = [
    {
      title: "Akreditasi UNGGUL",
      category: "accreditation",
      organization: "BAN-S/M Kemendikbud",
      date: "Januari 2023",
      description:
        "Meraih akreditasi tertinggi UNGGUL (A) dari Badan Akreditasi Nasional Sekolah/Madrasah sebagai pengakuan atas kualitas pendidikan yang excellent.",
      image: "/school-award-accreditation.jpg",
      icon: Award,
    },
    {
      title: "Sekolah Penggerak",
      category: "awards",
      organization: "Kemendikbud Ristek",
      date: "Juli 2022",
      description:
        "Terpilih sebagai Sekolah Penggerak dalam program transformasi pendidikan Indonesia yang diprakarsai oleh Kemendikbud.",
      image: "/school-award-penggerak.jpg",
      icon: Star,
    },
    {
      title: "Sekolah Ramah Anak",
      category: "certifications",
      organization: "Kementerian PPPA",
      date: "Agustus 2021",
      description:
        "Memperoleh sertifikasi Sekolah Ramah Anak dari Kementerian Pemberdayaan Perempuan dan Perlindungan Anak sebagai lingkungan yang aman dan nyaman bagi anak.",
      image: "/school-award-ramah-anak.jpg",
      icon: Shield,
    },
    {
      title: "Adiwiyata Tingkat Provinsi",
      category: "awards",
      organization: "Kementerian Lingkungan Hidup",
      date: "November 2022",
      description:
        "Meraih penghargaan Adiwiyata Tingkat Provinsi atas komitmen dalam pendidikan lingkungan hidup dan pengelolaan sekolah berwawasan lingkungan.",
      image: "/school-award-adiwiyata.jpg",
      icon: Star,
    },
    {
      title: "Sekolah Sehat",
      category: "certifications",
      organization: "Dinas Kesehatan Kota Samarinda",
      date: "Maret 2023",
      description:
        "Mendapat sertifikasi Sekolah Sehat berkat implementasi protokol kesehatan yang baik dan lingkungan yang bersih.",
      image: "/school-award-sehat.jpg",
      icon: CheckCircle,
    },
    {
      title: "Sekolah Literasi Terbaik",
      category: "recognition",
      organization: "Dinas Pendidikan Provinsi Kaltim",
      date: "September 2023",
      description:
        "Mendapat pengakuan sebagai Sekolah Literasi Terbaik tingkat provinsi atas program gerakan literasi sekolah yang konsisten dan inovatif.",
      image: "/school-award-literasi.jpg",
      icon: Award,
    },
  ]

  const categories = [
    { id: "all", label: "Semua" },
    { id: "accreditation", label: "Akreditasi" },
    { id: "awards", label: "Penghargaan" },
    { id: "certifications", label: "Sertifikasi" },
    { id: "recognition", label: "Pengakuan" },
  ]

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "all" || achievement.category === selectedCategory,
  )

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Prestasi Sekolah" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Achievements</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Prestasi Sekolah</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Pengakuan dan penghargaan atas dedikasi dalam memberikan pendidikan berkualitas
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
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
            <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 px-4 py-2">
              Total: {filteredAchievements.length} Prestasi
            </Badge>
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {filteredAchievements.map((achievement, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2 relative h-80 md:h-auto">
                    <img
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#33b962]/80 to-transparent flex items-end p-6">
                      <achievement.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="md:col-span-3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20 capitalize">
                        {achievement.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">{achievement.title}</h2>
                    <p className="text-[#33b962] font-semibold mb-4">{achievement.organization}</p>
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-20">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada prestasi yang ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Badges Display */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lencana & Sertifikat</h2>
            <p className="text-gray-600 text-lg mb-12">Pengakuan resmi atas kualitas pendidikan kami</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#33b962] to-[#2a9d52] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Akreditasi UNGGUL</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ffd166] to-[#ffca3a] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Star className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Sekolah Penggerak</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#06d6a0] to-[#05b88c] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Sekolah Ramah Anak</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#ff6b35] to-[#f05423] rounded-full flex items-center justify-center mb-4 shadow-xl">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>
                <p className="font-bold text-gray-900">Adiwiyata</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
