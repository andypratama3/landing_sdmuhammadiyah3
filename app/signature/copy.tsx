// app/verify/[signature]/page.tsx
import type { Metadata } from "next"
import { CheckCircle2, XCircle, Clock, ShieldOff, Trash2, ServerCrash, ShieldCheck } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────
type VerifyStatus = "valid" | "not_found" | "revoked" | "expired" | "deleted" | "error"

interface DocumentData {
  label: string
  description?: string
  issued_to: string
  issued_by: string
  document_type: string
  valid_from?: string
  valid_until?: string
  scan_count: number
  status_label: string
}

interface VerifyResponse {
  valid: boolean
  status: string
  message: string
  data: DocumentData | null
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ signature: string }>
}): Promise<Metadata> {
  const { signature } = await params
  return {
    title: `Verifikasi Dokumen — ${signature.slice(0, 12)}…`,
    description: "Verifikasi keaslian dokumen resmi SD Muhammadiyah 3 Samarinda",
    robots: { index: false, follow: false },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────
const DOC_TYPE_LABELS: Record<string, string> = {
  ijazah: "Ijazah",
  sertifikat: "Sertifikat",
  raport: "Raport",
  surat_keterangan: "Surat Keterangan",
  lainnya: "Dokumen Lainnya",
}

function formatDate(d?: string) {
  if (!d) return "–"
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// ─── Fetch (server-side) ──────────────────────────────────────────
async function verifySignature(signature: string): Promise<VerifyResponse> {
  try {
    const res = await fetch(
      `https://sdmuhammadiyah3smd.com/api/verify/${signature}`,
      { cache: "no-store" }
    )
    return await res.json()
  } catch {
    return { valid: false, status: "error", message: "Gagal terhubung ke server.", data: null }
  }
}

// ─── Sub-components ───────────────────────────────────────────────

function HeroStrip() {
  return (
    <div className="bg-primary py-10 px-4 text-center">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-2 font-poppins">
        Sistem Verifikasi Dokumen Resmi
      </p>
      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-primary-foreground font-outfit">
        Verifikasi Keaslian Dokumen
      </h1>
      <p className="text-sm text-primary-foreground/60 mt-2 font-outfit">
        SD Muhammadiyah 3 Samarinda
      </p>
    </div>
  )
}

function DetailRow({
  label,
  value,
  bold = false,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <div className="flex gap-3 px-5 py-3 border-b border-border last:border-0 items-start">
      <span className="text-xs text-muted-foreground w-40 shrink-0 pt-0.5 font-poppins">{label}</span>
      <span
        className={`text-sm text-foreground font-poppins ${bold ? "font-bold" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  )
}

function SignatureBox({ signature }: { signature: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/40 px-5 py-4">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2 font-poppins">
        Kode Verifikasi Digital
      </p>
      <p className="font-mono text-xs text-muted-foreground break-all leading-relaxed">
        {signature}
      </p>
    </div>
  )
}

function ContactBox() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm px-5 py-4 flex items-center gap-4">
      <span className="text-3xl">📞</span>
      <div>
        <p className="text-sm font-bold text-primary font-poppins">Ada pertanyaan?</p>
        <p className="text-xs text-muted-foreground mt-0.5 font-poppins">
          Kunjungi{" "}
          <a
            href="https://sdmuhammadiyah3smd.com/kontak"
            className="text-primary font-semibold hover:underline"
          >
            sdmuhammadiyah3smd.com/kontak
          </a>
        </p>
      </div>
    </div>
  )
}

// ─── Status Config ────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  VerifyStatus,
  { bg: string; icon: React.ReactNode; title: string; badge?: string }
> = {
  valid: {
    bg: "bg-primary",
    icon: <CheckCircle2 className="w-7 h-7 text-secondary" strokeWidth={2.5} />,
    title: "Dokumen Terverifikasi",
    badge: "VALID",
  },
  not_found: {
    bg: "bg-destructive",
    icon: <XCircle className="w-7 h-7 text-destructive-foreground" strokeWidth={2.5} />,
    title: "Dokumen Tidak Ditemukan",
  },
  revoked: {
    bg: "bg-orange-600 dark:bg-orange-700",
    icon: <ShieldOff className="w-7 h-7 text-white" strokeWidth={2.5} />,
    title: "Dokumen Telah Dicabut",
  },
  expired: {
    bg: "bg-amber-600 dark:bg-amber-700",
    icon: <Clock className="w-7 h-7 text-white" strokeWidth={2.5} />,
    title: "Dokumen Telah Kedaluwarsa",
  },
  deleted: {
    bg: "bg-destructive",
    icon: <Trash2 className="w-7 h-7 text-destructive-foreground" strokeWidth={2.5} />,
    title: "Dokumen Telah Dihapus",
  },
  error: {
    bg: "bg-muted",
    icon: <ServerCrash className="w-7 h-7 text-muted-foreground" strokeWidth={2.5} />,
    title: "Gagal Terhubung ke Server",
  },
}

// ─── Page ─────────────────────────────────────────────────────────
export default async function VerifyPage({
  params,
}: {
  params: Promise<{ signature: string }>
}) {
  const { signature } = await params
  const result = await verifySignature(signature)
  const status = result.status as VerifyStatus
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.error
  const data = result.data

  return (
    <div className="min-h-screen bg-background">
      <HeroStrip />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4 animate-fade-in-up">

        {/* ── Status Banner ── */}
        <div className={`${config.bg} rounded-2xl px-6 py-5 flex items-center gap-5 shadow-lg`}>
          {/* Icon circle */}
          <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            {config.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {config.badge && (
                <span className="text-[9px] font-black tracking-[0.2em] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-poppins">
                  {config.badge}
                </span>
              )}
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase font-poppins ${result.valid ? "text-primary-foreground/70" : "text-white/70"}`}>
                {result.valid ? "Verifikasi Berhasil" : "Verifikasi Gagal"}
              </span>
            </div>
            <h2 className={`text-lg font-black font-outfit leading-tight ${result.valid ? "text-primary-foreground" : "text-white"}`}>
              {config.title}
            </h2>
            <p className={`text-xs mt-1 font-poppins ${result.valid ? "text-primary-foreground/70" : "text-white/70"}`}>
              {result.message}
            </p>
          </div>
        </div>

        {/* ── Document Detail (if data available) ── */}
        {data && (
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground font-poppins">
                  {result.valid ? "Detail Dokumen" : "Informasi Dokumen"}
                </span>
              </div>
              <span className="text-[11px] bg-secondary/20 text-secondary-foreground border border-secondary/30 px-3 py-1 rounded-full font-semibold font-poppins">
                {DOC_TYPE_LABELS[data.document_type] ?? data.document_type}
              </span>
            </div>

            {/* Rows */}
            <DetailRow label="Diterbitkan Untuk" value={data.issued_to} bold />
            <DetailRow label="Diterbitkan Oleh"  value={data.issued_by} />
            <DetailRow label="Nama Dokumen"      value={data.label} />
            {data.description && (
              <DetailRow label="Keterangan" value={data.description} />
            )}
            <DetailRow label="Berlaku Sejak"  value={formatDate(data.valid_from)} />
            <DetailRow
              label="Berlaku Hingga"
              value={data.valid_until ? formatDate(data.valid_until) : "Tidak terbatas"}
            />
            <DetailRow
              label="Jumlah Scan"
              value={`${data.scan_count.toLocaleString("id-ID")} kali`}
            />
          </div>
        )}

        {/* ── Warning: not_found ── */}
        {status === "not_found" && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-5 py-4">
            <p className="text-sm text-destructive leading-relaxed font-poppins">
              ⚠️ Kode ini <strong>tidak terdaftar</strong> dalam sistem kami. Kemungkinan dokumen
              tidak resmi atau QR Code telah dimanipulasi. Hubungi sekolah untuk konfirmasi.
            </p>
          </div>
        )}

        {/* ── Verified stamp (only for valid) ── */}
        {status === "valid" && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl px-5 py-4 text-center">
            <p className="text-xs text-muted-foreground font-poppins">
              🏫 Diterbitkan &amp; diverifikasi secara resmi oleh
            </p>
            <p className="text-sm font-black text-primary mt-1 font-outfit">
              SD Muhammadiyah 3 Samarinda
            </p>
          </div>
        )}

        {/* ── Signature hash ── */}
        <SignatureBox signature={signature} />

        {/* ── Contact ── */}
        <ContactBox />
      </div>
    </div>
  )
}