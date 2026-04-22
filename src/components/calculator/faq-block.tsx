import type { FaqEntry } from "@/lib/calculators/types";

interface FaqBlockProps {
  entries: FaqEntry[];
}

export function FaqBlock({ entries }: FaqBlockProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {entries.map((entry) => (
          <details
            key={entry.question}
            className="group rounded-lg border [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-2 px-4 py-3 font-medium select-none">
              <span className="text-sm sm:text-base">{entry.question}</span>
              <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
