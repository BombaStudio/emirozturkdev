// src/types/portfolio.ts

export * from "./content";

export {
  ProjectType,
  ProjectTag,
  type Project,
  type Job,
  type Education,
  type SkillCategory,
  type Portfolio,
} from "@/data/portfolio";

import type { ProjectEntity, ExperienceEntity } from "./content";
import type { Project as LegacyProject, Job as LegacyJob } from "@/data/portfolio";

// Backward-compatible aliases and adapters
export type JobEntity = ExperienceEntity;
export type ProjectLegacy = LegacyProject;
export type JobLegacy = LegacyJob;

/**
 * Adapter to normalize a legacy Project to ProjectEntity
 */
export function normalizeProject(p: LegacyProject, index = 0): ProjectEntity {
  const slug = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const isGithub = p.link.includes("github.com");

  return {
    slug,
    title: p.title,
    order: index,
    featured: index < 6,
    category: p.type,
    tags: [p.tag, ...(p.techStack || [])],
    description: p.description,
    date: p.date || "2024",
    liveUrl: isGithub ? undefined : p.link,
    githubUrl: isGithub ? p.link : undefined,
    technologies: p.techStack,
    techStack: p.techStack,
    link: p.link,
    type: p.type,
    tag: p.tag,
  };
}

/**
 * Adapter to normalize a legacy Job to ExperienceEntity
 */
export function normalizeJob(j: LegacyJob, index = 0): ExperienceEntity {
  const slug = j.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const bulletPoints = j.description
    .split("\n")
    .map((s) => s.replace(/^[•\-\*]\s*/, "").trim())
    .filter(Boolean);

  return {
    slug,
    title: `${j.title} at ${j.company}`,
    order: index,
    featured: index < 3,
    category: "fullstack",
    tags: [j.title, j.company],
    company: j.company,
    role: j.title,
    location: j.location,
    startDate: j.startDate,
    endDate: j.endDate,
    description: j.description,
    technologies: [],
    achievements: bulletPoints,
  };
}
