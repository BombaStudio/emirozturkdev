// src/app/projects/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { getRelatedEntitiesForProject } from "@/lib/crossReferences";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { CrossReferences } from "@/components/relations/cross-references";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render all project slugs at build time (SSG).
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

/**
 * Generate SEO and OpenGraph metadata dynamically for the project.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Emir Öztürk`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const crossRefs = await getRelatedEntitiesForProject(slug);
  const technologies = project.technologies || project.techStack || [];
  const tags = project.tags || [];
  const allBadges = Array.from(new Set([...technologies, ...tags]));

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20">
        {/* Back navigation */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/projects"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Projects</span>
          </Link>
        </nav>

        {/* Hero header */}
        <header className="border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">{project.category}</span>
            {project.date && (
              <>
                <span className="text-muted/40">&middot;</span>
                <span className="font-mono text-xs text-muted">{project.date}</span>
              </>
            )}
            {project.featured && (
              <>
                <span className="text-muted/40">&middot;</span>
                <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
                  Featured
                </span>
              </>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {project.description}
          </p>

          {/* Action CTAs */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
                >
                  <span>Live Preview</span>
                  <span aria-hidden>&#8599;</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-surface/80"
                >
                  <span>GitHub Repository</span>
                  <span aria-hidden>&#8599;</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Technologies & Tags */}
        {allBadges.length > 0 && (
          <section className="mt-10">
            <h2 className="label mb-4">Technologies & Topics</h2>
            <ul className="flex flex-wrap gap-2">
              {allBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-hairline bg-surface/70 px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Video demonstration embed */}
        {project.youtubeUrl && (
          <section className="mt-12 md:mt-16">
            <h2 className="label mb-4">Video Demonstration</h2>
            <YouTubeEmbed
              url={project.youtubeUrl}
              title={`${project.title} Video Demonstration`}
              caption={`Demonstration of ${project.title}`}
            />
          </section>
        )}

        {/* Cross-references to related research, experience, and articles */}
        <CrossReferences
          academicWorks={crossRefs.academicWorks}
          blogPosts={crossRefs.blogPosts}
          experiences={crossRefs.experiences}
        />
      </article>
    </main>
  );
}
