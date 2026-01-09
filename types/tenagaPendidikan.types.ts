export interface TenagaPendidikan {
  name: string
  jabatan: string
  foto: string
  slug: string
}

export interface Staff {
  name: string
  position: string
  image: string
  category: string
  slug: string
  description: string
  id: string
}

export interface StrukturNode {
  id: string
  name: string
  slug: string
  staff: Staff[]
  children: StrukturNode[]
}

export interface TenagaPendidikanResponse {
  success: boolean
  message: string
  data: StrukturNode[]
}