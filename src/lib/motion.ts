import type { Transition } from "motion/react";

/**
 * Apple's "damping / response" pair → Motion's "bounce / duration" pair.
 * bounce: 0   ≈ critically damped (no overshoot)
 * bounce: 0.2 ≈ slight overflow after momentum fling
 */
export const spring = {
  standard: { type: "spring", bounce: 0, duration: 0.35 },
  snappy: { type: "spring", bounce: 0, duration: 0.2 },
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 },
  sheet: { type: "spring", bounce: 0, duration: 0.3 },
} satisfies Record<string, Transition>;

/** Apple's momentum projection formula (WWDC 2018, Designing Fluid Interfaces) */
export const project = (velocity: number, decelerationRate = 0.998) =>
  (velocity / 1000) * decelerationRate / (1 - decelerationRate);

/** Incremental resistance instead of hard boundary stops (§9 Rubber-banding) */
export const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

export type PointerSample = { y: number; t: number };

/** Extracts velocity in px/s from recent pointer samples for velocity transfer. */
export const velocityFromSamples = (samples: PointerSample[]) => {
  if (samples.length < 2) return 0;
  const recent = samples.slice(-5);
  const first = recent[0];
  const last = recent[recent.length - 1];
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  return ((last.y - first.y) / dt) * 1000;
};

/** Drag-down dismissal thresholds */
export const dismissVelocity = 500; // px/s
export const dismissRatio = 0.25; // 25% of height
