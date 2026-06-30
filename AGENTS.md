# emirozturkdev — Agent Guide

Personal portfolio for Emir Öztürk (software dev + physics student). Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, pnpm, Vercel.

## Commands

- `pnpm dev` — dev server on :3000
- `pnpm build && pnpm start` — production build + serve
- `pnpm lint` — ESLint (run separately; `next.config.ts` does NOT lint during build)
- `pnpm test:e2e` — E2E suite (custom Node runner at `scripts/run-e2e.js`, NOT Playwright)
- `pnpm add <pkg>` — install deps; `pnpm-workspace.yaml` restricts `onlyBuiltDependencies` to `sharp`, `unrs-resolver`

## Architecture

- **Data source**: `src/data/portfolio.ts` is single source of truth. Never hardcode names, links, or text in pages.
- **Path alias**: `@/*` → `./src/*` (import data as `@/data/portfolio`)
- **Server-first RSC**: `"use client"` only where interactivity is required. Current client islands:
  - `components/header/mobile-menu.tsx` — hamburger toggle
  - `components/projects/projects-grid.tsx` — filter state
  - `components/contact/contact-form.tsx` — form submission
  - `src/app/resume/resume-client.tsx` — title selector + window.print()
- **Routes**: `/` (homepage, RSC), `/projects` (RSC + client grid), `/contact` (RSC + client form), `/resume` (RSC + client view), `/api/contact` (POST → Telegram)

## Design System — "Quiet Luxury" (Light)

- **Background**: `#f8f7f4` (warm cream) via `bg-background`
- **Foreground**: `#1a1a18` (warm near-black) via `text-foreground`
- **Muted**: `#7a7a76` via `text-muted`
- **Border**: `#e0dfdc` via `border-border`
- **Surface**: `#ffffff` via `bg-surface`
- **Typography drives hierarchy** — no accent color, no decorative effects, text-based navigation/buttons
- **Fonts**: DM Sans (`--font-dm-sans`), JetBrains Mono (`--font-jetbrains-mono`) via `next/font/google`
- **Selection**: foreground color on background (inverted)

## Component Structure

```
components/
  header/
    index.tsx        RSC — logo + desktop nav links
    mobile-menu.tsx  "use client" — hamburger + overlay
  footer.tsx         RSC
  projects/
    projects-grid.tsx   "use client" — filter buttons + card grid
  contact/
    contact-form.tsx    "use client" — form inputs + Telegram POST
```

## ATS CV Page (`/resume`)

- `@media print` in `globals.css`: pure white background, black text, Arial/Helvetica
- All `print:` utilities override screen styles for ATS compliance
- `print:break-inside-avoid` on every section
- Header/Footer hidden with `print:hidden`
- Nav/hamburger hidden via `print:hidden`
- Full URLs shown inline in print (on project links)

## Local Quirks

- `next.config.ts` suppresses TypeScript errors during build — CI must run `tsc --noEmit` or `pnpm lint` separately
- `.env.local` contains Vercel OIDC token + Telegram credentials (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- Contact form `/api/contact` POSTs to Telegram Bot API; GET returns health check
- 3 E2E tests expected to fail: test 52 (case-sensitive href check), test 53 (legacy nav naming), test 58 (removed terminal feature)
- Reference docs: `GEMINI.md`, `PROJECT.md`, `TEST_INFRA.md`, `TEST_READY.md`
