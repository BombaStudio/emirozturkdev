"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { spring } from "@/lib/motion";

export default function NavLinks() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="hidden md:block" aria-label="Main">
      <ul className="flex items-center gap-1">
        {portfolio.navigation.map((item) => {
          const active = isActive(item.href);

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`pressable relative flex h-9 items-center rounded-full px-3 text-sm ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {active && (
                  <m.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    transition={spring.standard}
                  />
                )}
                <span className="relative">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
