import { PortfolioLink } from "../src/data/portfolio";
import Image from "next/image";

/*
const PlatformIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "github":
      return <Image src="/icons/github.png" alt="GitHub" width={24} height={24} className="w-6 h-6 flex-shrink-0 rounded" />;
    case "itchio":
      return <Image src="/icons/itchio.png" alt="Itch.io" width={24} height={24} className="w-6 h-6 flex-shrink-0 rounded" />;
    case "gamemonetize":
      return <Image src="/icons/gamemonetize.png" alt="GameMonetize" width={24} height={24} className="w-6 h-6 flex-shrink-0 rounded" />;
    case "gdevelop":
      return <Image src="/icons/gdevelop.png" alt="GDevelop" width={24} height={24} className="w-6 h-6 flex-shrink-0 rounded" />;
    case "googleplay":
      return <Image src="/icons/googleplay.png" alt="Google Play" width={24} height={24} className="w-6 h-6 flex-shrink-0 rounded" />;
    default:
      return null;
  }
};
*/

export const PortfolioLinks = ({
  links,
}: {
  links: PortfolioLink[];
}) => {
  return (
    <div className="m-auto grid grid-cols-1 gap-4 sm:grid-cols-2 w-full lg:w-2/3">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col gap-3 rounded-xl bg-zinc-50 p-5 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          style={{
            border: "1px solid rgba(198, 198, 198, 0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-zinc-700 dark:text-zinc-300 transition-colors group-hover:text-black dark:group-hover:text-white">
              {/*<PlatformIcon icon={link.icon} />*/}
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {link.platform}
            </h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="ml-auto w-4 h-4 text-zinc-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {link.description}
          </p>
        </a>
      ))}
    </div>
  );
};
