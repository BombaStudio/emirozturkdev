// src/app/experience/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperience, getExperienceBySlug } from "@/lib/content";
import { getRelatedEntitiesForExperience } from "@/lib/crossReferences";
import { CrossReferences } from "@/components/relations/cross-references";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render all experience slugs at build time (SSG).
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const experiences = await getExperience();
  return experiences.map((e) => ({
    slug: e.slug,
  }));
}

/**
 * Generate SEO and OpenGraph metadata dynamically for the position.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);

  if (!exp) {
    return {
      title: "Experience Not Found",
    };
  }

  const roleTitle = `${exp.role} at ${exp.company}`;
  return {
    title: `${roleTitle} — Experience`,
    description: exp.description.slice(0, 160),
    openGraph: {
      title: `${roleTitle} — Emir Öztürk`,
      description: exp.description.slice(0, 160),
      type: "article",
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const exp = await getExperienceBySlug(slug);

  if (!exp) {
    notFound();
  }

  const crossRefs = await getRelatedEntitiesForExperience(slug);
  const achievements = exp.achievements || [];
  const technologies = exp.technologies || [];

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20">
        {/* Back navigation */}
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-4">
          <Link
            href="/"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Home</span>
          </Link>
          <span className="text-muted/40">&middot;</span>
          <Link
            href="/resume"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span>View Resume</span>
          </Link>
        </nav>

        {/* Hero header */}
        <header className="border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">{exp.category || "Experience"}</span>
            <span className="text-muted/40">&middot;</span>
            <span className="font-mono text-xs text-muted">
              {exp.startDate} &mdash; {exp.endDate || "Present"}
            </span>
            <span className="text-muted/40">&middot;</span>
            <span className="font-mono text-xs text-muted/80">{exp.location}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            {exp.role}
          </h1>

          <p className="mt-2 text-xl font-medium text-foreground/80 md:text-2xl">
            {exp.company}
          </p>

          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-foreground/80 md:text-lg">
            {exp.description}
          </p>
        </header>

        {/* Key achievements & responsibilities */}
        {achievements.length > 0 && (
          <section className="mt-10">
            <h2 className="label mb-5">Key Responsibilities & Achievements</h2>
            <ul className="space-y-3">
              {achievements.map((item, index) => (
                <li
                  key={index}
                  className="card-surface flex items-start gap-4 p-4 text-sm leading-relaxed text-foreground/80"
                >
                  <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technologies & tools */}
        {technologies.length > 0 && (
          <section className="mt-10">
            <h2 className="label mb-4">Technologies & Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-hairline bg-surface/70 px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Cross references */}
        <CrossReferences
          projects={crossRefs.projects}
          academicWorks={crossRefs.academicWorks}
          blogPosts={crossRefs.blogPosts}
        />
      </article>
    </main>
  );
}
