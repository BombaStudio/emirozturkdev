"use client";

import { useState, useEffect } from "react";
import { portfolio } from "../src/data/portfolio";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 print:hidden transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-white hover:text-zinc-300 transition-colors"
        >
          {portfolio.personal.name}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {portfolio.navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href
                      ? "text-white font-medium"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-between cursor-pointer"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
              isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`block w-full h-[1.5px] bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[1.5px] bg-white transition-all duration-300 origin-center ${
              isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-[#0a0a0a] z-40 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {portfolio.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-2xl font-medium transition-colors ${
                pathname === item.href
                  ? "text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
