// src/components/media/youtube-embed.tsx

import React from "react";

export interface YouTubeEmbedProps {
  /**
   * YouTube video URL (watch, youtu.be, embed, shorts, live) or bare 11-char video ID.
   * If falsy or invalid, the component returns null (graceful degradation).
   */
  url?: string | null;

  /**
   * Accessible title for screen readers (WCAG 2.1 compliance).
   * Defaults to "YouTube video player".
   */
  title?: string;

  /**
   * Optional visible caption or subtitle displayed underneath the player.
   */
  caption?: string;

  /**
   * Optional manual start time in seconds (overrides timestamp in URL if provided).
   */
  startTime?: number;

  /**
   * Optional additional CSS classes for the outer container.
   */
  className?: string;
}

/**
 * Parses timestamp string (e.g., "42", "42s", "1m30s", "1h2m3s") into total seconds.
 */
export function parseYouTubeTimestamp(raw?: string | null): number | undefined {
  if (!raw || typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (/^\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10);
  }
  const match = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/i);
  if (!match) return undefined;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : undefined;
}

/**
 * Extracts 11-character YouTube video ID from various URL formats, bare IDs, or <iframe> tags.
 * Returns null for invalid, non-YouTube, or empty inputs.
 */
export function extractYouTubeVideoId(input?: string | null): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Check for bare 11-char video ID (e.g. "dQw4w9WgXcQ")
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Extract src attribute if editor accidentally pasted an <iframe> HTML snippet
  let target = trimmed;
  const iframeMatch = trimmed.match(/<iframe[^>]*\ssrc=["\x27]([^"\x27]+)["\x27]/i);
  if (iframeMatch) {
    target = iframeMatch[1].trim();
  }

  // 3. Strict regex with domain boundary verification
  // Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, shorts/, live/, v/, e/
  const regex =
    /^(?:https?:)?(?:\/\/)?(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|(?:embed|shorts|live|v|e)\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

  const match = target.match(regex);
  return match ? match[1] : null;
}

/**
 * Extracts start time (in seconds) from URL query parameters (e.g. t=42s, start=90).
 */
export function extractYouTubeStartTime(input?: string | null): number | undefined {
  if (!input || typeof input !== "string") return undefined;
  const match = input.match(/[?&](?:t|start)=([^&#\s]+)/i);
  return match ? parseYouTubeTimestamp(match[1]) : undefined;
}

/**
 * Builds privacy-enhanced embed URL using youtube-nocookie.com.
 */
export function buildYouTubeEmbedUrl(videoId: string, startTime?: number): string {
  const base = `https://www.youtube-nocookie.com/embed/${videoId}`;
  if (startTime !== undefined && startTime > 0) {
    return `${base}?start=${startTime}`;
  }
  return base;
}

/**
 * Privacy-enhanced, responsive YouTube Video Embed component for entity detail pages.
 * - Uses youtube-nocookie.com domain for GDPR/privacy compliance
 * - Employs Tailwind CSS 16:9 aspect-video container with Quiet Luxury styling
 * - Fails gracefully (returns null) on missing, null, or invalid URLs
 * - Pure React Server Component (zero client-side JS overhead)
 */
export function YouTubeEmbed({
  url,
  title = "YouTube video player",
  caption,
  startTime: explicitStartTime,
  className = "",
}: YouTubeEmbedProps) {
  const videoId = extractYouTubeVideoId(url);

  // Fail gracefully: if no valid YouTube video ID could be extracted, render nothing.
  if (!videoId) {
    return null;
  }

  const effectiveStartTime = explicitStartTime ?? extractYouTubeStartTime(url);
  const embedUrl = buildYouTubeEmbedUrl(videoId, effectiveStartTime);

  return (
    <figure className={`w-full ${className}`}>
      {/* 16:9 Responsive Container — Quiet Luxury Styling */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-subtle)] transition-colors hover:border-hairline print:hidden">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Print / ATS CV View Fallback */}
      <div className="hidden py-2 print:block">
        <p className="font-mono text-xs text-foreground">
          <span className="font-bold">Video:</span> https://youtu.be/{videoId}
        </p>
      </div>

      {/* Optional Caption */}
      {caption && (
        <figcaption className="mt-2.5 px-1 font-sans text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default YouTubeEmbed;
