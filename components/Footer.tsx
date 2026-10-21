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
    <footer className="border-t border-hairline print:hidden">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="pressable text-sm font-medium text-foreground"
            >
              {portfolio.personal.name}
            </Link>
            <p className="mt-2 text-sm text-muted">{portfolio.personal.role}</p>
            <p className="mt-1 text-sm text-muted/70">
              {portfolio.personal.location}
            </p>
          </div>

          <div>
            <h3 className="label mb-4">Pages</h3>
            <ul className="flex flex-col gap-2">
              {portfolio.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="pressable text-sm text-muted hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label mb-4">Links</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable text-sm text-muted hover:text-foreground"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 md:flex-row">
          <span className="text-xs text-muted/70">
            &copy; {new Date().getFullYear()}{" "}
            {portfolio.personal.name.toUpperCase()}
          </span>
          <a
            href={`mailto:${portfolio.personal.contact.email}`}
            className="pressable text-xs text-muted hover:text-foreground"
          >
            {portfolio.personal.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
