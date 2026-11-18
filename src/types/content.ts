// src/types/content.ts

export type ContentCategory =
  | "web"
  | "mobile"
  | "game"
  | "ai"
  | "system"
  | "web3"
  | "physics"
  | "fullstack"
  | "other";

export type AcademicType = "paper" | "thesis" | "presentation" | "article" | "research";

export interface BaseEntity {
  slug: string;
  title: string;
  order: number;
  featured: boolean;
  category: ContentCategory | string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectEntity extends BaseEntity {
  description: string;
  content?: string; // Markdown / MDX body for detail view
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  technologies: string[];
  // Relational references
  relatedAcademicSlugs?: string[];
  relatedExperienceSlugs?: string[];
  relatedBlogSlugs?: string[];
  // Legacy aliases
  techStack?: string[];
  link?: string;
  type?: string;
  tag?: string;
}

export interface ExperienceEntity extends BaseEntity {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  content?: string; // Extended markdown for detail view
  technologies: string[];
  achievements: string[];
  relatedProjectSlugs?: string[];
  relatedBlogSlugs?: string[];
}

export interface AcademicWorkEntity extends BaseEntity {
  type: AcademicType;
  date: string;
  abstract: string;
  content?: string;
  link?: string;
  pdfUrl?: string;
  publicationUrl?: string;
  doi?: string;
  institution?: string;
  relatedProject?: string; // Keystatic relationship
  relatedProjectSlugs?: string[];
  relatedBlogSlugs?: string[];
}

export interface BlogPostEntity extends BaseEntity {
  summary: string;
  content: string; // MDX body
  publishedAt: string;
  coverImage?: string;
  readingTime?: string;
  relatedProjects?: string[]; // Keystatic relationships
  relatedExperience?: string[];
  relatedAcademicWork?: string[];
  relatedProjectSlugs?: string[];
  relatedExperienceSlugs?: string[];
  relatedAcademicSlugs?: string[];
}
