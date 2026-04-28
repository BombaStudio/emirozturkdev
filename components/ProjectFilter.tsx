"use client";

import { ProjectType, ProjectTag } from "../src/data/portfolio";

interface ProjectFilterProps {
  selectedTypes: ProjectType[];
  selectedTags: ProjectTag[];
  onTypeChange: (type: ProjectType) => void;
  onTagChange: (tag: ProjectTag) => void;
  onClearAll: () => void;
}

const typeLabels: Record<ProjectType, string> = {
  [ProjectType.WEB]: "Web",
  [ProjectType.MOBILE]: "Mobile",
  [ProjectType.GAME]: "Game",
  [ProjectType.AI]: "AI",
  [ProjectType.OTHER]: "Other",
};

const tagLabels: Record<ProjectTag, string> = {
  [ProjectTag.PROJECT]: "Project",
  [ProjectTag.JOB]: "Job",
  [ProjectTag.DEMO]: "Demo",
};

export const ProjectFilter = ({
  selectedTypes,
  selectedTags,
  onTypeChange,
  onTagChange,
  onClearAll,
}: ProjectFilterProps) => {
  const hasActiveFilters = selectedTypes.length > 0 || selectedTags.length > 0;

  return (
    <aside className="w-full lg:w-60 shrink-0">
      <div className="sticky top-24 flex flex-col gap-8">
        {/* Project Type */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-xs font-semibold tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400"
          >
            Project Type
          </h3>
          <div className="flex flex-col gap-2.5">
            {Object.values(ProjectType).map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => onTypeChange(type)}
                    className="peer sr-only"
                  />
                  <div
                    className="h-[18px] w-[18px] rounded border border-zinc-300 bg-white transition-all duration-200 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:peer-checked:border-zinc-100 dark:peer-checked:bg-zinc-100"
                  />
                  <svg
                    className="absolute h-3 w-3 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100 dark:text-zinc-900"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
                  {typeLabels[type]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Project Tag */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-xs font-semibold tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400"
          >
            Project Tag
          </h3>
          <div className="flex flex-col gap-2.5">
            {Object.values(ProjectTag).map((tag) => (
              <label
                key={tag}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => onTagChange(tag)}
                    className="peer sr-only"
                  />
                  <div
                    className="h-[18px] w-[18px] rounded border border-zinc-300 bg-white transition-all duration-200 peer-checked:border-zinc-900 peer-checked:bg-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:peer-checked:border-zinc-100 dark:peer-checked:bg-zinc-100"
                  />
                  <svg
                    className="absolute h-3 w-3 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100 dark:text-zinc-900"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-200">
                  {tagLabels[tag]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear All */}
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors self-start underline underline-offset-2"
          >
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
};
