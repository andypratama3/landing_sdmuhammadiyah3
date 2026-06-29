export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sdmuhammadiyah3smd.com'

export const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ||
  'https://dashboard.sdmuhammadiyah3smd.com/storage'

export const SCHOOL = {
  name: 'SD Muhammadiyah 3 Samarinda',
  shortName: 'SDM 3 Samarinda',
  alternateNames: [
    'SD Muhammadiyah 3 SMD',
    'SDM 3 Samarinda',
    'Sekolah Kreatif SD Muhammadiyah 3',
    'Sekolah Kreatif Muhammadiyah 3 Samarinda',
  ],
  tagline: 'Sekolah Kreatif Islam Terbaik di Samarinda',
  url: BASE_URL,
  phone: '(0541) 260066',
  phoneTel: '+62541260066',
  whatsapp: '6285750893938',
  whatsappMessage:
    'Halo, saya ingin mengetahui informasi pendaftaran SD Muhammadiyah 3 Samarinda',
  email: 'sekolahkreatifmuh3@gmail.com',
  foundingDate: '1985',
  npsn: '30404112',
  accreditation: 'Unggul (A)',
  address: {
    street: 'Jl. Dato Iba RT. 04/IV, Sungai Keledang',
    locality: 'Samarinda Seberang',
    city: 'Samarinda',
    region: 'Kalimantan Timur',
    postalCode: '75242',
    country: 'ID',
    full: 'Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242',
  },
  geo: {
    latitude: -0.512217,
    longitude: 117.124294,
  },
  mapsUrl:
    'https://www.google.com/maps/place/Sekolah+Kreatif+SD+Muhammadiyah+3+Samarinda',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9477.659215305792!2d117.12429426373527!3d-0.5122169736669224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67fb245dc458f%3A0xa8ef3e4834a26bd!2sSekolah%20Kreatif%20SD%20Muhammadiyah%203%20Samarinda!5e0!3m2!1sid!2sid!4v1722696990256!5m2!1sid!2sid',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '14:00',
  },
  social: {
    facebook:
      'https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda',
    instagram: 'https://www.instagram.com/SekolahKreatifSamarinda',
    youtube: 'https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812',
  },
  stats: {
    students: 400,
    teachers: 30,
    achievements: 15,
    founded: 1985,
  },
} as const

export const SEO_KEYWORDS = [
  'sd muhammadiyah 3 samarinda',
  'sd terbaik di samarinda',
  'sd swasta samarinda',
  'spmb sd samarinda',
  'sekolah muhammadiyah samarinda',
  'pendaftaran sd muhammadiyah',
  'sd swasta terbaik di samarinda',
  'sekolah sd terbaik di samarinda',
  'jalan dato iba samarinda seberang',
  'sekolah kreatif samarinda',
  'sd islam samarinda',
  'akreditasi a samarinda',
] as const
