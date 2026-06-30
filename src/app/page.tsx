import { portfolio } from "@/data/portfolio";
import Link from "next/link";

export default function Home() {
  const featuredProjects = portfolio.projects.slice(0, 6);

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 md:px-24 pt-32 pb-28">
        <p className="text-sm text-muted font-mono mb-5">Hi, I&apos;m</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          {portfolio.personal.name}
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
          {portfolio.personal.intro}
        </p>
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            href="/projects"
            className="text-sm text-foreground/60 hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="text-sm text-foreground/60 hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-all"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-24 py-24">
          <h2 className="text-xs font-medium text-muted mb-8 font-mono uppercase tracking-widest">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <p className="text-base text-foreground/80 leading-relaxed">
              {portfolio.personal.about}
            </p>
            <div className="flex flex-col gap-6 text-sm text-muted">
              <div>
                <span className="text-muted font-mono text-xs uppercase tracking-widest">
                  Location
                </span>
                <p className="text-foreground/80 mt-1.5">
                  {portfolio.personal.location}
                </p>
              </div>
              <div>
                <span className="text-muted font-mono text-xs uppercase tracking-widest">
                  Education
                </span>
                <p className="text-foreground/80 mt-1.5">
                  {portfolio.education[0].degree} —{" "}
                  {portfolio.education[0].institution}
                </p>
              </div>
              <div>
                <span className="text-muted font-mono text-xs uppercase tracking-widest">
                  Focus Areas
                </span>
                <p className="text-foreground/80 mt-1.5">
                  Full-Stack Web, Game Engines, Mobile, Web3
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-24 py-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xs font-medium text-muted font-mono uppercase tracking-widest">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div id="projects" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="mb-2">
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-base font-medium text-foreground group-hover:text-foreground/70 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] text-muted/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-24 py-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xs font-medium text-muted font-mono uppercase tracking-widest">
              Experience
            </h2>
            <Link
              href="/resume"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Full resume &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-10">
            {portfolio.jobs.map((job, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-10"
              >
                <div className="text-sm font-mono text-muted">
                  {job.startDate} &mdash; {job.endDate}
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted mt-0.5">
                    {job.company} &middot; {job.location}
                  </p>
                  <p className="text-sm text-foreground/70 mt-3 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
