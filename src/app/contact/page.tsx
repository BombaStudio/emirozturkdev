"use client";

import { portfolio } from "../../data/portfolio";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

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
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Contact
          </h1>
          <p className="text-base text-zinc-500 max-w-xl">
            Have a project in mind or want to collaborate? Get in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            {/* Email */}
            <div>
              <h2 className="text-xs font-medium text-zinc-500 mb-3 font-mono">
                Email
              </h2>
              <a
                href={`mailto:${portfolio.personal.contact.email}`}
                className="text-base text-zinc-300 hover:text-white transition-colors"
              >
                {portfolio.personal.contact.email}
              </a>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xs font-medium text-zinc-500 mb-3 font-mono">
                Location
              </h2>
              <p className="text-base text-zinc-300">
                {portfolio.personal.location}
              </p>
              <p className="text-sm text-zinc-600 mt-1">
                Available for remote work
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-xs font-medium text-zinc-500 mb-3 font-mono">
                Profiles
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors py-1"
                  >
                    {link.name} →
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xs font-medium text-zinc-500 mb-4 font-mono">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm text-zinc-500"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="bg-transparent border border-zinc-800 text-white px-4 py-2.5 text-sm rounded-md outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-700"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm text-zinc-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="bg-transparent border border-zinc-800 text-white px-4 py-2.5 text-sm rounded-md outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-700 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-white text-black px-5 py-2.5 text-sm font-medium rounded-md hover:bg-zinc-200 transition-colors cursor-pointer disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-500">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
