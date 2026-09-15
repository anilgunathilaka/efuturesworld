import Image from "next/image";
import Link from "next/link";
import {
  footerColumns,
  footerLegalLinks,
  footerCopyrightSuffix,
  footerCertificationsLine,
} from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-content flex-col gap-7 border-t border-line px-4 py-10 pb-16 sm:px-8 lg:px-14">
      <div className="flex flex-wrap justify-between gap-8">
        <div>
          <Link href="/" className="mb-3.5 block w-fit">
            <Image
              src="/images/efutures.webp"
              alt="EFutures — Inspiring Solutions"
              width={590}
              height={104}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              {column.heading}
            </span>
            <nav className="flex flex-col gap-2">
              {column.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13.5px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-line" />

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {footerLegalLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs text-ink-faint transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-1 text-xs text-ink-faint">
        <span>
          Copyright © {new Date().getFullYear()} {footerCopyrightSuffix}
        </span>
        <span>{footerCertificationsLine}</span>
      </div>
    </footer>
  );
}
