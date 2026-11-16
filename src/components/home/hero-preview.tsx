"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCurrency } from "@/lib/currency/use-currency";

function parseInput(value: string): number {
  const n = Number.parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Live preview on the homepage. Pure display math; full calculators handle the rest. */
export function HeroPreview() {
  const { symbol } = useCurrency();
  const [price, setPrice] = useState("49.99");
  const [cost, setCost] = useState("20");

  const sellingPrice = parseInput(price);
  const costPrice = parseInput(cost);
  const profit = sellingPrice - costPrice;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  const fmt = (n: number) => `${symbol}${n.toFixed(2)}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg">
      <p className="mb-4 text-sm font-medium text-muted-foreground">Quick margin check</p>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Selling price
          <input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
          Cost price
          <input
            type="text"
            inputMode="decimal"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-xs text-muted-foreground">Profit</p>
          <p className="text-lg font-semibold">{fmt(profit)}</p>
        </div>
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-xs text-muted-foreground">Margin</p>
          <p className="text-lg font-semibold">{margin.toFixed(1)}%</p>
        </div>
      </div>
      <Link
        href="/profit-calculator"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Full profit calculator
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
