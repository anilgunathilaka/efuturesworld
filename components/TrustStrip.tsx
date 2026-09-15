import { proofStack } from "@/content/proof";

export default function TrustStrip() {
  return (
    <div className="mx-auto w-full max-w-content px-4 sm:px-8 lg:px-14">
      <div className="grid grid-cols-2 gap-px border-t border-b border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {proofStack.map((item) => (
          <div key={item.label} className="bg-bg px-3.5 py-5 text-center text-[13px] text-ink-soft">
            <b className="mb-1 block font-mono text-[14px] font-medium tabular-nums text-ink">
              {item.stat}
            </b>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
