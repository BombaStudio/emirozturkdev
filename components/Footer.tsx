import { portfolio } from "@/data/portfolio";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "GitHub", url: portfolio.personal.contact.github },
    { name: "LinkedIn", url: portfolio.personal.contact.linkedin },
    { name: "X / Twitter", url: portfolio.personal.contact.twitter },
    ...(portfolio.personal.contact.youtube
      ? [{ name: "YouTube", url: portfolio.personal.contact.youtube }]
      : []),
    ...(portfolio.personal.contact.itchio
      ? [{ name: "itch.io", url: portfolio.personal.contact.itchio }]
      : []),
    ...(portfolio.personal.contact.playstore
      ? [{ name: "Play Store", url: portfolio.personal.contact.playstore }]
      : []),
    ...(portfolio.personal.contact.taikai
      ? [{ name: "Taikai", url: portfolio.personal.contact.taikai }]
      : []),
  ];

  return (
    <footer className="border-t border-border print:hidden">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-foreground"
            >
              {portfolio.personal.name}
            </Link>
            <p className="mt-2 text-sm text-muted">
              {portfolio.personal.role}
            </p>
            <p className="mt-1 text-sm text-muted/60">
              {portfolio.personal.location}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium text-muted mb-4 uppercase tracking-widest">
              Pages
            </h3>
            <ul className="flex flex-col gap-2">
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
          </div>

          <div>
            <h3 className="text-xs font-medium text-muted mb-4 uppercase tracking-widest">
              Links
            </h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} {portfolio.personal.name.toUpperCase()}
          </span>
          <a
            href={`mailto:${portfolio.personal.contact.email}`}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {portfolio.personal.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
