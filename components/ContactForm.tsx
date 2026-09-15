"use client";

import { useState, type FormEvent } from "react";
import { contact, contactForm } from "@/content/contact";

type FieldName = "name" | "phone" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function setValue(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<FieldName, string>> = {};
    if (!values.name.trim()) next.name = contactForm.fields.name.error;
    if (!values.phone.trim()) next.phone = contactForm.fields.phone.error;
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = contactForm.fields.email.error;
    if (!values.message.trim()) next.message = contactForm.fields.message.error;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    const subject = `Discovery call request — ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    try {
      window.location.href = `mailto:${contact.directEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full rounded-sm border border-line-strong bg-bg px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent";
  const labelClasses = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint";
  const errorClasses = "mt-1.5 text-[12.5px] text-accent-deep";

  const canSubmit = values.name.trim() && values.email.trim() && values.message.trim();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="contact-name">
            {contactForm.fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder={contactForm.fields.name.placeholder}
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className={errorClasses}>{errors.name}</p> : null}
        </div>
        <div>
          <label className={labelClasses} htmlFor="contact-phone">
            {contactForm.fields.phone.label}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder={contactForm.fields.phone.placeholder}
            value={values.phone}
            onChange={(e) => setValue("phone", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? <p className={errorClasses}>{errors.phone}</p> : null}
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="contact-email">
          {contactForm.fields.email.label}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder={contactForm.fields.email.placeholder}
          value={values.email}
          onChange={(e) => setValue("email", e.target.value)}
          className={inputClasses}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <p className={errorClasses}>{errors.email}</p> : null}
      </div>

      <div>
        <label className={labelClasses} htmlFor="contact-message">
          {contactForm.fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={contactForm.fields.message.placeholder}
          value={values.message}
          onChange={(e) => setValue("message", e.target.value)}
          className={inputClasses}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className={errorClasses}>{errors.message}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-sm border border-ink bg-ink px-[18px] py-[11px] text-[13px] font-semibold text-bg transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "sending"}
        >
          {status === "sending" ? contactForm.sendingLabel : contactForm.submitLabel}
        </button>
        {!canSubmit ? (
          <p className="text-[12.5px] text-ink-faint">{contactForm.helperText}</p>
        ) : null}
        {status === "sent" ? (
          <p className="text-[12.5px] text-accent-deep">{contactForm.successNote}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-[12.5px] text-accent-deep">{contactForm.errorNote}</p>
        ) : null}
      </div>
    </form>
  );
}
