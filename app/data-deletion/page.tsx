import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Database, Mail, MapPin, Phone, FileText, Shield } from "lucide-react"
import Link from "next/link"

export default function DataDeletionPage() {
  return (
    <>
      <PageHeader
        title="Penghapusan Data"
        description="Instruksi permintaan penghapusan data terkait Meta / Instagram"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Penghapusan Data" }]}
      />

      <div className="container px-4 py-8 mx-auto sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <section>
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold">SD Muhammadiyah 3 Samarinda</h2>
                  <p className="text-sm text-muted-foreground">Terakhir diperbarui: 30 Oktober 2026</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Halaman ini menjelaskan cara meminta penghapusan data yang terkait dengan integrasi Meta /
                Instagram yang digunakan sekolah. Untuk kebijakan privasi lengkap, lihat{" "}
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
                <Database className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">1. DATA TERKAIT META / INSTAGRAM YANG KAMI SIMPAN</h3>
              </div>
              <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                <li>Metadata koneksi akun Instagram profesional (id, username, statistik publik)</li>
                <li>Token akses Instagram yang dienkripsi untuk publish / messaging</li>
                <li>
                  Jika Instagram Chat aktif: catatan percakapan dan pesan yang diperlukan untuk balasan
                  dukungan sekolah
                </li>
                <li>
                  Kode konfirmasi penghapusan data yang dibuat melalui callback Meta (jika digunakan)
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">2. CARA MEMINTA PENGHAPUSAN</h3>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="font-semibold">Opsi A — Admin sekolah (disarankan)</h4>
                <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                  <li>Masuk ke dashboard → Pengaturan Sistem → Integrasi Instagram</li>
                  <li>Klik <strong>Disconnect</strong> untuk mencabut koneksi dan menghentikan pemakaian API</li>
                  <li>
                    Minta administrator sekolah menghapus riwayat chat Instagram yang tersimpan (jika ada)
                  </li>
                </ul>
              </div>

              <div className="mb-6 space-y-3">
                <h4 className="font-semibold">Opsi B — Permintaan email</h4>
                <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                  <li>
                    Kirim email ke <strong>privacy@sdmuhammadiyah3smd.com</strong> atau{" "}
                    <strong>info@sdmuhammadiyah3smd.com</strong>
                  </li>
                  <li>
                    Cantumkan: nama Anda, username Instagram (jika ada), dan frasa{" "}
                    <em>&quot;Permintaan penghapusan data Meta&quot;</em>
                  </li>
                  <li>
                    Kami akan mengonfirmasi dan memproses dalam waktu wajar (biasanya dalam 30 hari kerja),
                    kecuali ada kewajiban hukum untuk menahan data
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Opsi C — Callback dari Meta</h4>
                <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                  <li>
                    Jika Meta mengirim permintaan penghapusan bertanda tangan ke webhook kami, kami membuat
                    kode konfirmasi
                  </li>
                  <li>
                    Status dapat dicek di dashboard aplikasi pada jalur{" "}
                    <code className="text-xs">/facebook/deletion-status/&#123;code&#125;</code>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-3 mb-4">
                <Phone className="w-6 h-6 mt-1 text-primary" />
                <h3 className="text-xl font-semibold">3. KONTAK</h3>
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
                  <div className="text-sm text-muted-foreground">
                    <p>info@sdmuhammadiyah3smd.com</p>
                    <p>privacy@sdmuhammadiyah3smd.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <Link href="/terms-of-service" className="underline text-primary">
                      Syarat dan Ketentuan
                    </Link>
                    {" · "}
                    <Link href="/privacy-policy" className="underline text-primary">
                      Kebijakan Privasi
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  )
}
