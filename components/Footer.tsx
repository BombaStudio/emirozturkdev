import { portfolio } from "../src/data/portfolio";
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
    <footer className="border-t border-zinc-800/50 print:hidden">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-white hover:text-zinc-300 transition-colors"
            >
              {portfolio.personal.name}
            </Link>
            <p className="mt-2 text-sm text-zinc-500">
              {portfolio.personal.role}
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {portfolio.personal.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-medium text-zinc-500 mb-4">Pages</h3>
            <ul className="flex flex-col gap-2">
              {portfolio.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-medium text-zinc-500 mb-4">Links</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {portfolio.personal.name}
          </span>
          <a
            href={`mailto:${portfolio.personal.contact.email}`}
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            {portfolio.personal.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
