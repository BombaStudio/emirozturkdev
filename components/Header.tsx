"use client";

import { useState } from "react";
import { portfolio } from "../src/data/portfolio";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
      <div className="mx-auto max-w-full px-6 py-8 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase text-white">
          {portfolio.personal.name}
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-12">
            {portfolio.navigation.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="text-xs font-bold tracking-[0.2em] text-zinc-400 hover:text-white transition-colors uppercase"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-12">
          {portfolio.navigation.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-black tracking-tighter uppercase text-white hover:text-zinc-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
