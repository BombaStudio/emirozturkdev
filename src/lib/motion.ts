import type { Transition } from "motion/react";

/**
 * Apple'ın "damping / response" çifti → Motion'ın "bounce / duration" çifti.
 * bounce: 0   ≈ critically damped (overshoot yok)
 * bounce: 0.2 ≈ momentum'lu fırlatma sonrası hafif taşma
 */
export const spring = {
  standard: { type: "spring", bounce: 0, duration: 0.35 },
  snappy: { type: "spring", bounce: 0, duration: 0.2 },
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 },
  sheet: { type: "spring", bounce: 0, duration: 0.3 },
} satisfies Record<string, Transition>;

/** Apple'ın momentum projection formülü (WWDC 2018, Designing Fluid Interfaces) */
export const project = (velocity: number, decelerationRate = 0.998) =>
  (velocity / 1000) * decelerationRate / (1 - decelerationRate);

/** Sınırda sert durma yerine kademeli direnç (§9 Rubber-banding) */
export const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));

export type PointerSample = { y: number; t: number };

/** Son birkaç pointer örneğinden px/s cinsinden hız çıkarır (hız devri için). */
export const velocityFromSamples = (samples: PointerSample[]) => {
  if (samples.length < 2) return 0;
  const recent = samples.slice(-5);
  const first = recent[0];
  const last = recent[recent.length - 1];
  const dt = last.t - first.t;
  if (dt <= 0) return 0;
  return ((last.y - first.y) / dt) * 1000;
};

/** Aşağı sürükleme ile kapatma eşikleri */
export const dismissVelocity = 500; // px/s
export const dismissRatio = 0.25; // yüksekliğin %25'i
