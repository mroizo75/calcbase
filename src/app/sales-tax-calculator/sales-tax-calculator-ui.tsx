"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateSalesTax } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import { US_SALES_TAX_PRESETS } from "@/lib/calculators/registry";
import type { CalculatorResult } from "@/lib/calculators/types";

const RATE_PRESETS = [0, 2.9, 4, 5.75, 6, 6.25, 6.5, 7.25];

export function SalesTaxCalculatorUi() {
  const searchParams = useSearchParams();
  const [price, setPrice] = useState(searchParams.get("price") ?? "100");
  const [rate, setRate] = useState(searchParams.get("rate") ?? "7.25");

  const numPrice = parseNumericInput(price);
  const numRate = parseNumericInput(rate);

  const isValid = numPrice > 0 && numRate >= 0;
  const { taxAmount, totalPrice } = isValid
    ? calculateSalesTax(numPrice, numRate)
    : { taxAmount: 0, totalPrice: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Pre-tax Price", value: numPrice, formatted: formatNumber(numPrice) },
        { label: "Sales Tax", value: taxAmount, formatted: formatNumber(taxAmount) },
        { label: "Total Price", value: totalPrice, formatted: formatNumber(totalPrice), highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `${formatNumber(numPrice)} × ${numRate}% = ${formatNumber(taxAmount)} tax → ${formatNumber(totalPrice)} total`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("sales-tax-calculator", { price, rate })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    const { taxAmount: ta, totalPrice: tp } = calculateSalesTax(numPrice, numRate);
    addHistoryEntry({
      calculator: "sales-tax-calculator",
      title: "Sales Tax",
      summary: `${formatNumber(numPrice)} @ ${rate}% → ${formatNumber(tp)} (tax ${formatNumber(ta)})`,
      url: shareUrl ?? "/sales-tax-calculator",
    });
  }, [numPrice, numRate, isValid, rate, shareUrl]);

  function handlePreset(presetRate: number) {
    setRate(String(presetRate));
  }

  function handleReset() {
    setPrice("100");
    setRate("7.25");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="salestax-price">Price</Label>
            <Input
              id="salestax-price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter pre-tax price"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="salestax-rate">Tax Rate (%)</Label>
            <Input
              id="salestax-rate"
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 7.25"
              className="mt-1 tabular-nums"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {RATE_PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handlePreset(r)}
                  className={`min-h-[36px] min-w-[44px] rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    parseFloat(rate) === r
                      ? "border-primary bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="salestax-state">US State Presets</Label>
            <select
              id="salestax-state"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              onChange={(e) => {
                const preset = US_SALES_TAX_PRESETS.find((p) => p.label === e.target.value);
                if (preset) handlePreset(preset.rate);
              }}
              value={US_SALES_TAX_PRESETS.find((p) => p.rate === parseFloat(rate))?.label ?? ""}
            >
              <option value="">Select a state rate…</option>
              {US_SALES_TAX_PRESETS.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Reset
          </button>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Sales Tax Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Understanding US sales tax</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Unlike VAT, US sales tax is charged only at the final point of sale. Rates are set by
              each state, county, and city — so the total rate depends on your exact location. At a{" "}
              {rate}% rate, a {formatNumber(numPrice)} purchase incurs {formatNumber(taxAmount)} in
              tax for a {formatNumber(totalPrice)} total. Five states (Oregon, Montana, Delaware, New
              Hampshire, and Alaska) have no statewide sales tax.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
