# Testing & Tooling — Next.js

## Linting & formatting

```bash
npx create-next-app  # ships eslint-config-next by default
npm install --save-dev prettier eslint-config-prettier
```
`.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```
`next/core-web-vitals` (built into `eslint-config-next`) enables stricter Core Web Vitals-related rules on top of the base Next.js config, plus `eslint-plugin-jsx-a11y` for accessibility linting — keep both enabled and treat violations as build-breaking in CI.

```bash
npx next lint
```

## Unit & component testing

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```
Test components for behavior and accessibility, not implementation detail — query by role/label the way a screen reader or keyboard user would:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

test("shows a validation error for an invalid email", async () => {
  render(<SignupForm action={mockAction} />);
  await userEvent.type(screen.getByLabelText(/email/i), "not-an-email");
  await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
});
```

## End-to-end testing

```bash
npm install --save-dev @playwright/test
npx playwright install
```
```ts
// e2e/checkout.spec.ts
import { test, expect } from "@playwright/test";

test("user can complete checkout", async ({ page }) => {
  await page.goto("/cart");
  await page.getByRole("button", { name: /checkout/i }).click();
  await expect(page.getByRole("heading", { name: /order confirmed/i })).toBeVisible();
});
```
Add an `@axe-core/playwright` check to at least the app's critical-path e2e tests (see `core-standards` and `html-css/references/testing-and-tooling.md` for the pattern) so accessibility regressions are caught the same way functional ones are.

## Performance testing — against a real production build

Next.js's dev server (`next dev`) is intentionally unoptimized (no minification, different code paths) — **always** measure performance against `next build && next start`, never `next dev`.

```js
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: ['http://localhost:3000/', 'http://localhost:3000/dashboard'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx next lint
      - run: npx vitest run
      - run: npx playwright install --with-deps && npx playwright test
      - run: npx lhci autorun
```

## web-vitals in production

Wire real-user monitoring via the App Router's built-in hook, sending each metric to your analytics endpoint:
```tsx
// app/web-vitals.tsx
"use client";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    navigator.sendBeacon("/api/analytics", JSON.stringify(metric));
  });
  return null;
}
```
Render `<WebVitals />` once in the root layout.
