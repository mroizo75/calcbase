"use client";

import { storeCurrency, type DisplayCurrency } from "@/lib/currency/currency";
import { useCurrency } from "@/lib/currency/use-currency";

const OPTIONS: { value: DisplayCurrency; label: string }[] = [
  { value: "USD", label: "$ USD" },
  { value: "GBP", label: "£ GBP" },
];

/** Velger for valutasymbol. Endrer kun visning, ikke kursomregning. */
export function CurrencyToggle() {
  const { currency } = useCurrency();

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium leading-none">Currency</span>
      <div role="group" aria-label="Currency symbol" className="inline-flex rounded-lg border border-border p-0.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={currency === opt.value}
            onClick={() => storeCurrency(opt.value)}
            className={`h-9 min-w-[72px] rounded-md px-3 text-sm font-medium transition-colors ${
              currency === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
