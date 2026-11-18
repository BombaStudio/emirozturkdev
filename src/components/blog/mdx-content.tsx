import React from "react";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { YouTubeEmbed } from "@/components/media/youtube-embed";

interface MDXContentProps {
  source: string;
  className?: string;
}

/**
 * Preprocess MDX source to escape curly braces inside math blocks ($$ ... $$ and $ ... $)
 * so @mdx-js/mdx does not treat {dx}, {dt}, {\pi}, etc. as JSX expressions.
 */
function sanitizeMathBraces(source: string): string {
  if (!source) return "";
  return source
    .replace(/\$\$([\s\S]*?)\$\$/g, (_match, math) => {
      const escaped = math.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
      return `$$${escaped}$$`;
    })
    .replace(/\$([^$\n]+?)\$/g, (_match, math) => {
      const escaped = math.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
      return `$${escaped}$`;
    });
}

/**
 * Custom Quiet Luxury MDX component mapping.
 */
const customComponents = {
  // Headings
  h1: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={`mt-12 mb-6 text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl ${className}`}
      {...props}
    />
  ),
  h2: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={`mt-10 mb-4 text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl ${className}`}
      {...props}
    />
  ),
  h3: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={`mt-8 mb-3 text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl ${className}`}
      {...props}
    />
  ),
  h4: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={`mt-6 mb-2 text-lg font-semibold text-foreground ${className}`}
      {...props}
    />
  ),

  // Paragraphs — detects block math equations
  p: ({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"p">) => {
    if (typeof children === "string" && children.includes("$$")) {
      const lines = children
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const isAllMath =
        lines.length > 0 &&
        lines.every((l) => l.startsWith("$$") && l.endsWith("$$"));
      if (isAllMath) {
        return (
          <div className="my-8 flex flex-col items-center gap-2 overflow-x-auto rounded-xl border border-hairline bg-surface/80 p-5 font-mono text-sm text-foreground shadow-[var(--shadow-subtle)] sm:text-base">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className="py-1 tracking-wide font-mono text-foreground/90"
              >
                {line.replace(/^\$\$/g, "").replace(/\$\$$/g, "").trim()}
              </div>
            ))}
          </div>
        );
      }
    }
    return (
      <p
        className={`mb-6 text-base leading-relaxed text-foreground/85 md:text-lg ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  },

  // Links
  a: ({
    href = "",
    className = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"a">) => {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground ${className}`}
          {...props}
        >
          <span>{children}</span>
          <span
            aria-hidden
            className="ml-0.5 inline-block text-xs text-muted/60"
          >
            &#8599;
          </span>
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={`font-medium text-foreground underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={`mb-6 ml-6 list-disc space-y-2 text-foreground/85 marker:text-foreground/40 ${className}`}
      {...props}
    />
  ),
  ol: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={`mb-6 ml-6 list-decimal space-y-2 text-foreground/85 marker:font-mono marker:text-xs marker:text-muted ${className}`}
      {...props}
    />
  ),
  li: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li
      className={`pl-1 text-base leading-relaxed text-foreground/85 md:text-lg ${className}`}
      {...props}
    />
  ),

  // Blockquotes
  blockquote: ({
    className = "",
    ...props
  }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={`my-8 border-l-2 border-foreground/30 pl-6 italic text-foreground/80 ${className}`}
      {...props}
    />
  ),

  // Code
  code: ({
    className = "",
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"code">) => {
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className={`rounded-md bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[0.875em] font-normal text-foreground ${className}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className={`block font-mono text-xs leading-relaxed sm:text-sm ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  },

  // Pre container for code blocks
  pre: ({
    children,
    className = "",
    ...props
  }: React.ComponentPropsWithoutRef<"pre">) => {
    let language = "";
    if (React.isValidElement(children)) {
      const childProps = children.props as { className?: string };
      const match = childProps?.className?.match(/language-([a-z0-9_-]+)/i);
      if (match) {
        language = match[1];
      }
    }

    if (language === "math" || language === "latex") {
      return (
        <div className="my-8 flex flex-col items-center justify-center overflow-x-auto rounded-xl border border-hairline bg-surface/80 p-5 font-mono text-sm text-foreground shadow-[var(--shadow-subtle)] sm:text-base text-center">
          <div className="py-1 tracking-wide font-mono text-foreground/90">
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className="group relative my-8">
        {language && (
          <div className="absolute right-3 top-3 z-10 select-none rounded-md bg-foreground/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {language}
          </div>
        )}
        <pre
          className={`overflow-x-auto rounded-xl border border-hairline bg-surface p-5 font-mono text-xs leading-relaxed text-foreground shadow-[var(--shadow-subtle)] sm:text-sm ${className}`}
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  // Dividers
  hr: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className={`my-12 border-t border-hairline ${className}`} {...props} />
  ),

  // Images
  img: ({
    src = "",
    alt = "",
    className = "",
    ...props
  }: React.ComponentPropsWithoutRef<"img">) => (
    <figure className="my-10 overflow-hidden rounded-2xl border border-hairline bg-surface p-2 shadow-[var(--shadow-subtle)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full rounded-xl object-cover ${className}`}
        {...props}
      />
      {alt && (
        <figcaption className="mt-3 text-center font-mono text-xs text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Tables
  table: ({
    className = "",
    ...props
  }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-hairline bg-surface shadow-[var(--shadow-subtle)]">
      <table
        className={`w-full border-collapse text-left text-sm ${className}`}
        {...props}
      />
    </div>
  ),
  th: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className={`border-b border-border bg-foreground/[0.02] px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider text-muted ${className}`}
      {...props}
    />
  ),
  td: ({ className = "", ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td
      className={`border-b border-hairline/60 px-4 py-3 text-foreground/80 ${className}`}
      {...props}
    />
  ),

  // Custom Embeds
  YouTubeEmbed,
  Callout: ({
    type = "note",
    title,
    children,
  }: {
    type?: "note" | "tip" | "warning";
    title?: string;
    children: React.ReactNode;
  }) => (
    <aside className="my-8 rounded-xl border border-hairline bg-surface/70 p-5 shadow-[var(--shadow-subtle)]">
      <div className="flex items-center gap-2">
        <span className="label text-[10px]">{type}</span>
        {title && (
          <span className="text-sm font-medium text-foreground">{title}</span>
        )}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-foreground/85">
        {children}
      </div>
    </aside>
  ),
};

export async function MDXContent({ source, className = "" }: MDXContentProps) {
  if (!source || !source.trim()) {
    return (
      <div className="card-surface p-8 text-center text-sm text-muted">
        No written content available for this post.
      </div>
    );
  }

  const sanitized = sanitizeMathBraces(source);

  let compiledContent: React.ReactNode = null;
  let hasError = false;

  try {
    const { content } = await compileMDX({
      source: sanitized,
      components: customComponents,
      options: {
        parseFrontmatter: true,
      },
    });
    compiledContent = content;
  } catch (err) {
    console.error("MDX compilation error:", err);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="card-surface p-6 font-mono text-xs text-red-600">
        Failed to render article content.
      </div>
    );
  }

  return <div className={`prose-container ${className}`}>{compiledContent}</div>;
}
