import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#ffd166] rounded-full flex items-center justify-center">
                <span className="text-xl">🎈</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Sekolah Kreatif</h3>
                <p className="text-xs">SD Muhammadiyah 3</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sekolah Dasar Islam yang menghasilkan generasi kreatif, berakhlak mulia, dan berprestasi.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#33b962] transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Link Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#33b962] transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-[#33b962] transition">
                  Profil Sekolah
                </Link>
              </li>
              <li>
                <Link href="/spmb" className="hover:text-[#33b962] transition">
                  SPMB
                </Link>
              </li>
              <li>
                <Link href="/pembayaran" className="hover:text-[#33b962] transition">
                  Pembayaran
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#33b962] transition">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jadwal" className="hover:text-[#33b962] transition">
                  Jadwal Pelajaran
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-[#33b962] transition">
                  Kalender Akademik
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-[#33b962] transition">
                  Berita Terbaru
                </Link>
              </li>
              <li>
                <Link href="/prestasi-siswa" className="hover:text-[#33b962] transition">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/prestasi-sekolah" className="hover:text-[#33b962] transition">
                  Prestasi Sekolah
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#33b962]" />
                <span>Jl. Pendidikan No. 123, Samarinda, Kalimantan Timur</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#33b962]" />
                <a href="tel:+6254112345678" className="hover:text-[#33b962] transition">
                  (0541) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#33b962]" />
                <a href="mailto:info@sdmuhammadiyah3smd.com" className="hover:text-[#33b962] transition">
                  info@sdmuhammadiyah3smd.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-[#33b962]" />
                <div>
                  <p>Senin-Jumat: 07:00-15:00</p>
                  <p>Sabtu: 07:00-12:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 SD Muhammadiyah 3 Samarinda. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Hari Ini: 127</span>
            <span className="text-gray-700">|</span>
            <span>Bulan Ini: 3,542</span>
            <span className="text-gray-700">|</span>
            <span>Tahun Ini: 42,156</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
