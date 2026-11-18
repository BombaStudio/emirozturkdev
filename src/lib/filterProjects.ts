// src/lib/filterProjects.ts

import { useMemo } from "react";

export interface ProjectLike {
  title: string;
  description?: string;
  category?: string;
  type?: string;
  tags?: string[];
  tag?: string;
  technologies?: string[];
  techStack?: string[];
  link?: string;
  liveUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  featured?: boolean;
  order?: number;
  date?: string;
  slug?: string;
}

export interface FilterProjectsOptions {
  category?: string | null;
  tag?: string | null;
  tags?: string[] | null;
  search?: string | null;
  query?: string | null;
  featured?: boolean | null;
  sortBy?: "default" | "date" | "order" | "title";
}

// High-performance WeakMap cache keyed by the source items array reference
const filterCache = new WeakMap<object, Map<string, unknown[]>>();

function normalizeOptionsKey(options: FilterProjectsOptions = {}): string {
  const opts = options || {};
  const normalized = {
    category: opts.category?.toLowerCase().trim() || "all",
    tag: opts.tag?.toLowerCase().trim() || "",
    tags: opts.tags ? [...opts.tags].map((t) => t.toLowerCase().trim()).sort().join(",") : "",
    search: (opts.search ?? opts.query)?.toLowerCase().trim() || "",
    featured: opts.featured ?? null,
    sortBy: opts.sortBy || "default",
  };
  return JSON.stringify(normalized);
}

/**
 * Multi-tier comparator for projects:
 * 1. featured (true before false)
 * 2. order (ascending: 0, 1, 2...)
 * 3. date (newest first)
 * 4. title (alphabetical ascending)
 */
function compareProjects<T extends ProjectLike>(a: T, b: T, sortBy: string = "default"): number {
  if (sortBy === "title") {
    return (a.title || "").localeCompare(b.title || "");
  }

  if (sortBy === "order") {
    const orderA = a.order ?? 9999;
    const orderB = b.order ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
  }

  if (sortBy === "date") {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
      return dateB - dateA;
    }
  }

  // Default multi-tier sort: featured -> order -> date -> title
  const featuredA = a.featured ? 1 : 0;
  const featuredB = b.featured ? 1 : 0;
  if (featuredA !== featuredB) {
    return featuredB - featuredA; // Featured comes first
  }

  const orderA = a.order ?? 9999;
  const orderB = b.order ?? 9999;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  if (!isNaN(dateA) && !isNaN(dateB) && dateA !== 0 && dateB !== 0 && dateA !== dateB) {
    return dateB - dateA;
  }

  return 0;
}

/**
 * Pure, memoized filtering and sorting helper for projects.
 * Supports category filtering, tag filtering, text search, featured flag, and multi-tier sorting.
 */
export function filterProjects<T extends ProjectLike>(
  items: T[],
  options?: FilterProjectsOptions | null
): T[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return [];
  }

  const opts = options || {};
  const cacheKey = normalizeOptionsKey(opts);

  // Check WeakMap cache
  let arrayCache = filterCache.get(items);
  if (!arrayCache) {
    arrayCache = new Map();
    filterCache.set(items, arrayCache);
  } else if (arrayCache.has(cacheKey)) {
    return arrayCache.get(cacheKey) as T[];
  }

  const targetCategory = (opts.category || "all").toLowerCase().trim();
  const targetTag = (opts.tag || "").toLowerCase().trim();
  const targetTags = opts.tags?.map((t) => t.toLowerCase().trim()).filter(Boolean) || [];
  const searchQuery = (opts.search ?? opts.query)?.toLowerCase().trim() || "";
  const filterFeatured = opts.featured;

  const result = items.filter((item) => {
    if (!item) return false;

    // 1. Category filter (checking category and legacy type)
    if (targetCategory && targetCategory !== "all") {
      const itemCategory = (item.category ?? item.type ?? "").toLowerCase().trim();
      if (itemCategory !== targetCategory) {
        return false;
      }
    }

    // 2. Tag filter
    if (targetTag) {
      const itemTags = [
        ...(item.tags || []),
        ...(item.tag ? [item.tag] : []),
      ].map((t) => t.toLowerCase().trim());

      if (!itemTags.includes(targetTag)) {
        return false;
      }
    }

    if (targetTags.length > 0) {
      const itemTags = [
        ...(item.tags || []),
        ...(item.tag ? [item.tag] : []),
      ].map((t) => t.toLowerCase().trim());

      const hasAllTags = targetTags.every((t) => itemTags.includes(t));
      if (!hasAllTags) {
        return false;
      }
    }

    // 3. Featured filter
    if (filterFeatured !== undefined && filterFeatured !== null) {
      if (Boolean(item.featured) !== filterFeatured) {
        return false;
      }
    }

    // 4. Text Search filter (matching title, description, technologies/techStack)
    if (searchQuery) {
      const title = (item.title || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const techs = [
        ...(item.technologies || []),
        ...(item.techStack || []),
      ].join(" ").toLowerCase();

      const matched =
        title.includes(searchQuery) ||
        desc.includes(searchQuery) ||
        techs.includes(searchQuery);

      if (!matched) {
        return false;
      }
    }

    return true;
  });

  // Sort the filtered results
  result.sort((a, b) => compareProjects(a, b, opts.sortBy));

  // Store in cache
  arrayCache.set(cacheKey, result);

  return result;
}

/**
 * React hook for memoized project filtering.
 */
export function useFilteredProjects<T extends ProjectLike>(
  items: T[],
  options?: FilterProjectsOptions | null
): T[] {
  return useMemo(() => {
    return filterProjects(items, options);
  }, [items, options]);
}
