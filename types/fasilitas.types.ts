export interface Fasilitas {
  id?: string
  nama_fasilitas: string
  desc: string
  foto: string
  slug: string

  ukuran: string | null
  kapasitas: number | null

  deleted_at: string | null
  created_at: string
  updated_at: string

  kelengkapan: KelengkapanFasilitas[]
}


export interface KelengkapanFasilitas {
  id: string
  nama: string
  fasilitas_id: string
  created_at: string
  updated_at: string
}
