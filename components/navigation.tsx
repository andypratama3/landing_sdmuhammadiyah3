"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    { href: "/spmb", label: "SPMB" },
    { href: "/kontak", label: "Kontak" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#ffd166] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎈</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#33b962] text-lg leading-tight">Sekolah Kreatif</span>
              <span className="text-xs text-gray-600">SD Muhammadiyah 3 Samarinda</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#33b962] hover:bg-[#33b962]/5 rounded-lg transition-all flex items-center gap-1"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {openDropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-xl py-2 min-w-[200px] border border-gray-100"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-[#33b962] hover:bg-[#33b962]/5 transition-all"
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
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#33b962] hover:bg-[#33b962]/5 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.dropdown ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#33b962] hover:bg-[#33b962]/5 rounded-lg transition-all flex items-center justify-between"
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
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-[#33b962] hover:bg-[#33b962]/5 rounded-lg transition-all"
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
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#33b962] hover:bg-[#33b962]/5 rounded-lg transition-all block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
