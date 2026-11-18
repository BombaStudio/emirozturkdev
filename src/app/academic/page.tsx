import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAcademicWork } from "@/lib/content";
import AcademicGrid from "@/components/academic/academic-grid";

export const metadata: Metadata = {
  title: "Academic Work & Research — Emir Öztürk",
  description:
    "Publications, undergraduate theses, and symposium presentations in physics, non-linear dynamics, and computer science by Emir Öztürk.",
  openGraph: {
    title: "Academic Work & Research — Emir Öztürk",
    description:
      "Publications, undergraduate theses, and symposium presentations in physics, non-linear dynamics, and computer science.",
    type: "website",
    url: "/academic",
  },
};

export const revalidate = 60;

function AcademicPageSkeleton() {
  return (
    <div className="py-16 text-center font-mono text-xs text-muted">
      Loading publications...
    </div>
  );
}

export default async function AcademicPage() {
  const works = await getAcademicWork();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-24 md:pb-32 md:pt-20">
        {/* Breadcrumb back navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Home</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="label">Research & Publications</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Academic Work
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Publications, undergraduate research theses, and technical symposium presentations investigating chaos theory, quantum search algorithms, and game engine architecture.
          </p>
        </header>

        {/* Hydrated Grid with SSR Suspense boundary */}
        <Suspense fallback={<AcademicPageSkeleton />}>
          <AcademicGrid initialWorks={works} />
        </Suspense>
      </div>
    </main>
  );
}
