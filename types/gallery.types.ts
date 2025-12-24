export interface Gallery {
  id: string;
  name: string;
  foto: string;           
  cover?: string;         
  slug: string;
  link?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}
