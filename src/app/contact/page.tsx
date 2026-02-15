import Header from "../../../components/Header";
import { portfolio } from "../../data/portfolio";

export default function Contact() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50 mb-8">Contact</h1>
        <div className="max-w-2xl">
          <br/>
          
          <div className="space-y-4">
              <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Email</h3>
                   <a href={`mailto:${portfolio.personal.contact.email}`} className="text-teal-600 dark:text-teal-400 hover:underline">
                      {portfolio.personal.contact.email}
                   </a>
              </div>

              <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Socials</h3>
                  <div className="flex flex-col gap-2 mt-2">
                       {Object.entries(portfolio.personal.contact).map(([platform, url]) => {
                           if (platform === 'email') return null;
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 capitalize"
                                >
                                    {platform}
                                </a>
                            )
                       })}
                  </div>
              </div>
          </div>
        </div>
      </main>
    </>
  );
}
