import { portfolio } from "@/data/portfolio";
import Link from "next/link";
import Reveal from "../../components/reveal";

export default function Home() {
  const featuredProjects = portfolio.projects.slice(0, 6);
  const currentJob = portfolio.jobs[0];

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
                    {currentJob.title}
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
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-surface pressable group flex flex-col p-5 hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="label">{project.type}</span>
                    <span
                      aria-hidden
                      className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
                    >
                      &#8599;
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-medium text-foreground">
                    {project.title}
                  </h3>
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
                </a>
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
              {portfolio.jobs.map((job, index) => (
                <div
                  key={`${job.company}-${job.startDate}-${index}`}
                  className="grid grid-cols-1 gap-2 rounded-2xl px-3 py-5 transition-colors hover:bg-surface/70 md:grid-cols-[10rem_1fr] md:gap-8 md:-mx-3"
                >
                  <div className="font-mono text-xs text-muted">
                    {job.startDate} &mdash; {job.endDate}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">
                      {job.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {job.company} &middot; {job.location}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
                      {job.description}
                    </p>
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
