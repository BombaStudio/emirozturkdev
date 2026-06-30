"use client";

import { useState } from "react";

export default function ContactForm() {
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

  return (
    <div>
      <h2 className="text-xs font-medium text-muted mb-4 font-mono uppercase tracking-widest">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="bg-transparent border border-border text-foreground px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted/30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm text-muted">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            placeholder="Your message..."
            className="bg-transparent border border-border text-foreground px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted/30 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="text-sm text-muted hover:text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-all cursor-pointer disabled:opacity-50 self-start"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-sm text-foreground/60">
            Message sent successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-muted">
            Something went wrong. Please try again or email directly.
          </p>
        )}
      </form>
    </div>
  );
}
