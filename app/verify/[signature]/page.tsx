"use client"

import { useState, useEffect, useCallback, use } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldOff,
  ShieldCheck,
  ScanLine,
  User,
  BookOpen,
  Calendar,
  Hash,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  FileText,
  AlertTriangle,
  Wifi,
  WifiOff,
  ArrowLeft,
  Shield,
} from "lucide-react"

import type { Signature, RawApiResponse } from "@/types/signature.types"
import { ApiClient } from "@/lib/api"

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

type VerifyStatus = "valid" | "not_found" | "expired" | "revoked"
type PageMode = "loading" | "result" | "network_error"

interface DocumentData {
  label: string
  description: string | null
  issued_to: string
  issued_by: string
  document_type: string
  valid_from: string | null
  valid_until: string | null
  scan_count: number
  status_label: string
  file_url: string | null
}

interface VerifyResult {
  status: VerifyStatus
  message: string
  data: DocumentData | null
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const DOC_TYPE_LABELS: Record<string, string> = {
  ijazah: "Ijazah",
  sertifikat: "Sertifikat",
  raport: "Raport",
  surat_keterangan: "Surat Keterangan",
  lainnya: "Dokumen Lainnya",
}

const STATUS_CONFIG: Record<
  VerifyStatus,
  {
    title: string
    icon: React.ReactNode
    colorClass: string
    bgClass: string
    borderClass: string
  }
> = {
  valid: {
    title: "Dokumen Sah & Valid",
    icon: <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary" strokeWidth={2.5} />,
    colorClass: "text-primary",
    bgClass: "bg-primary/5 dark:bg-primary/10",
    borderClass: "border-primary/20",
  },
  not_found: {
    title: "Dokumen Tidak Ditemukan",
    icon: <XCircle className="w-10 h-10" strokeWidth={2.5} />,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/5",
    borderClass: "border-destructive/20",
  },
  expired: {
    title: "Dokumen Telah Kedaluwarsa",
    icon: <Clock className="w-10 h-10" strokeWidth={2.5} />,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800/40",
  },
  revoked: {
    title: "Dokumen Telah Dicabut",
    icon: <ShieldOff className="w-10 h-10" strokeWidth={2.5} />,
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800/40",
  },
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function formatDate(d?: string | null): string {
  if (!d) return "Tidak terbatas"
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// ─────────────────────────────────────────────
// FETCH — pakai ApiClient agar auto-refresh token
// ─────────────────────────────────────────────

async function fetchVerification(
  verificationCode: string,
  signal?: AbortSignal
): Promise<Signature> {
  try {
    const json = await ApiClient.get<RawApiResponse>(
      `/signature/verify?verification_code=${encodeURIComponent(verificationCode)}`,
      { signal }
    )

    if (!json.success) {
      return {
        status: "not_found",
        message: json.message ?? "Terjadi kesalahan.",
        data: null,
      }
    }

    return {
      status:  (json.data as any)?.status  ?? "not_found",
      message: json.message                ?? "Terjadi kesalahan.",
      data:    (json.data as any)?.data    ?? null,
    }
  } catch (err: any) {
    if (err?.name === "AbortError") throw err
    return {
      status: "not_found",
      message: "Terjadi kesalahan pada server. Silakan coba lagi.",
      data: null,
    }
  }
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function DetailRow({
  icon,
  label,
  value,
  bold = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <div className="flex items-start gap-4 px-5 py-4 border-b border-border/50 last:border-0 group hover:bg-primary/5 transition-all duration-300">
      <div className="text-primary/60 mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0 font-outfit">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/70 mb-1">
          {label}
        </p>
        <p className={`text-[15px] leading-tight text-foreground/90 break-words ${bold ? "font-bold" : "font-medium"}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

function VerifyingLoader({ code }: { code: string }) {
  return (
    <div className="max-w-2xl mx-auto px-6 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-[2rem] p-[1px] shadow-2xl shadow-primary/10">
        <div className="glass bg-white/95 dark:bg-black/60 rounded-[calc(2rem-1px)] p-10 flex flex-col items-center text-center gap-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary/40 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary/60" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-black text-foreground mb-2">Memverifikasi Dokumen</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Memeriksa keaslian kode verifikasi...
            </p>
          </div>
          <div className="w-full p-3 rounded-xl bg-muted/40 border border-border/40">
            <p className="font-mono text-xs text-primary/70 break-all leading-relaxed">
              {code.length > 48 ? code.slice(0, 48) + "..." : code}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PAGE — /verify/[signature]
// Auto-fetch berdasarkan kode dari URL.
// ─────────────────────────────────────────────

export default function VerifyResultPage({
  params,
}: {
  // ✅ Next.js 15: params adalah Promise — wajib di-unwrap dengan React.use()
  params: Promise<{ signature: string }>
}) {
  const router = useRouter()

  // ✅ Unwrap params async
  const resolvedParams = use(params)
  const code = resolvedParams?.signature ?? ""

  const [mode, setMode] = useState<PageMode>("loading")
  const [result, setResult] = useState<VerifyResult | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [previewReady, setPreviewReady] = useState(false)

  // ── Fetch ──────────────────────────────────
  const runVerify = useCallback(async (silent = false) => {
    if (!silent) setMode("loading")

    const controller = new AbortController()

    try {
      const data = await fetchVerification(code, controller.signal)
      setResult(data)
      setMode("result")
    } catch (err: any) {
      if (err?.name === "AbortError") return
      setMode("network_error")
    }

    return () => controller.abort()
  }, [code])

  // ✅ Auto-fetch saat halaman dibuka (QR scan / direct URL)
  useEffect(() => {
    if (code) runVerify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const handleSync = async () => {
    setIsSyncing(true)
    await runVerify(true)
    setTimeout(() => setIsSyncing(false), 600)
  }

  const config = result ? STATUS_CONFIG[result.status] : null
  const isValid = result?.status === "valid"
  const data = result?.data
  const hasFile = !!data?.file_url

  const handleDownload = () => {
    if (data?.file_url) window.open(data.file_url, "_blank", "noopener,noreferrer")
  }

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
            Hasil Verifikasi
            <br />
            <span className="text-primary italic inline-block mt-1">Dokumen Digital</span>
          </h1>

          <p className="text-muted-foreground font-bold tracking-widest uppercase text-[10px] bg-muted/50 dark:bg-white/5 inline-block px-4 py-1.5 rounded-full border border-border/50">
            SD Muhammadiyah 3 Samarinda
          </p>
        </div>

        {/* ── LOADING ── */}
        {mode === "loading" && <VerifyingLoader code={code} />}

        {/* ── RESULT ── */}
        {mode === "result" && result && config && (
          <div className="max-w-2xl mx-auto px-6 space-y-5 animate-fade-in-up">

            {/* Back button */}
            <button
              onClick={() => router.push("/verify")}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Cek Kode Lain
            </button>

            {/* STATUS BANNER: VALID */}
            {isValid && (
              <div className="group relative overflow-hidden rounded-[2rem] p-[1px] shadow-2xl shadow-primary/10">
                <div className="relative glass bg-white/95 dark:bg-black/60 rounded-[calc(2rem-1px)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
                  <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center border border-primary/20 shadow-xl relative z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                      {config.icon}
                    </div>
                  </div>
                  <div className="flex-1 z-10">
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <div className="flex items-center gap-1.5 bg-primary text-white px-3 py-0.5 rounded-full shadow-lg shadow-primary/20">
                          <ShieldCheck className="w-2.5 h-2.5" strokeWidth={3} />
                          <span className="text-[9px] font-black tracking-widest uppercase">VALID</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-primary/50 mt-1">
                        Terverifikasi · SD Muhammadiyah 3 Samarinda
                      </p>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none mb-2">
                      Dokumen Sah &amp; Valid
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STATUS BANNER: INVALID */}
            {!isValid && (
              <div className={`relative overflow-hidden rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-xl sm:text-left text-center border ${config.bgClass} ${config.borderClass}`}>
                <div className={`w-18 h-18 min-w-[4.5rem] min-h-[4.5rem] rounded-2xl flex items-center justify-center border ${config.bgClass} ${config.borderClass} ${config.colorClass}`}>
                  {config.icon}
                </div>
                <div className={`flex-1 ${config.colorClass}`}>
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-60 block mb-1">VERIFIKASI GAGAL</span>
                  <h2 className="text-2xl font-black mb-1 leading-tight">{config.title}</h2>
                  <p className="text-sm font-medium opacity-80">{result.message}</p>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-all active:scale-95 disabled:opacity-60"
              >
                <div className="glass bg-white/80 dark:bg-black/40 rounded-[calc(1rem-1px)] px-5 py-3.5 flex items-center justify-center gap-2.5 hover:bg-primary/5 transition-colors">
                  <RefreshCw className={`w-4 h-4 text-primary transition-transform duration-500 ${isSyncing ? "animate-spin" : "group-hover:rotate-180"}`} />
                  <span className="font-black text-xs uppercase tracking-widest text-foreground">
                    {isSyncing ? "Mensinkronkan..." : "Sinkronkan"}
                  </span>
                </div>
              </button>

              <button
                onClick={handleDownload}
                disabled={!hasFile}
                title={!hasFile ? "File tidak tersedia" : "Download dokumen"}
                className={`group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-all active:scale-95 ${!hasFile ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <div className="glass bg-white/80 dark:bg-black/40 rounded-[calc(1rem-1px)] px-5 py-3.5 flex items-center justify-center gap-2.5 hover:bg-secondary/5 transition-colors">
                  <Download className={`w-4 h-4 text-secondary transition-transform ${hasFile ? "group-hover:-translate-y-1" : ""}`} />
                  <span className="font-black text-xs uppercase tracking-widest text-foreground">Download</span>
                </div>
              </button>
            </div>

            {/* DOCUMENT PREVIEW */}
            {isValid && hasFile && (
              <>
                {showPreview ? (
                  <div className="relative overflow-hidden rounded-[2rem] p-[1px] shadow-2xl">
                    <div className="glass bg-white/95 dark:bg-black/60 rounded-[calc(2rem-1px)] overflow-hidden">
                      <div className="px-6 sm:px-8 py-4 border-b border-border/40 bg-muted/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                            <Eye className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-foreground/80">Pratinjau Dokumen</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-secondary">LIVE</span>
                          </div>
                          <button
                            onClick={() => setShowPreview(false)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            title="Tutup pratinjau"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="relative aspect-[1/1.4] w-full bg-muted/20">
                        {!previewReady && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm z-20">
                            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-3" />
                            <p className="text-xs font-black uppercase tracking-widest text-primary animate-pulse">Memuat Dokumen...</p>
                          </div>
                        )}
                        <iframe
                          src={`${data?.file_url}#toolbar=0`}
                          className="w-full h-full border-none"
                          title="Document Preview"
                          onLoad={() => setPreviewReady(true)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowPreview(true); setPreviewReady(false) }}
                    className="w-full rounded-2xl border border-dashed border-border/50 py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Tampilkan Pratinjau Dokumen
                  </button>
                )}
              </>
            )}

            {/* DOCUMENT DETAIL */}
            {data && (
              <div className="glass bg-white/70 dark:bg-black/40 border border-border/50 shadow-2xl rounded-[2rem] overflow-hidden">
                <div className="px-6 sm:px-8 py-5 border-b border-border/40 bg-muted/20 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-foreground/90 uppercase tracking-[0.15em] block leading-none mb-1">Data Dokumen</span>
                      <span className="text-[9px] text-muted-foreground font-black tracking-[0.2em] uppercase leading-none opacity-60">Resmi Terverifikasi</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/20 px-3 py-1.5 rounded-full border border-secondary/30">
                    <BookOpen className="w-3 h-3 text-secondary" />
                    <span className="text-[10px] text-foreground font-black uppercase tracking-widest leading-none">
                      {DOC_TYPE_LABELS[data.document_type] ?? data.document_type}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-border/40">
                  <DetailRow icon={<User className="w-5 h-5" />} label="Nama Lengkap" value={data.issued_to} bold />
                  <DetailRow icon={<ShieldCheck className="w-5 h-5" />} label="Diterbitkan Oleh" value={data.issued_by} />
                  <DetailRow icon={<FileText className="w-5 h-5" />} label="Nama Dokumen" value={data.label} />
                  {data.description && (
                    <DetailRow icon={<FileText className="w-5 h-5" />} label="Deskripsi" value={data.description} />
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40">
                    <DetailRow icon={<Calendar className="w-5 h-5" />} label="Tanggal Terbit" value={formatDate(data.valid_from)} />
                    <DetailRow icon={<Calendar className="w-5 h-5" />} label="Masa Berlaku" value={formatDate(data.valid_until)} />
                  </div>
                  <div className="px-5 py-4 bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-4 h-4 text-muted-foreground/60" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Statistik Verifikasi</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-black text-primary">{data.scan_count.toLocaleString("id-ID")}</span>
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">Scan</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WARNING: not_found */}
            {result.status === "not_found" && (
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl px-5 py-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-destructive leading-relaxed">
                  Kode ini <strong>tidak terdaftar</strong> dalam sistem kami. Kemungkinan dokumen
                  tidak resmi atau QR Code telah dimanipulasi. Harap hubungi pihak sekolah untuk konfirmasi.
                </p>
              </div>
            )}

            {/* STAMP: valid */}
            {isValid && (
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-4 text-center">
                <p className="text-xs text-muted-foreground">🏫 Diterbitkan &amp; diverifikasi secara resmi oleh</p>
                <p className="text-sm font-black text-primary mt-1">SD Muhammadiyah 3 Samarinda</p>
              </div>
            )}

            {/* SIGNATURE HASH */}
            <div className="rounded-3xl border border-dashed border-border/60 bg-white/40 dark:bg-muted/30 p-6 group hover:border-primary/40 transition-all duration-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-primary/5 text-primary">
                  <Hash className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground">Digital Signature Fingerprint</p>
              </div>
              <div className="p-4 rounded-xl bg-white/50 dark:bg-background/50 border border-border/40 font-mono text-[11px] text-primary/80 break-all leading-relaxed shadow-inner select-all">
                {code}
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground/50 text-center font-bold tracking-wider uppercase">
                © {new Date().getFullYear()} SD Muhammadiyah 3 Samarinda · Blockchain Protected
              </p>
            </div>

            {/* CONTACT */}
            <div className="glass group rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-5 border-border/40 hover:bg-white/90 dark:hover:bg-gray-950/60 transition-all duration-500 shadow-xl text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shrink-0">
                📞
              </div>
              <div>
                <p className="text-lg font-black text-primary mb-0.5">Butuh bantuan?</p>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Tim admin kami siap membantu verifikasi manual jika diperlukan.
                </p>
                <a
                  href="https://sdmuhammadiyah3smd.com/kontak"
                  className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-primary/80 group/btn"
                >
                  Hubungi Sekretariat
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">→</div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── NETWORK ERROR ── */}
        {mode === "network_error" && (
          <div className="max-w-lg mx-auto px-6">
            <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                <WifiOff className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground mb-1">Gagal Terhubung ke Server</h3>
                <p className="text-sm text-muted-foreground">Periksa koneksi internet Anda, lalu coba lagi.</p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={() => runVerify()}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Coba Lagi
                </button>
                <button
                  onClick={() => router.push("/verify")}
                  className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-black text-xs uppercase tracking-widest hover:bg-muted/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
