"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { VatComparisonTable } from "./vat-comparison-table";
import { VAT_PRESETS } from "@/lib/calculators/registry";
import { addVat, removeVat } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

type VatMode = "add" | "remove";

export function VatCalculatorUi() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(searchParams.get("amount") ?? "100");
  const [rate, setRate] = useState(searchParams.get("rate") ?? "20");
  const [mode, setMode] = useState<VatMode>(
    searchParams.get("mode") === "remove" ? "remove" : "add",
  );
  const [showComparison, setShowComparison] = useState(false);

  const numAmount = parseNumericInput(amount);
  const numRate = parseNumericInput(rate);

  const calculate = useCallback((): { results: CalculatorResult[]; formulaUsed: string } => {
    if (numAmount <= 0 || numRate < 0) {
      return { results: [], formulaUsed: "" };
    }

    if (mode === "add") {
      const { gross, vatAmount } = addVat(numAmount, numRate);
      return {
        results: [
          { label: "Net Amount", value: numAmount, formatted: formatNumber(numAmount) },
          { label: "VAT Amount", value: vatAmount, formatted: formatNumber(vatAmount) },
          { label: "Gross Amount", value: gross, formatted: formatNumber(gross), highlight: true },
        ],
        formulaUsed: `${formatNumber(numAmount)} × ${numRate}% = ${formatNumber(addVat(numAmount, numRate).vatAmount)} VAT`,
      };
    }

    const { net, vatAmount } = removeVat(numAmount, numRate);
    return {
      results: [
        { label: "Gross Amount", value: numAmount, formatted: formatNumber(numAmount) },
        { label: "VAT Included", value: vatAmount, formatted: formatNumber(vatAmount) },
        { label: "Net Amount", value: net, formatted: formatNumber(net), highlight: true },
      ],
      formulaUsed: `${formatNumber(numAmount)} ÷ ${1 + numRate / 100} = ${formatNumber(net)} net`,
    };
  }, [numAmount, numRate, mode]);

  const { results, formulaUsed } = calculate();

  const shareUrl = numAmount > 0
    ? buildShareUrl("vat-calculator", { amount, rate, mode })
    : undefined;

  useEffect(() => {
    if (numAmount <= 0 || numRate < 0) return;
    let highlighted: string;
    if (mode === "add") {
      highlighted = formatNumber(addVat(numAmount, numRate).gross);
    } else {
      highlighted = formatNumber(removeVat(numAmount, numRate).net);
    }
    addHistoryEntry({
      calculator: "vat-calculator",
      title: `VAT ${mode === "add" ? "Add" : "Remove"}`,
      summary: `${mode === "add" ? "Net" : "Gross"} ${formatNumber(numAmount)} @ ${rate}% → ${highlighted}`,
      url: shareUrl ?? "/vat-calculator",
    });
  }, [numAmount, numRate, mode, rate, shareUrl]);

  function handlePreset(presetRate: number) {
    setRate(String(presetRate));
  }

  function handleReset() {
    setAmount("100");
    setRate("20");
    setMode("add");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-5 pt-6">
            <div>
              <Label htmlFor="vat-amount">Amount</Label>
              <Input
                id="vat-amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-1 text-lg tabular-nums"
              />
            </div>

            <fieldset>
              <legend className="text-sm font-medium leading-none">Mode</legend>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("add")}
                  className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                    mode === "add"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  Add VAT
                </button>
                <button
                  type="button"
                  onClick={() => setMode("remove")}
                  className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                    mode === "remove"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  Remove VAT
                </button>
              </div>
            </fieldset>

            <div>
              <Label htmlFor="vat-rate">VAT Rate (%)</Label>
              <Input
                id="vat-rate"
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
              <Label htmlFor="vat-country">Country Presets</Label>
              <select
                id="vat-country"
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                onChange={(e) => {
                  const preset = VAT_PRESETS.find((p) => p.label === e.target.value);
                  if (preset) handlePreset(preset.rate);
                }}
                value={VAT_PRESETS.find((p) => p.rate === parseFloat(rate))?.label ?? ""}
              >
                <option value="">Select a country rate…</option>
                {VAT_PRESETS.map((p) => (
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
          <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="VAT Calculation" />

          <Card className="bg-muted/30">
            <CardContent className="pt-5">
              <h3 className="mb-2 text-sm font-semibold">How it works</h3>
              {mode === "add" ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To add VAT, the net amount is multiplied by the VAT rate and the result is added
                  to the original amount. For example, with a {rate}% rate on {formatNumber(numAmount)},
                  the VAT is {formatNumber(numAmount * (numRate / 100))} and the gross
                  total is {formatNumber(numAmount + numAmount * (numRate / 100))}.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To remove VAT, the gross amount is divided by (1 + rate). For a {rate}% rate,
                  divide {formatNumber(numAmount)} by {1 + numRate / 100} to get the
                  net amount of {formatNumber(numAmount / (1 + numRate / 100))}.
                  The VAT portion is the difference.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowComparison(!showComparison)}
          className="mb-4 flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          {showComparison ? "Hide" : "Compare"} VAT Rates Across Countries
        </button>
        {showComparison && <VatComparisonTable amount={numAmount} mode={mode} />}
      </div>
    </div>
  );
}
