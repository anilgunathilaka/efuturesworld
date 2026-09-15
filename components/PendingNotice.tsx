import type { ReactNode } from "react";

export default function PendingNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-sm border border-dashed border-line-strong bg-surface px-5 py-4">
      <span className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">
        Pending confirmation from EFutures
      </span>
      <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}
