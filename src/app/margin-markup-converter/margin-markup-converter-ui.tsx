"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { marginToMarkup, markupToMargin } from "@/lib/utils/math";
import { parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

type ConvertMode = "marginToMarkup" | "markupToMargin";

const REFERENCE_MARGINS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 75, 80];

export function MarginMarkupConverterUi() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("value") ?? "25");
  const [mode, setMode] = useState<ConvertMode>(
    searchParams.get("mode") === "markupToMargin" ? "markupToMargin" : "marginToMarkup",
  );

  const numValue = parseNumericInput(value);
  const isValid = numValue > 0 && (mode === "markupToMargin" || numValue < 100);

  let results: CalculatorResult[] = [];
  let formulaUsed = "";

  if (isValid) {
    if (mode === "marginToMarkup") {
      const markup = marginToMarkup(numValue);
      results = [
        { label: "Margin", value: numValue, formatted: `${numValue}%` },
        { label: "Equivalent Markup", value: markup, formatted: `${markup}%`, highlight: true },
      ];
      formulaUsed = `${numValue}% ÷ (1 − ${numValue}%) = ${markup}%`;
    } else {
      const margin = markupToMargin(numValue);
      results = [
        { label: "Markup", value: numValue, formatted: `${numValue}%` },
        { label: "Equivalent Margin", value: margin, formatted: `${margin}%`, highlight: true },
      ];
      formulaUsed = `${numValue}% ÷ (1 + ${numValue}%) = ${margin}%`;
    }
  }

  const shareUrl = isValid
    ? buildShareUrl("margin-markup-converter", { value, mode })
    : undefined;

  useEffect(() => {
    if (!isValid) return;
    const converted = mode === "marginToMarkup"
      ? `${marginToMarkup(numValue)}%`
      : `${markupToMargin(numValue)}%`;
    addHistoryEntry({
      calculator: "margin-markup-converter",
      title: mode === "marginToMarkup" ? "Margin → Markup" : "Markup → Margin",
      summary: `${numValue}% → ${converted}`,
      url: shareUrl ?? "/margin-markup-converter",
    });
  }, [numValue, mode, isValid, shareUrl]);

  function handleReset() {
    setValue("25");
    setMode("marginToMarkup");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-5 pt-6">
            <fieldset>
              <legend className="text-sm font-medium leading-none">Direction</legend>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("marginToMarkup")}
                  className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                    mode === "marginToMarkup"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  Margin → Markup
                </button>
                <button
                  type="button"
                  onClick={() => setMode("markupToMargin")}
                  className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                    mode === "markupToMargin"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  Markup → Margin
                </button>
              </div>
            </fieldset>

            <div>
              <Label htmlFor="converter-value">
                {mode === "marginToMarkup" ? "Margin (%)" : "Markup (%)"}
              </Label>
              <Input
                id="converter-value"
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={mode === "marginToMarkup" ? "e.g. 25" : "e.g. 50"}
                className="mt-1 text-lg tabular-nums"
              />
              {mode === "marginToMarkup" && numValue >= 100 && (
                <p className="mt-1 text-xs text-destructive">Margin must be less than 100%.</p>
              )}
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
          <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Margin ↔ Markup Conversion" />
          <Card className="bg-muted/30">
            <CardContent className="pt-5">
              <h3 className="mb-2 text-sm font-semibold">Why they differ</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Margin and markup both describe profit, but from different angles. Margin divides profit
                by revenue (selling price). Markup divides profit by cost. Because revenue is always
                larger than cost, margin is always the smaller number. A 50% markup on a $100 cost gives
                a $150 price and only a 33.3% margin.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-1 text-lg font-semibold">Margin ↔ Markup Reference Table</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Quick-reference conversions for common margin and markup percentages.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Margin</th>
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Markup</th>
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Multiplier (on cost)</th>
                  <th className="pb-2 font-medium text-muted-foreground">Example ($100 cost)</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_MARGINS.map((m) => {
                  const mu = marginToMarkup(m);
                  const price = (100 * (1 + mu / 100)).toFixed(2);
                  return (
                    <tr
                      key={m}
                      className={`border-b last:border-0 ${numValue === m && mode === "marginToMarkup" ? "bg-primary/5" : ""}`}
                    >
                      <td className="py-2 pr-6 tabular-nums font-medium">{m}%</td>
                      <td className="py-2 pr-6 tabular-nums">{mu}%</td>
                      <td className="py-2 pr-6 tabular-nums text-muted-foreground">×{(1 + mu / 100).toFixed(2)}</td>
                      <td className="py-2 tabular-nums text-muted-foreground">${price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
