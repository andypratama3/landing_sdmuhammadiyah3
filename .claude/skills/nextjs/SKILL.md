---
name: nextjs
description: Frontend engineering standards for Next.js (App Router) projects — Server/Client Component boundaries, next/image and next/font optimization, WCAG 2.1 AA accessibility, and Core Web Vitals performance (LCP, CLS, INP) per https://pagespeed.web.dev/. Use this skill whenever setting up contributor rules for a Next.js project, writing or reviewing App Router pages/layouts/components, deciding whether something needs "use client", auditing a Next.js app's PageSpeed/Lighthouse score, or generating a CLAUDE.md/.cursor/AGENTS.md rules file for a Next.js codebase.
---

# Next.js Frontend Standards

For Next.js projects using the **App Router** (the current default; note in the rules file if a project is still on Pages Router, since the data-fetching and layout conventions differ). Extends the framework-agnostic rules in the `core-standards` skill with Next.js-specific APIs, conventions, and tooling.

## When to use this skill

- Setting up or reviewing contributor rules for a new or existing Next.js project.
- Deciding Server vs. Client Component boundaries, or reviewing a PR that adds an unnecessary `"use client"`.
- Writing or auditing `app/` routes, layouts, loading/error boundaries, images, fonts, or metadata.
- Investigating a Next.js app's PageSpeed Insights / Lighthouse score.
- Generating a `CLAUDE.md`/`.cursor/rules`/`AGENTS.md` for a Next.js codebase.

## Quick reference

| Concern | Rule |
|---|---|
| Rendering | Server Components by default; `"use client"` only where interactivity/browser APIs/hooks are required, pushed as low in the tree as possible |
| Images | Always `next/image`, never a bare `<img>`; `priority` on the LCP image, no `priority` + no explicit `sizes` elsewhere |
| Fonts | `next/font/google` or `next/font/local` — never a render-blocking `<link>` to an external font host |
| Data fetching | Fetch in Server Components / Route Handlers close to where it's used; use `fetch` caching (`cache`, `next: { revalidate }`) deliberately, not by accident |
| Loading/error UX | `loading.tsx` and `error.tsx` per route segment; `<Suspense>` boundaries around slow, non-critical data |
| Scripts | `next/script` with the correct `strategy` (`beforeInteractive`/`afterInteractive`/`lazyOnload`) for any third-party script |
| File naming | Route segment folders: `kebab-case`; component files: `PascalCase.tsx`; everything else: `camelCase.ts` |
| Testing | Vitest/Jest + React Testing Library for units, Playwright for e2e, Lighthouse CI against a real `next build && next start` |

## Reference files

| File | Covers |
|---|---|
| `references/accessibility.md` | Accessible Next.js patterns — Link/Image alt text, focus-on-navigation, accessible modal/form/nav components in App Router |
| `references/performance.md` | `next/image`, `next/font`, `next/script`, streaming/Suspense, bundle analysis, ISR/SSG/SSR trade-offs for Core Web Vitals |
| `references/component-and-code-standards.md` | App Router folder conventions, Server/Client Component rules, data fetching, typing, DRY |
| `references/testing-and-tooling.md` | ESLint (`eslint-config-next`), Testing Library, Playwright, Lighthouse CI against a production build |

The full framework-agnostic baseline lives in the companion `core-standards` skill — install both together; this skill layers Next.js-specific APIs and conventions on top.

## Generating the project rule file

`assets/RULES.md` is self-contained and ready to drop into `CLAUDE.md`, `.cursor/rules/nextjs-frontend-standards.mdc`, or `AGENTS.md` — or run `npx frontend-standard-skills add nextjs`.

## Good vs. bad, at a glance

**Bad — unnecessary client component, bare `<img>`, no loading state:**
```tsx
"use client";
export default function ProductPage({ product }) {
  return (
    <div>
      <img src={product.image} />
      <h1>{product.name}</h1>
    </div>
  );
}
```

**Good — Server Component by default, optimized image, proper semantics:**
```tsx
import Image from "next/image";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <article>
      <Image
        src={product.image}
        alt={product.imageAlt}
        width={800}
        height={600}
        priority
      />
      <h1>{product.name}</h1>
    </article>
  );
}
```
(A `<button onClick>` "Add to cart" inside this same tree lives in its own small Client Component, imported here — keeping the page itself server-rendered.)

## Library reference

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

- Docs: [nextjs.org/docs](https://nextjs.org/docs)
- App Router: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- Source: [github.com/vercel/next.js](https://github.com/vercel/next.js)
