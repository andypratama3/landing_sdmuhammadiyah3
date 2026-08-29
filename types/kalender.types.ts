export interface KalenderAkademikEvent {
  id: string
  judul: string
  jenis: "holiday" | "exam" | "event" | "deadline" | "celebration"
  tanggal_mulai: string | null
  tanggal_selesai: string | null
  deskripsi: string | null
  lokasi: string | null
  warna: string
}

export const JENIS_LABEL: Record<KalenderAkademikEvent["jenis"], string> = {
  holiday: "Libur",
  exam: "Ujian",
  event: "Kegiatan",
  deadline: "Deadline",
  celebration: "Perayaan",
}
