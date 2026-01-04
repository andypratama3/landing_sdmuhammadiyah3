/**
 * Kategori Pembayaran
 */
export interface KategoriPembayaran {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Charge/Tagihan
 */
export interface Charge {
  id: string;
  name: string;
  type_payment?: string;
  order_id?: string;
  order_id_1?: string;
  siswa_id: string;
  gross_amount: number;
  payment_type?: string;
  bank?: string;
  va_number?: string;
  transaction_id?: string;
  transaction_time?: string;
  fraud_status?: string;
  transaction_status: "pending" | "settlement" | "expired" | "failed";
  category_payment_id: string;
  snap_token?: string;
  kategori_pembayaran?: KategoriPembayaran;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

/**
 * Siswa (Student)
 */
export interface Siswa {
  id: string;
  name: string;
  nisn: string;
  slug: string;
  jk?: string;
  foto?: string;
  tmpt_lahir?: string;
  tgl_lahir?: string;
  agama?: string;
  spp?: number;
  seragam?: number;
  dpp?: number;
  status_dpp?: string;
  va_number?: string;
  nama_pendidikan?: string;
  nama_jalan_pendidikan?: string;
  kelas_tahun?: string;
  tanggal_masuk?: string;
  beasiswa?: boolean;
  nama_ayah?: string;
  nama_ibu?: string;
  pendidikan_ayah?: string;
  pendidikan_ibu?: string;
  pekerjaan_ayah?: string;
  pekerjaan_ibu?: string;
  nama_wali?: string;
  pekerjaan_wali?: string;
  alamat_wali?: string;
  rt?: string;
  rw?: string;
  provinsi_id?: string;
  kabupaten_id?: string;
  kecamatan_id?: string;
  kelurahan_id?: string;
  nama_jalan?: string;
  jenis_tinggal?: string;
  no_hp?: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
  charges?: Charge[];
}

/**
 * Payment Request
 */
export interface PembayaranRequest {
  nisn: string;
}

/**
 * Payment Response
 */
export interface PembayaranResponse {
  siswa: Siswa;
  charges: Record<string, Charge[]>;
}

/**
 * Payment Item (Frontend Format)
 */
export interface PembayaranItem {
  id: string;
  category: string;
  categoryId: string;
  description: string;
  month: string;
  amount: number;
  status: "paid" | "unpaid";
  date: string;
  va_number?: string;
  transaction_id?: string;
  snap_token?: string;
}

/**
 * Grouped Payments by Year and Category
 */
export interface GroupedPembayaran {
  [year: string]: {
    [category: string]: PembayaranItem[];
  };
}