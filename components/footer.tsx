import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { TikTok } from "@/components/icons/tiktok-icon"
import Image from 'next/image'
import { VisitorStatsClient } from "./visitor-stats-client";
import { SCHOOL } from "@/lib/school-info"

export default function Footer() {
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil SD Muhammadiyah 3" },
    { href: "/spmb", label: "Pendaftaran SPMB" },
    { href: "/pembayaran", label: "Sistem Pembayaran SPP" },
    { href: "/kontak", label: "Kontak & Lokasi" }
  ];

  const infoLinks = [
    { href: "/jadwal", label: "Jadwal Pelajaran" },
    { href: "/guru", label: "Guru & Tenaga Pendidik" },
    { href: "/berita", label: "Berita & Pengumuman" },
    { href: "/prestasi-siswa", label: "Prestasi Siswa" },
    { href: "/prestasi-sekolah", label: "Prestasi Sekolah" }
  ];

  const socialLinks = [
    { icon: Facebook, href: SCHOOL.social.facebook, label: "Facebook" },
    { icon: Instagram, href: SCHOOL.social.instagram, label: "Instagram" },
    { icon: Youtube, href: SCHOOL.social.youtube, label: "YouTube" },
    { icon: TikTok, href: SCHOOL.social.tiktok, label: "TikTok" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: SCHOOL.address.full
    },
    {
      icon: Phone,
      label: "Telepon",
      value: SCHOOL.phone,
      href: `tel:${SCHOOL.phoneTel}`
    },
    {
      icon: Mail,
      label: "Email",
      value: SCHOOL.email,
      href: `mailto:${SCHOOL.email}`
    }
  ];

  return (
    <footer className="relative mt-20 pt-24 pb-12 overflow-hidden transition-colors duration-300 dark:bg-gray-950 dark:text-gray-400 bg-white text-gray-600">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#33b962] to-transparent opacity-30" />
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* About Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-12 h-12">
                  <Image src="/SD3_logo1.png" fill alt="Logo Sekolah" className="object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tighter leading-none uppercase transition-colors dark:text-white text-gray-900 font-outfit">
                    Sekolah Kreatif
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#33b962] font-quicksand">
                    SD Muhammadiyah 3
                  </p>
                </div>
              </Link>
              <p className="text-base leading-relaxed font-medium dark:text-gray-400 text-gray-600 font-quicksand">
                Membentuk generasi kreatif, berakhlak mulia, dan berprestasi melalui pendidikan inovatif berbasis karakter Islami.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-lg hover:-translate-y-1 dark:bg-white/5 dark:border-white/10 dark:hover:bg-[#33b962] dark:hover:text-white bg-gray-100 border-gray-200 hover:bg-[#33b962] hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm dark:text-white text-gray-900 font-outfit">
              Navigasi Cepat
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-xs dark:hover:text-white hover:text-gray-900 font-quicksand">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33b962] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm dark:text-white text-gray-900 font-outfit">
              Informasi & Berita
            </h4>
            <ul className="space-y-4">
              {infoLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-xs dark:hover:text-white hover:text-gray-900 font-quicksand">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd166] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-8 font-black uppercase tracking-widest text-sm dark:text-white text-gray-900 font-outfit">
              Hubungi Kami
            </h4>
            <ul className="space-y-6">
              {contactInfo.map((contact, i) => {
                const Icon = contact.icon;
                const content = (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:group-hover:bg-[#33b962]/20 bg-gray-100 border-gray-200 group-hover:bg-[#33b962]/20">
                      <Icon className="w-5 h-5 text-[#33b962]" />
                    </div>
                    <div className="flex-1 font-quicksand">
                      <p className="text-[10px] font-bold uppercase text-[#33b962] mb-1">{contact.label}</p>
                      <p className={`text-sm font-medium leading-relaxed dark:group-hover:text-white group-hover:text-gray-900`}>
                        {contact.value}
                      </p>
                    </div>
                  </li>
                );

                return contact.href ? (
                  <a key={i} href={contact.href} className="block">
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </ul>
          </div>
        </div>

        {/* Visitor Stats Section (Client Component) */}
        <VisitorStatsClient />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 pt-12 mt-12 text-xs font-bold uppercase tracking-[0.2em] border-t dark:border-white/5 border-gray-200 md:flex-row font-quicksand">
          <p className="text-center md:text-left font-bold dark:text-gray-400 text-gray-600">
            &copy; {new Date().getFullYear()} Sekolah Kreatif SD Muhammadiyah 3 Samarinda
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="transition-colors dark:hover:text-white hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer> 
  )
}
