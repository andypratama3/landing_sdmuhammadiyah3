"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
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
    { href: "/pembayaran", label: "Pembayaran" },
    { href: "/berita", label: "Berita" },
    { href: "/rapot", label: "Rapot" },

    // { href: "/spmb", label: "SPMB" },
    { href: "/kontak", label: "Kontak" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled
        ? "py-2"
        : "py-4"
        }`}
    >
      <div className="container px-2 mx-auto">
        <div className={`flex items-center justify-between px-3 py-2 sm:px-4 rounded-2xl sm:rounded-full border transition-all duration-300 shadow-2xl ${isScrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-gray-100 dark:border-gray-800"
          : "bg-white dark:bg-gray-900 border-white/40 dark:border-white/5"
          }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/SD3_logo1.png"
                  alt="Logo Sekolah Kreatif"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tighter text-base sm:text-lg leading-none text-[#33b962]">SEKOLAH KREATIF</span>
                <span className="text-[9px] sm:text-[11px] font-black tracking-widest leading-none text-gray-500 dark:text-gray-400 mt-1 uppercase">SD Muh 3 Samarinda</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-center flex-1 gap-0">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-[#33b962] hover:bg-[#33b962]/10 hover:scale-110 hover:brightness-125 active:scale-95 whitespace-nowrap"
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`absolute left-0 py-3 mt-1 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl min-w-[240px] border border-gray-100 dark:border-gray-800 transition-all duration-200 origin-top-left z-[70] ${openDropdown === link.label
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-2.5 text-[11px] font-black text-gray-600 dark:text-gray-400 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/10 dark:hover:bg-[#33b962]/20 transition-all uppercase tracking-widest hover:pl-8 hover:brightness-125"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-full transition-all block text-gray-700 dark:text-gray-200 hover:text-[#33b962] hover:bg-[#33b962]/10 hover:scale-110 hover:brightness-125 active:scale-95 whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden xl:flex items-center justify-end flex-shrink-0 gap-1.5">
            <div className="p-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              <ThemeToggle />
            </div>
            <Button
              asChild
              size="sm"
              className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-4 shadow-xl hover:scale-105 transition-all font-black uppercase tracking-widest text-[10px] h-8 whitespace-nowrap"
            >
              <Link href="#">PPDB 2025</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <div className="p-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-[55] xl:hidden transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}>
            <div className="p-6 border-b border-gray-100 dark:border-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/SD3_logo1.png" alt="Logo" width={40} height={40} />
                <span className="font-black text-[#33b962]">MENU</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <div key={index} className="border-b border-gray-50 dark:border-gray-900/50 pb-4">
                    {link.dropdown ? (
                      <>
                        <button
                          className="w-full text-left text-xl font-black text-gray-900 dark:text-white flex items-center justify-between uppercase tracking-tighter"
                          onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180 text-[#33b962]" : ""}`}
                          />
                        </button>
                        <div className={`mt-3 grid transition-all duration-300 ${openDropdown === link.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          <div className="overflow-hidden space-y-3 pl-4">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block text-base font-bold text-gray-500 dark:text-gray-400 hover:text-[#33b962]"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter block"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 mt-auto">
              <Button
                asChild
                className="w-full bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-2xl py-6 text-lg font-black shadow-xl"
                onClick={() => setIsOpen(false)}
              >
                <Link href="#">PPDB 2025</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>


  )
}