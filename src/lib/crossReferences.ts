// src/lib/crossReferences.ts

import {
  getProjects,
  getExperience,
  getAcademicWork,
  getBlogPosts,
  getExperienceBySlug,
  getAcademicWorkBySlug,
  getBlogPostBySlug,
} from "@/lib/content";
import type {
  ProjectEntity,
  ExperienceEntity,
  AcademicWorkEntity,
  BlogPostEntity,
} from "@/types/content";

export interface ProjectRelations {
  academicWorks: AcademicWorkEntity[];
  blogPosts: BlogPostEntity[];
  experiences: ExperienceEntity[];
  hasRelations: boolean;
}

export interface ExperienceRelations {
  blogPosts: BlogPostEntity[];
  projects: ProjectEntity[];
  academicWorks: AcademicWorkEntity[];
  hasRelations: boolean;
}

export interface AcademicWorkRelations {
  project: ProjectEntity | null;
  projects: ProjectEntity[];
  blogPosts: BlogPostEntity[];
  hasRelations: boolean;
}

export interface BlogPostRelations {
  projects: ProjectEntity[];
  experiences: ExperienceEntity[];
  academicWorks: AcademicWorkEntity[];
  hasRelations: boolean;
}

export interface ResolvedCrossReferences {
  projects: ProjectEntity[];
  experience: ExperienceEntity[];
  academicWork: AcademicWorkEntity[];
  blogPosts: BlogPostEntity[];
}

export type EntityType = "project" | "experience" | "academic" | "blog";

function normalizeSlug(slug: string | null | undefined): string {
  return (slug || "").trim().toLowerCase();
}

function includesSlug(slugList: string[] | undefined | null, targetSlug: string): boolean {
  if (!slugList || !Array.isArray(slugList)) return false;
  const target = normalizeSlug(targetSlug);
  if (!target) return false;
  return slugList.some((s) => {
    const norm = normalizeSlug(s);
    return Boolean(norm) && norm === target;
  });
}

/**
 * Retrieve related entities for a project by slug.
 * Bidirectional: resolves academic works and blog posts that link to this project,
 * plus any explicit relationships configured on the project itself.
 */
export async function getRelatedEntitiesForProject(slug: string): Promise<ProjectRelations> {
  const normalized = normalizeSlug(slug);

  if (!normalized) {
    return {
      academicWorks: [],
      blogPosts: [],
      experiences: [],
      hasRelations: false,
    };
  }

  const [academicList, blogList, experienceList, projectList] = await Promise.all([
    getAcademicWork(),
    getBlogPosts(),
    getExperience(),
    getProjects(),
  ]);

  const currentProject = projectList.find((p) => normalizeSlug(p.slug) === normalized);

  const academicWorks = academicList.filter((work) => {
    return (
      (Boolean(work.relatedProject) && normalizeSlug(work.relatedProject) === normalized) ||
      includesSlug(work.relatedProjectSlugs, normalized) ||
      includesSlug(currentProject?.relatedAcademicSlugs, work.slug)
    );
  });

  const blogPosts = blogList.filter((post) => {
    return (
      includesSlug(post.relatedProjects, normalized) ||
      includesSlug(post.relatedProjectSlugs, normalized) ||
      includesSlug(currentProject?.relatedBlogSlugs, post.slug)
    );
  });

  const experiences = experienceList.filter((exp) => {
    return (
      includesSlug(exp.relatedProjectSlugs, normalized) ||
      includesSlug(currentProject?.relatedExperienceSlugs, exp.slug)
    );
  });

  return {
    academicWorks,
    blogPosts,
    experiences,
    hasRelations: academicWorks.length > 0 || blogPosts.length > 0 || experiences.length > 0,
  };
}

/**
 * Retrieve related entities for an experience entry by slug.
 * Resolves related blog posts, associated projects, and academic works.
 */
export async function getRelatedEntitiesForExperience(slug: string): Promise<ExperienceRelations> {
  const normalized = normalizeSlug(slug);

  if (!normalized) {
    return {
      blogPosts: [],
      projects: [],
      academicWorks: [],
      hasRelations: false,
    };
  }

  const [blogList, projectList, academicList, currentExp] = await Promise.all([
    getBlogPosts(),
    getProjects(),
    getAcademicWork(),
    getExperienceBySlug(normalized),
  ]);

  const blogPosts = blogList.filter((post) => {
    return (
      includesSlug(post.relatedExperience, normalized) ||
      includesSlug(post.relatedExperienceSlugs, normalized) ||
      includesSlug(currentExp?.relatedBlogSlugs, post.slug)
    );
  });

  const expProjectSlugs = (currentExp?.relatedProjectSlugs || []).map(normalizeSlug).filter(Boolean);
  const projects = projectList.filter((proj) => {
    const projSlug = normalizeSlug(proj.slug);
    return (
      (Boolean(projSlug) && expProjectSlugs.includes(projSlug)) ||
      includesSlug(proj.relatedExperienceSlugs, normalized)
    );
  });

  const associatedProjectSlugs = new Set(projects.map((p) => normalizeSlug(p.slug)).filter(Boolean));
  const academicWorks = academicList.filter((work) => {
    const workProjSlug = normalizeSlug(work.relatedProject);
    return (
      (Boolean(workProjSlug) && associatedProjectSlugs.has(workProjSlug)) ||
      (work.relatedProjectSlugs || []).some((s) => {
        const norm = normalizeSlug(s);
        return Boolean(norm) && associatedProjectSlugs.has(norm);
      })
    );
  });

  return {
    blogPosts,
    projects,
    academicWorks,
    hasRelations: blogPosts.length > 0 || projects.length > 0 || academicWorks.length > 0,
  };
}

/**
 * Retrieve related entities for an academic work by slug or entity object.
 * Resolves companion project and related blog articles.
 */
export async function getRelatedEntitiesForAcademicWork(
  slugOrWork: string | AcademicWorkEntity
): Promise<AcademicWorkRelations> {
  const normalized =
    typeof slugOrWork === "string" ? normalizeSlug(slugOrWork) : normalizeSlug(slugOrWork.slug);

  if (!normalized) {
    return {
      project: null,
      projects: [],
      blogPosts: [],
      hasRelations: false,
    };
  }

  const work =
    typeof slugOrWork === "string"
      ? await getAcademicWorkBySlug(normalized)
      : slugOrWork;

  if (!work) {
    return {
      project: null,
      projects: [],
      blogPosts: [],
      hasRelations: false,
    };
  }

  const workSlug = normalizeSlug(work.slug);
  const [projectList, blogList] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);

  const targetProjectSlugs = new Set<string>();
  if (work.relatedProject) {
    const norm = normalizeSlug(work.relatedProject);
    if (norm) targetProjectSlugs.add(norm);
  }
  if (work.relatedProjectSlugs) {
    work.relatedProjectSlugs.forEach((s) => {
      const norm = normalizeSlug(s);
      if (norm) targetProjectSlugs.add(norm);
    });
  }

  const projects = projectList.filter((p) => {
    const pSlug = normalizeSlug(p.slug);
    return (
      Boolean(pSlug) &&
      (targetProjectSlugs.has(pSlug) || includesSlug(p.relatedAcademicSlugs, workSlug))
    );
  });
  const primaryProject =
    (work.relatedProject &&
      projectList.find((p) => {
        const norm = normalizeSlug(work.relatedProject);
        return Boolean(norm) && normalizeSlug(p.slug) === norm;
      })) ||
    projects[0] ||
    null;

  const blogPosts = blogList.filter((post) => {
    return (
      includesSlug(post.relatedAcademicWork, workSlug) ||
      includesSlug(post.relatedAcademicSlugs, workSlug) ||
      includesSlug(work.relatedBlogSlugs, post.slug)
    );
  });

  return {
    project: primaryProject,
    projects,
    blogPosts,
    hasRelations: projects.length > 0 || blogPosts.length > 0,
  };
}

/**
 * Retrieve related entities for a blog post by slug or entity object.
 * Resolves referenced projects, experience roles, and academic works.
 */
export async function getRelatedEntitiesForBlogPost(
  postOrSlug: string | BlogPostEntity
): Promise<BlogPostRelations> {
  const normalized =
    typeof postOrSlug === "string" ? normalizeSlug(postOrSlug) : normalizeSlug(postOrSlug.slug);

  if (!normalized) {
    return {
      projects: [],
      experiences: [],
      academicWorks: [],
      hasRelations: false,
    };
  }

  const post =
    typeof postOrSlug === "string"
      ? await getBlogPostBySlug(normalized)
      : postOrSlug;

  if (!post) {
    return {
      projects: [],
      experiences: [],
      academicWorks: [],
      hasRelations: false,
    };
  }

  const [projectList, experienceList, academicList] = await Promise.all([
    getProjects(),
    getExperience(),
    getAcademicWork(),
  ]);

  const targetProjectSlugs = new Set(
    [
      ...(post.relatedProjects || []).map(normalizeSlug),
      ...(post.relatedProjectSlugs || []).map(normalizeSlug),
    ].filter(Boolean)
  );

  const targetExperienceSlugs = new Set(
    [
      ...(post.relatedExperience || []).map(normalizeSlug),
      ...(post.relatedExperienceSlugs || []).map(normalizeSlug),
    ].filter(Boolean)
  );

  const targetAcademicSlugs = new Set(
    [
      ...(post.relatedAcademicWork || []).map(normalizeSlug),
      ...(post.relatedAcademicSlugs || []).map(normalizeSlug),
    ].filter(Boolean)
  );

  const projects = projectList.filter((p) => {
    const pSlug = normalizeSlug(p.slug);
    return (
      Boolean(pSlug) &&
      (targetProjectSlugs.has(pSlug) || includesSlug(p.relatedBlogSlugs, normalized))
    );
  });
  const experiences = experienceList.filter((e) => {
    const eSlug = normalizeSlug(e.slug);
    return (
      Boolean(eSlug) &&
      (targetExperienceSlugs.has(eSlug) || includesSlug(e.relatedBlogSlugs, normalized))
    );
  });
  const academicWorks = academicList.filter((w) => {
    const wSlug = normalizeSlug(w.slug);
    return (
      Boolean(wSlug) &&
      (targetAcademicSlugs.has(wSlug) || includesSlug(w.relatedBlogSlugs, normalized))
    );
  });

  return {
    projects,
    experiences,
    academicWorks,
    hasRelations: projects.length > 0 || experiences.length > 0 || academicWorks.length > 0,
  };
}

/**
 * Unified cross-reference resolver for any entity type.
 */
export async function getCrossReferences(
  entityType: EntityType,
  currentSlug: string
): Promise<ResolvedCrossReferences> {
  const normalized = normalizeSlug(currentSlug);

  if (!normalized) {
    return {
      projects: [],
      experience: [],
      academicWork: [],
      blogPosts: [],
    };
  }

  if (entityType === "project") {
    const res = await getRelatedEntitiesForProject(normalized);
    return {
      projects: [],
      experience: res.experiences,
      academicWork: res.academicWorks,
      blogPosts: res.blogPosts,
    };
  }

  if (entityType === "experience") {
    const res = await getRelatedEntitiesForExperience(normalized);
    return {
      projects: res.projects,
      experience: [],
      academicWork: res.academicWorks,
      blogPosts: res.blogPosts,
    };
  }

  if (entityType === "academic") {
    const res = await getRelatedEntitiesForAcademicWork(normalized);
    return {
      projects: res.projects,
      experience: [],
      academicWork: [],
      blogPosts: res.blogPosts,
    };
  }

  if (entityType === "blog") {
    const res = await getRelatedEntitiesForBlogPost(normalized);
    return {
      projects: res.projects,
      experience: res.experiences,
      academicWork: res.academicWorks,
      blogPosts: [],
    };
  }

  return {
    projects: [],
    experience: [],
    academicWork: [],
    blogPosts: [],
  };
}
