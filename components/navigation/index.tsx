import NavigationClient from "@/components/navigation/NavigationClient";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const navLinks = [
  { href: "/", label: "Beranda" },
  {
    label: "Tentang",
    dropdown: [
      { href: "/tentang", label: "Tentang Kami" },
      { href: "/profil", label: "Profil Sekolah" },
    ],
  },
  {
    label: "Profil",
    dropdown: [
      { href: "/profil", label: "Profil Sekolah" },
      { href: "/guru", label: "Guru" },
      { href: "/tenaga-pendidikan", label: "Tenaga Pendidikan" },
      { href: "/galeri", label: "Gallery Aktivitas" },
      { href: "/fasilitas", label: "Sarana & Prasarana" },
      { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
      { href: "/prestasi-siswa", label: "Prestasi Siswa" },
      { href: "/prestasi-sekolah", label: "Prestasi Sekolah" },
    ],
  },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/berita", label: "Berita" },
  { href: "/rapot", label: "Rapot" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navigation() {
  return (
    <NavigationClient navLinks={navLinks}>
      {/* 
        We pass the static Logo & Right Actions as children so they 
        can be rendered purely on the server, while the client just handles
        scroll states and menu dropdown toggles. 
      */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <Image
              src="/SD3_logo1.png"
              alt="Logo Sekolah Kreatif"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 40px, 48px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-base sm:text-lg leading-none text-[#33b962]">SEKOLAH KREATIF</span>
            <span className="text-[9px] sm:text-[11px] font-black tracking-widest leading-none text-gray-500 dark:text-gray-400 mt-1 uppercase">SD Muh 3 Samarinda</span>
          </div>
        </Link>
      </div>

      <div className="hidden xl:flex items-center justify-end flex-shrink-0 gap-1.5">
        <div className="p-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
          <ThemeToggle />
        </div>
        <Button
          asChild
          size="sm"
          className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-4 shadow-xl hover:scale-105 transition-all font-black uppercase tracking-widest text-[10px] h-8 whitespace-nowrap"
        >
          <Link href="#">SPMB {new Date().getFullYear()}</Link>
        </Button>
      </div>
    </NavigationClient>
  );
}
