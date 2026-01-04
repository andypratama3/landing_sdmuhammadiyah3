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
    { href: "/rapot", label: "Rapot Siswa" },

    // { href: "/spmb", label: "SPMB" },
    { href: "/kontak", label: "Kontak" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/50 py-2" 
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container p-3 px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 pb-1.5 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 bg-transparent transition-transform">
              <Image src="/SD3_logo1.png" alt="Logo Sekolah Kreatif" className="bg-none" width={80} height={80} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#33b962] text-lg leading-tight">Sekolah Kreatif</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">SD Muhammadiyah 3 Samarinda</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-1 lg:flex">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 rounded-lg transition-all flex items-center gap-1"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === link.label && (
                      <div
                        className="absolute left-0 py-2 mt-1 bg-white border border-gray-100 shadow-xl top-full dark:bg-gray-800 dark:shadow-gray-900/50 rounded-xl min-w-50 dark:border-gray-700"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 transition-all"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="items-center hidden gap-2 lg:flex">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full px-6 shadow-md"
            >
              <Link href="#">Daftar</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="pt-4 pb-4 mt-4 border-t border-gray-200 lg:hidden dark:border-gray-700">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.dropdown ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 rounded-lg transition-all flex items-center justify-between"
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="pl-4 mt-1 space-y-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 rounded-lg transition-all"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#33b962] dark:hover:text-[#4ade80] hover:bg-[#33b962]/5 dark:hover:bg-[#33b962]/10 rounded-lg transition-all block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#33b962] hover:bg-[#2a9d52] text-white rounded-full"
                >
                  <a href="/spmb">Daftar Sekarang</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}