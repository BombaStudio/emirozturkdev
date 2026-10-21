"use client";

import { LazyMotion, domMax } from "motion/react";

/**
 * `strict` mod: yalnızca `m.*` bileşenleri kullanılabilir (ağaç sallama garantisi).
 * `domMax` = domAnimation + drag (pan) + layout animasyonları.
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
