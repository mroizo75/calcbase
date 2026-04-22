"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResultCard } from "@/components/calculator/result-card";
import { calculateMarkup, calculateMarkupFromPercent } from "@/lib/utils/math";
import { formatNumber, parseNumericInput } from "@/lib/utils/format-number";
import { buildShareUrl } from "@/lib/utils/urls";
import { addHistoryEntry } from "@/lib/history/config";
import type { CalculatorResult } from "@/lib/calculators/types";

type MarkupMode = "fromPrice" | "fromPercent";

export function MarkupCalculatorUi() {
  const searchParams = useSearchParams();
  const [cost, setCost] = useState(searchParams.get("cost") ?? "60");
  const [sellingPrice, setSellingPrice] = useState(searchParams.get("price") ?? "100");
  const [targetMarkup, setTargetMarkup] = useState(searchParams.get("markup") ?? "50");
  const [mode, setMode] = useState<MarkupMode>(
    searchParams.get("mode") === "fromPercent" ? "fromPercent" : "fromPrice",
  );

  const numCost = parseNumericInput(cost);
  const numSellingPrice = parseNumericInput(sellingPrice);
  const numTargetMarkup = parseNumericInput(targetMarkup);

  let results: CalculatorResult[] = [];
  let formulaUsed = "";

  if (mode === "fromPrice" && numCost > 0 && numSellingPrice > 0) {
    const { profit, markupPercent } = calculateMarkup(numCost, numSellingPrice);
    results = [
      { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
      { label: "Selling Price", value: numSellingPrice, formatted: formatNumber(numSellingPrice) },
      { label: "Profit", value: profit, formatted: formatNumber(profit) },
      { label: "Markup", value: markupPercent, formatted: `${markupPercent}%`, highlight: true },
    ];
    formulaUsed = `(${formatNumber(numSellingPrice)} − ${formatNumber(numCost)}) ÷ ${formatNumber(numCost)} × 100 = ${markupPercent}%`;
  } else if (mode === "fromPercent" && numCost > 0 && numTargetMarkup >= 0) {
    const { sellingPrice: sp, profit } = calculateMarkupFromPercent(numCost, numTargetMarkup);
    results = [
      { label: "Cost", value: numCost, formatted: formatNumber(numCost) },
      { label: "Target Markup", value: numTargetMarkup, formatted: `${numTargetMarkup}%` },
      { label: "Profit", value: profit, formatted: formatNumber(profit) },
      { label: "Selling Price", value: sp, formatted: formatNumber(sp), highlight: true },
    ];
    formulaUsed = `${formatNumber(numCost)} × (1 + ${numTargetMarkup}%) = ${formatNumber(sp)}`;
  }

  const shareUrl = results.length > 0
    ? buildShareUrl("markup-calculator", mode === "fromPrice"
        ? { cost, price: sellingPrice, mode }
        : { cost, markup: targetMarkup, mode })
    : undefined;

  useEffect(() => {
    if (mode === "fromPrice" && numCost > 0 && numSellingPrice > 0) {
      const { markupPercent } = calculateMarkup(numCost, numSellingPrice);
      addHistoryEntry({
        calculator: "markup-calculator",
        title: "Markup",
        summary: `Cost ${formatNumber(numCost)} → ${markupPercent}%`,
        url: shareUrl ?? "/markup-calculator",
      });
    } else if (mode === "fromPercent" && numCost > 0 && numTargetMarkup >= 0) {
      const { sellingPrice: sp } = calculateMarkupFromPercent(numCost, numTargetMarkup);
      addHistoryEntry({
        calculator: "markup-calculator",
        title: "Markup",
        summary: `Cost ${formatNumber(numCost)} → ${formatNumber(sp)}`,
        url: shareUrl ?? "/markup-calculator",
      });
    }
  }, [numCost, numSellingPrice, numTargetMarkup, mode, shareUrl]);

  function handleReset() {
    setCost("60");
    setSellingPrice("100");
    setTargetMarkup("50");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-5 pt-6">
          <div>
            <Label>Mode</Label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("fromPrice")}
                className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                  mode === "fromPrice"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                Find Markup %
              </button>
              <button
                type="button"
                onClick={() => setMode("fromPercent")}
                className={`h-12 rounded-lg border text-sm font-medium transition-colors ${
                  mode === "fromPercent"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-accent"
                }`}
              >
                Find Price
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="markup-cost">Cost</Label>
            <Input
              id="markup-cost"
              type="text"
              inputMode="decimal"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
              className="mt-1 text-lg tabular-nums"
            />
          </div>

          {mode === "fromPrice" ? (
            <div>
              <Label htmlFor="markup-selling">Selling Price</Label>
              <Input
                id="markup-selling"
                type="text"
                inputMode="decimal"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="Enter selling price"
                className="mt-1 text-lg tabular-nums"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="markup-target">Target Markup (%)</Label>
              <Input
                id="markup-target"
                type="text"
                inputMode="decimal"
                value={targetMarkup}
                onChange={(e) => setTargetMarkup(e.target.value)}
                placeholder="e.g. 50"
                className="mt-1 text-lg tabular-nums"
              />
            </div>
          )}

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
        <ResultCard results={results} formulaUsed={formulaUsed} shareUrl={shareUrl} title="Markup Calculation" />
        <Card className="bg-muted/30">
          <CardContent className="pt-5">
            <h3 className="mb-2 text-sm font-semibold">Markup vs margin</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Markup is the percentage added on top of cost to arrive at the selling price. Margin
              is the percentage of the selling price that is profit. They describe the same
              transaction from different perspectives. A 100% markup (doubling the cost) results in
              a 50% margin. Always clarify which metric you are using when discussing pricing.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
