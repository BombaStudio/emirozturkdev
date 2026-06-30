"use client";

import { useState, useMemo } from "react";
import { Portfolio, ProjectType } from "@/data/portfolio";

type ResumeTitle =
  | "Software Developer"
  | "Game Developer"
  | "Full Stack Developer"
  | "Mobile Developer";

interface ResumeClientProps {
  portfolio: Portfolio;
}

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
      "Game developer experienced in Unity, Unreal Engine, Godot, and custom engine development with Rust. Built multiplayer systems, physics simulations, and WebGL games.",
    projectTypes: [ProjectType.GAME, ProjectType.SYSTEM],
    highlightSkills: ["Languages", "Game Dev", "Tools & Other"],
  },
  "Full Stack Developer": {
    summary:
      "Full-stack developer building scalable web applications with React, Next.js, Laravel, and Node.js. Experienced in enterprise software, REST APIs, database optimization, and modern frontend frameworks.",
    projectTypes: [ProjectType.WEB, ProjectType.MOBILE, ProjectType.AI],
    highlightSkills: ["Languages", "Frontend", "Backend", "Tools & Other"],
  },
  "Mobile Developer": {
    summary:
      "Mobile developer with expertise in React Native, Flutter, and native Android development. Skilled in creating cross-platform applications with a focus on performance and user experience.",
    projectTypes: [ProjectType.MOBILE],
    highlightSkills: ["Languages", "Frontend", "Backend", "Tools & Other"],
  },
};

const titleKeys = Object.keys(titleConfig) as ResumeTitle[];

export default function ResumeClient({ portfolio }: ResumeClientProps) {
  const [selectedTitle, setSelectedTitle] =
    useState<ResumeTitle>("Software Developer");

  const config = titleConfig[selectedTitle];
  const { personal, jobs, education, skills } = portfolio;

  const relevantProjects = useMemo(() => {
    return portfolio.projects
      .filter((p) => config.projectTypes.includes(p.type))
      .slice(0, 8);
  }, [portfolio.projects, config.projectTypes]);

  const relevantSkills = useMemo(() => {
    return skills.filter((s) => config.highlightSkills.includes(s.category));
  }, [skills, config.highlightSkills]);

  const sortedJobs = useMemo(() => {
    const titleLower = selectedTitle.toLowerCase();
    const prefix = titleLower.split(" ")[0];
    return [...jobs].sort((a, b) => {
      const aRelevant = a.title.toLowerCase().includes(prefix) ? -1 : 0;
      const bRelevant = b.title.toLowerCase().includes(prefix) ? -1 : 0;
      return aRelevant - bRelevant;
    });
  }, [jobs, selectedTitle]);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-24 pt-24 pb-20 print:pt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Resume
            </h1>
            <p className="text-sm text-muted">
              Select a title to adjust the CV
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="text-sm text-muted hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-all cursor-pointer"
          >
            Download PDF
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 print:hidden">
          {titleKeys.map((title) => (
            <button
              key={title}
              onClick={() => setSelectedTitle(title)}
              className={`text-sm transition-colors cursor-pointer ${
                selectedTitle === title
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {title}
            </button>
          ))}
        </div>

        <article
          role="doc-resume"
          className="bg-surface border border-border p-8 sm:p-12 print:border-none print:p-0 print:rounded-none"
        >
          <header className="pb-6 mb-6 border-b border-border print:border-black print:pb-4 print:mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground print:text-black">
              {personal.name}
            </h1>
            <p className="text-base text-muted mt-1 print:text-black">
              {selectedTitle}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-muted font-mono print:text-black print:font-sans">
              <span>{personal.contact.email}</span>
              <span>{personal.location}</span>
              <span>github.com/BombaStudio</span>
              <span>linkedin.com/in/emir-ozturk-dev</span>
              <span>emirozturkdev.vercel.app</span>
            </div>
          </header>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className="text-xs font-medium text-muted mb-3 font-mono uppercase tracking-widest print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Summary
            </h2>
            <p className="text-sm text-foreground/70 leading-relaxed print:text-black print:font-sans">
              {config.summary}
            </p>
          </section>

          <section className="mb-8 print:mb-6">
            <h2 className="text-xs font-medium text-muted mb-4 font-mono uppercase tracking-widest print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Experience
            </h2>
            <div className="flex flex-col gap-6 print:gap-4">
              {sortedJobs.map((job, i) => (
                <div key={i} className="print:break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                    <h3 className="text-sm font-medium text-foreground print:text-black">
                      {job.title}{" "}
                      <span className="font-normal text-muted print:text-zinc-700">
                        &mdash; {job.company}
                      </span>
                    </h3>
                    <span className="text-xs text-muted font-mono shrink-0 print:text-black print:font-sans">
                      {job.startDate} &mdash; {job.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-muted/60 mb-1 print:text-zinc-700">
                    {job.location}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed print:text-black print:font-sans whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className="text-xs font-medium text-muted mb-4 font-mono uppercase tracking-widest print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                  <h3 className="text-sm font-medium text-foreground print:text-black">
                    {edu.degree}
                  </h3>
                  <span className="text-xs text-muted font-mono shrink-0 print:text-black print:font-sans">
                    {edu.startDate} &mdash; {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted print:text-zinc-700">
                  {edu.institution} &middot; {edu.location}
                </p>
              </div>
            ))}
          </section>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className="text-xs font-medium text-muted mb-4 font-mono uppercase tracking-widest print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-1 gap-4">
              {relevantSkills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="text-xs font-medium text-muted mb-2 print:text-black print:font-bold">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs text-muted/60 print:text-black print:font-sans"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="print:break-inside-avoid">
            <h2 className="text-xs font-medium text-muted mb-4 font-mono uppercase tracking-widest print:text-black print:font-bold print:text-sm print:font-sans print:border-b print:border-black print:pb-1">
              Selected Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 print:grid-cols-1 gap-4">
              {relevantProjects.map((project) => (
                <div key={project.title} className="print:break-inside-avoid">
                  <div className="flex items-baseline flex-wrap">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors print:text-black print:underline"
                    >
                      {project.title}
                    </a>
                    <span className="hidden print:inline text-xs text-muted ml-2">
                      &mdash; {project.link.replace("https://", "")}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 print:text-black print:font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-x-2 mt-1">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={tech}
                        className="text-[10px] text-muted/60 print:text-black print:font-sans"
                      >
                        {tech}
                        {idx < project.techStack.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
