"use client";

import { LazyMotion, domMax } from "motion/react";

/**
 * `strict` mode: only `m.*` components are allowed (ensures tree-shaking).
 * `domMax` = domAnimation + drag (pan) + layout animations.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
