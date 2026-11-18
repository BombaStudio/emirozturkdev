"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Section entrance scroll reveal animation.
 *
 * Renders without `data-reveal` from the server (visible) → content is preserved if JS is disabled.
 * After mount, off-screen sections receive `data-reveal="hidden"` and
 * IntersectionObserver updates them to `"shown"` when scrolled into view.
 * Uses DOM attributes instead of React state: no re-renders, no cascade bottlenecks.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const belowFold = element.getBoundingClientRect().top > window.innerHeight;
    if (!belowFold) return;

    element.dataset.reveal = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
