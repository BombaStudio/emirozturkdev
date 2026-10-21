"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Portfolio, ProjectType } from "@/data/portfolio";
import { spring } from "@/lib/motion";

interface ProjectsGridProps {
  portfolio: Portfolio;
}

const categories: { label: string; value: ProjectType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: ProjectType.WEB },
  { label: "Mobile", value: ProjectType.MOBILE },
  { label: "Game", value: ProjectType.GAME },
  { label: "AI", value: ProjectType.AI },
  { label: "System", value: ProjectType.SYSTEM },
  { label: "Web3", value: ProjectType.WEB3 },
  { label: "Other", value: ProjectType.OTHER },
];

export default function ProjectsGrid({ portfolio }: ProjectsGridProps) {
  const [filter, setFilter] = useState<ProjectType | "all">("all");
  const reduceMotion = useReducedMotion();

  const filteredProjects =
    filter === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.type === filter);

  return (
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

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Filtre — Apple segmented control davranışı, dikey listede */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <p className="label mb-3 hidden md:block">Filter</p>

              <ul
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap gap-1 md:flex-col md:items-start"
              >
                {categories.map((cat) => {
                  const active = filter === cat.value;

                  return (
                    <li key={cat.value}>
                      <button
                        type="button"
                        onClick={() => setFilter(cat.value)}
                        aria-pressed={active}
                        className={`pressable relative flex h-9 items-center rounded-full px-3 text-sm ${
                          active
                            ? "text-foreground"
                            : "text-muted hover:text-foreground"
                        }`}
                      >
                        {active && (
                          <m.span
                            layoutId="filter-pill"
                            className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                            transition={spring.standard}
                          />
                        )}
                        <span className="relative">{cat.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p
                aria-live="polite"
                className="mt-5 font-mono text-xs text-muted/70"
              >
                Showing {filteredProjects.length} of {portfolio.projects.length}{" "}
                projects
              </p>
            </div>
          </div>

          {/* Kartlar */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <m.a
                  key={`${filter}-${project.title}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { ...spring.snappy, delay: Math.min(index * 0.02, 0.12) }
                  }
                  className="card-surface pressable group flex flex-col p-5 hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="label">
                      {project.type}
                      {project.tag !== "project" && (
                        <span className="ml-2 text-muted/50">{project.tag}</span>
                      )}
                    </span>
                    <span
                      aria-hidden
                      className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
                    >
                      &#8599;
                    </span>
                  </div>

                  <h2 className="mt-3 text-base font-medium text-foreground">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] text-muted/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </m.a>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="card-surface px-6 py-16 text-center">
                <p className="text-sm text-muted">
                  No projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
