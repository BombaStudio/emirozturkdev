"use client";

import { useState } from "react";
import { Portfolio, ProjectType } from "@/data/portfolio";

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

  const filteredProjects =
    filter === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.type === filter);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-24 pt-24 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Projects
          </h1>
          <p className="text-base text-muted max-w-xl">
            A collection of software I&apos;ve built &mdash; from game engines
            to web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <div className="flex flex-wrap gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`text-sm transition-colors cursor-pointer ${
                    filter === cat.value
                      ? "text-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="mb-3">
                <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                  {project.type}
                </span>
                {project.tag !== "project" && (
                  <span className="text-[11px] font-mono text-muted/40 ml-2 uppercase tracking-wider">
                    {project.tag}
                  </span>
                )}
              </div>
              <h2 className="text-base font-medium text-foreground group-hover:text-foreground/70 transition-colors mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-[11px] text-muted/60">
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-sm">
                No projects found in this category.
              </p>
            </div>
          )}

          <div className="mt-10 text-xs text-muted/60 font-mono">
            Showing {filteredProjects.length} of {portfolio.projects.length}{" "}
            projects
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
