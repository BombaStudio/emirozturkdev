// src/lib/content.ts

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/../keystatic.config";
import { portfolio } from "@/data/portfolio";
import { normalizeProject, normalizeJob } from "@/types/portfolio";
import type {
  ProjectEntity,
  ExperienceEntity,
  AcademicWorkEntity,
  BlogPostEntity,
  AcademicType,
  ContentCategory,
} from "@/types/content";

// Singleton reader instance helper to infer exact Keystatic collection reader types
function createReaderInstance() {
  return createReader(process.cwd(), keystaticConfig);
}

type KeystaticReader = ReturnType<typeof createReaderInstance>;

let _reader: KeystaticReader | null = null;

export function getReader(): KeystaticReader {
  if (!_reader) {
    _reader = createReaderInstance();
  }
  return _reader;
}

/**
 * Retrieve all projects from Keystatic with automatic fallback to static portfolio data.
 */
export async function getProjects(): Promise<ProjectEntity[]> {
  try {
    const reader = getReader();
    const items = await reader.collections.projects.all();

    if (items && items.length > 0) {
      const entities: ProjectEntity[] = items.map(({ slug, entry }) => {
        const live = entry.liveLink ?? undefined;
        const github = entry.githubLink ?? undefined;
        const youtube = entry.youtubeLink ?? undefined;
        const techs = [...(entry.technologies || [])];

        return {
          slug,
          title: entry.title,
          description: entry.description,
          category: (entry.category as ContentCategory) || "other",
          date: entry.date,
          liveUrl: live,
          githubUrl: github,
          youtubeUrl: youtube,
          technologies: techs,
          techStack: techs,
          tags: [...(entry.tags || [])],
          featured: Boolean(entry.featured),
          order: Number(entry.order ?? 0),
          link: live || github || "",
          type: entry.category,
        };
      });

      return entities.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        const parseYear = (d?: string) => {
          if (!d) return 0;
          if (d.toLowerCase().includes("present")) return 9999;
          const m = d.match(/\b(20\d\d)\b/);
          return m ? parseInt(m[1], 10) : 0;
        };
        const yrA = parseYear((a as { date?: string; startDate?: string; endDate?: string }).date || a.startDate || a.endDate);
        const yrB = parseYear((b as { date?: string; startDate?: string; endDate?: string }).date || b.startDate || b.endDate);
        if (yrA !== yrB && yrA > 0 && yrB > 0) {
          return yrB - yrA;
        }
        return (a.order ?? 999) - (b.order ?? 999);
      });
    }
  } catch (err) {
    console.warn("Keystatic reader getProjects fallback to portfolio.ts:", err);
  }

  // Fallback to static portfolio data
  return portfolio.projects.map((p, idx) => normalizeProject(p, idx));
}

/**
 * Retrieve a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectEntity | null> {
  const target = (slug || "").trim().toLowerCase();
  if (!target) return null;
  const projects = await getProjects();
  return projects.find((p) => (p.slug || "").trim().toLowerCase() === target) || null;
}

/**
 * Retrieve all experience entries from Keystatic with automatic fallback.
 */
export async function getExperience(): Promise<ExperienceEntity[]> {
  try {
    const reader = getReader();
    const items = await reader.collections.experience.all();

    if (items && items.length > 0) {
      const entities: ExperienceEntity[] = items.map(({ slug, entry }) => {
        return {
          slug,
          title: `${entry.role} at ${entry.company}`,
          company: entry.company,
          role: entry.role,
          location: entry.location,
          startDate: entry.startDate,
          endDate: entry.endDate,
          description: entry.description,
          technologies: [...(entry.technologies || [])],
          achievements: [...(entry.achievements || [])],
          category: (entry.category as ContentCategory) || "fullstack",
          tags: [...(entry.tags || [])],
          featured: Boolean(entry.featured),
          order: Number(entry.order ?? 0),
        };
      });

      return entities.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        const parseYear = (d?: string) => {
          if (!d) return 0;
          if (d.toLowerCase().includes("present")) return 9999;
          const m = d.match(/\b(20\d\d)\b/);
          return m ? parseInt(m[1], 10) : 0;
        };
        const yrA = parseYear((a as { date?: string; startDate?: string; endDate?: string }).date || a.startDate || a.endDate);
        const yrB = parseYear((b as { date?: string; startDate?: string; endDate?: string }).date || b.startDate || b.endDate);
        if (yrA !== yrB && yrA > 0 && yrB > 0) {
          return yrB - yrA;
        }
        return (a.order ?? 999) - (b.order ?? 999);
      });
    }
  } catch (err) {
    console.warn("Keystatic reader getExperience fallback to portfolio.ts:", err);
  }

  // Fallback to static portfolio data
  return portfolio.jobs.map((j, idx) => normalizeJob(j, idx));
}

/**
 * Retrieve a single experience entry by slug.
 */
export async function getExperienceBySlug(slug: string): Promise<ExperienceEntity | null> {
  const target = (slug || "").trim().toLowerCase();
  if (!target) return null;
  const experiences = await getExperience();
  return experiences.find((e) => (e.slug || "").trim().toLowerCase() === target) || null;
}

/**
 * Retrieve all academic work entries from Keystatic.
 */
export async function getAcademicWork(): Promise<AcademicWorkEntity[]> {
  try {
    const reader = getReader();
    const items = await reader.collections.academicWork.all();

    if (items && items.length > 0) {
      const entities: AcademicWorkEntity[] = items.map(({ slug, entry }) => {
        return {
          slug,
          title: entry.title,
          type: (entry.type as AcademicType) || "paper",
          category: (entry.category as ContentCategory) || "physics",
          date: entry.date,
          abstract: entry.abstract,
          link: entry.link ?? undefined,
          relatedProject: entry.relatedProject ?? undefined,
          relatedProjectSlugs: entry.relatedProject ? [entry.relatedProject] : [],
          tags: [...(entry.tags || [])],
          featured: Boolean(entry.featured),
          order: Number(entry.order ?? 0),
        };
      });

      return entities.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
        const parseYear = (d?: string) => {
          if (!d) return 0;
          if (d.toLowerCase().includes("present")) return 9999;
          const m = d.match(/\b(20\d\d)\b/);
          return m ? parseInt(m[1], 10) : 0;
        };
        const yrA = parseYear((a as { date?: string; startDate?: string; endDate?: string }).date || a.startDate || a.endDate);
        const yrB = parseYear((b as { date?: string; startDate?: string; endDate?: string }).date || b.startDate || b.endDate);
        if (yrA !== yrB && yrA > 0 && yrB > 0) {
          return yrB - yrA;
        }
        return (a.order ?? 999) - (b.order ?? 999);
      });
    }
  } catch (err) {
    console.warn("Keystatic reader getAcademicWork error:", err);
  }

  return [];
}

/**
 * Retrieve a single academic work entry by slug.
 */
export async function getAcademicWorkBySlug(slug: string): Promise<AcademicWorkEntity | null> {
  const target = (slug || "").trim().toLowerCase();
  if (!target) return null;
  const works = await getAcademicWork();
  return works.find((w) => (w.slug || "").trim().toLowerCase() === target) || null;
}

/**
 * Retrieve all blog posts from Keystatic with parsed MDX content.
 */
export async function getBlogPosts(): Promise<BlogPostEntity[]> {
  try {
    const reader = getReader();
    const items = await reader.collections.blog.all();

    if (items && items.length > 0) {
      const posts: BlogPostEntity[] = [];

      for (const { slug, entry } of items) {
        let content = "";
        if (typeof entry.content === "function") {
          content = await entry.content();
        }

        const relatedProjects = [...(entry.relatedProjects || [])].filter(Boolean) as string[];
        const relatedExperience = [...(entry.relatedExperience || [])].filter(Boolean) as string[];
        const relatedAcademicWork = [...(entry.relatedAcademicWork || [])].filter(Boolean) as string[];

        const words = content
          ? content.replace(/```[\s\S]*?```/g, "").split(/\s+/).filter(Boolean).length
          : 0;
        const readingMinutes = Math.max(1, Math.ceil(words / 200));
        const readingTime = `${readingMinutes} min read`;

        posts.push({
          slug,
          title: entry.title,
          summary: entry.summary,
          publishedAt: entry.publishedDate,
          coverImage: entry.coverImage ?? undefined,
          readingTime,
          tags: [...(entry.tags || [])],
          relatedProjects,
          relatedExperience,
          relatedAcademicWork,
          relatedProjectSlugs: relatedProjects,
          relatedExperienceSlugs: relatedExperience,
          relatedAcademicSlugs: relatedAcademicWork,
          category: "other",
          featured: false,
          order: 0,
          content,
        });
      }

      return posts.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      });
    }
  } catch (err) {
    console.warn("Keystatic reader getBlogPosts error:", err);
  }

  return [];
}

/**
 * Retrieve a single blog post by slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostEntity | null> {
  const target = (slug || "").trim().toLowerCase();
  if (!target) return null;
  const posts = await getBlogPosts();
  return posts.find((p) => (p.slug || "").trim().toLowerCase() === target) || null;
}

export const getAllBlogPosts = getBlogPosts;
export const getBlogPost = getBlogPostBySlug;
