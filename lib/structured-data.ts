import { BASE_URL, SCHOOL } from './school-info'

export type BreadcrumbItem = {
  name: string
  url?: string
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness', 'School'],
    '@id': `${BASE_URL}/#school`,
    name: SCHOOL.name,
    alternateName: SCHOOL.alternateNames,
    url: SCHOOL.url,
    logo: `${BASE_URL}/SD3_logo1.png`,
    image: `${BASE_URL}/SD3_logo1.png`,
    description:
      'Sekolah Dasar Islam unggulan di Samarinda dengan pembelajaran kreatif, tahfidz Al-Qur\'an, akreditasi A, dan prestasi siswa tingkat kota hingga nasional.',
    foundingDate: SCHOOL.foundingDate,
    telephone: SCHOOL.phoneTel,
    email: SCHOOL.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHOOL.address.street,
      addressLocality: SCHOOL.address.locality,
      addressRegion: SCHOOL.address.region,
      postalCode: SCHOOL.address.postalCode,
      addressCountry: SCHOOL.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHOOL.geo.latitude,
      longitude: SCHOOL.geo.longitude,
    },
    hasMap: SCHOOL.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SCHOOL.openingHours.days,
        opens: SCHOOL.openingHours.opens,
        closes: SCHOOL.openingHours.closes,
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Samarinda',
      containedInPlace: {
        '@type': 'State',
        name: 'Kalimantan Timur',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SCHOOL.phoneTel,
      contactType: 'customer service',
      email: SCHOOL.email,
      areaServed: 'ID',
      availableLanguage: ['Indonesian'],
    },
    sameAs: [
      SCHOOL.social.facebook,
      SCHOOL.social.instagram,
      SCHOOL.social.youtube,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SCHOOL.name,
    description: `Website resmi ${SCHOOL.name} - ${SCHOOL.tagline}`,
    publisher: { '@id': `${BASE_URL}/#school` },
    inLanguage: 'id-ID',
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

export function faqSchema() {
  const faqs = [
    {
      q: 'Bagaimana cara mendaftar SPMB SD Muhammadiyah 3 Samarinda?',
      a: 'Pendaftaran dapat dilakukan online melalui halaman SPMB di website resmi atau datang langsung ke sekolah di Jl. Dato Iba, Samarinda Seberang. Hubungi kami via WhatsApp untuk panduan lengkap.',
    },
    {
      q: 'Berapa biaya pendidikan di SD Muhammadiyah 3 Samarinda?',
      a: 'Biaya pendidikan terdiri dari SPP bulanan dan biaya kegiatan. Informasi rincian biaya dapat diperoleh melalui bagian TU atau halaman kontak sekolah.',
    },
    {
      q: 'Apa saja persyaratan pendaftaran siswa baru?',
      a: 'Calon siswa wajib memenuhi usia minimal sesuai ketentuan Kemendikbud, melengkapi akta kelahiran, KK, dan dokumen pendukung lainnya sesuai gelombang pendaftaran.',
    },
    {
      q: 'Kapan jadwal pelajaran SD Muhammadiyah 3 Samarinda?',
      a: 'Jadwal pelajaran tersedia di halaman Jadwal website ini, dapat dilihat per kelas dan diunduh dalam format PDF.',
    },
    {
      q: 'Apa keunggulan SD Muhammadiyah 3 dibanding SD swasta lain di Samarinda?',
      a: 'Keunggulan kami meliputi kurikulum Sekolah Kreatif, program tahfidz, akreditasi Unggul (A), prestasi siswa tingkat kota-provinsi, dan pembinaan karakter Islami.',
    },
    {
      q: 'Di mana lokasi SD Muhammadiyah 3 Samarinda?',
      a: 'Sekolah berlokasi di Jl. Dato Iba RT. 04/IV, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur 75242.',
    },
    {
      q: 'Apakah ada program tahfidz Al-Qur\'an?',
      a: 'Ya, SD Muhammadiyah 3 Samarinda memiliki program tahfidz Al-Qur\'an 2 Juz (Juz 29-30) dengan metode pembelajaran yang menyenangkan.',
    },
    {
      q: 'Bagaimana prestasi siswa SD Muhammadiyah 3 Samarinda?',
      a: 'Siswa kami meraih juara di berbagai lomba seperti panahan, taekwondo, dan akademik tingkat kota hingga provinsi. Lihat halaman Prestasi Siswa untuk detail.',
    },
    {
      q: 'Bagaimana cara menghubungi sekolah?',
      a: `Hubungi kami di telepon ${SCHOOL.phone}, email ${SCHOOL.email}, atau WhatsApp melalui halaman Kontak.`,
    },
    {
      q: 'Apakah SD Muhammadiyah 3 Samarinda sudah terakreditasi?',
      a: 'Ya, SD Muhammadiyah 3 Samarinda telah terakreditasi Unggul (A) dan merupakan Sekolah Penggerak.',
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function spmbEventSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'SPMB SD Muhammadiyah 3 Samarinda 2025/2026',
    description:
      'Penerimaan Peserta Didik Baru SD Muhammadiyah 3 Samarinda tahun ajaran 2025/2026.',
    startDate: '2025-01-10',
    endDate: '2025-03-10',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: SCHOOL.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SCHOOL.address.street,
        addressLocality: SCHOOL.address.city,
        addressRegion: SCHOOL.address.region,
        postalCode: SCHOOL.address.postalCode,
        addressCountry: SCHOOL.address.country,
      },
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: SCHOOL.name,
      url: SCHOOL.url,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/spmb`,
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'IDR',
    },
  }
}

export function articleSchema(article: {
  title: string
  description?: string
  image?: string
  slug: string
  publishedAt?: string
  modifiedAt?: string
  author?: string
}) {
  const imageUrl = article.image || `${BASE_URL}/SD3_logo1.png`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: imageUrl,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author || SCHOOL.name,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SCHOOL.name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/SD3_logo1.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/berita/${article.slug}`,
    },
  }
}

export function achievementSchema(prestasi: {
  title: string
  description?: string
  image?: string
  slug: string
  juara?: string
  date?: string
  level?: string
  type: 'siswa' | 'sekolah'
}) {
  const basePath =
    prestasi.type === 'siswa' ? 'prestasi-siswa' : 'prestasi-sekolah'
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: prestasi.title,
    description: prestasi.description,
    image: prestasi.image || `${BASE_URL}/SD3_logo1.png`,
    startDate: prestasi.date,
    eventStatus: 'https://schema.org/EventCompleted',
    location: {
      '@type': 'Place',
      name: prestasi.level || 'Samarinda',
    },
    award: prestasi.juara,
    url: `${BASE_URL}/${basePath}/${prestasi.slug}`,
    organizer: {
      '@type': 'EducationalOrganization',
      name: SCHOOL.name,
    },
  }
}
