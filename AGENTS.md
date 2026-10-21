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
  - `components/header/scroll-state.tsx` — toggles `html[data-scrolled]` via rAF (header material)
  - `components/header/nav-links.tsx` — `usePathname` active-route pill (`layoutId`)
  - `components/header/mobile-menu.tsx` — portal sheet, drag-to-dismiss, focus trap
  - `components/reveal.tsx` — IntersectionObserver scroll reveal (home only, DOM-attribute driven)
  - `components/projects/projects-grid.tsx` — filter state + segmented pill
  - `components/contact/contact-form.tsx` — inline validation + form submission
  - `src/app/resume/resume-client.tsx` — title selector + window.print()
  - `components/motion-provider.tsx` — `LazyMotion` + `domMax` + `strict` (root layout)
- **Routes**: `/` (homepage, RSC), `/projects` (RSC + client grid), `/contact` (RSC + client form), `/resume` (RSC + client view), `/api/contact` (POST → Telegram)
- **Motion**: `motion` v14. Import only `m.*` components (never `motion.*`) — `LazyMotion strict` throws otherwise. Presets live in `src/lib/motion.ts` (`spring`, `project`, `rubberband`, `velocityFromSamples`, `dismissVelocity`, `dismissRatio`).

## Design System — "Quiet Luxury" (Light)

- **Background**: `#f8f7f4` (warm cream) via `bg-background`
- **Foreground**: `#1a1a18` (warm near-black) via `text-foreground`
- **Muted**: `#7a7a76` via `text-muted`
- **Border**: `#e0dfdc` via `border-border`
- **Surface**: `#ffffff` via `bg-surface`
- **Typography drives hierarchy** — no accent color, no decorative effects, text-based navigation/buttons
- **Fonts**: DM Sans (`--font-dm-sans`, variable 100–1000), JetBrains Mono (`--font-jetbrains-mono`) via `next/font/google`
- **Selection**: foreground color on background (inverted)
- **Extra tokens** (`@theme inline`): `elevated`, `hairline` (alpha), `scrim` (alpha), `--shadow-subtle`, `--shadow-lifted`, `--ease-apple` (standard), `--ease-apple-out` (decelerate)
- **Component classes** (`@layer components` in `globals.css`):
  - `.label` — 11px mono, `0.14em` tracking, uppercase, muted (all section eyebrows / form labels)
  - `.pressable` — press feedback `scale(0.97)` on `:active`
  - `.material` / `.site-header` — translucent + `backdrop-filter`; header thickens on `html[data-scrolled]` and shows a scroll-edge gradient via `::after`
  - `.card-surface` — hairline border, `1rem` radius, subtle shadow
  - `.reveal` — opacity/translate transition driven by `data-reveal="hidden|shown"`
- **A11y guards**: `prefers-reduced-motion` (kills CSS transitions, press scale, smooth scroll; Motion islands check `useReducedMotion`), `prefers-reduced-transparency` (opaque fallbacks), `prefers-contrast: more`
- **Elevation & rhythm**: sections use `py-24 md:py-32` + `border-t border-hairline`; primary CTA is filled (`bg-foreground text-background`), secondary is text-only

## Component Structure

```
components/
  header/
    index.tsx        RSC — logo + NavLinks + MobileMenu (fixed, `.site-header`)
    scroll-state.tsx "use client" — html[data-scrolled] toggle
    nav-links.tsx    "use client" — desktop nav + active-route pill
    mobile-menu.tsx  "use client" — portalled sheet, drag dismiss, focus trap
  motion-provider.tsx  "use client" — LazyMotion + domMax + strict
  reveal.tsx           "use client" — scroll reveal wrapper
  Footer.tsx            RSC
  projects/
    projects-grid.tsx   "use client" — segmented filter + card grid
  contact/
    contact-form.tsx    "use client" — inline validation + Telegram POST
src/
  app/
    page.tsx            RSC — hero, about, featured projects, experience
    layout.tsx          RSC — MotionProvider, skip link, `#main` wrapper
    resume/resume-client.tsx  "use client" — title selector + window.print()
  lib/motion.ts         spring/physics presets
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
- **`globals.css` element rules must live inside `@layer base`** — unlayered `p`/`a`/`h*` rules beat every Tailwind utility (cascade layers), which silently breaks `text-foreground/80`, `tracking-*`, etc.
- `@theme inline` still emits the vars in `@layer theme`, so `var(--color-*)` / `var(--shadow-*)` are usable in handwritten CSS
- Motion is imported only through `m.*`; `LazyMotion strict` throws on `motion.*`. `drag` and `layoutId` need `domMax` (not `domAnimation`)
- `/resume` content must not animate — resuming a Motion opacity animation during print can wash out the CV. Only the selector pill animates there
- `.env.local` contains Vercel OIDC token + Telegram credentials (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- Contact form `/api/contact` POSTs to Telegram Bot API; GET returns health check
- 3 E2E tests expected to fail: test 52 (case-sensitive href check), test 53 (legacy nav naming), test 58 (removed terminal feature)
- Reference docs: `GEMINI.md`, `PROJECT.md`, `TEST_INFRA.md`, `TEST_READY.md`, `DESIGN_REVISION_PLAN.md`
