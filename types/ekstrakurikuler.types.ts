export interface Ekstrakurikuler {
  id: number
  slug: string
  name: string
  desc: string
  kategori: string
  jam?: string
  guru?: string
  kelas?: string
  foto: string | null 
  created_at: string
  updated_at: string
}
