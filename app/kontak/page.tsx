import type { Metadata } from "next"
import KontakClient from "./kontak-client"

export const metadata: Metadata = {
  title: "Kontak - SD Muhammadiyah 3 Samarinda",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang SD Muhammadiyah 3 Samarinda. Telepon, email, WhatsApp, dan lokasi sekolah.",
}

export default function KontakPage() {
  return <KontakClient />
}
