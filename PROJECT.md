# Project: emirozturkdev Redesign & CV System

## Architecture
- **Framework**: Next.js App Router (React 19, Tailwind CSS v4)
- **Data Layer**: Centralized portfolio data stored in `src/data/portfolio.ts`.
- **Navigation/Routes**:
  - `/` (MANIFESTO / Home)
  - `/projects` (ENGINEERING / Projects)
  - `/contact` (CONTACT)
  - `/resume` (CV / Resume page)
- **Styling**: Brutalist design (high contrast, monospaced fonts, minimal bloat, dark mode optimized) with specific print layout rules for the resume.

## Code Layout
- `src/app/page.tsx`: Manifesto / Home page
- `src/app/projects/page.tsx`: Projects / Engineering page
- `src/app/contact/page.tsx`: Contact page
- `src/app/resume/page.tsx`: ATS-compliant digital & print CV/Resume page
- `components/`: UI components (Header, Footer, HeroBackground, etc.)
- `src/data/portfolio.ts`: Portfolio data store
- `src/app/globals.css`: Tailwind v4 styles and global rules

## Milestones
| # | Name | Scope | Dependencies | Status | Conversation ID |
|---|------|-------|--------------|--------|-----------------|
| 1 | E2E Test Infra & Cases | Design E2E test suite (Tiers 1-4) and publish `TEST_READY.md` | None | DONE | 4e60a106-6b40-4083-8fed-e51bb105449f |
| 2 | Background Research | Research Emir's achievements and update `src/data/portfolio.ts` programmatically | None | DONE | 9f5459c9-4712-4e58-bc46-154f01ea9d51 |
| 3 | Brutalist UI Redesign | Redesign homepage, projects page, and contact page for modularity and responsiveness | M2 | DONE | 259b0463-62e3-4031-bbc0-acfca744ef00 |
| 4 | ATS CV Page | Implement `/resume` page with responsive screen view and ATS print-ready layout | M3 | DONE | 259b0463-62e3-4031-bbc0-acfca744ef00 |
| 5 | E2E Integration & Verification | Pass 100% of E2E tests across all tiers (Tier 1-4) | M1, M4 | IN_PROGRESS | 2662bfab-2a71-4e4b-b1f9-7390e25d40f1 |
| 6 | Adversarial Hardening | White-box coverage analysis and adversarial testing (Tier 5) | M5 | PLANNED | |

## Interface Contracts
### Portfolio Data (`src/data/portfolio.ts`)
- The updated file must export the `portfolio` object conforming to the `Portfolio` type.
- All links must be active and correct.
- Job descriptions, project descriptions, and achievements must be fully populated.

### ATS CV Print Media Rules (`src/app/resume/page.tsx`)
- High-contrast digital view, black-and-white print view.
- `@media print` must reset backgrounds to pure white, text to pure black, hide non-resume elements (header, footer, nav), and use standard web-safe serif/sans-serif fonts.
- Content must split cleanly across standard A4/Letter pages without truncation, clipping, or overlapping text.
