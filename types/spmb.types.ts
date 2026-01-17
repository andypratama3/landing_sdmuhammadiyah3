// types/spmb.types.ts

/**
 * Form data interface untuk data pendaftaran siswa
 */
export interface SpmbFormData {
  nama: string;
  nik: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  asal_tk: string;
  alamat: string;
  nama_ayah: string;
  pekerjaan_ayah: string;
  nama_ibu: string;
  pekerjaan_ibu: string;
  no_hp: string;
  terms: boolean;
  suku: string;
}

/**
 * Type untuk nama field file upload
 */
export type FileFieldName = 'akta_kelahiran' | 'sttb' | 'pas_foto' | 'kartu_keluarga';

/**
 * Interface untuk file data state
 */
export interface SpmbFileData {
  akta_kelahiran: File | null;
  sttb: File | null;
  pas_foto: File | null;
  kartu_keluarga: File | null;
}

/**
 * Interface untuk file names display
 */
export interface SpmbFileNames {
  akta_kelahiran: string;
  sttb: string;
  pas_foto: string;
  kartu_keluarga: string;
}

/**
 * Interface untuk form validation errors
 */
export interface SpmbFormErrors {
  [key: string]: string;
}

/**
 * Interface untuk konfigurasi field upload
 */
export interface FileUploadField {
  key: FileFieldName;
  label: string;
  required: boolean;
}

/**
 * API Response interface
 */
export interface SpmbApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    nama: string;
    nomor_urut: string;
    order_id: string;
    status_pembayaran: string;
    [key: string]: any;
  };
  errors?: {
    [key: string]: string[];
  };
}

/**
 * Allowed file MIME types
 */
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export type AllowedFileType = 'application/pdf' | 'image/jpeg' | 'image/jpg' | 'image/png';

/**
 * Type guard to check if file type is allowed
 */
export function isAllowedFileType(type: string): type is AllowedFileType {
  return ALLOWED_FILE_TYPES.includes(type);
}

/**
 * Constants untuk validasi
 */
export const SPMB_VALIDATION = {
  NIK_LENGTH: 16,
  PHONE_REGEX: /^08[0-9]{8,11}$/,
  MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_FILE_TYPES: ALLOWED_FILE_TYPES,
};

/**
 * Field upload configuration
 */
export const FILE_UPLOAD_FIELDS: FileUploadField[] = [
  { key: 'akta_kelahiran', label: 'Akta Kelahiran', required: true },
  { key: 'sttb', label: 'Foto STTB', required: false },
  { key: 'pas_foto', label: 'Pass Foto', required: true },
  { key: 'kartu_keluarga', label: 'Kartu Keluarga', required: true },
];

/**
 * Required form fields
 */
export const REQUIRED_FORM_FIELDS: (keyof SpmbFormData)[] = [
  'nama',
  'nik',
  'tempat_lahir',
  'tanggal_lahir',
  'jenis_kelamin',
  'alamat',
  'nama_ayah',
  'pekerjaan_ayah',
  'nama_ibu',
  'pekerjaan_ibu',
  'no_hp',
];

/**
 * Initial form state
 */
export const INITIAL_FORM_DATA: SpmbFormData = {
  nama: '',
  nik: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  asal_tk: '',
  alamat: '',
  nama_ayah: '',
  pekerjaan_ayah: '',
  nama_ibu: '',
  pekerjaan_ibu: '',
  no_hp: '',
  terms: false,
  suku: '',
};

/**
 * Initial file data state
 */
export const INITIAL_FILE_DATA: SpmbFileData = {
  akta_kelahiran: null,
  sttb: null,
  pas_foto: null,
  kartu_keluarga: null,
};

/**
 * Initial file names state
 */
export const INITIAL_FILE_NAMES: SpmbFileNames = {
  akta_kelahiran: '',
  sttb: '',
  pas_foto: '',
  kartu_keluarga: '',
};