"use client";

import { useState, useMemo } from "react";
import { m } from "motion/react";
import { Portfolio, ProjectType, Publication } from "@/data/portfolio";
import { spring } from "@/lib/motion";

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

/** Ekran: mono/small-caps etiket. Print: ATS'in okuyacağı sade başlık. */
const sectionHeading =
  "label mb-4 border-b border-hairline pb-2 print:border-black print:pb-1 print:font-sans print:text-sm print:font-bold print:normal-case print:tracking-normal print:text-black";

const metaLine = "font-mono text-xs text-muted print:font-sans print:text-black";

function parseDateScore(dateStr?: string, isEnd = false): number {
  if (!dateStr) return 0;
  const s = dateStr.trim();
  if (/present|current|devam/i.test(s)) return 999999;
  const yr = s.match(/\b(20\d\d|19\d\d)\b/);
  if (!yr) return 0;
  const year = parseInt(yr[1], 10);
  const months: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };
  let month = isEnd ? 12 : 1;
  const lower = s.toLowerCase();
  for (const [mName, mVal] of Object.entries(months)) {
    if (lower.includes(mName)) {
      month = mVal;
      break;
    }
  }
  return year * 100 + month;
}

export default function ResumeClient({ portfolio }: ResumeClientProps) {
  const [selectedTitle, setSelectedTitle] =
    useState<ResumeTitle>("Software Developer");

  const config = titleConfig[selectedTitle];
  const { personal, jobs, education, skills, publications } = portfolio;
  const sortedPublications: Publication[] = useMemo(() => {
    const list: Publication[] =
      publications && publications.length > 0
        ? publications
        : [
            {
              title:
                "Altın Katkılı Su Bazlı Nanoakışkanların Simülasyonla İncelenmesi",
              journal: "Applied Nano (MDPI)",
              date: "Nov 2026",
              doi: "10.3390/applnano7040037",
              doiUrl: "https://doi.org/10.3390/applnano7040037",
              advisor: "Doç. Dr. Emine Mine Çapar",
              type: "Peer-Reviewed Journal Article",
              description:
                "• Conducted computational simulations and thermal conductivity modeling of gold-doped water nanofluids under TÜBİTAK 2209-A University Students Research Project.\n• Presented research findings via poster presentation at the 2024 Turkish Physical Society (TFD) International Physics Congress.\n• Published open-access research evaluating nanoparticle volume fraction effects on nanofluid thermophysical properties.",
            },
          ];

    return [...list].sort(
      (a, b) => parseDateScore(b.date) - parseDateScore(a.date)
    );
  }, [publications]);

  const relevantProjects = useMemo(() => {
    return [...portfolio.projects]
      .filter((p) => config.projectTypes.includes(p.type))
      .sort((a, b) => {
        const dateA = parseDateScore(a.date);
        const dateB = parseDateScore(b.date);
        if (dateA !== dateB) {
          return dateB - dateA;
        }
        return (a.title || "").localeCompare(b.title || "");
      })
      .slice(0, 8);
  }, [portfolio.projects, config.projectTypes]);

  const relevantSkills = useMemo(() => {
    return skills.filter((s) => config.highlightSkills.includes(s.category));
  }, [skills, config.highlightSkills]);

  const sortedJobs = useMemo(() => {
    // Sort strictly in reverse-chronological order (newest first to oldest last)
    return [...jobs].sort((a, b) => {
      const startA = parseDateScore(a.startDate, false);
      const startB = parseDateScore(b.startDate, false);
      if (startA !== startB) {
        return startB - startA;
      }
      const endA = parseDateScore(a.endDate, true);
      const endB = parseDateScore(b.endDate, true);
      return endB - endA;
    });
  }, [jobs]);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-24 md:pb-28 md:pt-20 print:p-0">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between print:hidden">
          <div>
            <p className="label">Resume</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              Curriculum Vitae
            </h1>
            <p className="mt-2 text-sm text-muted">
              Select a title to tailor the summary, skills and projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="pressable inline-flex items-center justify-center gap-2 self-start rounded-full border border-border px-5 py-2.5 text-sm text-foreground hover:border-foreground/30 hover:bg-surface sm:self-auto"
          >
            Download PDF
          </button>
        </div>

        <div
          role="group"
          aria-label="Resume title"
          className="mb-10 flex flex-wrap gap-1 print:hidden"
        >
          {titleKeys.map((title) => {
            const active = selectedTitle === title;

            return (
              <button
                key={title}
                type="button"
                onClick={() => setSelectedTitle(title)}
                aria-pressed={active}
                className={`pressable relative flex h-9 items-center rounded-full px-3 text-sm ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="resume-title-pill"
                    className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    transition={spring.standard}
                  />
                )}
                <span className="relative">{title}</span>
              </button>
            );
          })}
        </div>

        <article
          role="doc-resume"
          className="card-surface p-8 sm:p-12 print:rounded-none print:border-none print:bg-white print:p-0 print:shadow-none"
        >
          <header className="mb-8 border-b border-hairline pb-6 print:mb-4 print:border-black print:pb-4">
            <h1 className="text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl print:text-black">
              {personal.name}
            </h1>
            <p className="mt-1 text-base text-muted print:text-black">
              {selectedTitle}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted print:font-sans print:text-black">
              <span>{personal.contact.email}</span>
              <span>{personal.location}</span>
              <span>github.com/BombaStudio</span>
              <span>linkedin.com/in/emir-ozturk-dev</span>
              <span>emirozturkdev.vercel.app</span>
              {personal.contact.orcid && (
                <span>
                  orcid.org/
                  {personal.contact.orcid.replace(/^https?:\/\/orcid\.org\//, "")}
                </span>
              )}
            </div>
          </header>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className={sectionHeading}>Summary</h2>
            <p className="text-sm leading-relaxed text-foreground/70 print:font-sans print:text-black">
              {config.summary}
            </p>
          </section>

          <section className="mb-8 print:mb-6">
            <h2 className={sectionHeading}>Experience</h2>
            <div className="flex flex-col gap-6 print:gap-4">
              {sortedJobs.map((job, i) => (
                <div key={`${job.company}-${job.startDate}-${i}`} className="print:break-inside-avoid">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm font-medium text-foreground print:text-black">
                      {job.title}{" "}
                      <span className="font-normal text-muted print:text-zinc-700">
                        &mdash; {job.company}
                      </span>
                    </h3>
                    <span className={`${metaLine} shrink-0`}>
                      {job.startDate} &mdash; {job.endDate}
                    </span>
                  </div>
                  <p className="mb-1 text-xs text-muted/70 print:text-zinc-700">
                    {job.location}
                  </p>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/70 print:font-sans print:text-black">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className={sectionHeading}>Education</h2>
            {education.map((edu, i) => (
              <div key={`${edu.institution}-${i}`}>
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-sm font-medium text-foreground print:text-black">
                    {edu.degree}
                  </h3>
                  <span className={`${metaLine} shrink-0`}>
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
            <h2 className={sectionHeading}>Publications & Research</h2>
            <div className="flex flex-col gap-6 print:gap-4">
              {sortedPublications.map((pub, i) => (
                <div key={`${pub.title}-${i}`} className="print:break-inside-avoid">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm font-medium text-foreground print:text-black">
                      {pub.doiUrl || pub.url ? (
                        <a
                          href={pub.doiUrl || pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pressable hover:text-foreground/70 print:text-black print:underline"
                        >
                          {pub.title}
                        </a>
                      ) : (
                        pub.title
                      )}
                      {pub.journal && (
                        <span className="font-normal text-muted print:text-zinc-700">
                          {" "}&mdash; {pub.journal}
                        </span>
                      )}
                      {pub.doi && (
                        <span className="ml-2 hidden text-xs text-muted print:inline">
                          &mdash; doi.org/{pub.doi.replace(/^https?:\/\/doi\.org\//, "")}
                        </span>
                      )}
                    </h3>
                    <span className={`${metaLine} shrink-0`}>
                      {pub.date}
                    </span>
                  </div>
                  {(pub.advisor || pub.type) && (
                    <p className="mb-1 text-xs text-muted/70 print:text-zinc-700">
                      {[
                        pub.type,
                        pub.advisor ? `Advisor: ${pub.advisor}` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/70 print:font-sans print:text-black">
                    {pub.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 print:mb-6 print:break-inside-avoid">
            <h2 className={sectionHeading}>Skills</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-1">
              {relevantSkills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="mb-2 text-xs font-medium text-foreground print:font-bold print:text-black">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs text-muted/80 print:font-sans print:text-black"
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
            <h2 className={sectionHeading}>Selected Projects</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-1">
              {relevantProjects.map((project) => (
                <div key={project.title} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable text-sm font-medium text-foreground hover:text-foreground/70 print:underline print:text-black"
                    >
                      {project.title}
                    </a>
                    <span className="ml-2 hidden text-xs text-muted print:inline">
                      &mdash; {project.link.replace("https://", "")}
                    </span>
                    {project.date && (
                      <span className="ml-auto font-mono text-[11px] text-muted/70 print:text-zinc-700">
                        {project.date}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted print:font-sans print:text-black">
                    {project.description}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-x-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={tech}
                        className="text-[10px] text-muted/80 print:font-sans print:text-black"
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
