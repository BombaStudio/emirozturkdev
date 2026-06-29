"use client";

import { useState } from "react";
import { portfolio, ProjectType } from "../../data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectType | "all">("all");

  const filteredProjects =
    filter === "all"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.type === filter);

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

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Projects
          </h1>
          <p className="text-base text-zinc-500 max-w-xl">
            A collection of software I&apos;ve built — from game engines to web
            platforms.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3.5 py-1.5 text-sm rounded-full border transition-colors cursor-pointer ${
                filter === cat.value
                  ? "bg-white text-black border-white"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-zinc-800/50 rounded-lg p-5 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono text-zinc-600 bg-zinc-800/50 px-2 py-0.5 rounded">
                  {project.type}
                </span>
                {project.tag !== "project" && (
                  <span className="text-[11px] font-mono text-zinc-700">
                    {project.tag}
                  </span>
                )}
              </div>
              <h2 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-sm">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* Count */}
        <div className="mt-8 text-xs text-zinc-600 font-mono">
          Showing {filteredProjects.length} of {portfolio.projects.length}{" "}
          projects
        </div>
      </div>
    </main>
  );
}
