import Header from "../../../components/Header";
import { portfolio } from "../../data/portfolio";
import Image from "next/image";

export default function Projects() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 mb-8">Projects</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project) => (
            <div key={project.title} className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    {/* Placeholder for project image if not available or strictly just a color block with title */}
                     <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600">
                        {project.image ? (
                             <Image src={project.image} alt={project.title} fill className="object-cover" />
                        ): (
                            <span>No Image</span>
                        )}
                     </div>
                </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  <a href={project.link}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {project.title}
                  </a>
                </h3>
                <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 flex-1">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
