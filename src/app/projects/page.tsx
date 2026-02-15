import Header from "../../../components/Header";
import { ProjectItem } from "../../../components/ProjectItem";
import { portfolio } from "../../data/portfolio";
import Image from "next/image";

export default function Projects() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 mb-8">Projects</h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project) => (
            <ProjectItem key={project.title} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
