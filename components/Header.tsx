"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import { portfolio } from "../src/data/portfolio";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-50 dark:bg-black relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {portfolio.personal.name}
              </h1>
            </a>
          </div>

          <div className="block md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {portfolio.navigation.map((item) => (
                  <li key={item.name}>
                    <NavItem href={item.href}>{item.name}</NavItem>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-zinc-50 dark:bg-black z-50 flex flex-col p-4 md:hidden">
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8">
            <ul className="flex flex-col items-center gap-6 text-sm">
              {portfolio.navigation.map((item) => (
                <li key={item.name} onClick={() => setIsMenuOpen(false)}>
                  <NavItem href={item.href}>{item.name}</NavItem>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}