# Next.js — Frontend Standards Skill

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-2E7D32?style=for-the-badge)

Enforceable accessibility, performance, and code-quality standards for Next.js App Router projects — Server/Client Component discipline, `next/image`/`next/font`/`next/script` optimization, and Core Web Vitals thresholds.

- **Docs:** [nextjs.org/docs](https://nextjs.org/docs) · [App Router guide](https://nextjs.org/docs/app)
- **Source:** [github.com/vercel/next.js](https://github.com/vercel/next.js)

## What's inside

```
nextjs/
├── SKILL.md                              # entry point Claude/Cursor reads
├── references/
│   ├── accessibility.md                  # navigation focus, Image alt text, Server Action forms, modals
│   ├── performance.md                    # next/image, next/font, next/script, streaming, bundle analysis
│   ├── component-and-code-standards.md   # App Router structure, Server/Client Component rules, typing
│   └── testing-and-tooling.md            # ESLint, Testing Library, Playwright, Lighthouse CI on a real build
└── assets/
    └── RULES.md                          # the enforceable rule file installed into your project
```

## Install

```bash
npx frontend-standard-skills add nextjs
# or
pnpm dlx frontend-standard-skills add nextjs
yarn dlx frontend-standard-skills add nextjs
```

This writes:
- `.claude/skills/nextjs/` — the full skill, usable in Claude Code / claude.ai
- `.cursor/rules/nextjs-frontend-standards.mdc` — Cursor rule
- A section in `CLAUDE.md` and `AGENTS.md`

Or install as a Claude Code plugin:
```
/plugin marketplace add abayomijohn273/frontend_standard_skills
/plugin install nextjs
```

## Example usage

> "Review this new `app/dashboard/page.tsx` — should any of it be a Client Component, and does the image handling meet our Core Web Vitals standards?"

> "Set up `loading.tsx` and `error.tsx` for the `/checkout` route following our standards."

See the [root README](../../README.md) for every install method and the full list of stacks.
