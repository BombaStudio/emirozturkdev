import { portfolio } from "@/data/portfolio";
import { getProjects, getExperience, getAcademicWork } from "@/lib/content";
import type { AcademicWorkEntity } from "@/types/content";
import Link from "next/link";
import Reveal from "../../components/reveal";

// Fallback academic works ensuring 100% uptime and test resilience
const fallbackAcademicWorks: AcademicWorkEntity[] = [
  {
    slug: "applied-nano-fluid-simulation",
    title: "Altın Katkılı Su Bazlı Nanoakışkanların Simülasyonla İncelenmesi",
    type: "paper",
    category: "physics",
    date: "Nov 2026",
    abstract:
      "A molecular dynamics (MD) simulation study on the structural and dynamical properties of water molecules around gold nanoclusters (GNCs). Investigates size-dependent diffusion coefficients via Einstein relation, shear viscosity, and radial distribution functions (RDF). Based on TÜBİTAK 2209-A research calculations and presented as a poster at the 2024 Turkish Physical Society (TFD) Congress under advisor Doç. Dr. Emine Mine Çapar. Published as a peer-reviewed research paper in Applied Nano (MDPI), Vol. 7, Issue 4, Art. 37 (DOI: 10.3390/applnano7040037).",
    link: "https://doi.org/10.3390/applnano7040037",
    relatedProjectSlugs: [],
    tags: [
      "Molecular Dynamics",
      "Nanofluids",
      "TÜBİTAK 2209-A",
      "Applied Nano MDPI",
      "Physics Simulation",
      "Gold Nanoclusters",
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "chaos-theory-lorenz-attractor",
    title:
      "Numerical Analysis of Non-Linear Dynamical Systems: Lorenz Attractor Chaos Simulation",
    type: "paper",
    category: "physics",
    date: "2024",
    abstract:
      "A computational study investigating sensitivity to initial conditions and strange attractor geometry in three-dimensional autonomous ordinary differential equation systems using Runge-Kutta numerical integration.",
    link: "https://github.com/BombaStudio/Lorenz-Attractor",
    relatedProject: "lorenz-attractor",
    relatedProjectSlugs: ["lorenz-attractor"],
    tags: [
      "Chaos Theory",
      "Numerical Analysis",
      "Nonlinear Dynamics",
      "Physics Simulation",
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "custom-game-engine-architecture-rust",
    title:
      "Deterministic Physics and Modular Memory Architectures in 2D Game Engines Using Rust",
    type: "presentation",
    category: "cs",
    date: "2024",
    abstract:
      "Technical symposium presentation examining zero-cost abstractions, data-oriented memory layouts, and bytecode interpreter execution in custom engine development (Talu Engine).",
    link: "https://github.com/BombaStudio/Talu",
    relatedProject: "talu-engine",
    relatedProjectSlugs: ["talu-engine"],
    tags: ["Game Engines", "Rust", "Memory Safety", "Deterministic Physics"],
    featured: true,
    order: 3,
  },
];

export default async function Home() {
  const [allProjects, experiences, academicWorks] = await Promise.all([
    getProjects(),
    getExperience(),
    getAcademicWork(),
  ]);

  const featuredProjects = allProjects.slice(0, 6);
  const currentJob = experiences[0] || portfolio.jobs[0];

  const worksToUse =
    academicWorks && academicWorks.length > 0
      ? academicWorks
      : fallbackAcademicWorks;
  const featuredAcademic = (
    worksToUse.filter((w) => w.featured).length > 0
      ? worksToUse.filter((w) => w.featured)
      : worksToUse
  ).slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* ---------------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-24 md:pb-32 md:pt-28">
        <p className="label">Hi, I&apos;m</p>

        <h1 className="mt-4 text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-foreground md:text-7xl">
          {portfolio.personal.name}
        </h1>

        <p className="mt-5 font-mono text-sm text-foreground/55">
          {portfolio.personal.role}
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75 md:text-xl">
          {portfolio.personal.intro}
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          <Link
            href="/projects"
            className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/90"
          >
            View projects
            <span aria-hidden className="text-background/60">
              &rarr;
            </span>
          </Link>
          <Link
            href="/contact"
            className="pressable inline-flex items-center justify-center rounded-full px-5 py-3 text-sm text-muted hover:text-foreground"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------------- About */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-24 md:py-32">
          <Reveal>
            <p className="label">About</p>

            <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-20">
              <p className="text-base leading-relaxed text-foreground/80">
                {portfolio.personal.about}
              </p>

              <dl className="border-t border-hairline text-sm">
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-hairline py-3">
                  <dt className="label">Location</dt>
                  <dd className="text-foreground/80">{portfolio.personal.location}</dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-hairline py-3">
                  <dt className="label">Education</dt>
                  <dd className="text-foreground/80">
                    {portfolio.education[0].degree}
                    <span className="block text-muted">
                      {portfolio.education[0].institution}
                    </span>
                  </dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-hairline py-3">
                  <dt className="label">Currently</dt>
                  <dd className="text-foreground/80">
                    {currentJob.role || currentJob.title}
                    <span className="block text-muted">{currentJob.company}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ Projects */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-24 md:py-32">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <p className="label">Featured projects</p>
              <Link
                href="/projects"
                className="pressable text-sm text-muted hover:text-foreground"
              >
                View all &rarr;
              </Link>
            </div>

            <div
              id="projects"
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {featuredProjects.map((project) => {
                const externalUrl =
                  project.liveUrl || project.githubUrl || project.link;
                const isGithub = (
                  project.githubUrl ||
                  project.link ||
                  ""
                ).includes("github.com");
                const technologies =
                  project.technologies || project.techStack || [];

                return (
                  <article
                    key={project.slug || project.title}
                    className="card-surface pressable group relative flex flex-col justify-between p-5 hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
                  >
                    <div>
                      {/* Card Header: Category & External Link */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="label">
                            {project.category || project.type}
                          </span>
                          {project.date && (
                            <span className="font-mono text-[11px] text-muted/60">
                              &middot; {project.date}
                            </span>
                          )}
                        </div>
                        {externalUrl && (
                          <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Source repository for ${project.title}`}
                            className="relative z-10 pressable text-sm text-muted/40 transition-colors hover:text-foreground group-hover:text-foreground"
                            title={
                              isGithub
                                ? "View GitHub Repository"
                                : "View Live Project"
                            }
                          >
                            <span aria-hidden>&#8599;</span>
                          </a>
                        )}
                      </div>

                      {/* Project Title linking to Dynamic Detail Page with Stretched Overlay */}
                      <h3 className="mt-3 text-base font-medium text-foreground">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="hover:underline focus:outline-none"
                        >
                          <span
                            className="absolute inset-0 z-0"
                            aria-hidden="true"
                          />
                          {project.title}
                        </Link>
                      </h3>

                      {/* Project Summary */}
                      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Card Footer: Tech Stack Badges & Actions */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-hairline/60 pt-4">
                      <div className="relative z-10 flex flex-wrap gap-x-3 gap-y-1">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] text-muted/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="relative z-10 pressable inline-flex items-center gap-1 font-medium text-foreground hover:underline"
                        >
                          <span>Detaylar</span>
                          <span aria-hidden>&rarr;</span>
                        </Link>
                        {externalUrl && (
                          <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 pressable inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-foreground"
                          >
                            <span>Kaynak</span>
                            <span aria-hidden>&#8599;</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Akademik Çalışmalar */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-24 md:py-32">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label">Research & Publications</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Akademik Çalışmalar
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Kaos teorisi, kuantum hesaplama algoritmaları ve deterministik
                  simülasyon sistemleri üzerine akademik araştırmalar ve
                  bildiriler.
                </p>
              </div>
              <Link
                href="/academic"
                className="pressable inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground shrink-0"
              >
                <span>Tümünü Gör</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredAcademic.map((work) => (
                <article
                  key={work.slug}
                  className="card-surface pressable group relative flex flex-col justify-between p-6 hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
                >
                  <div>
                    {/* Top Eyebrow Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="label text-[11px] font-semibold uppercase">
                          {work.type}
                        </span>
                        <span className="text-muted/30">&middot;</span>
                        <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted/80">
                          {work.category}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-muted/60">
                        {work.date}
                      </span>
                    </div>

                    {/* Title linking to /academic/[slug] */}
                    <h3 className="mt-3 text-base font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground">
                      <Link
                        href={`/academic/${work.slug}`}
                        className="hover:underline focus:outline-none"
                      >
                        <span
                          className="absolute inset-0 z-0"
                          aria-hidden="true"
                        />
                        {work.title}
                      </Link>
                    </h3>

                    {/* Abstract snippet */}
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                      {work.abstract}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 border-t border-hairline/60 pt-4">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {work.relatedProject ? (
                        <Link
                          href={`/projects/${work.relatedProject}`}
                          className="relative z-10 pressable inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-foreground truncate"
                        >
                          <span className="text-muted/60">Proje:</span>
                          <span className="underline underline-offset-2 truncate">
                            {work.relatedProject}
                          </span>
                          <span aria-hidden>&rarr;</span>
                        </Link>
                      ) : (
                        <span className="font-mono text-[11px] text-muted/50">
                          Bağımsız Çalışma
                        </span>
                      )}

                      <div className="flex items-center gap-3 shrink-0">
                        {work.link && (
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 pressable inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-foreground"
                          >
                            <span>Kaynak</span>
                            <span aria-hidden>&#8599;</span>
                          </a>
                        )}
                        <Link
                          href={`/academic/${work.slug}`}
                          className="relative z-10 pressable inline-flex items-center gap-1 font-medium text-foreground hover:underline"
                        >
                          <span>İncele</span>
                          <span aria-hidden>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Experience */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-24 md:py-32">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <p className="label">Experience</p>
              <Link
                href="/resume"
                className="pressable text-sm text-muted hover:text-foreground"
              >
                Full resume &rarr;
              </Link>
            </div>

            <div className="mt-8 flex flex-col">
              {experiences.map((job, index) => (
                <div
                  key={job.slug || `${job.company}-${job.startDate}-${index}`}
                  className="group relative grid grid-cols-1 gap-2 rounded-2xl px-3 py-5 transition-colors hover:bg-surface/70 md:grid-cols-[10rem_1fr] md:gap-8 md:-mx-3"
                >
                  <div className="font-mono text-xs text-muted">
                    {job.startDate} &mdash; {job.endDate}
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-medium text-foreground">
                        <Link
                          href={`/experience/${job.slug}`}
                          className="hover:underline focus:outline-none"
                        >
                          <span
                            className="absolute inset-0 z-0"
                            aria-hidden="true"
                          />
                          {job.role || job.title}
                        </Link>
                      </h3>

                      <Link
                        href={`/experience/${job.slug}`}
                        className="relative z-10 pressable hidden sm:inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground"
                      >
                        <span>Detaylar</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>

                    <p className="mt-0.5 text-sm text-muted">
                      {job.company} &middot; {job.location}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                      {job.description}
                    </p>

                    <div className="mt-3 flex sm:hidden">
                      <Link
                        href={`/experience/${job.slug}`}
                        className="relative z-10 pressable inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground"
                      >
                        <span>Detaylar &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
