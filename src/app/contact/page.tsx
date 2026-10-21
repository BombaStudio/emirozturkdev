import { portfolio } from "@/data/portfolio";
import ContactForm from "../../../components/contact/contact-form";

export default function ContactPage() {
  const socialLinks = [
    { name: "GitHub", url: portfolio.personal.contact.github },
    { name: "LinkedIn", url: portfolio.personal.contact.linkedin },
    { name: "X / Twitter", url: portfolio.personal.contact.twitter },
    ...(portfolio.personal.contact.youtube
      ? [{ name: "YouTube", url: portfolio.personal.contact.youtube }]
      : []),
    ...(portfolio.personal.contact.reddit
      ? [{ name: "Reddit", url: portfolio.personal.contact.reddit }]
      : []),
    ...(portfolio.personal.contact.itchio
      ? [{ name: "itch.io", url: portfolio.personal.contact.itchio }]
      : []),
    ...(portfolio.personal.contact.taikai
      ? [{ name: "Taikai", url: portfolio.personal.contact.taikai }]
      : []),
    ...(portfolio.personal.contact.playstore
      ? [{ name: "Play Store", url: portfolio.personal.contact.playstore }]
      : []),
  ];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-24 md:pb-32 md:pt-20">
        <header className="mb-12">
          <p className="label">Contact</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Let&apos;s build something
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Have a project in mind or want to collaborate? Get in touch.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <p className="label">Email</p>
              <a
                href={`mailto:${portfolio.personal.contact.email}`}
                className="pressable mt-2 inline-block text-base text-foreground hover:text-foreground/70"
              >
                {portfolio.personal.contact.email}
              </a>
            </div>

            <div>
              <p className="label">Location</p>
              <p className="mt-2 text-base text-foreground">
                {portfolio.personal.location}
              </p>
              <p className="mt-1 text-sm text-muted">Available for remote work</p>
            </div>

            <div>
              <p className="label">Profiles</p>
              <ul className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-hairline sm:grid-cols-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pressable flex items-center justify-between bg-surface/60 px-4 py-3 text-sm text-muted hover:bg-surface hover:text-foreground"
                    >
                      {link.name}
                      <span aria-hidden className="text-muted/50">
                        &#8599;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-surface p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
