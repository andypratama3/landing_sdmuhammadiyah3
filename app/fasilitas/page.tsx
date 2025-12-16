import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/breadcrumb"
import { Building, Users, CheckCircle, Ruler } from "lucide-react"

export default function FasilitasPage() {
  const facilities = [
    {
      name: "Ruang Kelas Modern",
      capacity: "30 Siswa",
      size: "8 x 10 meter",
      condition: "Sangat Baik",
      description:
        "Ruang kelas ber-AC dengan furniture ergonomis, proyektor, dan papan tulis interaktif. Dilengkapi dengan ventilasi yang baik dan pencahayaan optimal untuk kenyamanan belajar.",
      images: ["/facility-modern-classroom-1.jpg", "/facility-modern-classroom-2.jpg"],
      features: ["AC", "Proyektor", "Papan Interaktif", "WiFi", "CCTV"],
    },
    {
      name: "Perpustakaan Digital",
      capacity: "50 Pengunjung",
      size: "12 x 15 meter",
      condition: "Sangat Baik",
      description:
        "Perpustakaan modern dengan koleksi buku lengkap dan sistem digital. Dilengkapi dengan ruang baca yang nyaman, komputer untuk pencarian buku, dan area diskusi kelompok.",
      images: ["/facility-library-1.jpg", "/facility-library-2.jpg"],
      features: ["10.000+ Buku", "Komputer", "Area Baca", "AC", "WiFi"],
    },
    {
      name: "Laboratorium Komputer",
      capacity: "35 Siswa",
      size: "10 x 12 meter",
      condition: "Sangat Baik",
      description:
        "Lab komputer dengan 35 unit PC modern, software pembelajaran lengkap, dan internet cepat. Digunakan untuk pembelajaran IT dan coding.",
      images: ["/facility-computer-lab-1.jpg", "/facility-computer-lab-2.jpg"],
      features: ["35 Komputer", "Software Lengkap", "Internet Fiber", "AC", "Printer"],
    },
    {
      name: "Masjid",
      capacity: "200 Jamaah",
      size: "15 x 20 meter",
      condition: "Sangat Baik",
      description:
        "Masjid sekolah yang bersih dan nyaman untuk ibadah dan kegiatan keagamaan. Dilengkapi dengan sound system, sajadah, dan mukena.",
      images: ["/facility-mosque-1.jpg", "/facility-mosque-2.jpg"],
      features: ["Sound System", "AC", "Sajadah", "Mukena", "Tempat Wudhu"],
    },
    {
      name: "Lapangan Olahraga",
      capacity: "100+ Siswa",
      size: "40 x 60 meter",
      condition: "Baik",
      description:
        "Lapangan multifungsi untuk berbagai olahraga seperti futsal, basket, dan voli. Permukaan lapangan yang aman dan dilengkapi dengan tribun penonton.",
      images: ["/facility-sports-field-1.jpg", "/facility-sports-field-2.jpg"],
      features: ["Multifungsi", "Tribun", "Lampu Penerangan", "Gawang", "Ring Basket"],
    },
    {
      name: "Kantin Sehat",
      capacity: "80 Siswa",
      size: "8 x 12 meter",
      condition: "Sangat Baik",
      description:
        "Kantin sekolah dengan menu makanan sehat dan bergizi. Dikelola dengan standar kebersihan tinggi dan menyediakan makanan halal.",
      images: ["/facility-canteen-1.jpg", "/facility-canteen-2.jpg"],
      features: ["Menu Sehat", "Bersih", "Halal", "Harga Terjangkau", "Area Duduk"],
    },
    {
      name: "UKS (Unit Kesehatan Sekolah)",
      capacity: "10 Tempat Tidur",
      size: "6 x 8 meter",
      condition: "Sangat Baik",
      description:
        "UKS lengkap dengan dokter dan perawat terlatih. Dilengkapi dengan obat-obatan, alat medis, dan tempat istirahat yang nyaman.",
      images: ["/facility-health-unit-1.jpg", "/facility-health-unit-2.jpg"],
      features: ["Dokter", "Obat Lengkap", "Tempat Tidur", "Alat Medis", "AC"],
    },
    {
      name: "Area Bermain",
      capacity: "50+ Siswa",
      size: "15 x 20 meter",
      condition: "Baik",
      description:
        "Playground dengan berbagai permainan edukatif yang aman. Dilengkapi dengan permukaan soft matting untuk keamanan anak.",
      images: ["/facility-playground-1.jpg", "/facility-playground-2.jpg"],
      features: ["Permainan Aman", "Soft Matting", "Perosotan", "Ayunan", "Monkey Bar"],
    },
  ]

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Sarana & Prasarana" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Fasilitas</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sarana & Prasarana</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Fasilitas lengkap dan modern untuk mendukung pembelajaran yang optimal
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <img src="/school-building-aerial-view.jpg" alt="School Building" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* Facilities List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="relative h-80 rounded-2xl overflow-hidden">
                      <img
                        src={facility.images[0] || "/placeholder.svg"}
                        alt={facility.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {facility.images[1] && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative h-40 rounded-2xl overflow-hidden">
                          <img
                            src={facility.images[1] || "/placeholder.svg"}
                            alt={facility.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-[#33b962]/10 to-[#ffd166]/10 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">360° View</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{facility.name}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#33b962]" />
                        <div>
                          <p className="text-xs text-gray-500">Kapasitas</p>
                          <p className="font-semibold text-gray-900">{facility.capacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-[#33b962]" />
                        <div>
                          <p className="text-xs text-gray-500">Ukuran</p>
                          <p className="font-semibold text-gray-900">{facility.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-[#33b962]" />
                        <div>
                          <p className="text-xs text-gray-500">Kondisi</p>
                          <Badge className="bg-green-100 text-green-700 border-0">{facility.condition}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{facility.description}</p>
                    <div>
                      <p className="font-semibold text-gray-900 mb-3">Fitur & Kelengkapan:</p>
                      <div className="flex flex-wrap gap-2">
                        {facility.features.map((feature, idx) => (
                          <Badge key={idx} className="bg-[#33b962]/10 text-[#33b962] border-[#33b962]/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
