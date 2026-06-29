import { portfolio } from "../data/portfolio";
import Link from "next/link";

export default function Home() {
  const featuredProjects = portfolio.projects.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <p className="text-sm text-zinc-500 mb-4 font-mono">Hi, I&apos;m</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          {portfolio.personal.name}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
          {portfolio.personal.intro}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-zinc-700 text-zinc-300 px-5 py-2.5 text-sm font-medium rounded-md hover:border-zinc-500 hover:text-white transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-xs font-medium text-zinc-500 mb-6 font-mono">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-base text-zinc-400 leading-relaxed">
              {portfolio.personal.about}
            </p>
            <div className="flex flex-col gap-4 text-sm text-zinc-500">
              <div>
                <span className="text-zinc-600 font-mono text-xs">
                  Location
                </span>
                <p className="text-zinc-300 mt-1">
                  {portfolio.personal.location}
                </p>
              </div>
              <div>
                <span className="text-zinc-600 font-mono text-xs">
                  Education
                </span>
                <p className="text-zinc-300 mt-1">
                  {portfolio.education[0].degree} —{" "}
                  {portfolio.education[0].institution}
                </p>
              </div>
              <div>
                <span className="text-zinc-600 font-mono text-xs">
                  Focus Areas
                </span>
                <p className="text-zinc-300 mt-1">
                  Full-Stack Web, Game Engines, Mobile, Web3
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-medium text-zinc-500 font-mono">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-zinc-800/50 rounded-lg p-6 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono text-zinc-600 bg-zinc-800/50 px-2 py-0.5 rounded">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors mb-2">
                  {project.title}
                </h3>
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
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xs font-medium text-zinc-500 font-mono">
              Experience
            </h2>
            <Link
              href="/resume"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Full resume →
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {portfolio.jobs.map((job, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-8"
              >
                <div className="text-sm font-mono text-zinc-600">
                  {job.startDate} — {job.endDate}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {job.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed whitespace-pre-line">
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
