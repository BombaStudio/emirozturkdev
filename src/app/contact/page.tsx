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
      <div className="max-w-6xl mx-auto px-6 md:px-24 pt-24 pb-20">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Contact
          </h1>
          <p className="text-base text-muted max-w-xl">
            Have a project in mind or want to collaborate? Get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xs font-medium text-muted mb-3 font-mono uppercase tracking-widest">
                Email
              </h2>
              <a
                href={`mailto:${portfolio.personal.contact.email}`}
                className="text-base text-foreground/80 hover:text-foreground transition-colors"
              >
                {portfolio.personal.contact.email}
              </a>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted mb-3 font-mono uppercase tracking-widest">
                Location
              </h2>
              <p className="text-base text-foreground/80">
                {portfolio.personal.location}
              </p>
              <p className="text-sm text-muted mt-1">
                Available for remote work
              </p>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted mb-3 font-mono uppercase tracking-widest">
                Profiles
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors py-1"
                  >
                    {link.name} &rarr;
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
