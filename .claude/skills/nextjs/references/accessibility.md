# Accessibility — Next.js

Applies the WCAG 2.1 AA rules from `core-standards` inside the App Router's Server/Client Component model.

## Navigation & focus

`next/link` client-side transitions don't reload the page, which means focus and screen-reader announcements need explicit handling that a full page load gives you for free.

- Give the root layout's `<main>` a stable `id` and, in a small Client Component, move focus to it on route change so keyboard/screen-reader users land somewhere sensible instead of staying on the now-stale link they clicked:
```tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteAnnouncer() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [pathname]);
  return <div ref={ref} tabIndex={-1} className="visually-hidden" aria-live="polite" />;
}
```
- Mark the current nav link with `aria-current="page"` by comparing against `usePathname()` — never with color/weight alone.

## Images

- Always use `next/image`; it enforces `width`/`height` (or `fill` with a sized parent), which is exactly the CLS-prevention rule from `core-standards` — but `alt` is not automatically meaningful. Every `<Image>` still needs a hand-written, descriptive `alt`, and `alt=""` for genuinely decorative images.
```tsx
import Image from "next/image";

<Image src={product.image} alt={`${product.name} product photo, front view`} width={800} height={600} />
```

## Forms (Server Actions)

- Client-side and server-side validation both apply — a Server Action is still a network round trip; validate again on the server (never trust client-only validation), and surface errors accessibly:
```tsx
"use client";
import { useActionState } from "react";

export function SignupForm({ action }: { action: (state: unknown, formData: FormData) => Promise<{ error?: string }> }) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required aria-describedby="email-error" aria-invalid={!!state?.error} />
      {state?.error && <p id="email-error" role="alert">{state.error}</p>}
      <button type="submit" disabled={pending} aria-busy={pending}>
        {pending ? "Submitting…" : "Sign up"}
      </button>
    </form>
  );
}
```

## Modals

Build (or adopt) a modal primitive that implements the pattern from `core-standards/references/accessibility.md` (focus trap, `role="dialog"`, `aria-modal`, `Escape` to close, restore focus on close). Prefer a well-maintained headless primitive (e.g. Radix UI's `Dialog`, React Aria) over hand-rolling focus trapping — it's easy to get subtly wrong, and a shared primitive means every modal in the app inherits the fix.

## Metadata & language

- Set `lang` via the root `app/layout.tsx`:
```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
- Use the [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) (`export const metadata` / `generateMetadata`) to set a specific, descriptive `<title>` per route — screen reader users rely on the title to know a navigation succeeded.

## Loading and error states are accessibility features too

`loading.tsx` and `error.tsx` aren't just UX polish — an unannounced loading spinner or a silently blank error boundary is invisible to a screen reader user. Give the loading UI an `aria-live="polite"` region or accessible name, and make `error.tsx` announce via `role="alert"` (see `core-standards/references/visually-impaired-support.md`).

## Linting

```bash
# already included in eslint-config-next
npx next lint
```
`eslint-config-next` bundles `eslint-plugin-jsx-a11y` — keep it enabled (don't disable individual `jsx-a11y` rules without a specific, documented reason) and treat violations as build-breaking in CI.
