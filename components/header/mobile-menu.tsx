"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { portfolio } from "@/data/portfolio";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      btnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-6 h-5 flex flex-col justify-between cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-full h-px bg-foreground transition-all duration-300 origin-center ${
            isOpen ? "rotate-45 translate-y-[9px]" : ""
          }`}
        />
        <span
          className={`block w-full h-px bg-foreground transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-full h-px bg-foreground transition-all duration-300 origin-center ${
            isOpen ? "-rotate-45 -translate-y-[9px]" : ""
          }`}
        />
      </button>
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-white">
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {portfolio.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-foreground/60 hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
