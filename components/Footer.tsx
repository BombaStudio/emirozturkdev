import { portfolio } from "../src/data/portfolio";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-black py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {Object.entries(portfolio.personal.contact).map(([platform, url]) => {
                if (platform === "email") return null;
                return (
                    <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 capitalize"
                    >
                        {platform}
                    </a>
                )
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
