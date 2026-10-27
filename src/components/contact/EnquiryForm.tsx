"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  buildEnquiryMessage,
  emailOrderLink,
  whatsappOrderLink,
} from "@/lib/whatsapp";
import { siteAddressLine } from "@/config/site";

const OCCASIONS = [
  "Private dining",
  "Birthday",
  "Anniversary",
  "Corporate / office",
  "Wedding or engagement",
  "Bespoke tasting menu",
  "Something else",
];

const GUEST_OPTIONS = [
  "2 – 6 guests",
  "6 – 15 guests",
  "15 – 40 guests",
  "40+ guests",
];

const empty = {
  name: "",
  phone: "",
  occasion: OCCASIONS[0],
  guests: GUEST_OPTIONS[1],
  date: "",
  details: "",
};

export function EnquiryForm() {
  const [fields, setFields] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function update(key: keyof typeof empty, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!fields.name.trim()) next.name = "Please add your name";
    if (!fields.phone.trim()) next.phone = "A number, so we can confirm";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const message = buildEnquiryMessage(fields);

  const fieldClass = (key: string) =>
    cn(
      "w-full border bg-surface px-4 text-sm text-ivory transition-colors duration-500 placeholder:text-ivory-faint focus:outline-none",
      key === "details" ? "py-4 leading-relaxed resize-y" : "h-12",
      errors[key]
        ? "border-red-500/60 focus:border-red-500"
        : "border-hairline-soft focus:border-gold",
    );

  if (sent) {
    return (
      <div className="border border-gold/30 bg-surface p-9 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Check className="h-6 w-6" strokeWidth={1.2} aria-hidden />
        </div>
        <h3 className="mt-7 text-3xl text-ivory">Ready to send</h3>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ivory-dim">
          Your enquiry is written out below. Open WhatsApp or your email app,
          press send, and we will reply to confirm.
        </p>

        <textarea
          readOnly
          value={message}
          rows={9}
          aria-label="Your enquiry as a message"
          className="mt-7 w-full resize-none border border-hairline-soft bg-obsidian p-5 text-left font-mono text-[0.6875rem] leading-relaxed text-ivory-dim"
        />

        <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={whatsappOrderLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center justify-center border border-gold bg-gold px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-obsidian transition-colors duration-500 hover:bg-gold-light"
          >
            Open WhatsApp
          </a>
          <a
            href={emailOrderLink(
              message,
              `Enquiry — ${site.name}`,
            )}
            className="inline-flex items-center justify-center border border-hairline px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold-light"
          >
            Send by email
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setFields(empty);
          }}
          className="mt-8 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-gold"
        >
          Start another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (validate()) {
          setSent(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="space-y-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} required>
          <input
            id="enquiry-name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your name"
            className={fieldClass("name")}
          />
        </Field>

        <Field label="Phone" error={errors.phone} required>
          <input
            id="enquiry-phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+255 ..."
            className={fieldClass("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Occasion">
          <select
            id="enquiry-occasion"
            value={fields.occasion}
            onChange={(event) => update("occasion", event.target.value)}
            className={cn(fieldClass("occasion"), "appearance-none")}
          >
            {OCCASIONS.map((occasion) => (
              <option key={occasion} value={occasion} className="bg-surface">
                {occasion}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Guests">
          <select
            id="enquiry-guests"
            value={fields.guests}
            onChange={(event) => update("guests", event.target.value)}
            className={cn(fieldClass("guests"), "appearance-none")}
          >
            {GUEST_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-surface">
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Preferred date">
        <input
          id="enquiry-date"
          type="date"
          value={fields.date}
          onChange={(event) => update("date", event.target.value)}
          className={fieldClass("date")}
        />
      </Field>

      <Field label="Tell us about it">
        <textarea
          id="enquiry-details"
          rows={5}
          value={fields.details}
          onChange={(event) => update("details", event.target.value)}
          placeholder="Numbers of guests, anything to avoid, budget range, where it is happening..."
          className={fieldClass("details")}
        />
      </Field>

      <button
        type="submit"
        className="h-14 w-full border border-gold bg-gold text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-obsidian transition-colors duration-500 hover:bg-gold-light"
      >
        Prepare my message
      </button>

      <p className="text-center text-xs leading-relaxed text-ivory-faint">
        Nothing is sent from this page until you press send in WhatsApp or your
        email app. Address: {siteAddressLine()}.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2.5 flex items-baseline gap-2 text-xs text-ivory-dim">
        {label}
        {required ? (
          <span className="text-[0.625rem] uppercase tracking-[0.16em] text-gold/70">
            Required
          </span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-xs text-red-400/90">
          {error}
        </span>
      ) : null}
    </label>
  );
}
