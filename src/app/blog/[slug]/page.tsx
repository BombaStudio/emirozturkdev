import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { getRelatedEntitiesForBlogPost } from "@/lib/crossReferences";
import { CrossReferences } from "@/components/relations/cross-references";
import { MDXContent } from "@/components/blog/mdx-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render all blog post slugs at build time (SSG).
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate SEO and OpenGraph metadata dynamically for the article.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} — Blog`,
    description: post.summary.slice(0, 160),
    openGraph: {
      title: `${post.title} — Emir Öztürk`,
      description: post.summary.slice(0, 160),
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const crossRefs = await getRelatedEntitiesForBlogPost(slug);
  const tags = post.tags || [];

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-20">
        {/* Back navigation */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/blog"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Blog</span>
          </Link>
        </nav>

        {/* Hero header */}
        <header className="border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">Article</span>
            {post.publishedAt && (
              <>
                <span className="text-muted/40">&middot;</span>
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-xs text-muted"
                >
                  {formatDisplayDate(post.publishedAt)}
                </time>
              </>
            )}
            {post.readingTime && (
              <>
                <span className="text-muted/40">&middot;</span>
                <span className="font-mono text-xs text-muted/80">
                  {post.readingTime}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-foreground/80 md:text-xl">
            {post.summary}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-hairline bg-surface/70 px-3 py-1 font-mono text-xs text-foreground/80"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Optional cover image */}
          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[var(--shadow-subtle)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto max-h-[480px] w-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Rendered MDX Body */}
        <div className="mt-10 md:mt-12">
          <MDXContent source={post.content || ""} />
        </div>

        {/* Bidirectional cross-references at conclusion */}
        <CrossReferences
          eyebrow="Connections"
          title="Related Work & Cross-References"
          projects={crossRefs.projects}
          experiences={crossRefs.experiences}
          academicWorks={crossRefs.academicWorks}
        />
      </article>
    </main>
  );
}
