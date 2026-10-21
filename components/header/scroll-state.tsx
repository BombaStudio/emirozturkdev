"use client";

import { useEffect } from "react";

/**
 * Scroll durumunu `<html data-scrolled>` üzerinden CSS'e taşır.
 * Header böylece RSC olarak kalır; JS maliyeti tek bir rAF döngüsü.
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
