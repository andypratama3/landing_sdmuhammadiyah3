"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ScanLine,
  Hash,
  Shield,
  ArrowRight,
  AlertTriangle,
  Keyboard,
} from "lucide-react"

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function sanitize(val: string) {
  return val.replace(/[^a-zA-Z0-9\-_]/g, "").toLowerCase()
}

function isValidCode(code: string) {
  return code.trim().length >= 8
}

// ─────────────────────────────────────────────
// PAGE — /verify
// Hanya menampilkan form input kode verifikasi.
// Setelah submit, redirect ke /verify/[code]
// ─────────────────────────────────────────────

export default function VerifyPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    if (error) setError("")
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text")
    // Ekstrak kode dari URL jika di-paste URL lengkap
    const match = pasted.match(/\/verify\/([a-zA-Z0-9\-_]+)/)
    const extracted = match ? match[1] : sanitize(pasted)
    setCode(extracted)
    setError("")
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = sanitize(code)
    if (!trimmed) {
      setError("Masukkan kode verifikasi terlebih dahulu.")
      return
    }
    if (!isValidCode(trimmed)) {
      setError("Kode verifikasi minimal 8 karakter.")
      return
    }
    // ✅ Redirect ke /verify/[code] — page terpisah untuk result
    router.push(`/verify/${encodeURIComponent(trimmed)}`)
  }

  const charCount = sanitize(code).length
  const isReady = isValidCode(sanitize(code))

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-outfit">

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-secondary/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 pt-28 pb-16">

        {/* Hero */}
        <div className="max-w-xl mx-auto px-6 text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 bg-primary/10 backdrop-blur-md rounded-full px-5 py-2 mb-7 border border-primary/20">
            <ScanLine className="w-4 h-4 text-primary" strokeWidth={2.5} />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary leading-none">
              Sistem Verifikasi Dokumen
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight leading-none">
            Verifikasi Keaslian
            <br />
            <span className="text-primary italic inline-block mt-1">Dokumen Digital</span>
          </h1>

          <p className="text-muted-foreground font-bold tracking-widest uppercase text-[10px] bg-muted/50 dark:bg-white/5 inline-block px-4 py-1.5 rounded-full border border-border/50">
            SD Muhammadiyah 3 Samarinda
          </p>
        </div>

        {/* Form */}
        <div className="max-w-lg mx-auto px-6 animate-fade-in-up">
          <div className="relative overflow-hidden rounded-[2rem] p-[1px] shadow-2xl shadow-primary/10">
            <div className="glass bg-white/95 dark:bg-black/60 rounded-[calc(2rem-1px)] p-6 sm:p-8">

              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-foreground tracking-tight">Input Kode Manual</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Ketik atau tempel kode verifikasi
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <div
                    className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 bg-background/50 dark:bg-black/30 ${
                      focused
                        ? "border-primary shadow-[0_0_0_4px] shadow-primary/10"
                        : error
                        ? "border-destructive shadow-[0_0_0_4px] shadow-destructive/10"
                        : "border-border/60 hover:border-border"
                    }`}
                  >
                    <Hash
                      className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${
                        focused ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      value={code}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Masukkan kode verifikasi..."
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full pl-12 pr-16 py-4 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/30 placeholder:font-sans outline-none"
                      aria-label="Kode verifikasi dokumen"
                    />
                    <span
                      className={`absolute right-4 text-[10px] font-black tabular-nums transition-colors ${
                        isReady ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    >
                      {charCount}
                    </span>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 mt-2 px-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
                      <p className="text-xs text-destructive font-medium">{error}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!code.trim()}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                    isReady
                      ? "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98]"
                      : "bg-muted/60 text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Verifikasi Sekarang
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${isReady ? "opacity-100" : "opacity-0 -translate-x-2"}`}
                  />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">atau</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              {/* QR hint */}
              <div className="flex items-center gap-4 rounded-xl bg-muted/40 dark:bg-white/5 border border-border/40 px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-lg shrink-0">
                  📱
                </div>
                <div>
                  <p className="text-xs font-black text-foreground">Punya QR Code?</p>
                  <p className="text-[11px] text-muted-foreground font-medium leading-relaxed mt-0.5">
                    Scan dengan kamera HP — halaman ini akan otomatis menampilkan hasil verifikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: "📄", title: "Cek di dokumen" },
              { icon: "🔍", title: "Paste URL" },
              { icon: "🔒", title: "Aman & privat" },
            ].map((tip) => (
              <div
                key={tip.title}
                className="glass bg-white/60 dark:bg-white/5 border border-border/40 rounded-2xl p-4 text-center hover:border-primary/30 transition-all duration-300 group"
              >
                <span className="text-xl block mb-2 group-hover:scale-110 transition-transform duration-300">
                  {tip.icon}
                </span>
                <p className="text-[10px] font-black uppercase tracking-wider text-foreground/80 leading-tight">
                  {tip.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
