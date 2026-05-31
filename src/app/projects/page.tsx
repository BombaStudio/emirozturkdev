"use client";

import { useState } from "react";
import { portfolio, ProjectType } from "../../data/portfolio";
import { MoveRight } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectType | "ALL">("ALL");

  const filteredProjects = filter === "ALL" 
    ? portfolio.projects 
    : portfolio.projects.filter(p => p.type === filter);

  const categories = ["ALL", ...Object.values(ProjectType)];

  return (
    <main className="min-h-screen bg-black pt-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8">
            ENGINEERING_ARCHIVE
          </h1>
          <p className="max-w-2xl text-lg text-zinc-500 uppercase font-medium leading-tight">
            A repository of hardcore systems, game engines, and decentralized experiments. Built to solve pain.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* PROJECTS LIST */}
          <div className="md:col-span-9 flex flex-col divide-y divide-zinc-900 border-t border-zinc-900">
            {filteredProjects.map((project, i) => (
              <div 
                key={project.title} 
                className="group py-12 flex flex-col md:grid md:grid-cols-8 gap-8 items-start hover:bg-zinc-950 transition-colors cursor-pointer"
              >
                <div className="col-span-1 text-zinc-700 font-mono text-xs uppercase">
                  ID_{i + 1}
                </div>
                
                <div className="col-span-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-900 px-2 py-0.5">
                      {project.type}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">
                      {project.tag}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase group-hover:translate-x-2 transition-transform">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div className="col-span-2 flex flex-col items-start md:items-end gap-4">
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[8px] border border-zinc-800 px-2 py-0.5 text-zinc-600 uppercase tracking-tighter">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                     <a 
                      href={project.link} 
                      target="_blank" 
                      className="flex items-center gap-2 text-[10px] font-bold text-white hover:text-zinc-400 transition-colors uppercase tracking-[0.2em]"
                    >
                      DEPLOYMENT <MoveRight size={10} />
                     </a>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-zinc-500 uppercase font-mono text-xs">NO_PROJECTS_FOUND_IN_THIS_CATEGORY</p>
              </div>
            )}
          </div>

          {/* FILTER SIDEBAR (RIGHT) */}
          <div className="md:col-span-3">
            <div className="sticky top-32">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">FILTERS</h3>
              <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as ProjectType | "ALL")}
                    className={`text-left uppercase font-bold text-xs tracking-widest transition-all ${
                      filter === cat 
                        ? "text-white translate-x-2" 
                        : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {cat}
                    {filter === cat && <span className="ml-2">_</span>}
                  </button>
                ))}
              </div>

              <div className="mt-24 pt-8 border-t border-zinc-900">
                <p className="text-[10px] text-zinc-600 uppercase leading-relaxed">
                  Filtering by engineering classification. <br />
                  Select a category to narrow the archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
