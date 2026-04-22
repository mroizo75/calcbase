"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { VAT_PRESETS } from "@/lib/calculators/registry";
import { addVat } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function AddVatUi() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(searchParams.get("amount") ?? "100");
  const [rate, setRate] = useState(searchParams.get("rate") ?? "20");

  const numAmount = parseNumericInput(amount);
  const numRate = parseNumericInput(rate);

  const isValid = numAmount > 0 && numRate >= 0;
  const { gross, vatAmount } = isValid ? addVat(numAmount, numRate) : { gross: 0, vatAmount: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Net Amount", value: numAmount, formatted: formatNumber(numAmount) },
        { label: "VAT Amount", value: vatAmount, formatted: formatNumber(vatAmount) },
        { label: "Gross Amount (incl. VAT)", value: gross, formatted: formatNumber(gross), highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `${formatNumber(numAmount)} × ${numRate}% = ${formatNumber(vatAmount)} VAT → ${formatNumber(gross)} total`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("add-vat", { amount, rate })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    addHistoryEntry({
      calculator: "add-vat",
      title: "Add VAT",
      summary: `${formatNumber(numAmount)} + ${rate}% VAT → ${formatNumber(gross)}`,
      url: shareUrl ?? "/add-vat",
    });
  }, [numAmount, numRate, isValid, gross, rate, shareUrl]);

  function handleReset() {
    setAmount("100");
    setRate("20");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="add-vat-amount">Net Amount (before VAT)</Label>
            <Input
              id="add-vat-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter net amount"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="add-vat-rate">VAT Rate (%)</Label>
            <Input
              id="add-vat-rate"
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 20"
              className="mt-1 tabular-nums"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[20, 5, 0, 19, 21, 23, 25, 10, 15].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRate(String(r))}
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
            <Label>Country Presets</Label>
            <select
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              onChange={(e) => {
                const preset = VAT_PRESETS.find((p) => p.label === e.target.value);
                if (preset) setRate(String(preset.rate));
              }}
              value={VAT_PRESETS.find((p) => p.rate === parseFloat(rate))?.label ?? ""}
            >
              <option value="">Select a country rate…</option>
              {VAT_PRESETS.map((p) => (
                <option key={p.label} value={p.label}>{p.label}</option>
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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Add VAT Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">How adding VAT works</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When you add VAT, you take the net price (the price before tax) and multiply it by
              the VAT rate. The result is the VAT amount, which you then add to the net price to
              get the gross total.{isValid && <> At a {rate}% rate, a net price of {formatNumber(numAmount)} becomes{" "}
              {formatNumber(gross)} including {formatNumber(vatAmount)} in VAT.</>}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
