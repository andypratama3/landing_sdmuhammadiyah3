# Performance — Next.js

Next.js ships built-in levers for LCP, CLS, and INP — use them by default rather than reaching for manual solutions the framework already solves.

## LCP

- **`next/image`** for every image: automatic `srcset`/`sizes`, modern-format serving (WebP/AVIF where supported), and lazy-loading by default for anything *not* marked `priority`.
- Mark the actual LCP image with the `priority` prop — this preloads it and opts it out of lazy-loading. Only one (or a small, deliberate few) image per route should carry `priority`; overusing it defeats its purpose.
```tsx
<Image src={hero} alt="…" width={1600} height={900} priority />
```
- **`next/font`** (`next/font/google` or `next/font/local`) self-hosts and inlines font-loading with automatic `font-display: swap` and no extra render-blocking request to a third-party font host — always prefer it over a manual `<link>` to Google Fonts or similar.
```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });
```
- **Rendering strategy affects TTFB, which gates LCP.** Prefer static generation (default for routes with no dynamic data dependency) or ISR (`export const revalidate = 60`) over forcing full dynamic SSR (`export const dynamic = "force-dynamic"`) unless the route genuinely needs per-request data. Cache `fetch` calls deliberately:
```tsx
// Cached indefinitely (default) — good for content that rarely changes
const data = await fetch(url);
// Revalidated on an interval — good for content that changes periodically
const data = await fetch(url, { next: { revalidate: 3600 } });
// Never cached — only when the data must be fresh on every request
const data = await fetch(url, { cache: "no-store" });
```

## CLS

- `next/image` requires `width`/`height` (or `fill` inside a sized, `position: relative` parent) by design — never bypass this with a raw `<img>` tag, which reintroduces the exact layout-shift risk `next/image` exists to prevent.
- Reserve space for any dynamically loaded, non-image content (ads, embeds, banners injected client-side) the same way — a sized container before the content arrives.
- Loading UI (`loading.tsx`, `<Suspense fallback>`) should visually approximate the loaded content's dimensions so the swap-in doesn't shift the layout.

## INP

- **Keep Server Components server-only where possible.** Every `"use client"` boundary ships JS to the browser and adds hydration + main-thread work; push `"use client"` as far down the tree as it needs to go (wrap just the interactive leaf, not the whole page) so the rest stays zero-JS Server Components.
- **`<Suspense>` + streaming** for slow, non-critical data: let the shell and critical content paint immediately, stream in the rest, rather than blocking the whole route on the slowest data source.
```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews /> {/* slow data source, doesn't block the rest of the page */}
      </Suspense>
    </>
  );
}
```
- **`next/dynamic`** to code-split heavy, non-critical Client Components (rich text editors, charting libraries, modals) so their JS isn't in the initial bundle:
```tsx
import dynamic from "next/dynamic";
const ChartPanel = dynamic(() => import("./ChartPanel"), { ssr: false });
```
- Memoize expensive client-side computations/components (`useMemo`, `React.memo`) and scope client state as locally as possible — see `core-standards/references/performance-core-web-vitals.md` for the general re-render discipline, which applies fully to any `"use client"` subtree.

## Scripts

- **`next/script`** for all third-party scripts, with the `strategy` matched to actual need:
  - `beforeInteractive` — only for scripts that must run before any hydration (rare; e.g. certain bot-detection/consent scripts).
  - `afterInteractive` (default) — most analytics/tag-manager scripts.
  - `lazyOnload` — anything non-critical that can wait until the browser is idle (chat widgets, non-essential trackers).
```tsx
import Script from "next/script";
<Script src="https://widget.example.com/embed.js" strategy="lazyOnload" />
```

## Measuring

- Run https://pagespeed.web.dev/ and `next build && next start` (never `next dev`, which is unoptimized and unrepresentative) before judging performance.
- `next build` prints a route-by-route bundle size table — watch for a route's First Load JS growing unexpectedly after adding a dependency.
- Use `@next/bundle-analyzer` to inspect what's actually in a bundle when the size table flags a problem:
```bash
npm install --save-dev @next/bundle-analyzer
```
```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
module.exports = withBundleAnalyzer({ /* ...config */ });
```
```bash
ANALYZE=true npm run build
```
