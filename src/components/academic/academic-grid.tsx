"use client";

import { useMemo, useTransition, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import type { AcademicWorkEntity } from "@/types/content";
import { spring } from "@/lib/motion";

interface AcademicGridProps {
  initialWorks: AcademicWorkEntity[];
}

interface FilterCategory {
  label: string;
  value: string;
}

const categories: FilterCategory[] = [
  { label: "All", value: "all" },
  { label: "Paper", value: "paper" },
  { label: "Thesis", value: "thesis" },
  { label: "Presentation", value: "presentation" },
  { label: "Article", value: "article" },
  { label: "Research", value: "research" },
];

export default function AcademicGrid({ initialWorks }: AcademicGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Read active category from URL (?category=paper)
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam ? categoryParam.toLowerCase() : "all";

  // Category selection handler: updates ?category=... without page jump
  const handleCategorySelect = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryValue === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryValue.toLowerCase());
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  // Filter and sort academic works
  const filteredWorks = useMemo(() => {
    return initialWorks
      .filter((work) => {
        // 1. Category / Type filter
        if (activeCategory !== "all") {
          const typeMatch = (work.type || "").toLowerCase() === activeCategory;
          const categoryMatch = (work.category || "").toLowerCase() === activeCategory;
          if (!typeMatch && !categoryMatch) {
            return false;
          }
        }

        // 2. Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const titleMatch = (work.title || "").toLowerCase().includes(q);
          const abstractMatch = (work.abstract || "").toLowerCase().includes(q);
          const tagsMatch = (work.tags || []).some((t) => t.toLowerCase().includes(q));
          const categoryMatch = (work.category || "").toLowerCase().includes(q);
          const typeMatch = (work.type || "").toLowerCase().includes(q);

          if (!titleMatch && !abstractMatch && !tagsMatch && !categoryMatch && !typeMatch) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Multi-tier sort: featured first -> order ascending -> date descending -> title
        if (a.featured !== b.featured) {
          return b.featured ? 1 : -1;
        }
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
          return dateB - dateA;
        }
        return (a.title || "").localeCompare(b.title || "");
      });
  }, [initialWorks, activeCategory, searchQuery]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      {/* ------------------------------------------------------------- Sidebar Filter */}
      <div className="md:col-span-3">
        <div className="md:sticky md:top-24">
          <p className="label mb-3 hidden md:block">Filter by Type</p>

          {/* Segmented Pill List */}
          <ul
            role="group"
            aria-label="Filter academic works by type"
            className="flex flex-wrap gap-1 md:flex-col md:items-start"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat.value;

              return (
                <li key={cat.value} className="w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(cat.value)}
                    aria-pressed={active}
                    className={`pressable relative flex h-9 w-full items-center justify-between rounded-full px-3 text-sm transition-colors md:w-auto ${
                      active
                        ? "font-medium text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId="academic-filter-pill"
                        className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                        transition={spring.standard}
                      />
                    )}
                    <span className="relative">{cat.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Search Box */}
          <div className="mt-6 border-t border-hairline/80 pt-5">
            <label htmlFor="academic-search" className="label mb-2 block">
              Search Topics
            </label>
            <input
              id="academic-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Chaos, Quantum, Rust..."
              className="w-full rounded-lg border border-hairline bg-surface/80 px-3 py-1.5 font-mono text-xs text-foreground placeholder:text-muted/60 focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-1 font-mono text-[10px] text-muted hover:text-foreground"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Result Counter */}
          <p
            aria-live="polite"
            className="mt-5 font-mono text-xs text-muted/70"
          >
            Showing {filteredWorks.length} of {initialWorks.length} publications
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- Cards Grid */}
      <div className="md:col-span-9">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredWorks.map((work, index) => (
            <m.article
              key={work.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...spring.snappy, delay: Math.min(index * 0.03, 0.15) }
              }
              className="card-surface pressable group relative flex flex-col justify-between p-6 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
            >
              <div>
                {/* Card Top Eyebrow Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="label text-[11px] font-semibold uppercase">
                      {work.type}
                    </span>
                    <span className="text-muted/30">&middot;</span>
                    <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted/80">
                      {work.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted/60">
                    {work.date}
                  </span>
                </div>

                {/* Card Title linking to Detail Page */}
                <h2 className="mt-3 text-base font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-foreground sm:text-lg">
                  <Link
                    href={`/academic/${work.slug}`}
                    className="focus:outline-none focus:underline"
                  >
                    {work.title}
                  </Link>
                </h2>

                {/* Abstract snippet */}
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
                  {work.abstract}
                </p>

                {/* Keywords / Tags */}
                {work.tags && work.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {work.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-hairline/60 bg-surface px-2 py-0.5 font-mono text-[10px] text-muted/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Actions & Cross-References */}
              <div className="mt-6 border-t border-hairline/60 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Companion Project Link */}
                  {work.relatedProject ? (
                    <Link
                      href={`/projects/${work.relatedProject}`}
                      className="pressable inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-foreground"
                    >
                      <span className="text-muted/60">Project:</span>
                      <span className="underline underline-offset-2">
                        {work.relatedProject}
                      </span>
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  ) : (
                    <span className="font-mono text-[11px] text-muted/50">
                      Independent Study
                    </span>
                  )}

                  {/* External Publication / Detail Links */}
                  <div className="flex items-center gap-3">
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-foreground"
                      >
                        <span>{work.doi ? "DOI" : "Source"}</span>
                        <span aria-hidden>&#8599;</span>
                      </a>
                    )}
                    <Link
                      href={`/academic/${work.slug}`}
                      className="pressable inline-flex items-center gap-1 font-medium text-foreground hover:underline"
                    >
                      <span>Details</span>
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </m.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 && (
          <div className="card-surface px-6 py-16 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-muted/60">
              No Matches
            </p>
            <h3 className="mt-2 text-base font-medium text-foreground">
              No academic works found
            </h3>
            <p className="mt-1 text-sm text-muted">
              {searchQuery
                ? `No publications match "${searchQuery}".`
                : `No publications currently filed under "${activeCategory}".`}
            </p>
            <div className="mt-5 flex justify-center gap-3">
              {activeCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className="pressable rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
                >
                  Clear category filter
                </button>
              )}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="pressable rounded-full border border-hairline px-4 py-2 text-xs text-muted hover:text-foreground"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
