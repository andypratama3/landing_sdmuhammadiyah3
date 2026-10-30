import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Shield, Users, AlertTriangle, Phone, Mail, MapPin, Link2 } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        title="Syarat dan Ketentuan"
        description="Syarat dan Ketentuan Layanan SD Muhammadiyah 3 Samarinda"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Syarat dan Ketentuan" }]}
      />

      <div className="container px-4 py-8 mx-auto sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <section>
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">SD Muhammadiyah 3 Samarinda</h2>
                  <p className="text-sm text-muted-foreground">Terakhir diperbarui: 30 Oktober 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-semibold">1. PENDAHULUAN</h3>
              <p className="mb-4 text-muted-foreground">
                Syarat dan Ketentuan ini mengatur penggunaan website, aplikasi dashboard operasional sekolah
                (ProductSchool / Sakolentra), serta integrasi Meta / Instagram yang dioperasikan untuk
                SD Muhammadiyah 3 Samarinda (&quot;Kami&quot;, &quot;Sekolah&quot;).
              </p>
              <p className="text-sm text-muted-foreground">
                Dengan mengakses website atau masuk ke dashboard, Anda menyatakan telah membaca dan menyetujui
                ketentuan ini bersama{" "}
                <Link href="/privacy-policy" className="underline text-primary">
                  Kebijakan Privasi
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">2. TUJUAN LAYANAN</h3>
              </div>
              <p className="mb-4 text-muted-foreground">
                Layanan kami membantu staf yang berwenang mengelola operasional sekolah, termasuk publikasi
                konten resmi ke akun Instagram profesional sekolah, serta (jika diaktifkan) membalas pesan
                Instagram Direct Message dari masyarakat.
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Website publik untuk informasi sekolah dan layanan orang tua</li>
                <li>Dashboard internal untuk administrasi akademik, keuangan, dan komunikasi</li>
                <li>Integrasi Meta / Instagram hanya untuk akun profesional yang dimiliki atau dikelola sekolah</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">3. AKUN DAN AKSES</h3>
              </div>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Akses dashboard terbatas pada pengguna dengan peran yang diberikan sekolah</li>
                <li>Kredensial wajib dijaga kerahasiaannya dan hanya memakai akun resmi sekolah</li>
                <li>
                  Menghubungkan Instagram membutuhkan Instagram Login untuk akun profesional sekolah
                </li>
                <li>Kami dapat menangguhkan akses jika terjadi penyalahgunaan atau pelanggaran kebijakan</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Link2 className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">4. DATA META / INSTAGRAM</h3>
              </div>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>
                  Kami hanya meminta izin Instagram Business yang diperlukan untuk fitur connect, publish,
                  insights, dan messaging yang diaktifkan
                </li>
                <li>Token akses disimpan terenkripsi di server dan tidak ditampilkan di antarmuka</li>
                <li>
                  Konten yang dipublikasikan ke Instagram adalah konten yang secara eksplisit dipilih admin
                  (berita / galeri)
                </li>
                <li>Kami tidak menjual data pengguna Meta</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">5. PENGGUNAAN YANG DITERIMA</h3>
              </div>
              <p className="mb-4 text-muted-foreground">Dilarang menggunakan layanan untuk:</p>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Mengganggu, melecehkan, atau merugikan pihak lain</li>
                <li>Mempublikasikan konten yang melanggar hukum</li>
                <li>Mengambil (scrape) data Meta di luar penggunaan yang diizinkan</li>
                <li>Menghindari Platform Terms atau Developer Policies Meta</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <h3 className="mb-4 text-xl font-semibold">6. PRIVASI DAN PENGHAPUSAN DATA</h3>
              <p className="mb-4 text-muted-foreground">
                Pengelolaan data pribadi dijelaskan di{" "}
                <Link href="/privacy-policy" className="underline text-primary">
                  Kebijakan Privasi
                </Link>
                . Instruksi permintaan penghapusan data terkait Meta tersedia di{" "}
                <Link href="/data-deletion" className="underline text-primary">
                  Penghapusan Data
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">7. HUBUNGI KAMI</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda,
                    Kalimantan Timur 75242
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">+62 541 7160075</p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">info@sdmuhammadiyah3smd.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
