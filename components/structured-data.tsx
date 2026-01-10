'use client';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://sdmuhammadiyah3smd.com/#organization",
    "name": "SD Muhammadiyah 3 Samarinda",
    "alternateName": "Sekolah Kreatif Muhammadiyah 3 Samarinda",
    "url": "https://sdmuhammadiyah3smd.com",
    "logo": "https://sdmuhammadiyah3smd.com/SD3_logo1.png",
    "image": "https://sdmuhammadiyah3smd.com/SD3_logo1.png",
    "description": "Sekolah Dasar Islam unggulan di Samarinda yang fokus pada pengembangan karakter, pembelajaran inovatif, dan tahfidz Al-Qur'an. Akreditasi A dan Sekolah Penggerak.",
    "foundingDate": "1985", // Sesuaikan dengan tahun berdiri
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Dato Iba RT. 04/IV, Sungai Keledang",
      "addressLocality": "Samarinda Seberang",
      "addressRegion": "Kalimantan Timur",
      "postalCode": "75242",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-0.4945", 
      "longitude": "117.1436"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-852-5044-3151",
      "contactType": "Customer Service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian"],
      "email": "info@sdmuhammadiyah3smd.com" 
    },
    "sameAs": [
      "https://www.facebook.com/sekolahkreatif.muhammadiyahsamarinda",
      "https://www.instagram.com/SekolahKreatifSamarinda",
      "https://www.youtube.com/@sekolahkreatifsdmuhammadiy2812"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Program Pendidikan",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Tahfidz Al-Qur'an 2 Juz",
            "description": "Program menghafal Al-Qur'an dengan metode yang mudah dan menyenangkan"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Pembelajaran Berbasis Edutainment",
            "description": "Belajar sambil bermain dengan metode yang menyenangkan"
          }
        }
      ]
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://sdmuhammadiyah3smd.com/#website",
    "url": "https://sdmuhammadiyah3smd.com",
    "name": "SD Muhammadiyah 3 Samarinda",
    "description": "Website resmi SD Muhammadiyah 3 Samarinda - Sekolah Kreatif",
    "publisher": {
      "@id": "https://sdmuhammadiyah3smd.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sdmuhammadiyah3smd.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "id-ID"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://sdmuhammadiyah3smd.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}