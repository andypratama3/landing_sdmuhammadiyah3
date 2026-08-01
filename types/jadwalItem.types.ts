import { JadwalDetail } from './jadwalDetail.types'

export interface JadwalItem {
  id: string
  tahun_ajaran: string
  kelas: string
  category_kelas: string
  jadwal_details: JadwalDetail[]
}