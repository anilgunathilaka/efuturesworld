import type { Metadata } from "next";
import PendingNotice from "@/components/PendingNotice";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/contact";

export const metadata: Metadata = {
  title: contact.metaTitle,
  description: contact.metaDescription,
};

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-content px-4 pb-8 pt-[calc(var(--site-header-offset)+1.5rem)] sm:px-8 sm:pb-10 sm:pt-[calc(var(--site-header-offset)+2rem)] lg:px-14 lg:pt-[calc(var(--site-header-offset)+2.5rem)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {contact.eyebrow}
        </span>
        <h1 className="mt-4 max-w-[20ch] text-balance font-display text-4xl leading-[1.02] sm:text-6xl">
          {contact.heading}
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-soft sm:text-lg">
          {contact.subhead}
        </p>
      </div>

      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              {contact.formSectionHeading}
            </span>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 border-t border-line pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                {contact.meetingSectionHeading}
              </span>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {contact.meetingSectionBody}
              </p>
            </div>

            <div className="border-t border-line pt-6">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Direct
              </span>
              <a
                href={`mailto:${contact.directEmail}`}
                className="block text-[14.5px] text-ink-soft transition-colors hover:text-accent"
              >
                {contact.directEmail}
              </a>
              <span className="mt-1 block text-[14.5px] text-ink-soft">{contact.location}</span>
            </div>

            <PendingNotice>{contact.phonePendingNote}</PendingNotice>
            <PendingNotice>{contact.responseTimePendingNote}</PendingNotice>

            <p className="border-t border-line pt-6 text-[13px] leading-relaxed text-ink-faint">
              {contact.socialProofLine}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
