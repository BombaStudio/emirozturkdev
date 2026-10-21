import { portfolio } from "@/data/portfolio";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";
import ScrollState from "./scroll-state";

export default function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 print:hidden">
      <ScrollState />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="pressable text-sm font-medium tracking-tight text-foreground"
        >
          {portfolio.personal.name}
        </Link>
        <NavLinks />
        <MobileMenu />
      </div>
    </header>
  );
}
