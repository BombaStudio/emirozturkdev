"use client";

import { useState, useMemo } from "react";
import { ProjectItem } from "../../../components/ProjectItem";
import { ProjectFilter } from "../../../components/ProjectFilter";
import { portfolio, ProjectType, ProjectTag } from "../../data/portfolio";

export default function Projects() {
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);

  const handleTypeChange = (type: ProjectType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleTagChange = (tag: ProjectTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
    setSelectedTags([]);
  };

  const filteredProjects = useMemo(() => {
    return portfolio.projects.filter((project) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(project.type);
      const tagMatch =
        selectedTags.length === 0 || selectedTags.includes(project.tag);
      return typeMatch && tagMatch;
    });
  }, [selectedTypes, selectedTags]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 mb-2">
          Projects
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl">
          A curated selection of software engineering crafts, from web
          applications to indie games.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filter Sidebar */}
          <ProjectFilter
            selectedTypes={selectedTypes}
            selectedTags={selectedTags}
            onTypeChange={handleTypeChange}
            onTagChange={handleTagChange}
            onClearAll={handleClearAll}
          />

          {/* Project Grid */}
          <div className="flex-1">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectItem key={project.title} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z"
                  />
                </svg>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  No projects match the selected filters.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-3 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 underline underline-offset-2 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
