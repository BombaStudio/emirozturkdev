// keystatic.config.ts

import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: (process.env.KEYSTATIC_REPO || process.env.NEXT_PUBLIC_KEYSTATIC_REPO || "BombaStudio/emirozturkdev") as `${string}/${string}`,
        }
      : {
          kind: "local",
        },

  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Web", value: "web" },
            { label: "Mobile", value: "mobile" },
            { label: "Game Dev", value: "game" },
            { label: "AI / ML", value: "ai" },
            { label: "Systems & Engines", value: "system" },
            { label: "Web3 & Blockchain", value: "web3" },
            { label: "Physics & Simulation", value: "physics" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "web",
        }),
        date: fields.text({ label: "Date / Release (e.g. 2024, Oct 2025)" }),
        liveLink: fields.url({ label: "Live Demo URL" }),
        githubLink: fields.url({ label: "GitHub Repository URL" }),
        youtubeLink: fields.url({ label: "YouTube Video Embed URL" }),
        technologies: fields.array(fields.text({ label: "Technology" }), {
          label: "Technologies",
          itemLabel: (props) => props.value,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Featured Project",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),

    experience: collection({
      label: "Experience",
      slugField: "company",
      path: "src/content/experience/*",
      format: { data: "json" },
      schema: {
        company: fields.slug({ name: { label: "Company / Organization" } }),
        role: fields.text({ label: "Role / Position Title" }),
        location: fields.text({ label: "Location" }),
        startDate: fields.text({ label: "Start Date (e.g. Nov 2025)" }),
        endDate: fields.text({ label: "End Date (e.g. Present)" }),
        description: fields.text({ label: "Description", multiline: true }),
        technologies: fields.array(fields.text({ label: "Technology" }), {
          label: "Technologies",
          itemLabel: (props) => props.value,
        }),
        achievements: fields.array(fields.text({ label: "Achievement" }), {
          label: "Bullet Points / Achievements",
          itemLabel: (props) => props.value,
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Full Stack", value: "fullstack" },
            { label: "Game Dev", value: "game" },
            { label: "Mobile / AR", value: "mobile" },
            { label: "System / Engine", value: "system" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "fullstack",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Featured Experience",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),

    academicWork: collection({
      label: "Academic Work",
      slugField: "title",
      path: "src/content/academic-work/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        type: fields.select({
          label: "Work Type",
          options: [
            { label: "Paper", value: "paper" },
            { label: "Thesis", value: "thesis" },
            { label: "Presentation", value: "presentation" },
            { label: "Article", value: "article" },
            { label: "Research", value: "research" },
          ],
          defaultValue: "paper",
        }),
        category: fields.select({
          label: "Subject Category",
          options: [
            { label: "Physics", value: "physics" },
            { label: "Computer Science", value: "cs" },
            { label: "Quantum Computing", value: "quantum" },
            { label: "Computational Simulation", value: "simulation" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "physics",
        }),
        date: fields.text({ label: "Publication / Presentation Date" }),
        abstract: fields.text({ label: "Abstract", multiline: true }),
        link: fields.url({ label: "External / DOI / PDF Link" }),
        relatedProject: fields.relationship({
          label: "Related Project",
          collection: "projects",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({
          label: "Featured Academic Work",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),

    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        publishedDate: fields.text({ label: "Publication Date" }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        relatedProjects: fields.array(
          fields.relationship({
            label: "Related Project",
            collection: "projects",
          }),
          {
            label: "Related Projects",
            itemLabel: (props) => props.value || "None",
          }
        ),
        relatedExperience: fields.array(
          fields.relationship({
            label: "Related Experience",
            collection: "experience",
          }),
          {
            label: "Related Experience",
            itemLabel: (props) => props.value || "None",
          }
        ),
        relatedAcademicWork: fields.array(
          fields.relationship({
            label: "Related Academic Work",
            collection: "academicWork",
          }),
          {
            label: "Related Academic Work",
            itemLabel: (props) => props.value || "None",
          }
        ),
        content: fields.mdx({
          label: "Content (MDX)",
        }),
      },
    }),
  },
});
