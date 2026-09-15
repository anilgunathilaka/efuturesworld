export default function StatementBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="bg-accent-tint py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-8 lg:px-14">
        <div className="max-w-[46ch] border-l-[3px] border-l-accent pl-6 sm:pl-8">
          <h2 className="text-balance font-display text-3xl leading-[1.02] sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">{body}</p>
        </div>
      </div>
    </section>
  );
}
