"use client";

import { useEffect } from "react";

/**
 * Reflects scroll state to CSS via `<html data-scrolled>`.
 * Keeps Header as an RSC; client overhead is limited to a single rAF cycle.
 */
export default function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      root.toggleAttribute("data-scrolled", window.scrollY > 8);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.removeAttribute("data-scrolled");
    };
  }, []);

  return null;
}
