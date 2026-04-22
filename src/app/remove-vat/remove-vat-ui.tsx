"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { VAT_PRESETS } from "@/lib/calculators/registry";
import { removeVat } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

export function RemoveVatUi() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(searchParams.get("amount") ?? "120");
  const [rate, setRate] = useState(searchParams.get("rate") ?? "20");

  const numAmount = parseNumericInput(amount);
  const numRate = parseNumericInput(rate);

  const isValid = numAmount > 0 && numRate >= 0;
  const { net, vatAmount } = isValid ? removeVat(numAmount, numRate) : { net: 0, vatAmount: 0 };

  const results: CalculatorResult[] = isValid
    ? [
        { label: "Gross Amount (incl. VAT)", value: numAmount, formatted: formatNumber(numAmount) },
        { label: "VAT Included", value: vatAmount, formatted: formatNumber(vatAmount) },
        { label: "Net Amount (excl. VAT)", value: net, formatted: formatNumber(net), highlight: true },
      ]
    : [];

  const formulaUsed = isValid
    ? `${formatNumber(numAmount)} ÷ ${(1 + numRate / 100).toFixed(2)} = ${formatNumber(net)} net`
    : "";

  const shareUrl = isValid
    ? buildShareUrl("remove-vat", { amount, rate })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    addHistoryEntry({
      calculator: "remove-vat",
      title: "Remove VAT",
      summary: `${formatNumber(numAmount)} − ${rate}% VAT → ${formatNumber(net)}`,
      url: shareUrl ?? "/remove-vat",
    });
  }, [numAmount, numRate, isValid, net, rate, shareUrl]);

  function handleReset() {
    setAmount("120");
    setRate("20");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label htmlFor="remove-vat-amount">Gross Amount (including VAT)</Label>
            <Input
              id="remove-vat-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter gross amount"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          <div>
            <Label htmlFor="remove-vat-rate">VAT Rate (%)</Label>
            <Input
              id="remove-vat-rate"
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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Remove VAT Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">How removing VAT works</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A common mistake is subtracting the VAT percentage from the gross price. This gives the
              wrong answer because VAT was calculated on the lower net price, not the gross. Instead,
              divide the gross amount by (1 + VAT rate).{isValid && <> At {rate}%, divide {formatNumber(numAmount)} by{" "}
              {(1 + numRate / 100).toFixed(2)} to get a net price of {formatNumber(net)}, with{" "}
              {formatNumber(vatAmount)} being the VAT portion.</>}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
