import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Database, Users, FileText, Phone, Mail, MapPin, Baby, Globe } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Kebijakan Privasi"
        description="Kebijakan Privasi SD Muhammadiyah 3 Samarinda"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Kebijakan Privasi" }]}
      />

      <div className="container px-4 py-8 mx-auto sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <section className="">
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">SD Muhammadiyah 3 Samarinda</h2>
                  <p className="text-sm text-muted-foreground">Terakhir diperbarui: 1 Januari 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-semibold">1. PENGANTAR</h3>
              <p className="mb-4 text-muted-foreground">
                Kebijakan Privasi ini menjelaskan bagaimana SD Muhammadiyah 3 Samarinda ("Kami", "Sekolah", atau "SD Muhammadiyah 3")
                mengumpulkan, menggunakan, melindungi, dan mengelola informasi pribadi Anda melalui aplikasi dan layanan
                digital kami.
              </p>
              <p className="text-sm text-muted-foreground">
                Kebijakan ini disusun sesuai dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) 
                dan peraturan terkait lainnya yang berlaku di Indonesia.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Database className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">2. INFORMASI YANG KAMI KUMPULKAN</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Kami mengumpulkan informasi berikut untuk memberikan layanan pendidikan dan notifikasi pembayaran yang
                lebih baik:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 font-semibold">a. Informasi Pendaftaran</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                    <li>Nama orang tua/wali</li>
                    <li>Nomor telepon WhatsApp</li>
                    <li>Email</li>
                    <li>Alamat</li>
                    <li>Hubungan dengan siswa</li>
                    <li>Informasi siswa (nama, kelas, NIS)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">b. Informasi Akademik</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                    <li>Data tagihan pembayaran (SPP, DPP, biaya lainnya)</li>
                    <li>Jadwal pembayaran</li>
                    <li>Riwayat pembayaran</li>
                    <li>Data kehadiran siswa</li>
                    <li>Nilai dan prestasi akademik</li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">c. Data Penggunaan Aplikasi</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                    <li>Log aktivitas penggunaan aplikasi</li>
                    <li>IP address</li>
                    <li>Jenis perangkat yang digunakan</li>
                    <li>Waktu dan tanggal akses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">3. BAGAIMANA KAMI MENGGUNAKAN INFORMASI ANDA</h3>
              </div>
              <p className="mb-4 text-muted-foreground">Kami menggunakan informasi yang dikumpulkan untuk:</p>

              <ol className="space-y-3">
                <li className="text-sm">
                  <span className="font-semibold">1. Memberikan Layanan Notifikasi: </span>
                  <span className="text-muted-foreground">
                    Mengirimkan notifikasi pembayaran via WhatsApp kepada orang tua/wali
                  </span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">2. Komunikasi Akademik: </span>
                  <span className="text-muted-foreground">
                    Mengirimkan informasi tentang kegiatan sekolah, nilai, dan prestasi siswa
                  </span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">3. Pengelolaan Pembayaran: </span>
                  <span className="text-muted-foreground">Mengelola dan melacak pembayaran siswa</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">4. Peningkatan Layanan: </span>
                  <span className="text-muted-foreground">
                    Menganalisis penggunaan untuk meningkatkan kualitas layanan
                  </span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">5. Keamanan: </span>
                  <span className="text-muted-foreground">Mencegah fraud dan penyalahgunaan data</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">6. Compliance: </span>
                  <span className="text-muted-foreground">Memenuhi kewajiban hukum dan regulasi yang berlaku</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">4. KEAMANAN DATA</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Kami mengambil langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses,
                pengungkapan, perubahan, dan penghancuran yang tidak sah, termasuk:
              </p>

              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Enkripsi data (SSL/TLS) untuk transmisi data</li>
                <li>Access control dan authentication yang kuat</li>
                <li>Audit keamanan berkala</li>
                <li>Firewall dan sistem deteksi intrusi</li>
                <li>Backup data reguler</li>
                <li>Pembatasan akses data hanya untuk staff yang berwenang</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Database className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">5. PENYIMPANAN DATA</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Data pribadi Anda disimpan di server kami yang aman. Kami menyimpan data Anda dengan periode retensi sebagai berikut:
              </p>

              <ul className="mb-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li><strong>Data Siswa Aktif:</strong> Selama anak terdaftar sebagai siswa + 5 tahun setelah lulus</li>
                <li><strong>Data Keuangan:</strong> Minimal 10 tahun (sesuai regulasi perpajakan Indonesia)</li>
                <li><strong>Log Sistem:</strong> 6-12 bulan</li>
                <li><strong>Data Komunikasi:</strong> 2 tahun setelah kelulusan siswa</li>
              </ul>

              <p className="text-sm text-muted-foreground">
                Anda dapat meminta penghapusan data Anda kapan saja dengan menghubungi kami. Kami akan menghapus data Anda
                dalam waktu 30 hari kerja, kecuali ada kewajiban hukum untuk mempertahankannya.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-semibold">6. BERBAGI DATA DENGAN PIHAK KETIGA</h3>
              <p className="mb-4 text-muted-foreground">
                Kami tidak akan membagikan informasi pribadi Anda dengan pihak ketiga tanpa persetujuan Anda, kecuali:
              </p>

              <ul className="mb-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Diwajibkan oleh hukum atau keputusan pengadilan</li>
                <li>
                  Untuk penyedia layanan yang bekerja atas nama kami (contoh: WhatsApp Business API, payment gateway)
                </li>
                <li>Untuk melindungi hak, privasi, keamanan kami atau orang lain</li>
              </ul>

              <div className="p-4 mt-4 rounded-lg bg-muted">
                <h4 className="mb-2 text-sm font-semibold">CATATAN PENTING TENTANG WHATSAPP:</h4>
                <p className="text-sm text-muted-foreground">
                  Notifikasi pembayaran dan komunikasi sekolah dikirim melalui WhatsApp Business API. 
                  Dengan mendaftar, Anda setuju untuk menerima pesan dari sekolah melalui WhatsApp. 
                  Kebijakan privasi WhatsApp/Meta juga berlaku untuk komunikasi melalui platform tersebut. 
                  Anda dapat berhenti berlangganan notifikasi WhatsApp kapan saja dengan menghubungi kami.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">7. HAK ANDA</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Sesuai dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi, Anda memiliki hak untuk:
              </p>

              <ul className="space-y-3">
                <li className="text-sm">
                  <span className="font-semibold">• Akses: </span>
                  <span className="text-muted-foreground">Meminta akses ke data pribadi Anda yang kami simpan</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Koreksi: </span>
                  <span className="text-muted-foreground">Meminta perbaikan data yang tidak akurat atau tidak lengkap</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Penghapusan: </span>
                  <span className="text-muted-foreground">Meminta penghapusan data Anda (dengan batasan tertentu)</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Pembatasan: </span>
                  <span className="text-muted-foreground">Meminta pembatasan pemrosesan data Anda</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Portabilitas: </span>
                  <span className="text-muted-foreground">Menerima salinan data dalam format yang dapat dipindahkan</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Keberatan: </span>
                  <span className="text-muted-foreground">Mengajukan keberatan terhadap penggunaan data tertentu</span>
                </li>
                <li className="text-sm">
                  <span className="font-semibold">• Penarikan Persetujuan: </span>
                  <span className="text-muted-foreground">Menarik persetujuan penggunaan data kapan saja</span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-muted-foreground">
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui kontak yang tercantum di bagian 11. 
                Kami akan merespons permintaan Anda dalam waktu maksimal 14 hari kerja.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-semibold">8. COOKIE DAN TEKNOLOGI PELACAKAN</h3>
              <p className="mb-4 text-muted-foreground">
                Kami menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna, termasuk:
              </p>

              <ul className="mb-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Mengingat preferensi dan pengaturan Anda</li>
                <li>Memahami bagaimana Anda menggunakan website kami</li>
                <li>Meningkatkan kecepatan dan keamanan website</li>
                <li>Menganalisis traffic dan performa website</li>
              </ul>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold">Jenis Cookie yang Kami Gunakan:</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-semibold">• Cookie Esensial: </span>
                    <span className="text-muted-foreground">Diperlukan untuk fungsi dasar website (login, keamanan)</span>
                  </li>
                  <li>
                    <span className="font-semibold">• Cookie Analitik: </span>
                    <span className="text-muted-foreground">Membantu kami memahami penggunaan website (Google Analytics)</span>
                  </li>
                  <li>
                    <span className="font-semibold">• Cookie Fungsional: </span>
                    <span className="text-muted-foreground">Mengingat preferensi Anda (bahasa, tema)</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                Anda dapat mengontrol penggunaan cookies melalui pengaturan browser Anda. Namun, menonaktifkan cookies 
                mungkin mempengaruhi fungsionalitas website. Anda akan melihat banner persetujuan cookie saat pertama 
                kali mengunjungi website kami.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Baby className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">9. PERLINDUNGAN DATA ANAK</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Kami sangat serius dalam melindungi privasi dan keamanan data anak-anak. Semua data siswa 
                yang berusia di bawah 18 tahun:
              </p>

              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Dikumpulkan dan diproses dengan persetujuan orang tua/wali yang sah</li>
                <li>Digunakan secara eksklusif untuk keperluan pendidikan dan administrasi sekolah</li>
                <li>Tidak akan dibagikan kepada pihak ketiga tanpa izin tertulis dari orang tua/wali</li>
                <li>Dilindungi dengan standar keamanan tertinggi dan akses terbatas</li>
                <li>Tidak digunakan untuk tujuan pemasaran atau komersial</li>
              </ul>

              <p className="mt-4 text-sm text-muted-foreground">
                Orang tua/wali memiliki hak penuh untuk mengakses, memperbaiki, atau meminta penghapusan data anak mereka 
                kapan saja dengan menghubungi kami.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">10. PERUBAHAN KEBIJAKAN PRIVASI</h3>
              </div>
              <p className="text-muted-foreground">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan 
                dalam praktik kami atau persyaratan hukum. Kami akan memberitahukan kepada Anda tentang 
                perubahan signifikan melalui:
              </p>
              <ul className="mt-3 mb-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Email ke alamat yang terdaftar</li>
                <li>Notifikasi di aplikasi atau website kami</li>
                <li>Pengumuman di halaman utama website</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Penggunaan berkelanjutan terhadap layanan kami setelah perubahan dianggap sebagai penerimaan Anda 
                terhadap kebijakan yang diperbarui. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">12. HUBUNGI KAMI</h3>
              </div>
              <p className="mb-6 text-muted-foreground">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, ingin menggunakan hak-hak Anda, 
                atau memiliki keluhan terkait praktik privasi kami, silakan hubungi kami:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-3 font-semibold">SD Muhammadiyah 3 Samarinda</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Alamat</p>
                        <p className="text-sm text-muted-foreground">
                          Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan
                          Timur 75242
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Telepon</p>
                        <p className="text-sm text-muted-foreground">+62 541 7160075</p>
                        <p className="text-sm text-muted-foreground">WhatsApp: +62 812 3456 7890</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@sdmuhammadiyah3smd.com</p>
                        <p className="text-sm text-muted-foreground">privacy@sdmuhammadiyah3smd.com (Khusus pertanyaan privasi)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Website</p>
                        <p className="text-sm text-muted-foreground">https://sdmuhammadiyah3smd.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Waktu Respons:</strong> Kami berkomitmen untuk merespons semua pertanyaan atau 
                    permintaan terkait privasi dalam waktu maksimal 14 hari kerja.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 bg-muted/50">
              <h3 className="mb-4 text-xl font-semibold">13. PERSETUJUAN</h3>
              <p className="mb-4 text-muted-foreground">
                Dengan menggunakan aplikasi dan layanan kami, Anda menyatakan bahwa Anda telah membaca, memahami, dan
                setuju dengan semua ketentuan dalam Kebijakan Privasi ini.
              </p>
              <p className="text-sm text-muted-foreground">
                Jika Anda tidak setuju dengan kebijakan ini, harap jangan menggunakan layanan kami. 
                Untuk orang tua/wali yang mendaftarkan anak, Anda menyetujui pengumpulan dan pemrosesan 
                data anak sesuai dengan ketentuan yang tercantum dalam kebijakan ini.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}