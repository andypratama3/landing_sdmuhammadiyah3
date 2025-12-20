export interface Gallery {
  id: string;
  name: string;
  foto: string;           // bisa berisi banyak file, pisahkan pakai koma
  cover?: string;         // bisa kosong
  slug: string;
  link?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}
