# SD Muhammadiyah 3 Samarinda — Landing Page

Website publik SD Muhammadiyah 3 Samarinda (Sekolah Kreatif Islam). Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS v4, dan GSAP untuk animasi.

## Stack

| Layer | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (`strict`) |
| Styling | Tailwind CSS v4 + design token di `app/globals.css` |
| Animasi | GSAP + ScrollTrigger, Framer Motion |
| UI | Radix UI (shadcn/ui di `components/ui/`) |
| Data | Fetch ke backend Laravel via `lib/server-api.ts` |
| Security | CSP nonce + header keamanan di `middleware.ts` |

## Menjalankan lokal

```bash
npm install
cp .env .env.local   # sesuaikan kredensial API untuk lokal
npm run dev          # http://localhost:3000
```

Untuk produksi:

```bash
npm run build
npm start
```

## Environment variables

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | ya | Base URL API Laravel, mis. `https://app.sdmuhammadiyah3smd.com/api/v2` |
| `NEXT_PUBLIC_STORAGE_URL` | ya | Base URL file storage, mis. `https://app.sdmuhammadiyah3smd.com/storage` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | tidak | ID GA4, mis. `G-XXXXXXX`. Kosongkan untuk mematikan analitik |
| `NEXT_PUBLIC_GTM_ID` | tidak | ID GTM format `GTM-XXXXXXX` (7 karakter). ID tidak valid diabaikan |
| `API_SECRET_KEY` | tidak | Kunci untuk auth server-side |

File `.env*` tidak di-commit. Untuk build di CI, `NEXT_PUBLIC_API_URL` dan `NEXT_PUBLIC_STORAGE_URL` di-set sebagai dummy env di `.github/workflows/ci.yml` agar prerender tidak memanggil backend.

## Scripts

| Script | Kegunaan |
| --- | --- |
| `npm run dev` | Development server dengan Turbopack |
| `npm run build` | Production build |
| `npm start` | Menjalankan hasil build |
| `npm run verify-dummy-data` | Validasi konfigurasi dummy data |

`npm run lint` sudah terdefinisi di `package.json` tapi belum bisa dipakai: ESLint dan file konfigurasi-nya belum terpasang.

## Struktur folder

```
app/          Rute App Router (page, layout, loading, error per segment)
components/
  landing/    Section untuk homepage
  ui/         Primitif shadcn/ui (tidak boleh import kode fitur)
  navigation/ Header dan menu
lib/          Fetch server, helper metadata, konfigurasi sekolah
types/        Tipe TypeScript per domain
public/       Aset statis (gambar, video, font)
middleware.ts CSP nonce + header keamanan untuk semua route
```

## Konvensi

- **Server Component secara default.** `"use client"` hanya untuk komponen yang butuh event handler, state, atau API browser — pushed serendah mungkin di tree.
- **Route segment** `kebab-case`, komponen `PascalCase.tsx`, sisanya `camelCase.ts`.
- **`components/ui/`** tidak boleh mengimpor kode fitur. Kode yang diulang 3+ kali diekstrak ke komponen, hook, atau design token.
- Token warna dan utilitas global ada di `app/globals.css`. Jangan hardcode nilai yang sudah punya token.
- Ganti `middleware.ts` ke `proxy.ts` sewaktu Next.js 16 selesai deprecated `middleware` (peringatan muncul saat build).

## Performa

Target: LCP < 2,5s · CLS < 0,1 · INP < 200ms (mobile, throttling 4G). Ukur dengan `next build && next start` — jangan `next dev`.

Pola yang sudah dipakai di homepage:
- Aset hero dioptimalkan: poster WebP 828px (82KB) dan video 720p tanpa audio (1,8MB) yang dimuat hanya setelah browser idle.
- `HomeAnimationsLazy` (Client Component) memuat GSAP secara lazy dengan `dynamic({ ssr: false })` agar tidak memblokir FCP/LCP. `ssr: false` tidak boleh dipakai langsung di Server Component.
- Embed YouTube memakai pola facade click-to-play (`youtube-nocookie.com`) supaya player dan cookie pihak ketiga tidak diunduh sampai pengguna menekan tombol putar.
- `prefers-reduced-motion` dihormati di animasi dan video hero.

## CI

`.github/workflows/ci.yml` berjalan tiap push dan PR ke `main`: job **typecheck** (`tsc --noEmit`) lalu job **build** (`next build`).

Typecheck jadi job terpisah karena `next.config.mjs` menyetel `typescript.ignoreBuildErrors: true` — tanpa job ini error tipe tidak menggagalkan build. Workflow sengaja belum menjalankan lint dan test: ESLint dan Jest belum terpasang di `package.json`.
