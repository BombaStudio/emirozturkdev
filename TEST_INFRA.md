# E2E Test Infrastructure

This document outlines the End-to-End (E2E) testing infrastructure, architectural design, and test suite layout implemented for the **emirozturkdev** portfolio and CV system.

## Test Infrastructure Architecture

To ensure maximum reliability, zero environmental dependency drift, and 100% offline capability under secure networks, we have implemented a **dependency-free native Node.js E2E testing framework**.

### Component Breakdown
1. **Runner (`scripts/run-e2e.js`)**: Orchestrates the Next.js server lifecycle, sets up target URLs, tracks assertion states, and formats the test outputs.
2. **Selector Engine (`Element` and `parseHTML`)**: A lightweight HTML parser and query engine written from scratch. It parses standard HTTP response markup into a virtual DOM node tree and exposes `querySelector` / `querySelectorAll` interfaces supporting:
   - Tag selectors (e.g. `a`, `h1`, `meta`)
   - Class name matching, including complex Tailwind classes (e.g. `.md:flex-row`, `.print:hidden`)
   - ID selectors (e.g. `#projects`)
   - Attribute matcher filters (e.g. `[href]`, `[target="_blank"]`, `[href*="github.com"]`, `[href^="mailto:"]`)
   - Hierarchy/descendant traversal (e.g. `header nav a`, `footer div div`)
3. **Data Synchronizer**: Dynamically reads and tokenizes `src/data/portfolio.ts` to retrieve the active portfolio values (name, contact information, project list, etc.) to perform strict, non-hardcoded semantic checks.

### Server Lifecycle Control
- The runner automatically detects whether a Next.js server is already running on the target port (default `3000`).
- If no server is running, the runner spawns a background child process of the dev server using `pnpm dev --port 3000`.
- The runner waits for the server to boot by polling the root endpoint up to 15 seconds.
- Once the suite finishes execution, the runner terminates the spawned background process and exits with the appropriate status code.

---

## Feature Definitions

We test five core features:
1. **Navigation & Routing**: Ensures paths are correctly handled by Next.js, that invalid paths yield proper 404 pages, and that internal routing elements exist.
2. **Portfolio/Data Enrichment Content**: Checks that personal info, jobs history, and project details defined in `src/data/portfolio.ts` are fully and correctly rendered.
3. **External Links Validity**: Verifies all outbound hyperlinks are securely configured, properly formatted, and point to target URLs from the portfolio record.
4. **Responsive Styling**: Asserts the existence of Tailwind CSS breakpoint utility classes in critical grid and flex layouts to guarantee clean presentation across screen sizes.
5. **ATS Print-Media CV Compliance**: Validates that CV rendering layouts properly format for print media (CSS rules for margins, transparent backgrounds, hidden navigation widgets, page-break safeguards, and standard sans-serif/serif typography for ATS parser readability).

---

## 60-TestCase Registry

Below is the list of all 60 tests included in the suite:

### Feature 1: Navigation & Routing (Tests 1–10)
- **TEST_01 (Tier 1)**: Home page `/` returns 200 OK
- **TEST_02 (Tier 1)**: Projects page `/projects` returns 200 OK
- **TEST_03 (Tier 1)**: Contact page `/contact` returns 200 OK
- **TEST_04 (Tier 1)**: Resume page `/resume` returns 200 OK (will fail if page is not yet implemented)
- **TEST_05 (Tier 1)**: Global header is present and contains navigation links
- **TEST_06 (Tier 2)**: Invalid path returns 404 status
- **TEST_07 (Tier 2)**: Trailing slash on projects returns 200 or redirects successfully
- **TEST_08 (Tier 2)**: Case-sensitive check: uppercase route returns 404 (standard Next.js behavior)
- **TEST_09 (Tier 2)**: Rapid concurrent calls to home page resolve without crashes
- **TEST_10 (Tier 2)**: Contact API is alive (GET route exists)

### Feature 2: Portfolio/Data Enrichment Content (Tests 11–20)
- **TEST_11 (Tier 1)**: Hero section displays candidate's name
- **TEST_12 (Tier 1)**: Manifesto section displays biography/about text
- **TEST_13 (Tier 1)**: Home page displays the first 6 portfolio projects
- **TEST_14 (Tier 1)**: Projects archive page displays all portfolio projects
- **TEST_15 (Tier 1)**: Projects page renders filters matching ProjectType enum
- **TEST_16 (Tier 2)**: Project titles match portfolio definition
- **TEST_17 (Tier 2)**: Filter button count matches expected categories
- **TEST_18 (Tier 2)**: Tech stack badges render non-empty tech names
- **TEST_19 (Tier 2)**: Contact page displays location and availability details
- **TEST_20 (Tier 2)**: Footer renders copyright notice and current project year

### Feature 3: External Links Validity (Tests 21–30)
- **TEST_21 (Tier 1)**: Footer GitHub link points to correct profile
- **TEST_22 (Tier 1)**: Footer LinkedIn link points to correct profile
- **TEST_23 (Tier 1)**: Footer YouTube link points to correct channel
- **TEST_24 (Tier 1)**: Footer itch.io link points to correct game page
- **TEST_25 (Tier 1)**: Contact page email link is formatted with mailto protocol
- **TEST_26 (Tier 2)**: All external anchor links use target='_blank'
- **TEST_27 (Tier 2)**: External links contain rel security attributes or are styled inline
- **TEST_28 (Tier 2)**: No anchor href values are blank or empty strings
- **TEST_29 (Tier 2)**: GitHub profile uses secure HTTPS protocol
- **TEST_30 (Tier 2)**: Social link nodes count on contact page matches definition

### Feature 4: Responsive Styling (Tests 31–40)
- **TEST_31 (Tier 1)**: Home page utilizes grid or flex layout with responsive direction
- **TEST_32 (Tier 1)**: Header renders responsive desktop-only class wrapper for nav menu
- **TEST_33 (Tier 1)**: Projects layout matches brutalist responsive grid column requirements
- **TEST_34 (Tier 1)**: Contact layout changes configuration based on screen width
- **TEST_35 (Tier 1)**: Viewport meta tag exists in head configuration for responsive zoom handling
- **TEST_36 (Tier 2)**: Content sections define margin/padding boundaries responsive to width
- **TEST_37 (Tier 2)**: Typography sizes scale responsively for massive Hero text
- **TEST_38 (Tier 2)**: Footer layout container switches axes dynamically on responsive break
- **TEST_39 (Tier 2)**: Header has mobile hamburger toggle button
- **TEST_40 (Tier 2)**: Project tech tags wrap list items to avoid screen overflow clipping

### Feature 5: ATS Print-Media CV Compliance (Tests 41–50)
- **TEST_41 (Tier 1)**: Resume page exists at '/resume' endpoint (planned for M4)
- **TEST_42 (Tier 1)**: CSS stylesheet references print media definitions
- **TEST_43 (Tier 1)**: Header navigation menu is hidden on printed page
- **TEST_44 (Tier 1)**: Footer block is hidden on printed page
- **TEST_45 (Tier 1)**: Print media rules enforce clean serif or sans-serif fonts
- **TEST_46 (Tier 2)**: CV Sections prevent page breaks occurring inside text block elements
- **TEST_47 (Tier 2)**: Interactive terminal elements are completely removed from print views
- **TEST_48 (Tier 2)**: Body text sizing is adjusted to legible point units for print layout
- **TEST_49 (Tier 2)**: Canvas decorative 3D models are hidden from printed media page
- **TEST_50 (Tier 2)**: Borders and background colors reset to clean paper styles

### Tier 3: Cross-Feature Combinations (Tests 51–55)
- **TEST_51**: Header logo routes to home page '/' and renders header
- **TEST_52**: Project source code link on homepage matches portfolio.ts link
- **TEST_53**: Mobile overlay contains identical routes to desktop menu
- **TEST_54**: CV printable pages display same candidate name as portfolio.ts
- **TEST_55**: Social icons in footer are synchronized with contact social targets

### Tier 4: Real-world Application Scenarios (Tests 56–60)
- **TEST_56**: Contact form has required inputs and submits data structure to endpoint
- **TEST_57**: Projects sidebar filters are interactive and exist in DOM
- **TEST_58**: Terminal emulator welcomes input and renders bash help prompt text
- **TEST_59**: Menu UI adapts visibility triggers correctly on responsive viewports
- **TEST_60**: A4 print boundaries are respected on printed output pages without overlaps
