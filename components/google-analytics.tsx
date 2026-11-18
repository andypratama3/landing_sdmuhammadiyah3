'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface GoogleAnalyticsProps {
  nonce?: string;
}

// Format container GTM: "GTM-" diikuti 4+ karakter alfanumerik.
// Pemeriksaan lama menuntut TEPAT 7 karakter, padahal container asli
// GTM-T28Z28V9 punya 8 — akibatnya gtm.js tidak pernah dirender sama
// sekali. Lolos-tidak-valid lebih murah daripada gagal-terima: container
// salah hanya memuat wadah kosong, tidak merusak halaman.
const isValidGtmId = (id?: string) => !!id && /^GTM-[A-Z0-9]{4,}$/.test(id);

// gtag disuntik runtime oleh script GA, jadi tidak ada di tipe Window.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Pageview untuk SEMUA halaman (config memakai send_page_view: false).
 *
 * App Router berpindah halaman tanpa reload, jadi gtag('config') saja tidak
 * cukup — tanpa komponen ini seluruh traffic antar halaman hilang dari GA4.
 *
 * - gtag baru ada setelah Script afterInteractive jalan, jadi ditunggu
 *   sebentar (maks ~10 detik) alih-alih langsung menyerah.
 * - React StrictMode (dev) menjalankan effect dua kali; `sent` mencegah
 *   pageview yang sama terkirim dua kali.
 */
function PageView() {
  const pathname = usePathname();
  const sent = useRef<string | null>(null);

  useEffect(() => {
    if (sent.current === pathname) return;

    let tries = 0;
    const timer = window.setInterval(() => {
      if (typeof window.gtag !== "function") {
        if (++tries > 40) window.clearInterval(timer);
        return;
      }
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
      sent.current = pathname;
      window.clearInterval(timer);
    }, 250);

    return () => window.clearInterval(timer);
  }, [pathname]);

  return null;
}

export default function GoogleAnalytics({ nonce }: GoogleAnalyticsProps) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  // ID proyek Clarity (publik, tertanam di sumber halaman mana pun).
  // Hardcode agar pasti ikut ter-deploy; env-nya bisa menimpa kapan saja.
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "zfj6a0234g";

  return (
    <>
      {/* Google Tag Manager */}
      {isValidGtmId(GTM_ID) && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        </>
      )}

      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            nonce={nonce}
            suppressHydrationWarning
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="ga-script"
            strategy="afterInteractive"
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  // Matikan pageview otomatis: <PageView /> mengirimnya untuk
                  // SEMUA halaman, termasuk yang pertama. Tanpa ini beranda
                  // terhitung dua kali (config + PageView).
                  send_page_view: false,
                });
              `,
            }}
          />
        </>
      )}
      {/* Pageview untuk semua halaman — termasuk yang pertama, karena
          config memakai send_page_view: false */}
      {GA_MEASUREMENT_ID && <PageView />}

      {/* Microsoft Clarity — rekaman sesi + heatmap. Dimuat paling akhir dan
          tanpa cookie banner tambahan; Clarity sudah menangani consent sendiri
          lewat cookie consent yang ada. */}
      {CLARITY_ID && (
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
}

// GTM NoScript fallback component
export function GTMNoScript() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  
  if (!isValidGtmId(GTM_ID)) return null;
  
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// Hook untuk tracking custom events
export function useGoogleAnalytics() {
  const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  };

  return { trackEvent };
}