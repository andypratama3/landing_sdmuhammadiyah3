"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavLink {
  href?: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

export default function NavigationClient({ 
  navLinks, 
  children 
}: { 
  navLinks: NavLink[], 
  children: React.ReactNode[] 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Optimized Scroll Listener using RequestAnimationFrame & DOM Refs to prevent React re-renders globally
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;

          if (navRef.current && innerRef.current) {
            if (isScrolled) {
              navRef.current.classList.remove("py-4");
              navRef.current.classList.add("py-2");

              innerRef.current.classList.remove("bg-white", "dark:bg-gray-900", "border-white/40", "dark:border-white/5");
              innerRef.current.classList.add("bg-white/90", "dark:bg-gray-950/90", "backdrop-blur-xl", "border-gray-100", "dark:border-gray-800");
            } else {
              navRef.current.classList.remove("py-2");
              navRef.current.classList.add("py-4");

               innerRef.current.classList.remove("bg-white/90", "dark:bg-gray-950/90", "backdrop-blur-xl", "border-gray-100", "dark:border-gray-800");
               innerRef.current.classList.add("bg-white", "dark:bg-gray-900", "border-white/40", "dark:border-white/5");
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300 py-4">
      <div className="container px-2 mx-auto">
        <div ref={innerRef} className="flex items-center justify-between px-3 py-2 sm:px-4 rounded-2xl sm:rounded-full border transition-all duration-300 shadow-2xl bg-white dark:bg-gray-900 border-white/40 dark:border-white/5">
          
          {/* Server Rendered Component - LOGO */}
          {children[0]}

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
                    <button className="px-4 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-(--color-forest-700) hover:bg-(--color-forest-700)/10 hover:scale-110 active:scale-95 whitespace-nowrap relative group">
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-(--color-forest-700) to-transparent transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <div className={`absolute left-0 py-4 mt-1 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl min-w-[280px] border border-gray-100 dark:border-gray-800 transition-all duration-200 origin-top-left z-[70] ${openDropdown === link.label ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-3 group/item"
                        >
                          <div className="text-[11px] font-black text-gray-600 dark:text-gray-400 group-hover/item:text-(--color-forest-700) dark:group-hover/item:text-(--color-teal-400) transition-all uppercase tracking-widest group-hover/item:pl-2">
                            {item.label}
                          </div>
                          <div className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
                            {idx === 0 ? "Tentang sekolah kami" : 
                             idx === 1 ? "Profil lengkap" :
                             idx === 2 ? "Tim pengajar kami" :
                             idx === 3 ? "Staf pendidik" :
                             idx === 4 ? "Dokumentasi aktivitas" :
                             idx === 5 ? "Sarana belajar" :
                             idx === 6 ? "Kegiatan ekstrakurikuler" :
                             idx === 7 ? "Prestasi siswa" :
                             "Penghargaan sekolah"}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    className="px-4 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-full transition-all block text-gray-700 dark:text-gray-200 hover:text-(--color-forest-700) hover:bg-(--color-forest-700)/10 hover:scale-110 active:scale-95 whitespace-nowrap relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-(--color-forest-700) to-transparent transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Server Rendered Component - RIGHT ACTIONS (SPMB & Theme) */}
          {children[1]}

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <div className="p-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-[55] xl:hidden transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-6 border-b border-gray-100 dark:border-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/SD3_logo1.png" alt="Logo" width={40} height={40} className="w-10 h-10" />
                <span className="font-black text-(--color-forest-700)">MENU</span>
              </div>
              <Button variant="ghost" size="icon" aria-label="Tutup menu" onClick={() => setIsOpen(false)}>
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
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180 text-(--color-forest-700)" : ""}`} />
                        </button>
                        <div className={`mt-3 grid transition-all duration-300 ${openDropdown === link.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          <div className="overflow-hidden space-y-3 pl-4">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block text-base font-bold text-gray-500 dark:text-gray-400 hover:text-(--color-forest-700)"
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
                        href={link.href!}
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
                className="w-full bg-(--color-forest-700) hover:bg-(--color-forest-500) text-white rounded-2xl py-6 text-lg font-black shadow-xl"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/spmb">SPMB {new Date().getFullYear()}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
