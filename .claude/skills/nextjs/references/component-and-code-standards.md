# Component & Code Standards — Next.js

## App Router folder structure

```
app/
  layout.tsx                # root layout: <html>, <body>, global providers
  page.tsx                  # route: /
  loading.tsx                # route-level loading UI (wraps page in a Suspense boundary)
  error.tsx                  # route-level error boundary ("use client" required)
  not-found.tsx
  globals.css
  (marketing)/                # route group — organizes without affecting the URL
    about/
      page.tsx
  dashboard/
    layout.tsx                # nested layout for everything under /dashboard
    page.tsx
    settings/
      page.tsx
    [projectId]/               # dynamic segment
      page.tsx
  api/
    users/
      route.ts                 # Route Handler

components/
  ui/                          # shared, feature-agnostic components (Button, Modal, Input…)
  <feature>/                    # components used by a single feature/route only

lib/                            # shared utilities, formatting, validation, API clients
hooks/                          # shared custom hooks
types/                          # shared TypeScript types
```

- **Route segment folders** (inside `app/`) use `kebab-case` to match the URL they produce (`app/user-settings/page.tsx` → `/user-settings`), matching Next.js/URL convention.
- **Component files** use `PascalCase.tsx` (`ProductCard.tsx`), matching the exported component name.
- **Everything else** (`lib/`, `hooks/`, `utils`) uses `camelCase.ts` per the general `core-standards` rule (`formatCurrency.ts`, `useDebounce.ts`).
- Colocate a route's own tests/styles/small subcomponents beside its `page.tsx` when they're not reused elsewhere; promote to `components/ui/` the moment a second route needs them (DRY — see `core-standards/references/code-quality-style.md`).

## Server vs. Client Components

- **Default to Server Components.** Only add `"use client"` when the component genuinely needs: browser-only APIs (`window`, `localStorage`), interactivity (`onClick`, `onChange`), React state/effects (`useState`, `useEffect`), or a third-party library that itself requires the client.
- **Push the boundary down.** Don't mark an entire page `"use client"` because one button needs an `onClick` — extract that button into its own small Client Component and keep the rest of the tree server-rendered.
- **Server Components can't** use hooks, browser APIs, or event handlers, and can't be imported into Client Components with server-only code inside them — but they *can* be passed as `children`/props into Client Components, which is the standard pattern for "a client wrapper around mostly-server content":
```tsx
// Interactive.tsx — "use client"
"use client";
export function Interactive({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div onClick={() => setOpen(!open)}>{children}</div>;
}

// page.tsx — Server Component
export default async function Page() {
  const data = await getData(); // server-only fetch, no client JS cost
  return (
    <Interactive>
      <ExpensiveServerRenderedContent data={data} />
    </Interactive>
  );
}
```

## Data fetching

- Fetch data directly in Server Components (`async function Page()`), as close to where it's used as possible — no client-side `useEffect` fetch waterfall for data that's known at request/build time.
- Use Route Handlers (`app/api/.../route.ts`) for endpoints your own client-side code or external services call — not as a proxy for data a Server Component could fetch directly.
- Be deliberate about caching (`cache`, `next: { revalidate }` — see `references/performance.md`). Accidentally caching per-user or frequently-changing data (or accidentally *not* caching cacheable data) is one of the most common Next.js App Router bugs.

## Typing

- `strict: true` in `tsconfig.json`. No `any`.
- Type route params and search params explicitly:
```tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) { /* ... */ }
```
- Server Actions get an explicit input/output type, and their inputs are validated (e.g. with Zod) — never trust `FormData` shape implicitly.

## Anti-patterns specific to Next.js

- Marking a component `"use client"` "just in case" — audit new client boundaries in review; every one has a real, stated reason.
- Fetching in a Client Component with `useEffect` when the same data could be fetched server-side in the parent Server Component (causes a client-visible fetch waterfall and a worse LCP than server-fetched data).
- Using a raw `<img>` or `<a>` instead of `next/image`/`next/link` without a specific reason (external, unoptimizable image source; genuinely need a full page reload).
- Importing a large third-party library at the top of a Server Component tree when only a small Client Component actually needs it — import it inside the Client Component instead so it's excluded from the server bundle and only loaded when that Client Component actually renders.
