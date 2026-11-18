import { Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import ProjectsGrid from "../../../components/projects/projects-grid";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-24 md:pb-32 md:pt-20">
            <header className="mb-12">
              <p className="label">Work</p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Projects
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                A collection of software I&apos;ve built &mdash; from game engines
                to web platforms.
              </p>
            </header>
            <div className="py-12 text-center text-sm text-muted">Loading projects...</div>
          </div>
        </main>
      }
    >
      <ProjectsGrid portfolio={portfolio} />
    </Suspense>
  );
}
