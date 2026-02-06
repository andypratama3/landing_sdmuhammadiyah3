"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { Building, Users, CheckCircle, Ruler, ChevronRight } from "lucide-react"
import PanoViewerComponent from "@/components/View360Image"
import { useApi } from "@/hooks/useApi"
import { Fasilitas, KelengkapanFasilitas } from "@/types"
import Image from "next/image"
import Link from "next/link"

export default function FasilitasPage() {
  const { data: facilities, loading, error } = useApi<Fasilitas[]>('/fasilitas')

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
          <div className="container px-4 mx-auto">
            <Breadcrumb items={[{ label: "Sarana & Prasarana" }]} />
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <h1 className="mb-6 text-3xl sm:text-5xl md:text-6xl font-black text-balance leading-tight">Sarana & Prasarana</h1>
              <p className="text-xl leading-relaxed text-white/90 text-balance">Loading...</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error || !facilities) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
          <div className="container px-4 mx-auto">
            <Breadcrumb items={[{ label: "Sarana & Prasarana" }]} />
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <h1 className="mb-6 text-3xl sm:text-5xl md:text-6xl font-black text-balance leading-tight">Sarana & Prasarana</h1>
              <p className="text-xl leading-relaxed text-white/90 text-balance">Data tidak tersedia</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto mt-8">
          <div className="max-w-4xl mx-auto text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
              Sarana & Prasarana
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
              Fasilitas Terbaik
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Dukungan fasilitas lengkap dan modern untuk menunjang kreativitas serta potensi terbaik setiap siswa.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight mb-6 uppercase tracking-tight">Gedung Harapan</h2>
            <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 leading-relaxed">Pusat Pembelajaran Kreatif & Inovatif SD Muhammadiyah 3 Samarinda yang dirancang untuk menginspirasi setiap bakat siswa.</p>
          </div>
          <div className="max-w-6xl mx-auto overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] rounded-[4rem] card-premium glass border-0 relative aspect-21/9 group">
            <Image
              src="/GedungSekolah.jpeg"
              alt="Gedung Sekolah"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {facilities && facilities.length > 0 ? (
              facilities.map((facility) => (
                <Card
                  key={facility.id}
                  className="overflow-hidden transition-all duration-500 border-0 shadow-xl rounded-[2.5rem] hover:shadow-2xl dark:bg-gray-900/40 glass group"
                >
                  <div className="grid gap-12 p-10 md:grid-cols-2 items-center">
                    {/* Images */}
                    <div className="space-y-6">
                      {facility.foto ? (
                        <div className="relative overflow-hidden h-72 sm:h-80 lg:h-96 rounded-[3rem] shadow-2xl group/img">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/fasilitas/${facility.foto}`}
                            alt={facility.nama_fasilitas}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover/img:scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                        </div>
                      ) : (
                        <div className="relative flex items-center justify-center overflow-hidden bg-emerald-50 dark:bg-emerald-950/20 h-72 sm:h-80 lg:h-96 rounded-[2rem]">
                          <Building className="w-20 h-20 text-emerald-200 dark:text-emerald-900" />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="relative flex flex-col items-center justify-center h-48 overflow-hidden bg-linear-to-br from-[#33b962]/5 to-transparent rounded-[1.5rem] border border-emerald-500/10">
                          <Users className="w-8 h-8 text-[#33b962] mb-2 opacity-50" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Ruang Inovasi</span>
                        </div>
                        <div className="relative h-48 rounded-[1.5rem] overflow-hidden bg-linear-to-br from-[#ffd166]/10 to-transparent flex flex-col items-center justify-center border border-orange-500/10">
                          <CheckCircle className="w-8 h-8 text-orange-400 mb-2 opacity-50" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">360° View Ready</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <h2 className="mb-6 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight group-hover:text-[#33b962] transition-colors">{facility.nama_fasilitas}</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        {facility.kapasitas && (
                          <div className="flex items-center gap-4 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-500/10">
                            <div className="w-12 h-12 bg-[#33b962] rounded-xl flex items-center justify-center shadow-lg brightness-110">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Kapasitas</p>
                              <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">~{facility.kapasitas} SISWA</p>
                            </div>
                          </div>
                        )}
                        {facility.ukuran && (
                          <div className="flex items-center gap-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-500/10">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg brightness-110">
                              <Ruler className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Dimensi</p>
                              <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">{facility.ukuran} METER</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mb-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Tentang Fasilitas</p>
                        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium">{facility.desc || "Fasilitas modern yang dirancang khusus untuk mendukung perkembangan kreativitas dan bakat siswa secara maksimal."}</p>
                      </div>

                      {/* Equipment/Features */}
                      {facility.kelengkapan && facility.kelengkapan.length > 0 && (
                        <div>
                          <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Kelengkapan Premium</p>
                          <div className="flex flex-wrap gap-3">
                            {facility.kelengkapan.map((item) => (
                              <Badge key={item.id} className="bg-[#33b962]/10 text-[#33b962] border-emerald-500/10 dark:bg-emerald-900/30 font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-lg shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 mr-2 brightness-125" />
                                {item.nama}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600">Tidak ada fasilitas yang tersedia</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}