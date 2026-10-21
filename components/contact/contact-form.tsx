"use client";

import { useId, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { spring } from "@/lib/motion";

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "message";

const validate = (field: Field, rawValue: string) => {
  const value = rawValue.trim();
  if (!value) {
    return field === "name" ? "Please enter your name." : "Please write a message.";
  }
  if (field === "name" && value.length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (field === "message" && value.length < 10) {
    return "Message must be at least 10 characters.";
  }
  return null;
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    message: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const reduceMotion = useReducedMotion();

  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const id = useId();
  const nameId = `${id}-name`;
  const messageId = `${id}-message`;
  const nameErrorId = `${nameId}-error`;
  const messageErrorId = `${messageId}-error`;

  const errors: Record<Field, string | null> = {
    name: touched.name ? validate("name", name) : null,
    message: touched.message ? validate("message", message) : null,
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nameError = validate("name", name);
    const messageError = validate("message", message);

    setTouched({ name: true, message: true });

    if (nameError || messageError) {
      if (nameError) nameRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setMessage("");
      setTouched({ name: false, message: false });
    } catch {
      setStatus("error");
    }
  };

  const fieldClasses = (invalid: boolean) =>
    `w-full rounded-xl border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/40 transition-colors focus:bg-surface ${
      invalid ? "border-foreground/40" : "border-border focus:border-foreground/30"
    }`;

  return (
    <div>
      <p className="label">Send a message</p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="label">
            Name
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            value={name}
            autoComplete="name"
            required
            disabled={status === "sending"}
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? nameErrorId : undefined}
            className={fieldClasses(Boolean(errors.name))}
          />
          {errors.name && (
            <p id={nameErrorId} className="text-xs text-foreground/70">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={messageId} className="label">
            Message
          </label>
          <textarea
            ref={messageRef}
            id={messageId}
            name="message"
            value={message}
            required
            rows={5}
            disabled={status === "sending"}
            placeholder="What are you building?"
            onChange={(event) => setMessage(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? messageErrorId : undefined}
            className={`${fieldClasses(Boolean(errors.message))} resize-none`}
          />
          {errors.message && (
            <p id={messageErrorId} className="text-xs text-foreground/70">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="pressable inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" && (
              <span
                aria-hidden
                className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-background/30 border-t-background"
              />
            )}
            {status === "sending" ? "Sending" : "Send message"}
          </button>

          <a
            href={`mailto:${portfolio.personal.contact.email}`}
            className="pressable text-sm text-muted hover:text-foreground"
          >
            or email directly
          </a>
        </div>

        <div aria-live="polite" className="min-h-6">
          {status === "success" && (
            <m.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : spring.snappy}
              className="text-sm text-foreground/80"
            >
              Message sent. Thanks &mdash; I&apos;ll reply by email.
            </m.p>
          )}
          {status === "error" && (
            <m.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : spring.snappy}
              className="text-sm text-foreground/80"
            >
              Something went wrong. Please try again, or email directly.
            </m.p>
          )}
        </div>
      </form>
    </div>
  );
}
