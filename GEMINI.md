# Project Overview: emirozturkdev

This is the personal portfolio website of **Emir Öztürk**, a Physics student and Software Developer. The project is built with a "raw" and brutalist engineering philosophy, focusing on high impact and performance.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Runtime:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/) via [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Drei](https://drei.docs.pmnd.rs/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment & Analytics:** [Vercel](https://vercel.com/) (Speed Insights & Analytics)

## Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/data/portfolio.ts`: Centralized data store for personal info, jobs, projects, and links. **Update this file to change site content.**
- `components/`: Reusable React components (Header, Footer, HeroBackground, etc.).
- `public/`: Static assets including icons and project images.

## Building and Running

The project uses `pnpm` as the package manager.

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## Development Conventions

### Content Management
All portfolio content (jobs, projects, descriptions) is managed in `src/data/portfolio.ts`. Avoid hardcoding text directly in page components unless it's structural.

### Styling and Aesthetics
- **Brutalist Design:** The site follows a minimalist, brutalist aesthetic with high contrast, uppercase text, and monospaced accents.
- **Dark Mode:** Primarily optimized for dark mode (zinc-50 on black).
- **Typography:** Uses Geist and Geist Mono fonts.

### 3D and Animations
- Use `HeroBackground.tsx` for 3D interactions.
- Use `framer-motion` for entrance animations and scroll-based visibility.

### Verification
- Ensure any new project or job added to `src/data/portfolio.ts` follows the existing TypeScript interfaces (`Project`, `Job`, etc.).
- Run `pnpm lint` before pushing changes.
