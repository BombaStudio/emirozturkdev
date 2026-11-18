"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  animate,
  m,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
} from "motion/react";
import { portfolio } from "@/data/portfolio";
import { dismissRatio, dismissVelocity, spring } from "@/lib/motion";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  const y = useMotionValue(0);
  const scrimOpacity = useTransform(y, [0, 280], [1, 0]);
  const reduceMotion = useReducedMotion();

  /** Sweep down with spring; release velocity becomes the initial velocity of the spring. */
  const close = useCallback(
    (releaseVelocity = 0) => {
      if (reduceMotion) {
        y.set(0);
        setIsOpen(false);
        return;
      }

      const target =
        viewportHeight || (typeof window !== "undefined" ? window.innerHeight : 800);

      animate(y, target, {
        type: "spring",
        velocity: releaseVelocity,
        bounce: 0.12,
        duration: 0.28,
        onComplete: () => {
          y.set(0);
          setIsOpen(false);
        },
      });
    },
    [reduceMotion, viewportHeight, y]
  );

  const open = () => {
    y.set(0);
    setViewportHeight(window.innerHeight);
    setIsOpen(true);
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const height = viewportHeight || 800;
    const shouldDismiss =
      info.offset.y > height * dismissRatio ||
      (info.velocity.y > dismissVelocity && info.offset.y > 0);

    if (shouldDismiss) close(info.velocity.y);
  };

  /* Lock body scroll */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Focus trap + Escape (accessibility: keyboard user cannot get trapped) */
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

    focusables()[0]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  /* Return focus to trigger upon close */
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      buttonRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  /* Close on route navigation */
  useEffect(() => {
    if (!isOpen) return;
    const id = window.setTimeout(() => close(), 0);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? close() : open())}
        className="pressable relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span aria-hidden className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 top-0 block h-px w-full bg-foreground transition-transform duration-300 ease-apple ${
              isOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 bg-foreground transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 block h-px w-full bg-foreground transition-transform duration-300 ease-apple ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden">
            <m.div
              aria-hidden
              onClick={() => close()}
              style={{ opacity: scrimOpacity }}
              className="absolute inset-0 bg-scrim"
            />

            <m.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0.15 } : spring.standard}
              drag={reduceMotion ? false : "y"}
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: viewportHeight }}
              dragElastic={0.06}
              onDragEnd={handleDragEnd}
              style={{ y, transformOrigin: "top right", touchAction: "none" }}
              className="absolute right-4 top-4 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-border bg-background/95 shadow-[var(--shadow-lifted)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between px-5 pb-1 pt-3">
                <span className="label">Menu</span>
                <button
                  type="button"
                  onClick={() => close()}
                  aria-label="Close menu"
                  className="pressable -mr-1 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-foreground"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="px-2 pb-2">
                <ul className="flex flex-col">
                  {portfolio.navigation.map((item, index) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <m.li
                        key={item.name}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          reduceMotion
                            ? { duration: 0.15, delay: 0.03 * index }
                            : { ...spring.snappy, delay: 0.035 * index }
                        }
                      >
                        <Link
                          href={item.href}
                          onClick={() => close()}
                          aria-current={active ? "page" : undefined}
                          className={`pressable flex items-center justify-between rounded-xl px-3 py-3 text-base ${
                            active
                              ? "bg-foreground/[0.05] text-foreground"
                              : "text-muted hover:text-foreground"
                          }`}
                        >
                          {item.name}
                          <span aria-hidden className="text-muted/60">
                            &rarr;
                          </span>
                        </Link>
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-hairline px-5 py-3.5">
                <a
                  href={`mailto:${portfolio.personal.contact.email}`}
                  className="pressable text-sm text-muted hover:text-foreground"
                >
                  {portfolio.personal.contact.email}
                </a>
              </div>
            </m.div>
          </div>,
          document.body
        )}
    </>
  );
}
