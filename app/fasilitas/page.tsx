"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { Building, Users, CheckCircle, Ruler } from "lucide-react"
import PanoViewerComponent from "@/components/View360Image"
import { useApi } from "@/hooks/useApi"
import { Fasilitas, KelengkapanFasilitas } from "@/types"

export default function FasilitasPage() {
  const { data: facilities, loading, error } = useApi<Fasilitas[]>('/fasilitas')

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
          <div className="container px-4 mx-auto">
            <Breadcrumb items={[{ label: "Sarana & Prasarana" }]} />
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Sarana & Prasarana</h1>
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
              <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Sarana & Prasarana</h1>
              <p className="text-xl leading-relaxed text-white/90 text-balance">Data tidak tersedia</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Sarana & Prasarana" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Fasilitas</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Sarana & Prasarana</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Fasilitas lengkap dan modern untuk mendukung pembelajaran yang optimal
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 ">Gedung Sekolah</h2>
          <p className="mb-2 text-center text-gray-500">Sekolah Kreatif SD Muhammadiyah 3 Samarinda</p>
          <div className="max-w-6xl mx-auto overflow-hidden shadow-2xl rounded-3xl">
            <img src="/GedungSekolah.jpeg" alt="Gedung Sekolah" className="object-cover w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {facilities && facilities.length > 0 ? (
              facilities.map((facility) => (
                <Card
                  key={facility.id}
                  className="overflow-hidden transition-all border-0 shadow-lg rounded-3xl hover:shadow-2xl"
                >
                  <div className="grid gap-6 p-8 md:grid-cols-2">
                    {/* Images */}
                    <div className="space-y-4">
                      {facility.foto ? (
                        <div className="relative overflow-hidden h-80 rounded-2xl">
                          <img
                            src={`http://127.0.0.1:8000/storage/img/fasilitas/${facility.foto}`}
                            alt={facility.nama_fasilitas}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 h-80 rounded-2xl">
                          <span className="text-gray-400">No Image Available</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative flex items-center justify-center h-40 overflow-hidden bg-gray-200 rounded-2xl">
                          <span className="px-2 text-xs text-center text-gray-400">Placeholder</span>
                        </div>
                        <div className="relative h-40 rounded-2xl overflow-hidden bg-linear-to-br from-[#33b962]/10 to-[#ffd166]/10 flex items-center justify-center">
                          <span className="text-sm text-gray-400">360° View</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <h2 className="mb-4 text-3xl font-bold text-gray-900">{facility.nama_fasilitas}</h2>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {facility.kapasitas && (
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-[#33b962]" />
                            <div>
                              <p className="text-xs text-gray-500">Kapasitas</p>
                              <p className="font-semibold text-gray-900">{facility.kapasitas} Orang</p>
                            </div>
                          </div>
                        )}
                        {facility.ukuran && (
                          <div className="flex items-center gap-2">
                            <Ruler className="w-5 h-5 text-[#33b962]" />
                            <div>
                              <p className="text-xs text-gray-500">Ukuran</p>
                              <p className="font-semibold text-gray-900">{facility.ukuran} meter</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5 text-[#33b962]" />
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <Badge className="text-green-700 bg-green-100 border-0">Aktif</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="mb-6 leading-relaxed text-gray-600">{facility.desc || "Deskripsi tidak tersedia"}</p>
                      
                      {/* Equipment/Features */}
                      {facility.kelengkapan && facility.kelengkapan.length > 0 && (
                        <div>
                          <p className="mb-3 font-semibold text-gray-900">Fitur & Kelengkapan:</p>
                          <div className="flex flex-wrap gap-2">
                            {facility.kelengkapan.map((item) => (
                              <Badge key={item.id} className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
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