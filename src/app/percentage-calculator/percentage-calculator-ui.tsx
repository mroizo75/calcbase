"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import {
  calculatePercentageOf,
  calculateWhatPercent,
  calculateWhole,
} from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import { useEffect } from "react";
import type { CalculatorResult } from "@/lib/calculators/types";

type PercentMode = "find-amount" | "find-percent" | "find-whole";

const MODES: { id: PercentMode; label: string; description: string }[] = [
  { id: "find-amount", label: "Find Amount", description: "What is X% of Y?" },
  { id: "find-percent", label: "Find Percent", description: "X is what % of Y?" },
  { id: "find-whole", label: "Find Whole", description: "X is Y%, what is the total?" },
];

export function PercentageCalculatorUi() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<PercentMode>(
    (searchParams.get("mode") as PercentMode) ?? "find-amount",
  );
  const [percentInput, setPercentInput] = useState(searchParams.get("percent") ?? "15");
  const [totalInput, setTotalInput] = useState(searchParams.get("total") ?? "200");
  const [partInput, setPartInput] = useState(searchParams.get("part") ?? "45");

  const percent = parseNumericInput(percentInput);
  const total = parseNumericInput(totalInput);
  const part = parseNumericInput(partInput);

  let results: CalculatorResult[] = [];
  let formulaUsed = "";
  let shareUrl: string | undefined;
  let isValid = false;
  let insightText = "";

  if (mode === "find-amount" && total > 0 && percent >= 0) {
    const amount = calculatePercentageOf(percent, total);
    isValid = true;
    results = [
      { label: "Total", value: total, formatted: formatNumber(total) },
      { label: "Percentage", value: percent, formatted: `${percent}%` },
      { label: "Amount", value: amount, formatted: formatNumber(amount), highlight: true },
    ];
    formulaUsed = `${total} × (${percent} ÷ 100) = ${formatNumber(amount)}`;
    shareUrl = buildShareUrl("percentage-calculator", { mode, percent: percentInput, total: totalInput });
    insightText = `${percent}% of ${formatNumber(total)} equals ${formatNumber(amount)}. This is useful for calculating commissions, discounts, tips, and tax amounts.`;
  } else if (mode === "find-percent" && total > 0 && part >= 0) {
    const result = calculateWhatPercent(part, total);
    isValid = true;
    results = [
      { label: "Part", value: part, formatted: formatNumber(part) },
      { label: "Whole", value: total, formatted: formatNumber(total) },
      { label: "Percentage", value: result, formatted: `${result}%`, highlight: true },
    ];
    formulaUsed = `(${formatNumber(part)} ÷ ${formatNumber(total)}) × 100 = ${result}%`;
    shareUrl = buildShareUrl("percentage-calculator", { mode, part: partInput, total: totalInput });
    insightText = `${formatNumber(part)} is ${result}% of ${formatNumber(total)}. Use this mode to find profit margin (profit ÷ revenue) or completion rates.`;
  } else if (mode === "find-whole" && part > 0 && percent > 0) {
    const whole = calculateWhole(part, percent);
    isValid = true;
    results = [
      { label: "Known Part", value: part, formatted: formatNumber(part) },
      { label: "Percentage Rate", value: percent, formatted: `${percent}%` },
      { label: "Whole (Total)", value: whole, formatted: formatNumber(whole), highlight: true },
    ];
    formulaUsed = `${formatNumber(part)} ÷ (${percent} ÷ 100) = ${formatNumber(whole)}`;
    shareUrl = buildShareUrl("percentage-calculator", { mode, part: partInput, percent: percentInput });
    insightText = `If ${formatNumber(part)} represents ${percent}%, then the total is ${formatNumber(whole)}. Use this to find an original price before a discount, or a total budget from a known allocation.`;
  }

  useEffect(() => {
    if (!isValid || results.length === 0) return;
    const summary = results.map((r) => `${r.label}: ${r.formatted}`).join(", ");
    addHistoryEntry({
      calculator: "percentage-calculator",
      title: "Percentage",
      summary,
      url: shareUrl ?? "/percentage-calculator",
    });
  }, [isValid, formulaUsed, shareUrl]);  // eslint-disable-line react-hooks/exhaustive-deps

  function handleReset() {
    setPercentInput("15");
    setTotalInput("200");
    setPartInput("45");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              mode === m.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-accent"
            }`}
          >
            {m.label}
            <span className="ml-1.5 hidden text-xs opacity-70 sm:inline">— {m.description}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-5 pt-6">
            {mode === "find-amount" && (
              <>
                <div>
                  <Label htmlFor="pct-percent">Percentage (%)</Label>
                  <Input
                    id="pct-percent"
                    type="text"
                    inputMode="decimal"
                    value={percentInput}
                    onChange={(e) => setPercentInput(e.target.value)}
                    placeholder="e.g. 15"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
                <div>
                  <Label htmlFor="pct-total">Of Total</Label>
                  <Input
                    id="pct-total"
                    type="text"
                    inputMode="decimal"
                    value={totalInput}
                    onChange={(e) => setTotalInput(e.target.value)}
                    placeholder="e.g. 200"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
              </>
            )}
            {mode === "find-percent" && (
              <>
                <div>
                  <Label htmlFor="pct-part">Part (Amount)</Label>
                  <Input
                    id="pct-part"
                    type="text"
                    inputMode="decimal"
                    value={partInput}
                    onChange={(e) => setPartInput(e.target.value)}
                    placeholder="e.g. 45"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
                <div>
                  <Label htmlFor="pct-whole">Whole (Total)</Label>
                  <Input
                    id="pct-whole"
                    type="text"
                    inputMode="decimal"
                    value={totalInput}
                    onChange={(e) => setTotalInput(e.target.value)}
                    placeholder="e.g. 180"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
              </>
            )}
            {mode === "find-whole" && (
              <>
                <div>
                  <Label htmlFor="pct-known-part">Known Part (Amount)</Label>
                  <Input
                    id="pct-known-part"
                    type="text"
                    inputMode="decimal"
                    value={partInput}
                    onChange={(e) => setPartInput(e.target.value)}
                    placeholder="e.g. 30"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
                <div>
                  <Label htmlFor="pct-rate">Percentage Rate (%)</Label>
                  <Input
                    id="pct-rate"
                    type="text"
                    inputMode="decimal"
                    value={percentInput}
                    onChange={(e) => setPercentInput(e.target.value)}
                    placeholder="e.g. 12"
                    className="mt-1 text-lg tabular-nums"
                  />
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-2">
              {[10, 15, 20, 25, 50].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPercentInput(String(p))}
                  className="rounded-md border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent"
                >
                  {p}%
                </button>
              ))}
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
          <ResultCard
            results={results}
            formulaUsed={formulaUsed}
            shareUrl={shareUrl}
            title="Percentage Calculation"
          />
          {isValid && insightText && (
            <Card className="bg-muted/30">
              <CardContent className="pt-5">
                <h3 className="mb-2 text-sm font-semibold">Interpretation</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{insightText}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
