// src/app/academic/[slug]/page.tsx

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAcademicWork, getAcademicWorkBySlug } from "@/lib/content";
import { getRelatedEntitiesForAcademicWork } from "@/lib/crossReferences";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { CrossReferences } from "@/components/relations/cross-references";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render all academic work slugs at build time (SSG).
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const works = await getAcademicWork();
  return works.map((w) => ({
    slug: w.slug,
  }));
}

/**
 * Generate SEO and OpenGraph metadata dynamically for the academic work.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getAcademicWorkBySlug(slug);

  if (!work) {
    return {
      title: "Academic Work Not Found",
    };
  }

  return {
    title: `${work.title} — Academic Work`,
    description: work.abstract.slice(0, 160),
    openGraph: {
      title: `${work.title} — Emir Öztürk`,
      description: work.abstract.slice(0, 160),
      type: "article",
    },
  };
}

export default async function AcademicWorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getAcademicWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const crossRefs = await getRelatedEntitiesForAcademicWork(slug);
  const tags = work.tags || [];
  const youtubeUrl = (work as { youtubeUrl?: string }).youtubeUrl;

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20">
        {/* Back navigation */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/academic"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Academic Work</span>
          </Link>
        </nav>

        {/* Hero header */}
        <header className="border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">
              {work.type} &middot; {work.category}
            </span>
            <span className="text-muted/40">&middot;</span>
            <span className="font-mono text-xs text-muted">{work.date}</span>
            {work.institution && (
              <>
                <span className="text-muted/40">&middot;</span>
                <span className="font-mono text-xs text-muted/80">{work.institution}</span>
              </>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            {work.title}
          </h1>

          {/* External Paper / Publication Link */}
          {work.link && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/90"
              >
                <span>View Publication / Repository</span>
                <span aria-hidden>&#8599;</span>
              </a>
            </div>
          )}
        </header>

        {/* Abstract */}
        <section className="mt-10">
          <h2 className="label mb-4">Abstract</h2>
          <div className="card-surface p-6 md:p-8">
            <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
              {work.abstract}
            </p>
          </div>
        </section>

        {/* Subject Areas & Tags */}
        {tags.length > 0 && (
          <section className="mt-10">
            <h2 className="label mb-4">Keywords & Subject Areas</h2>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-hairline bg-surface/70 px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Primary companion project (if explicitly linked) */}
        {crossRefs.project && (
          <section className="mt-12">
            <h2 className="label mb-4">Companion Project</h2>
            <Link
              href={`/projects/${crossRefs.project.slug}`}
              className="card-surface pressable group flex items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
            >
              <div>
                <span className="label">Software Implementation &middot; {crossRefs.project.category}</span>
                <p className="mt-1 text-base font-medium text-foreground">
                  View {crossRefs.project.title} details &rarr;
                </p>
              </div>
              <span
                aria-hidden
                className="text-lg text-muted/40 transition-colors group-hover:text-foreground"
              >
                &#8599;
              </span>
            </Link>
          </section>
        )}

        {/* Video presentation embed */}
        {youtubeUrl && (
          <section className="mt-12 md:mt-16">
            <h2 className="label mb-4">Presentation / Lecture</h2>
            <YouTubeEmbed
              url={youtubeUrl}
              title={`${work.title} Presentation`}
            />
          </section>
        )}

        {/* Cross references */}
        <CrossReferences
          projects={crossRefs.projects.filter((p) => p.slug !== crossRefs.project?.slug)}
          blogPosts={crossRefs.blogPosts}
        />
      </article>
    </main>
  );
}
