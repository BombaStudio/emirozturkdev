"use client";

import { useState, useMemo } from "react";
import { portfolio, ProjectType } from "../../data/portfolio";

type ResumeTitle =
  | "Software Developer"
  | "Game Developer"
  | "Full Stack Developer";

const titleConfig: Record<
  ResumeTitle,
  {
    summary: string;
    projectTypes: ProjectType[];
    highlightSkills: string[];
  }
> = {
  "Software Developer": {
    summary:
      "Versatile software developer with experience across full-stack web development, game development, mobile applications, and blockchain. Strong background in physics with a focus on building high-performance, well-architected systems.",
    projectTypes: [
      ProjectType.WEB,
      ProjectType.MOBILE,
      ProjectType.GAME,
      ProjectType.SYSTEM,
      ProjectType.AI,
      ProjectType.WEB3,
    ],
    highlightSkills: [
      "Languages",
      "Frontend",
      "Backend",
      "Game Dev",
      "Tools & Other",
    ],
  },
  "Game Developer": {
    summary:
      "Game developer experienced in Unity, Unreal Engine, Godot, and custom engine development with Rust. Built multiplayer systems, physics simulations, and WebGL games. Combines physics knowledge with game engineering to create high-performance interactive experiences.",
    projectTypes: [ProjectType.GAME, ProjectType.SYSTEM],
    highlightSkills: ["Languages", "Game Dev", "Tools & Other"],
  },
  "Full Stack Developer": {
    summary:
      "Full-stack developer building scalable web applications with React, Next.js, Laravel, and Node.js. Experienced in enterprise software, REST APIs, database optimization, and modern frontend frameworks. Strong focus on clean architecture and performance.",
    projectTypes: [ProjectType.WEB, ProjectType.MOBILE, ProjectType.AI],
    highlightSkills: ["Languages", "Frontend", "Backend", "Tools & Other"],
  },
};

export default function Resume() {
  const [selectedTitle, setSelectedTitle] =
    useState<ResumeTitle>("Software Developer");

  const config = titleConfig[selectedTitle];
  const { personal, jobs, education, skills } = portfolio;

  const relevantProjects = useMemo(() => {
    const filtered = portfolio.projects.filter((p) =>
      config.projectTypes.includes(p.type)
    );
    return filtered.slice(0, 8);
  }, [config.projectTypes]);

  const relevantSkills = useMemo(() => {
    return skills.filter((s) => config.highlightSkills.includes(s.category));
  }, [skills, config.highlightSkills]);

  // Sort jobs: prioritize relevant titles
  const sortedJobs = useMemo(() => {
    const titleLower = selectedTitle.toLowerCase();
    return [...jobs].sort((a, b) => {
      const aRelevant = a.title.toLowerCase().includes(titleLower.split(" ")[0])
        ? -1
        : 0;
      const bRelevant = b.title.toLowerCase().includes(titleLower.split(" ")[0])
        ? -1
        : 0;
      return aRelevant - bRelevant;
    });
  }, [jobs, selectedTitle]);

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-20">
        {/* Screen Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Resume</h1>
            <p className="text-sm text-zinc-500">
              Select a title to auto-adjust the CV
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-sm border border-zinc-700 text-zinc-300 rounded-md hover:border-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            Print / Download PDF
          </button>
        </div>

        {/* Title Selector */}
        <div className="flex flex-wrap gap-2 mb-10 print:hidden">
          {(Object.keys(titleConfig) as ResumeTitle[]).map((title) => (
            <button
              key={title}
              onClick={() => setSelectedTitle(title)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors cursor-pointer ${
                selectedTitle === title
                  ? "bg-white text-black border-white"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        {/* CV Content */}
        <div className="border border-zinc-800/50 rounded-lg p-6 sm:p-10 print:border-none print:p-0 print:rounded-none">
          {/* CV Header */}
          <header className="pb-6 mb-6 border-b border-zinc-800/50 print:border-black print:pb-4 print:mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white print:text-black">
              {personal.name}
            </h2>
            <p className="text-base text-zinc-400 mt-1 print:text-zinc-700">
              {selectedTitle}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-zinc-500 font-mono print:text-black print:font-sans">
              <span>{personal.contact.email}</span>
              <span>{personal.location}</span>
              <a
                href={personal.contact.github}
                className="hover:text-white transition-colors print:text-black print:underline"
              >
                github.com/BombaStudio
              </a>
              <a
                href={personal.contact.linkedin}
                className="hover:text-white transition-colors print:text-black print:underline"
              >
                linkedin.com/in/emir-ozturk-dev
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8 print:mb-6">
            <h3 className="text-xs font-medium text-zinc-500 mb-3 font-mono print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Summary
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed print:text-black print:font-sans">
              {config.summary}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8 print:mb-6">
            <h3 className="text-xs font-medium text-zinc-500 mb-4 font-mono print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Experience
            </h3>
            <div className="flex flex-col gap-6 print:gap-4">
              {sortedJobs.map((job, i) => (
                <div key={i} className="print:break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                    <h4 className="text-sm font-semibold text-white print:text-black">
                      {job.title}{" "}
                      <span className="font-normal text-zinc-500 print:text-zinc-700">
                        — {job.company}
                      </span>
                    </h4>
                    <span className="text-xs text-zinc-600 font-mono shrink-0 print:text-black print:font-sans">
                      {job.startDate} — {job.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-1 print:text-zinc-700">
                    {job.location}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed print:text-black print:font-sans">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h3 className="text-xs font-medium text-zinc-500 mb-4 font-mono print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Education
            </h3>
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h4 className="text-sm font-semibold text-white print:text-black">
                    {edu.degree}
                  </h4>
                  <span className="text-xs text-zinc-600 font-mono shrink-0 print:text-black print:font-sans">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 print:text-zinc-700">
                  {edu.institution} · {edu.location}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h3 className="text-xs font-medium text-zinc-500 mb-4 font-mono print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relevantSkills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-xs font-medium text-zinc-500 mb-2 print:text-black print:font-bold">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded print:bg-transparent print:border print:border-zinc-300 print:text-black print:font-sans"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Projects */}
          <section className="print:break-inside-avoid">
            <h3 className="text-xs font-medium text-zinc-500 mb-4 font-mono print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Selected Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relevantProjects.map((project) => (
                <div
                  key={project.title}
                  className="print:break-inside-avoid"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white hover:text-green-400 transition-colors print:text-black print:underline print:no-underline"
                  >
                    {project.title}
                  </a>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 print:text-black print:font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-zinc-600 print:text-black print:font-sans"
                      >
                        {tech}
                        {project.techStack.indexOf(tech) <
                        project.techStack.length - 1
                          ? " ·"
                          : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
