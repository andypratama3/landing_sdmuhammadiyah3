/**
 * Alumni/Graduate Data Types
 * Portal Alumni SD Muhammadiyah 3 Samarinda
 */

/**
 * Alumni individual data
 */
export interface Alumni {
  id?: string;
  name: string;
  slug: string;
  photo?: string;
  graduation_year: number;
  class_name: string;
  nisn?: string; // Added NISN for SEO and identification
  current_profession?: string;
  workplace?: string;
  achievement?: string;
  description?: string;
  email?: string;
  phone?: string;
  social_media?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  created_at?: string;
  updated_at?: string;
}

/**
 * Alumni response with pagination
 */
export interface AlumniResponse {
  success: boolean;
  data: Alumni[];
  message?: string;
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

/**
 * Alumni filter parameters
 */
export interface AlumniFilterParams {
  search?: string;
  graduation_year?: number;
  profession?: string;
  class_name?: string;
  limit?: number;
}

/**
 * Alumni statistics
 */
export interface AlumniStats {
  total_alumni: number;
  total_graduation_years: number;
  latest_graduation_year: number;
  top_professions: Array<{
    profession: string;
    count: number;
  }>;
}

/**
 * Featured alumni for showcase
 */
export interface FeaturedAlumni extends Alumni {
  is_featured: boolean;
  featured_order?: number;
}