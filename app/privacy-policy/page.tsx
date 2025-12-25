import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Database, Users, FileText, Phone, Mail, MapPin } from "lucide-react"

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
                    <p className="text-sm text-muted-foreground">Terakhir diperbarui: November 2025</p>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-semibold">1. PENGANTAR</h3>
                <p className="text-muted-foreground">
                Kebijakan Privasi ini menjelaskan bagaimana SD Muhammadiyah 3 Samarinda ("Kami" atau "Sekolah")
                mengumpulkan, menggunakan, melindungi, dan mengelola informasi pribadi Anda melalui aplikasi dan layanan
                digital kami.
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
                Data pribadi Anda disimpan di server kami yang tersebar secara geografis. Kami menyimpan data Anda selama:
                </p>

                <ul className="mb-4 space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Selama anak Anda terdaftar sebagai siswa di sekolah kami</li>
                <li>Sesuai dengan periode retensi yang ditetapkan oleh kebijakan internal kami</li>
                <li>Sesuai dengan persyaratan hukum dan regulasi yang berlaku di Indonesia</li>
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

                <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Diwajibkan oleh hukum atau keputusan pengadilan</li>
                <li>
                    Untuk melayani penyedia layanan yang bekerja atas nama kami (contoh: penyedia WhatsApp, payment gateway)
                </li>
                <li>Untuk melindungi hak, privasi, keamanan kami atau orang lain</li>
                </ul>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardContent className="p-8">
                <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">7. HAK ANDA</h3>
                </div>
                <p className="mb-4 text-muted-foreground">Anda memiliki hak untuk:</p>

                <ul className="space-y-3">
                <li className="text-sm">
                    <span className="font-semibold">• Akses: </span>
                    <span className="text-muted-foreground">Meminta akses ke data pribadi Anda</span>
                </li>
                <li className="text-sm">
                    <span className="font-semibold">• Koreksi: </span>
                    <span className="text-muted-foreground">Meminta perbaikan data yang tidak akurat</span>
                </li>
                <li className="text-sm">
                    <span className="font-semibold">• Penghapusan: </span>
                    <span className="text-muted-foreground">Meminta penghapusan data Anda</span>
                </li>
                <li className="text-sm">
                    <span className="font-semibold">• Pembatasan: </span>
                    <span className="text-muted-foreground">Meminta pembatasan penggunaan data Anda</span>
                </li>
                <li className="text-sm">
                    <span className="font-semibold">• Portabilitas: </span>
                    <span className="text-muted-foreground">Menerima data dalam format yang dapat dipindahkan</span>
                </li>
                <li className="text-sm">
                    <span className="font-semibold">• Keberatan: </span>
                    <span className="text-muted-foreground">Keberatan terhadap penggunaan data tertentu</span>
                </li>
                </ul>

                <p className="mt-4 text-sm text-muted-foreground">
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui email atau telepon yang tercantum di bawah.
                </p>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardContent className="p-8">
                <h3 className="mb-4 text-xl font-semibold">8. COOKIE DAN TEKNOLOGI PELACAKAN</h3>
                <p className="text-muted-foreground">
                Kami menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna. Anda dapat
                mengontrol penggunaan cookies melalui pengaturan browser Anda.
                </p>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardContent className="p-8">
                <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">9. PERUBAHAN KEBIJAKAN PRIVASI</h3>
                </div>
                <p className="text-muted-foreground">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahukan kepada Anda
                tentang perubahan signifikan melalui email atau notifikasi di aplikasi kami. Penggunaan berkelanjutan
                terhadap layanan kami setelah perubahan dianggap sebagai penerimaan Anda terhadap kebijakan yang
                diperbarui.
                </p>
            </CardContent>
            </Card>

            <Card className="mb-6">
            <CardContent className="p-8">
                <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">10. HUBUNGI KAMI</h3>
                </div>
                <p className="mb-6 text-muted-foreground">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi
                kami:
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
                        <p className="text-sm text-muted-foreground">+62 221 7160075</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@sdmuhammadiyah3smd.com</p>
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
                </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-8 bg-muted/50">
                <h3 className="mb-4 text-xl font-semibold">11. PERSETUJUAN</h3>
                <p className="text-muted-foreground">
                Dengan menggunakan aplikasi dan layanan kami, Anda menyatakan bahwa Anda telah membaca, memahami, dan
                setuju dengan semua ketentuan dalam Kebijakan Privasi ini.
                </p>
            </CardContent>
            </Card>
        </section>
      </div>
    </>
  )
}
