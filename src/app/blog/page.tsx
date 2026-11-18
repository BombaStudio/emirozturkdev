import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Emir Öztürk",
  description:
    "Articles, engineering post-mortems, physics simulations, and software architecture notes by Emir Öztürk.",
  openGraph: {
    title: "Blog — Emir Öztürk",
    description:
      "Articles, engineering post-mortems, physics simulations, and software architecture notes.",
    type: "website",
    url: "/blog",
  },
};

export const revalidate = 60;

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

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-24 md:pb-32 md:pt-20">
        {/* Breadcrumb back navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/"
            className="pressable inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <span aria-hidden>&larr;</span>
            <span>Back to Home</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12 border-b border-hairline pb-8 md:mb-16">
          <p className="label">Writing</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
            Articles & Engineering Notes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Explorations in game engine architecture, deterministic physics simulation,
            system design, and software engineering.
          </p>
        </header>

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="card-surface px-6 py-20 text-center">
            <p className="label mb-2">No Articles Yet</p>
            <p className="text-base text-muted">
              Articles and write-ups are being prepared. Check back soon.
            </p>
          </div>
        ) : (
          /* Blog Posts Grid */
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-surface pressable group flex flex-col justify-between p-6 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)] md:p-8"
                >
                  <div>
                    {/* Eyebrow metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="label text-[10px]">Article</span>
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
                      <span
                        aria-hidden
                        className="text-base text-muted/40 transition-colors group-hover:text-foreground"
                      >
                        &#8599;
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 text-xl font-bold tracking-[-0.02em] text-foreground group-hover:text-foreground sm:text-2xl md:text-3xl">
                      {post.title}
                    </h2>

                    {/* Summary */}
                    <p className="mt-3 text-base leading-relaxed text-foreground/80 md:text-lg">
                      {post.summary}
                    </p>
                  </div>

                  {/* Tags and CTA */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline/60 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {(post.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-hairline bg-foreground/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-muted/90"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      <span>Read article</span>
                      <span aria-hidden>&rarr;</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
