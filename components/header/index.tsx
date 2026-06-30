import { portfolio } from "@/data/portfolio";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 print:hidden bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium text-foreground tracking-tight"
        >
          {portfolio.personal.name}
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {portfolio.navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
