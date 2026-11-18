# Project: emirozturkdev Keystatic CMS & Academic/Blog Expansion

## Architecture
- **Framework**: Next.js 16.1.6 App Router, React 19.2.3, Tailwind CSS v4, Motion v14 (`LazyMotion` strict mode with `m.*`).
- **CMS Layer**: Keystatic CMS configured with `storage: { kind: 'github', repo: 'BombaStudio/emirozturkdev' }` in production and local dev fallback.
- **Data Layer**: Hybrid content layer in `src/lib/content.ts` reading Keystatic collections with fallback to `src/data/portfolio.ts` so all existing routes, tests, and builds remain 100% resilient.
- **Filtering & URL Sync**: Memoized helper `src/lib/filterProjects.ts` using `WeakMap` cache; `components/projects/projects-grid.tsx` synchronized with URL search parameters (`?category=...`) via non-destructive queries, `router.replace(url, { scroll: false })`, and `<Suspense>` SSR hydration.
- **Dynamic Routing**: Detail routes `/projects/[slug]`, `/experience/[slug]`, `/academic/[slug]`, and `/blog/[slug]` with async Next.js 16 `params` and `generateStaticParams()`.
- **Media & Embeds**: Privacy-enhanced responsive YouTube player using `youtube-nocookie.com` in `16:9` aspect ratio container.
- **Design System Invariants**: "Quiet Luxury" palette (`#f8f7f4` background, `#1a1a18` foreground, `#7a7a76` muted, `#e0dfdc` border), DM Sans and JetBrains Mono fonts, `.label`, `.card-surface`, `.pressable`, hairline borders, and Apple-style spring animations.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Architecture & Action Plan Document | Comprehensive planning document approved by user | M0 | Approved |
| 2 | Core Data Models & Schemas | Distinct interfaces for `ProjectEntity`, `ExperienceEntity`, `AcademicWorkEntity`, and `BlogPostEntity` with `category`, `tags`, `order`, `featured`, `slug` | M1 | R2 |
| 3 | Memoized Filter Helper | `src/lib/filterProjects.ts` supporting category/tag/search, multi-tier sorting, and WeakMap LRU cache | M1 | R2 |
| 4 | URL Query Param Filter Sync | `components/projects/projects-grid.tsx` synced with URL search params without reset or scroll jump | M1 | R2 |
| 5 | Keystatic CMS GitHub Mode | `keystatic.config.ts` targeting `BombaStudio/emirozturkdev` with 4 collections (`projects`, `experience`, `academicWork`, `blog`) | M1 | R3 |
| 6 | Keystatic Admin UI & Route Protection | `/keystatic` admin UI mounting, isolated layout, and GitHub repo write-permission protection | M1 | R3 |
| 7 | Dynamic Detail Pages | Dynamic pages for `/projects/[slug]`, `/experience/[slug]`, `/academic/[slug]` with metadata, links, video embed, and cross-refs | M2 | R6 |
| 8 | Academic Work Section | "Akademik Çalışmalar" section on landing page adhering to design system tokens | M3 | R5 |
| 9 | Dedicated Academic Listing | `/academic` page with category filtering and URL sync | M3 | R5 |
| 10 | Blog MDX System | MDX blog reading and rendering via Server Components with quiet luxury styling | M3 | R4 |
| 11 | Relational Two-Way Cross-References | Bidirectional cross-links between blog posts and referenced entities on detail pages and blog footer | M3 | R4, R6 |
| 12 | Landing Page Integration & Verification | Link featured projects to detail pages, integrate academic section, and pass lint/build/tests | M4 | R7 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Architecture & Action Plan Document | Planning document approved by user | None | DONE |
| M1 | Data Models, Filter Helper & Keystatic Setup | Dependencies, `src/types/content.ts`, `src/lib/filterProjects.ts`, `keystatic.config.ts`, `/keystatic` route, URL sync in projects grid | M0 | DONE |
| M2 | Dynamic Entity Detail Pages & Video Embeds | `/projects/[slug]`, `/experience/[slug]`, `/academic/[slug]`, YouTube embed player, external links, cross-ref cards | M1 | DONE |
| M3 | Academic Listing & Blog MDX Integration | `/academic` listing with category filter, MDX blog system (`/blog/[slug]`), and bidirectional cross-referencing | M1, M2 | DONE |
| M4 | Landing Page Integration & Full Verification | Connect landing page items to detail pages, insert academic section, verify `pnpm build`, `pnpm lint`, `pnpm test:e2e` | M1, M2, M3 | DONE |

## Interface Contracts
### Data Models (`src/types/content.ts` & `src/types/portfolio.ts`)
- All entities inherit from `BaseEntity`: `{ slug: string; order: number; featured: boolean; category: string; tags: string[]; createdAt?: string; }`.
- Backward compatibility: `Job` is an alias of `ExperienceEntity`, `project.techStack` is aliased to `technologies`, `project.type` is aliased to `category`, `project.link` is aliased to `liveUrl ?? githubUrl`.
- `scripts/run-e2e.js` test parsing requirements are preserved.

### Filter Helper Contract (`src/lib/filterProjects.ts`)
- Signature: `filterProjects<T extends Project>(items: T[], options?: FilterProjectsOptions): T[]`.
- Multi-tier sort order: `featured` (first) -> `order` (1, 2, 3...) -> `date` (newest first) -> `title`.
- `WeakMap` cache keyed by project array reference + normalized option string.

### Detail Page Contract (`src/app/**/[slug]/page.tsx`)
- Props: `{ params: Promise<{ slug: string }> }` (Next.js 16 asynchronous params).
- Metadata: `generateMetadata({ params }: Props): Promise<Metadata>`.
- Static Generation: `generateStaticParams(): Promise<{ slug: string }[]>`.

## Code Layout
- `keystatic.config.ts`: Keystatic configuration (GitHub mode targeting `BombaStudio/emirozturkdev`)
- `src/app/keystatic/[[...params]]/page.tsx`: Keystatic admin UI client page
- `src/app/keystatic/layout.tsx`: Keystatic admin full-screen layout isolation
- `src/app/api/keystatic/[...params]/route.ts`: Keystatic API route handler
- `src/app/api/webhook/github/route.ts`: GitHub push webhook for dynamic revalidation
- `src/types/content.ts`: Core TypeScript entity interfaces
- `src/types/portfolio.ts`: Re-exports and backward compatibility types
- `src/lib/filterProjects.ts`: Memoized project filtering and sorting function
- `src/lib/content.ts`: Hybrid content loader (Keystatic reader + portfolio fallback)
- `src/lib/crossReferences.ts`: Bidirectional cross-reference resolution helper
- `src/components/media/youtube-embed.tsx`: Privacy-enhanced YouTube player
- `src/components/relations/cross-references.tsx`: Entity cross-reference cards
- `src/components/academic/academic-grid.tsx`: Academic work grid with URL-synced category filter
- `src/app/academic/page.tsx`: Dedicated academic listing page
- `src/app/academic/[slug]/page.tsx`: Academic work detail page
- `src/app/projects/[slug]/page.tsx`: Project detail page
- `src/app/experience/[slug]/page.tsx`: Experience detail page
- `src/app/blog/page.tsx`: Blog listing page
- `src/app/blog/[slug]/page.tsx`: Blog post MDX detail page
- `src/content/`: Initial JSON/MDX content collections for projects, experience, academicWork, and blog
