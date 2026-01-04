export interface Rapot {
    siswa_id: string,
    kelas_id: string,
    angkatan: string,
    tahun: string,
    catatan: string,
    file_rapot: string,
    kategori: string,
}

export interface TahunResponse {
  tahun: string;
  label: string;
}

export interface SiswaResponse {
  id: string;
  name: string;
  nis: string;
  class: string;
  semester: string;
  rapot_count: number;
}

export interface RapotDetail {
  id: string;
  siswa_id: string;
  siswa_name: string;
  kelas: string;
  tahun: string;
  semester: string;
  periode: string;
  catatan: string;
  file: string;
  file_size: string;
  created_at: string;
}

export interface ClassCount {
  class: string;
  count: number;
}