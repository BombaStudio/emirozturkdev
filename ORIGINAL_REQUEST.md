# Original User Request

## Initial Request — 2026-06-29T16:30:31+03:00

Redesign and build a professional, responsive, and aesthetically brutalist portfolio website for developer and physics student Emir Öztürk, featuring automated background research of his professional achievements and an ATS-friendly, print-ready CV/Resume page.

Working directory: /mnt/hangar/emirozturkdev
Integrity mode: development

## Requirements

### R1. Auto-Research & Portfolio Data Enrichment
The agent team must research Emir Öztürk's background using the provided links:
- GitHub: https://github.com/BombaStudio
- LinkedIn: https://www.linkedin.com/in/emir-ozturk-dev/
- X (Twitter): https://x.com/GiantProgrammer
- Reddit: https://www.reddit.com/user/itsmethedev/
- Taikai: https://taikai.network/emirozturk
- Google Play Store: https://play.google.com/store/apps/dev?id=9083417276421261563
- itch.io: https://giantprogrammer.itch.io/
Extract real achievements, hackathon participation (e.g., Taikai projects), game releases, app detail profiles, work experiences, and education (Physics Student) and update `src/data/portfolio.ts` programmatically.

### R2. Portfolio Website Redesign & Code Quality
Redesign the homepage and portfolio pages to be simple, fast, fully responsive, and highly aesthetic using the existing monospaced/brutalist theme. Ensure code is modular, clean, and uses standard Next.js best practices with Tailwind CSS v4.

### R3. ATS-Compliant CV/Resume Page
Implement a dedicated route `/resume` (or `/cv`) displaying a digital resume. 
- The on-screen layout should be premium, high-contrast, and clean.
- The print layout (triggered via `@media print` or Ctrl+P) must transform the page into a standard black-and-white grid layout designed for human reading and machine ATS parsers (no background color, standard web-safe fonts, standard headers, clean layout without complex grids/overlapping divs).

## Acceptance Criteria

### Content Accuracy & Integration
- [ ] `src/data/portfolio.ts` is updated with researched details of Emir's real-world projects, Taikai hackathons, indie games, and education.
- [ ] All external profile links (LinkedIn, GitHub, Taikai, Google Play, etc.) are present, active, and work.

### Visual Polish & Responsiveness
- [ ] Every page builds cleanly with no TypeScript/linting errors.
- [ ] Home and Project pages scale smoothly from 320px mobile screens to wide monitors.

### ATS CV Print Compliance
- [ ] A dedicated print stylesheet or CSS rule sets background to pure white and text to dark/black when printed.
- [ ] No layout elements overlap or get truncated across standard page breaks when rendering to PDF/Print.
