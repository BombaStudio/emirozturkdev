// src/components/relations/cross-references.tsx

import React from "react";
import Link from "next/link";
import type {
  ProjectEntity,
  ExperienceEntity,
  AcademicWorkEntity,
  BlogPostEntity,
} from "@/types/content";

export interface CrossReferencesProps {
  /** Section eyebrow label (defaults to "Connections") */
  eyebrow?: string;
  /** Main section heading (defaults to "Related Work & Cross-References") */
  title?: string;
  /** Related academic works */
  academicWorks?: AcademicWorkEntity[];
  /** Related blog posts */
  blogPosts?: BlogPostEntity[];
  /** Related projects list */
  projects?: ProjectEntity[];
  /** Single primary associated project */
  project?: ProjectEntity | null;
  /** Related experience entries */
  experiences?: ExperienceEntity[];
  /** Unified crossRefs object (if caller passes resolved object) */
  crossRefs?: {
    projects?: ProjectEntity[];
    experience?: ExperienceEntity[];
    experiences?: ExperienceEntity[];
    academicWork?: AcademicWorkEntity[];
    academicWorks?: AcademicWorkEntity[];
    blogPosts?: BlogPostEntity[];
  };
  /** Optional additional CSS classes */
  className?: string;
  /** If true, render empty state instead of null */
  showEmptyState?: boolean;
  /** Custom empty state message */
  emptyMessage?: string;
}

export function CrossReferences({
  eyebrow = "Connections",
  title = "Related Work & Cross-References",
  academicWorks: directAcademic = [],
  blogPosts: directBlog = [],
  projects: directProjects = [],
  project = null,
  experiences: directExperiences = [],
  crossRefs,
  className = "",
  showEmptyState = false,
  emptyMessage = "No related connections found.",
}: CrossReferencesProps) {
  // Merge direct and crossRefs inputs without duplicates
  const projectsMap = new Map<string, ProjectEntity>();
  if (project) projectsMap.set(project.slug, project);
  for (const p of directProjects) projectsMap.set(p.slug, p);
  if (crossRefs?.projects) {
    for (const p of crossRefs.projects) projectsMap.set(p.slug, p);
  }
  const resolvedProjects = Array.from(projectsMap.values());

  const academicMap = new Map<string, AcademicWorkEntity>();
  for (const a of directAcademic) academicMap.set(a.slug, a);
  if (crossRefs?.academicWork) {
    for (const a of crossRefs.academicWork) academicMap.set(a.slug, a);
  }
  if (crossRefs?.academicWorks) {
    for (const a of crossRefs.academicWorks) academicMap.set(a.slug, a);
  }
  const resolvedAcademic = Array.from(academicMap.values());

  const blogMap = new Map<string, BlogPostEntity>();
  for (const b of directBlog) blogMap.set(b.slug, b);
  if (crossRefs?.blogPosts) {
    for (const b of crossRefs.blogPosts) blogMap.set(b.slug, b);
  }
  const resolvedBlog = Array.from(blogMap.values());

  const expMap = new Map<string, ExperienceEntity>();
  for (const e of directExperiences) expMap.set(e.slug, e);
  if (crossRefs?.experience) {
    for (const e of crossRefs.experience) expMap.set(e.slug, e);
  }
  if (crossRefs?.experiences) {
    for (const e of crossRefs.experiences) expMap.set(e.slug, e);
  }
  const resolvedExperiences = Array.from(expMap.values());

  const totalCount =
    resolvedProjects.length +
    resolvedAcademic.length +
    resolvedBlog.length +
    resolvedExperiences.length;

  if (totalCount === 0) {
    if (!showEmptyState) {
      return null;
    }
    return (
      <section
        className={`mt-16 border-t border-hairline pt-12 md:mt-24 md:pt-16 ${className}`}
        aria-label="Related content"
      >
        <p className="label">{eyebrow}</p>
        <div className="card-surface mt-4 px-6 py-12 text-center">
          <p className="text-sm text-muted">{emptyMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`mt-16 border-t border-hairline pt-12 md:mt-24 md:pt-16 ${className}`}
      aria-label="Related cross-references"
    >
      <div className="mb-8 flex flex-col items-start gap-1">
        <div className="flex items-center gap-3">
          <p className="label">{eyebrow}</p>
          <span className="font-mono text-xs text-muted/60">
            &middot; {totalCount} {totalCount === 1 ? "reference" : "references"}
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="space-y-10">
        {/* Associated Project(s) */}
        {resolvedProjects.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="label">
                {resolvedProjects.length === 1 ? "Associated Project" : "Related Projects"}
              </p>
              <span className="font-mono text-xs text-muted/60">
                {resolvedProjects.length} {resolvedProjects.length === 1 ? "project" : "projects"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        )}

        {/* Academic Works */}
        {resolvedAcademic.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="label">Academic Research & Publications</p>
              <span className="font-mono text-xs text-muted/60">
                {resolvedAcademic.length} {resolvedAcademic.length === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedAcademic.map((work) => (
                <AcademicCard key={work.slug} work={work} />
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {resolvedBlog.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="label">Related Articles & Write-ups</p>
              <span className="font-mono text-xs text-muted/60">
                {resolvedBlog.length} {resolvedBlog.length === 1 ? "article" : "articles"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedBlog.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Experience Entries */}
        {resolvedExperiences.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="label">Related Work Experience</p>
              <span className="font-mono text-xs text-muted/60">
                {resolvedExperiences.length} {resolvedExperiences.length === 1 ? "role" : "roles"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resolvedExperiences.map((exp) => (
                <ExperienceCard key={exp.slug} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Card Components (Quiet Luxury Tokens)
// ---------------------------------------------------------------------------

function ProjectCard({ project }: { project: ProjectEntity }) {
  const techs = project.technologies || project.techStack || [];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-surface pressable group flex flex-col justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="label text-[10px]">
            Project &middot; {project.category}
          </span>
          <span
            aria-hidden
            className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
          >
            &#8599;
          </span>
        </div>
        <h3 className="mt-2 text-base font-medium text-foreground group-hover:text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3">
        <div className="flex flex-wrap gap-1">
          {techs.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted/80"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.date && (
          <span className="font-mono text-[11px] text-muted/60">{project.date}</span>
        )}
      </div>
    </Link>
  );
}

function AcademicCard({ work }: { work: AcademicWorkEntity }) {
  return (
    <Link
      href={`/academic/${work.slug}`}
      className="card-surface pressable group flex flex-col justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="label text-[10px]">
            Academic &middot; {work.type}
          </span>
          <span
            aria-hidden
            className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
          >
            &#8599;
          </span>
        </div>
        <h3 className="mt-2 text-base font-medium text-foreground group-hover:text-foreground">
          {work.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {work.abstract}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3">
        <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted/80">
          {work.category}
        </span>
        <span className="font-mono text-[11px] text-muted/60">{work.date}</span>
      </div>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPostEntity }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-surface pressable group flex flex-col justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="label text-[10px]">Article &middot; Blog</span>
          <span
            aria-hidden
            className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
          >
            &#8599;
          </span>
        </div>
        <h3 className="mt-2 text-base font-medium text-foreground group-hover:text-foreground">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {post.summary}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3">
        <div className="flex flex-wrap gap-1">
          {(post.tags || []).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted/80"
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-muted/60">
          {post.publishedAt}
        </span>
      </div>
    </Link>
  );
}

function ExperienceCard({ experience }: { experience: ExperienceEntity }) {
  return (
    <Link
      href={`/experience/${experience.slug}`}
      className="card-surface pressable group flex flex-col justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-[var(--shadow-lifted)]"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="label text-[10px]">
            Experience &middot; {experience.category}
          </span>
          <span
            aria-hidden
            className="text-sm text-muted/40 transition-colors group-hover:text-foreground"
          >
            &#8599;
          </span>
        </div>
        <h3 className="mt-2 text-base font-medium text-foreground group-hover:text-foreground">
          {experience.role}
        </h3>
        <p className="mt-0.5 font-mono text-xs text-muted">
          {experience.company} &middot; {experience.location}
        </p>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {experience.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3">
        <span className="font-mono text-[11px] text-muted/70">
          {experience.startDate} &mdash; {experience.endDate}
        </span>
        <span
          aria-hidden
          className="text-xs text-muted/40 transition-colors group-hover:text-foreground"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}

export default CrossReferences;
